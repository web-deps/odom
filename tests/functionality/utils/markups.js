import { createComponent } from "/src/main.js";
import logResult from "../log-result.js";

const markups = async () => {
  const markup = /* html */ `
    <div>
      <div odom-markup="_markup"></div>
    </div>
  `;

  const _markups = { _markup };
  const utils = { markups: _markups };
  const options = { markup, utils };
  const Markups = await createComponent(options);
  const passed = Markups.scope.firstElementChild.textContent.includes("Component");
  logResult(passed);

  return Markups;
};

const _markup = async () => {
  return /* html */ `
    <p>Component</p>
  `;
};

export default markups;
