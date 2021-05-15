import { createComponent } from "/src/main.js";
import logResult from "/tests/functionality/log-result.js";


const parser = async () => {
  const markup = /* html */`<div></div>`;
  const _parser = async (html) => document.createElement("section");
  const _markup = { parser: _parser };
  const middleware = { markup: _markup };
  const options = { markup, middleware };
  const Parser = await createComponent(options);
  const passed = Parser.scope.tagName === "SECTION";
  logResult(passed);

  return Parser;
};


export default parser;