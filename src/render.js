export const render = async function (element) {
  if (typeof element === "string") element = document.querySelector(element);
  if (element) element.replaceWith(this.scope);
};