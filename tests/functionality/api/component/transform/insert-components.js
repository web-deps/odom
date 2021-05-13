import { Component } from "/src/main.js";
import logResult from "/tests/functionality/log-result.js";


const insertComponents = async () => {
  const markup = /* html */`
    <div>
      <div acom-src="/tests/functionality/assets/assets/esm-component.js"></div>
    </div>
  `;

  const InsertComponents = new Component();
  await InsertComponents.parseMarkup(markup);
  await InsertComponents.transform.insertComponents();
  const passed = !!(await InsertComponents.select("#esm-component", false));
  logResult(passed);

  return InsertComponents;
};


export default insertComponents;