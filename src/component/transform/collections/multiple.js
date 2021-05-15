import { getData } from "../../../get-data.js";
import { createFragment } from "./create-fragment.js";


export const multiple = async ({ element, props, data, methods }) => {
  const options = element.getAttribute("acom-multiple");
  let selector = "", limits;

  if (options.startsWith("@")) selector = options;
  else if (options.startsWith("{")) {
    const value = JSON.parse(options);
    selector = value.data;
    limits = value.range;
  };

  const elementData = await getData({ selector, props, data, methods });
  const fragment = await createFragment({ template: element, data: elementData, limits });
  element.replaceWith(fragment);
};