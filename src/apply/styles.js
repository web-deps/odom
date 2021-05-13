import { processStyles } from "../styles/process-styles.js";
import { observeMutations } from "../dom/observe-mutations.js";


export const styles = async function (styles, middleware = {}) {
  if (!styles || cacheID(this.id) || this.scope === document) return;

  const styleElement = await processStyles({
    id: this.id,
    selector: this.selector,
    styles,
    scopeStyles: true,
    middleware,
    createElement: true
  });

  const head = document.querySelector("head");
  head.appendChild(styleElement);
  observeScopeRemoval(this.id, this.selector);
};

const cacheID = id => {
  if (!window.$app) window.$app = {};
  if (!window.$app.styles) window.$app.styles = [];
  if (window.$app.styles.indexOf(id) !== -1) return true;
  window.$app.styles.push(id);
  return false;
};

const observeScopeRemoval = (id, selector) => {
  const removeStyles = (styleElement) => {
    if (!styleElement) return;
    styleElement.remove();
    window.$app.styles.splice(window.$app.styles.indexOf(id), 1);
  };

	const observer = observeMutations(
		document.body,
		mutations => {
			if (document.body.querySelector(selector)) return;
      const styleElement = document.head.querySelector(`[data-id="${id}"]`);
      removeStyles(styleElement);
			observer.disconnect();
		},
		{ childList: true, subtree: true }
	);
};