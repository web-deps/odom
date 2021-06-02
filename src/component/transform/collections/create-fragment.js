import { getRange } from "./get-range.js";
import { apply } from "../../../dom/apply.js";
import { getNestedValue } from "../../../get-nested-value.js";
import { getProps } from "../../../dom/get-props.js";
import { render } from "../../../dom/render.js";

export const createFragment = async ({ template, data, limits, createNode }) => {
  if (template) template.removeAttribute("acom-multiple");
  const fragment = document.createDocumentFragment();
  const elements = [];
  const range = await getRange(data.length, limits);
  const lowerLimit = range[0];

  const addElement = async (i) => {
    elements[i - lowerLimit] = await apply(template.cloneNode(true), async (el) => insertData(el, data[i]));
  };

  const addMapperElement = async (i) => {
    elements[i - lowerLimit] = await createNode(data[i]);
  };

  const setPromises = (fun) => {
    for (let index = range[0]; index <= range[1]; index++) {
      promises.push(fun(index));
    }
  };

  const promises = [];

  if (template) setPromises(addElement);
  else setPromises(addMapperElement);

  await Promise.all(promises);
  for (const el of elements) fragment.appendChild(el);
  return fragment;
};

const insertData = async (element, datum) => {
  const attributes = Array.from(element.attributes);

  const setAttribute = async ({ name, value }) => {
    if (value.startsWith("@datum")) {
      value = value.includes(".") ? await getNestedValue(datum, value.replace("@datum.", "")) : datum;
      element.setAttribute(name, value);
    }
  };

  if (element.hasAttribute("acom-text")) {
    let props;
    if (attributes.length > 1) props = await getProps({ element });
    const selector = element.getAttribute("acom-text");
    let texts = {};
    const asset = selector.includes(".") ? selector.substring(selector.lastIndexOf(".") + 1) : "datum";
    const text = await getNestedValue(datum, selector.replace(/@datum[.]?/, ""));
    if (text) texts = { [asset]: text };

    await render({
      assetType: "text",
      fileType: "text",
      target: element,
      asset,
      assets: texts,
      props
    });
  } else await Promise.all(attributes.map((attribute) => setAttribute(attribute)));

  return element;
};
