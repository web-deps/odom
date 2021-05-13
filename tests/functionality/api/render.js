import { render } from "/src/main.js";
import logResult from "/tests/functionality/log-result.js";


const _render = async () => {
  const target = document.createElement("div");
  target.setAttribute("acom-src", "/tests/functionality/assets/assets/esm-component.js");
  document.body.appendChild(target);
  await render();
  const passed = !!document.body.querySelector("#esm-component");
  logResult(passed);
};


export default _render;