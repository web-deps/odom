import { createComponent, importComponent } from "/src/main.js";


const html = async () => {
  window.Acom = { createComponent }; // Simulate CDN
  const src = "/tests/functionality/assets/assets/html-component.html";
  const component = await importComponent(src);
  const DemoComponent = await component();
  let passed = !!DemoComponent.scope;

  if (passed) console.info("Passed");
  else console.error("Failed");

  return DemoComponent;
};


export default html;