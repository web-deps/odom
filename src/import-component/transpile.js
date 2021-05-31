import { getText } from "./get-text.js";
import { modifyURLs } from "./modify-urls.js";

const REGEXES = {
  html: {
    markup: /<body(?:[^>"']|"[^"]*"|'[^']*')*>\s*(?:\s*([\w\W]*\s*))<\/body>/,
    styles: /<style(?:[^>"']|"[^"]*"|'[^']*')*>([\w\W]*)<\/style>/,
    scripts: /<script(?:[^>"']|"[^"]*"|'[^']*')*>[\w\W]*<\/script>/,
    module: /<script(?:[^>"']|"[^"]*"|'[^']*')*>([\w\W]*?)<\/script>/,
    comments: /\<\!\-\-(?:.|\n|\r)*?-->/g
  },
  esm: {
    markup: /`<scope\s*\/?>`/,
    styles: /`@import\s+['"]scope['"];`/
  }
};

let regexes = [REGEXES.html.styles, REGEXES.html.scripts, REGEXES.html.comments];

export const transpile = async (html, src) => {
  let markup, styles, scripts, module;
  const htmlWrapper = { value: html };

  [styles, scripts] = await Promise.all(regexes.map((regex) => getText(htmlWrapper, regex)));

  const textToRegexMap = [
    [htmlWrapper, REGEXES.html.markup],
    [{ value: scripts }, REGEXES.html.module]
  ];

  [markup, module] = await Promise.all(textToRegexMap.map(([text, regex]) => getText(text, regex)));

  module = await interpolateModule(module, { markup, styles });
  return modifyURLs(module, src);
};

const interpolateModule = async (module, values) => {
  await Promise.all(
    Object.entries(REGEXES.esm).map(([key, value]) => {
      module = module.replace(value, () => {
        return `\`${values[key]}\``;
      });
    })
  );

  return module;
};
