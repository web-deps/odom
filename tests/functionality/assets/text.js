import { createComponent } from "/src/main.js";


const text = async () => {
  const markup = /* html */`
    <div>
      <span acom-text="/tests/functionality/assets/assets/text.txt"></span>
    </div>
  `;

  const options = { markup };
  const DemoComponent = await createComponent(options);
  let passed = DemoComponent.scope.textContent.includes("Demo Text");

  if (passed) console.info("Passed");
  else console.error("Failed");

  return DemoComponent;
};


export default text;