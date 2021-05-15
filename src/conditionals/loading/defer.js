import { observeMutations } from "../../dom/observe-mutations.js";
import { createPlaceholder } from "./create-placeholder.js";


export const defer = async (
  element,
  { time } = {},
  { transform, transformOptions }
) => {
  const placeholder = await createPlaceholder(element);
  const container = document.createElement("div");
  container.appendChild(element);
  const body = document.body;

  const onDOMLoaded = () => {
    const render = async () => {
      if (transform) element = await transform({ element, ...transformOptions });
      if (!element) element = container.firstElementChild;

      if (time === undefined) placeholder.replaceWith(element);
      else setTimeout(() => placeholder.replaceWith(element), time);
    };

    if (body.contains(placeholder)) render();
    else {
      const observer = observeMutations(
        body,
        mutations => {
          if (body.contains(placeholder)) {
            render();
            observer.disconnect();
          };
        },
        { childList: true, subtree: true }
      );
    };
  };
  
  if (document.readyState === "complete") onDOMLoaded();
  else window.addEventListener("DOMContentLoaded", onDOMLoaded);
};