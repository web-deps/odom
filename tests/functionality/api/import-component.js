import { importComponent } from "/src/main.js";
import * as Odom from "/src/main.js";
import logResult from "/tests/functionality/log-result.js";

const _importComponent = async () => {
  window.Odom = Odom; // Simulate CDN
  const src = "/tests/functionality/assets/assets/html-component.html";
  const res = await fetch(src);
  const componentText = await res.json();
  let passed = await isComponent(await importComponent({ src }));
  const result = await isComponent(await importComponent({ file: componentText }));
  passed = passed && result;

  logResult(passed);
  return ImportComponent;
};

const isComponent = async (component) => {
  const ImportComponent = await component();
  return !!ImportComponent.scope;
};

export default _importComponent;
