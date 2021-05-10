import { createComponent } from "/src/main.js";


const markup = async () => {
  const _markup = /* html */`
    <div>
      <div acom-markup="/tests/functionality/assets/assets/markup.html"></div>
    </div>
  `;

  const options = { markup: _markup };
  const DemoComponent = await createComponent(options);
  let passed = !!DemoComponent.select("#demo-markup", false);

  if (passed) console.info("Passed");
  else console.error("Failed");

  return DemoComponent;
};


export default markup;