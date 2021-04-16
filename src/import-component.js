import { getConstructor } from "./get-constructor.js";


export const importComponent = async src => {
  if (window.$app && window.$app.srcMap && window.$app.srcMap.has(src)) {
    return window.$app.components.get(window.components.srcMap.get(src));
  };

  const type = src.substring(src.lastIndexOf(".") + 1).toLowerCase();
  return type === "js" ? importJSComponent(src) : importHTMLComponent(src);
};

const importHTMLComponent = async src => {
  const getText = async regex => {
    let txt;

    text = text.replace(regex, (match, group) => {
      if (typeof group === "string") txt = group;
      else txt = match;

      return "";
    });

    return txt;
  };

  const regexes = {
    id: /<meta\s*id=["']?([-\w]*)["']?\s*\/?>/,
    markup: /<body(?:[^>"']|"[^"]*"|'[^']*')*>\s*(?:\s*([\w\W]*\s*))<\/body>/,
    styles: /<style(?:[^>"']|"[^"]*"|'[^']*')*>([\w\W]*)<\/style>/,
    script: /<script(?:[^>"']|"[^"]*"|'[^']*')*>[\w\W]*<\/script>/,
    module: /<script(?:[^>"']|"[^"]*"|'[^']*')*>([\w\W]*?)<\/script>/,
    comments: /\<\!\-\-(?:.|\n|\r)*?-->/g
  };

  const res = await fetch(src);
  let text = await res.text();
  let id = await getText(regexes.id);

  if (id) {
    if (window.$app && window.$app.components && window.$app.components.has(id)) {
      return window.$app.components.get(id);
    };
  } else id = String(performance.now()).replace(".", "-");

  await getText(regexes.comments);

  let [styles, script] = await Promise.all([
    regexes.styles,
    regexes.script
  ].map(regex => getText(regex)));

  const markup = await getText(regexes.markup);
  text = script;
  const module = await getText(regexes.module);
  
  const constructor = await getConstructor(module, src);
  const component = async props => constructor({ id, src, markup, styles, props });
  cache(src, component, id);

  return component;
};

const importJSComponent = async src => {
  const component = Object.values(await import(src))[0];
  return component;
};

const cache = (src, component, id) => {
  const savesrc = /^\/|^http[s]?|^www./.test(src);

  if (savesrc) {
    if (!window.$app) window.$app = {};
    if (!window.$app.components) window.$app.components = new Map();
    if (!window.$app.srcMap) window.$app.srcMap = new Map();
    if (!id) id = String(performance.now);
    window.$app.srcMap.set(src, id);
    window.$app.components.set(id, component);
  } else if (id) window.$app.components.set(id, component);
};