import { createURL } from "./create-url.js";

const REGEXES = [
  /import\s+?(?:(?:(?:[\$\w*\s{},]*)\s+from\s+?)|)(?:(?:["'`](.*?)["'`])|(?:["'`](.*?)["'`]))[\s]*?(?:;|$|)/g,
  /import\(\s*["'`](.*?)["'`]\s*\)/g,
  /importComponent\(\s*["'`](.*?)["'`]\s*\)/g,
  /fetch\(\s*["'`](.*?)["'`]/g,
  /fetchAsset\(\s*["'`](.*?)["'`]/g,
  /prefetch\(\s*["'`](.*?)["'`]/g
];

export const modifyURLs = async (text, src) => {
  const applyRegex = (regex) => text.replace(regex, (match, g1) => match.replace(g1, (match) => createURL(match, src)));
  for (const regex of REGEXES) text = applyRegex(regex);
  return text;
};
