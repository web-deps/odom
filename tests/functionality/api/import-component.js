import { importComponent } from "/src/main.js";
import * as Acom from "/src/main.js";
import logResult from "/tests/functionality/log-result.js";


const _importComponent = async () => {
  window.Acom = Acom; // Simulate CDN
  const component = await importComponent("/tests/functionality/assets/assets/html-component.html");
  const ImportComponent = await component();
  const passed = !!ImportComponent.scope;
  logResult(passed);
  return ImportComponent;
};


export default _importComponent;