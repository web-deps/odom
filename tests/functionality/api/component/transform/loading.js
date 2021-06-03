import { Component } from "/src/main.js";
import logResult from "/tests/functionality/log-result.js";

const loading = async () => {
  const markup = /* html */ `
    <div>
      <div odom-loading='{"type": "defer", "time": 1000}' id="defer"></div>
    </div>
  `;

  const Loading = new Component();
  await Loading.parseMarkup(markup);
  await Loading.transform.loading();
  let passed = !Loading.select("#defer", false);
  document.body.appendChild(Loading.scope);

  setTimeout(async () => {
    passed = passed && !!(await Loading.select("#defer", false));
    logResult(passed);
  }, 2000);

  return Loading;
};

export default loading;
