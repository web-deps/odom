import { createComponent } from "/src/main.js";
import logResult from "/tests/functionality/log-result.js";


const _createComponent = async () => {
  const markup = /* html */`<div></div>`;
  const options = { markup };
  const CreateComponent = await createComponent(options);
  const passed = CreateComponent.scope.tagName === "DIV";
  logResult(passed);
  return CreateComponent;
};


export default _createComponent;