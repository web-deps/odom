import { Component } from "/src/main.js";
import logResult from "/tests/functionality/log-result.js";


const parseMarkup = async () => {
  const markup = /* html */`<div></div>`;
  const ParseMarkup = new Component();
  await ParseMarkup.parseMarkup(markup);
  const passed = ParseMarkup.scope.tagName === "DIV";
  logResult(passed);
  return ParseMarkup;
};


export default parseMarkup;