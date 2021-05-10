import { createComponent, importComponent } from "/src/main.js";


const html = async () => {
  window.Acom = { createComponent }; // Simulate CDN
  const src = "/tests/functionality/assets/assets/html-component.html";
  const component = await importComponent(src);
  const DemoComponent = await component();
  console.info(DemoComponent)
  let passed = !!DemoComponent.scope;

  if (passed) console.info("Passed");
  else console.error("Faild");

  return DemoComponent;
};


export default html;