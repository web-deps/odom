export const createPlaceholder = async (element) => {
  const name = element.getAttribute("name");
  const placeholder = document.createElement(element.tagName);
  placeholder.setAttribute("acom-placeholder", name || "");
  element.replaceWith(placeholder);
  return placeholder;
};
