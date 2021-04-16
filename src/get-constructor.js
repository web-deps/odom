import { importModule } from "./import-module.js";
import { createURL } from "./create-url.js";


export const getConstructor = async (text, uri) => {
  text = await correctURIs(text, uri);
  return importModule(text);
};

const correctURIs = async (text, uri) => {
  const regexes = [
    /import\s+?(?:(?:(?:[\$\w*\s{},]*)\s+from\s+?)|)(?:(?:["'`](.*?)["'`])|(?:["'`](.*?)["'`]))[\s]*?(?:;|$|)/g,
    /import\(\s*["'`](.*?)["'`]\s*\)/g,
    /importComponent\(\s*["'`](.*?)["'`]\s*\)/g,
    /fetch\(\s*["'`](.*?)["'`]/g
  ];

  const applyRegex = regex => text.replace(regex, (match, g1) => match.replace(g1, (match) => createURL(match)));
  for (const regex of regexes) text = applyRegex(regex);
  return text;
};