import { createComponent } from "/src/main.js";
import logResult from "/tests/functionality/log-result.js";

const converter = async () => {
  const markup = /* xml */ `<sec odom-ml="xml"></sec>`;
  const _converter = async (xml) => document.createElement("section");
  const _markup = { converter: _converter };
  const middleware = { markup: _markup };
  const options = { markup, middleware };
  const Converter = await createComponent(options);
  const passed = Converter.scope.tagName === "SECTION";
  logResult(passed);

  return Converter;
};

export default converter;
