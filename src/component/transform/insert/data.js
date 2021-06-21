import { observeMutations } from "../../../dom/observe-mutations.js";
import { getData } from "../../../get-data.js";

export const insertData = async ({ element, props, data, methods, dynamicData, skip }) => {
  const { elements, attributes } = skip;

  if (elements) {
    let skipElement = false;

    for (const attribute of elements) {
      if (element.hasAttribute(attribute)) {
        skipElement = true;
        break;
      }
    }

    if (skipElement) return;
  }

  const insert = async ({ name, value }) => {
    if (attributes && attributes.indexOf(name) !== -1) return;
    if (/^(:{1,2}@data)/.test(value)) handleDynamicData({ element, attribute: [name, value], data: dynamicData });
    let datum = await getData({ selector: value, data, methods, props, dynamicData });
    if (typeof datum === "function") datum = await datum();
    if (typeof datum === "object" && datum !== null) datum = JSON.stringify(datum);
    if (datum !== value) element.setAttribute(name, datum);
  };

  for (const attribute of element.attributes) await insert(attribute);
};

const handleDynamicData = ({ element, attribute: [name, value], data }) => {
  const doubleBind = value.startsWith("::");
  const selector = value.replace(/:{1,2}@data\./, "");
  const datum = data[selector];

  const update = (newValue) => {
    if (newValue === data[selector]) return;
    data.setValueFromAttribute(selector, newValue);
  };

  const elementData = {
    target: element,
    attributeName: name
  };

  data.addElement(selector, elementData);
  element.setAttribute(name, datum);
  if (!doubleBind) return;

  observeMutations(
    element,
    (mutations) => {
      const { target, attributeName } = mutations[0];
      update(target.getAttribute(attributeName));
    },
    { attributes: true, attributeFilter: [name] }
  );

  if (name !== "value") return;

  const INPUT_CONTROL_TAG_NAMES = ["INPUT", "SELECT", "TEXTAREA"];
  let isInputControl = false;

  for (const tagName of INPUT_CONTROL_TAG_NAMES) {
    if (tagName === element.tagName) {
      isInputControl = true;
      break;
    }
  }

  if (!isInputControl) return;
  const EVENT_TYPES = ["input", "keyup", "change"];

  for (const eventType of EVENT_TYPES) {
    element.addEventListener(eventType, (event) => update(event.target.value));
  }
};
