import { createComponent } from "/src/main.js";
import logResult from "/tests/functionality/log-result.js";


const setProps = async () => {
  const markup = /* html */`<div id="render"></div>`;
  const options = { markup };
  const SetProps = await createComponent(options);
  await SetProps.setProps({ name: "set-props" });
  const passed = SetProps.name === "set-props";
  logResult(passed);
  return SetProps;
};


export default setProps;