export const createPlaceholder = async element => {
  const name = element.getAttribute("name");
  const placeholder = document.createElement("div");
  placeholder.setAttribute("acom-placeholder", name || "");
  element.replaceWith(placeholder);
  return placeholder;
};