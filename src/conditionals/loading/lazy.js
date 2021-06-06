import { createPlaceholder } from "../create-placeholder.js";

export const lazy = async function (element, value, { transform, transformOptions }) {
  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0
  };

  const render = async (entries, observer) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        element = await transform({ element, ...transformOptions });
        if (!element) element = container.firstElementChild;
        placeholder.replaceWith(element);
      }
    }
  };

  const placeholder = createPlaceholder(element);
  const container = document.createElement("div");
  container.appendChild(element);

  if (typeof value === "object") {
    const properties = ["root", "rootMargin", "threshold"];
    const valueOptions = value.options;

    if (valueOptions) {
      for (const property of properties) if (property in valueOptions) options[property] = valueOptions[property];
      if ("root" in valueOptions) options.root = this.select(valueOptions.root, false);
    }
  }

  let observer = new IntersectionObserver(render, options);
  observer.observe(placeholder);
};
