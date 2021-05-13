import { parseMarkup as parse } from "./dom/parse-markup.js";


export const parseMarkup = async function (markup, middleware) {
  this.scope = await parse({ markup, middleware });
  this.scope.setAttribute("acom-scope", this.id);
  return this.scope;
};