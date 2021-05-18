import { processStyles } from "./process-styles.js";
import { observeMutations } from "../../../dom/observe-mutations.js";


let styleRemoverAdded = false;

export const styles = async function (styles, middleware = {}) {
  if (typeof styles !== `string`) throw new Error(`Styles must be of type string and not ${typeof styles}.`);
  if (cacheID(this.id)) return;

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
  styleRemoverAdded || addStyleRemover(this.id);
};

const cacheID = id => {
  if (!window.$app) window.$app = {};
  if (!window.$app.styles) window.$app.styles = [];
  if (window.$app.styles.indexOf(id) !== -1) return true;
  window.$app.styles.push(id);
  return false;
};

const addStyleRemover = () => {
	observeMutations(
		document.body,
		mutations => {
      const promises = window.$app.styles.map((id, index) => removeStyles(id, index));
      Promise.all(promises);
		},
		{ childList: true, subtree: true }
	);

  styleRemoverAdded = true;
};

const removeStyles = async (id, index) => {
  if (document.body.querySelector(`[acom-scope="${id}"]`)) return;
  const styleElement = document.head.querySelector(`[data-id="${id}"]`);
  if (!styleElement) return;
  styleElement.remove();
  window.$app.styles.splice(index, 1);
};