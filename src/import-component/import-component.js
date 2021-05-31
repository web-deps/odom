import { getExtension } from "../get-extension.js";
import { createModule } from "./create-module.js";
import { getText } from "./get-text.js";
import { transpile } from "./transpile.js";

const ID_REGEX = /<meta\s*name=["']?(?:[-\w]*)["']?\s*content=["']?([-\w]*)["']?\s*\/?>/;

(function createCache() {
  if (!window.$app) window.$app = {};
  if (!window.$app.components) window.$app.components = new Map();
  if (!window.$app.srcMap) window.$app.srcMap = new Map();
})();

export const importComponent = async ({ src = "/", type = "html", file, id }) => {
  const component = getCachedComponent({ src, id });
  if (component) return component;
  if (!type) type = getExtension(src);
  return /html?/.test(type) || file ? importHTMLComponent({ src, file, id }) : importJSComponent(src);
};

const importHTMLComponent = async ({ src, file, id }) => {
  let text = "";

  if (file) text = file;
  else if (src) {
    const res = await fetch(src);
    text = await res.text();
  }

  if (!id) id = await getText({ value: text }, ID_REGEX);
  const moduleText = await transpile(text, src);
  const component = await Object.values(await createModule(moduleText))[0];
  cache(src, component, id);
  return component;
};

const importJSComponent = async (src) => {
  const component = Object.values(await import(src))[0];
  return component;
};

const cache = (src, component, id) => {
  if (src === "/") return;
  const saveSrc = /^\/|^http[s]?|^www./.test(src);

  if (saveSrc) {
    if (!id) id = String(performance.now);
    window.$app.srcMap.set(src, id);
    window.$app.components.set(id, component);
  } else if (id) window.$app.components.set(id, component);
};

const getCachedComponent = ({ id, src }) => {
  if (src && window.$app.srcMap.has(src)) id = window.components.srcMap.get(src);
  if (id && window.$app.components.has(id)) return window.$app.components.get(id);
};
