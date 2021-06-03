import { createComponent } from "/src/main.js";

const node = async () => {
  const markup = /* html */ `
    <div>
      <div odom-node="/tests/functionality/assets/assets/node.js"></div>
    </div>
  `;

  const options = { markup };
  const _Node = await createComponent(options);
  let passed = !!_Node.select("#node", false);

  if (passed) console.info("Passed");
  else console.error("Failed");

  return _Node;
};

export default node;
