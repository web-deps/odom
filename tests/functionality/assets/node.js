import { createComponent } from "/src/main.js";


const node = async () => {
  const markup = /* html */`
    <div>
      <div acom-node="/tests/functionality/assets/assets/node.js"></div>
    </div>
  `;

  const options = { markup };
  const DemoComponent = await createComponent(options);
  let passed = !!DemoComponent.select("#node", false);

  if (passed) console.info("Passed");
  else console.error("Failed");

  return DemoComponent;
};


export default node;