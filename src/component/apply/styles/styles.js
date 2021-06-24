import { processStyles } from "./process-styles.js";
import { scopeCSS } from "./scope-css.js";
import { createStyleElement } from "./create-style-element.js";
import { addStyleRemover } from "./add-style-remover.js";

let styleRemoverAdded = false;

export const styles = async function (styles, middleware = {}) {
  if (typeof styles !== `string`) throw new Error(`Styles must be of type string and not ${typeof styles}.`);
  if (cacheID(this.id)) return;
  const { process = true, scope = true, ...rest } = middleware;

  if (process) {
    styles = await processStyles({
      id: this.id,
      selector: this.selector,
      styles,
      middleware: rest,
      createElement: true
    });
  }

  if (scope) styles = await scopeCSS(styles, this.id);
  const styleElement = createStyleElement(styles, this.id);
  const head = document.querySelector("head");
  head.appendChild(styleElement);

  if (!styleRemoverAdded) {
    addStyleRemover();
    styleRemoverAdded = true;
  }
};

const cacheID = (id) => {
  if (!window.$app) window.$app = {};
  if (!window.$app.styles) window.$app.styles = [];
  if (window.$app.styles.indexOf(id) !== -1) return true;
  window.$app.styles.push(id);
  return false;
};
