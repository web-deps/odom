import { createComponent } from "/src/main.js";
import logResult from "../log-result.js";

const texts = async () => {
  const markup = /* html */ `
    <div>
      <div odom-text="text"></div>
    </div>
  `;

  const _texts = { text };
  const utils = { texts: _texts };
  const options = { markup, utils };
  const Texts = await createComponent(options);
  const passed = Texts.scope.textContent.includes("Component");
  logResult(passed);

  return Texts;
};

const text = async () => "Component";

export default texts;
