export const applyAttributes = async (element, attributes) => {
  for (const name in attributes) element.setAttribute(name, attributes[name]);
};