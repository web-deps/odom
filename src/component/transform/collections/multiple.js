import { getData } from "../../../get-data.js";
import { createFragment } from "./create-fragment.js";

export const multiple = async ({ element, props, data, methods }) => {
  const options = element.getAttribute("odom-multiple");
  let selector = "",
    limits;

  if (options.startsWith("@")) selector = options;
  else if (/^\s*\{/.test(options)) {
    const value = JSON.parse(options);
    selector = value.data;
    limits = value.range;
  }

  const elementData = await getData({ selector, props, data, methods });
  const fragment = await createFragment({ template: element, data: elementData, limits });
  element.replaceWith(fragment);
};
