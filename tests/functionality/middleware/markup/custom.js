import { createComponent } from "/src/main.js";
import logResult from "/tests/functionality/log-result.js";

const custom = async () => {
  const markup = /* xml */ `<sec odom-ml="xml"></sec>`;

  const converter = async (xml) => {
    const html = document.createElement("main");
    html.setAttribute("x", xml.tagName);
    return html;
  };

  const parser = async (html) => document.createElement("section");

  const _markup = {
    custom: [parser, converter]
  };

  const middleware = { markup: _markup };
  const options = { markup, middleware };
  const Custom = await createComponent(options);
  const passed = Custom.scope.tagName === "MAIN" && Custom.scope.getAttribute("x").toLowerCase() === "section";
  logResult(passed);

  return Custom;
};

export default custom;
