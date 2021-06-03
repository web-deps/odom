import { Component } from "/src/main.js";
import logResult from "/tests/functionality/log-result.js";

const visibility = async () => {
  const markup = /* html */ `
    <div>
      <div odom-visibility='{"value": ["hidden", "visible"], "conditions": ["@data.hide"]}'></div>
    </div>
  `;

  const data = { hide: true };
  const Visibility = new Component();
  await Visibility.parseMarkup(markup);
  await Visibility.transform.visibility({ data });
  const passed = Visibility.scope.firstElementChild.style.getPropertyValue("visibility") === "hidden";
  logResult(passed);

  return Visibility;
};

export default visibility;
