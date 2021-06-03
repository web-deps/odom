import { createComponent } from "/src/main.js";
import logResult from "../log-result.js";

const components = async () => {
  const markup = /* html */ `
    <div>
      <div odom-src="component"></div>
    </div>
  `;

  const _components = { component };
  const utils = { components: _components };
  const options = { markup, utils };
  const Components = await createComponent(options);
  const passed = Components.scope.firstElementChild.textContent.includes("Component");
  logResult(passed);

  return Components;
};

const component = async () => {
  const markup = /* html */ `
    <p>Component</p>
  `;

  const options = markup;
  return createComponent(options);
};

export default components;
