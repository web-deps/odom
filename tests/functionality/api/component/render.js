import { createComponent } from "/src/main.js";
import logResult from "/tests/functionality/log-result.js";


const render = async () => {
  const markup = /* html */`<div id="render"></div>`;
  const options = { markup };
  const Render = await createComponent(options);
  const target = document.createElement("div");
  document.body.appendChild(target);
  await Render.render(target);
  const passed = document.body.querySelector("#render");
  logResult(passed);
  return Render;
};


export default render;