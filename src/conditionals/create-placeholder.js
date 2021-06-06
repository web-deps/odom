export const createPlaceholder = (element) => {
  const name = element.getAttribute("name");
  const placeholder = document.createElement(element.tagName);
  placeholder.setAttribute("odom-placeholder", name || "");
  element.replaceWith(placeholder);
  return placeholder;
};
