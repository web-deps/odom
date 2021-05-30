export const createStyleElement = (styles, id) => {
  const styleElement = document.createElement("style");
  styleElement.textContent = styles;
  if (id) styleElement.dataset.id = id;
  return styleElement;
};
