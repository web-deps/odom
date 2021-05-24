import {getConstructor} from "./get-constructor.js";
import {getExtension} from "../get-extension.js";

export const importComponent = async (src, type) => {
  if (/^\s*</.test(src)) return importHTMLComponent(src, true);
  if (window.$app && window.$app.srcMap && window.$app.srcMap.has(src)) {
    return window.$app.components.get(window.components.srcMap.get(src));
  }

  if (!type) type = getExtension(src);
  return type === "js" ? importJSComponent(src) : importHTMLComponent(src);
};

const importHTMLComponent = async (src, isFile = false) => {
  let text;
  if (isFile) text = src;

  const getText = async (regex) => {
    let txt;

    text = text.replace(regex, (match, group) => {
      if (typeof group === "string") txt = group;
      else txt = match;

      return "";
    });

    return txt;
  };

  const regexes = {
    id: /<meta\s*name=["']?(?:[-\w]*)["']?\s*content=["']?([-\w]*)["']?\s*\/?>/,
    markup: /<body(?:[^>"']|"[^"]*"|'[^']*')*>\s*(?:\s*([\w\W]*\s*))<\/body>/,
    styles: /<style(?:[^>"']|"[^"]*"|'[^']*')*>([\w\W]*)<\/style>/,
    script: /<script(?:[^>"']|"[^"]*"|'[^']*')*>[\w\W]*<\/script>/,
    module: /<script(?:[^>"']|"[^"]*"|'[^']*')*>([\w\W]*?)<\/script>/,
    comments: /\<\!\-\-(?:.|\n|\r)*?-->/g
  };

  if (!text) {
    const res = await fetch(src);
    text = await res.text();
  }

  let id = await getText(regexes.id);

  if (id) {
    if (window.$app && window.$app.components && window.$app.components.has(id)) {
      return window.$app.components.get(id);
    }
  } else id = String(performance.now()).replace(".", "-");

  await getText(regexes.comments);

  let [styles, script] = await Promise.all([regexes.styles, regexes.script].map((regex) => getText(regex)));

  const markup = await getText(regexes.markup);
  text = script;
  const module = await getText(regexes.module);

  const constructor = await getConstructor(module, src);
  const componentAssets = {id, markup, styles};
  const component = async (props) => constructor({...props, componentAssets});
  cache(src, component, id);

  return component;
};

const importJSComponent = async (src) => {
  const component = Object.values(await import(src))[0];
  return component;
};

const cache = (src, component, id) => {
  const saveSrc = /^\/|^http[s]?|^www./.test(src);

  if (saveSrc) {
    if (!window.$app) window.$app = {};
    if (!window.$app.components) window.$app.components = new Map();
    if (!window.$app.srcMap) window.$app.srcMap = new Map();
    if (!id) id = String(performance.now);
    window.$app.srcMap.set(src, id);
    window.$app.components.set(id, component);
  } else if (id) window.$app.components.set(id, component);
};
