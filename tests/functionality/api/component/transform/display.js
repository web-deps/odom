import { Component } from "/src/main.js";
import logResult from "/tests/functionality/log-result.js";

const display = async () => {
  const markup = /* html */ `
    <div>
      <div odom-display='{"value": ["none", "block"], "conditions": ["@data.hide"]}'></div>
    </div>
  `;

  const data = { hide: true };
  const Display = new Component();
  await Display.parseMarkup(markup);
  await Display.transform.display({ data });
  const passed = Display.scope.firstElementChild.style.getPropertyValue("display") === "none";
  logResult(passed);

  return Display;
};

export default display;
