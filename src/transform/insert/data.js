import { observeMutations } from "../../dom/observe-mutations.js";
import { getData } from "../../get-data.js";


export const insertData = async ({ element, props, data, methods, dynamicData, skip }) => {
  const { elements, attributes } = skip;

  if (elements) {
    let skipElement = false;

    for (const attribute of elements) {
      if (element.hasAttribute(attribute)) {
        skipElement = true;
        break;
      };
    };

    if (skipElement) return;
  };

  const insert = async ({ name, value }) => {
    if (attributes && attributes.indexOf(name) !== -1) return;
    if (/^(:{1, 2}@data)/.test(value)) handleDynamicData({ element, attribute: [name, value], dynamicData });
    const datum = await getData({ selector: value, data, methods, props, dynamicData });
    if (datum !== value) element.setAttribute(name, datum);
  };

  for (const attribute of element.attributes) await insert(attribute);
};

const handleDynamicData = ({ element, attribute: [name, value], data } ) => {
  const doubleBind = value.startsWith("::");
  const selector = value.replace(/:{1,2}@data./, "");
  const datum = data[selector];
  element.setAttribute(name, datum);

  data.elements[selector] = {
    target: element,
    attributeName: name
  };

  if (!doubleBind) return;

  observeMutations(
    element,
    mutations => {
      const { target, attributeName } = mutations[0];
      data[selector] = target.getAttribute(attributeName);
    },
    { attributes: true, attributeFilter: [name] }
  );
};