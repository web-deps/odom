import { createComponent } from "./create-component.js";


export const render = async () => {
  const acoms = document.querySelectorAll("[acom-src]");

  if (acoms) {
    await Promise.all(
      Array.from(acoms).map(
        el => (async () => {
          const $component = await createComponent(el.outerHTML);
          if ($component) $component.render(el);
        })()
      )
    );
  };
};