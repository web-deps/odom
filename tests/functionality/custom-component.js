import { createComponent, Component } from "/src/main.js";
import logResult from "/tests/functionality/log-result.js";

class CustomComponent extends Component {
  constructor() {
    super();
  }

  customMethod() {
    return true;
  }
}

const _CustomComponent = async () => {
  const markup = /* html */ `
    <div></div>
  `;

  const customComponent = await createComponent({ markup }, CustomComponent);
  const passed = customComponent.scope.tagName === "DIV" && customComponent.customMethod();
  logResult(passed);
  return customComponent;
};

export default _CustomComponent;
