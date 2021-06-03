import { createComponent } from "/src/main.js";
import logResult from "../log-result.js";

const nodes = async () => {
  const markup = /* html */ `
    <div>
      <div odom-node="node"></div>
    </div>
  `;

  const _nodes = { node };
  const utils = { nodes: _nodes };
  const options = { markup, utils };
  const Nodes = await createComponent(options);
  const passed = Nodes.scope.firstElementChild.textContent.includes("Component");
  logResult(passed);

  return Nodes;
};

const node = async () => {
  const _node = document.createElement("p");
  _node.textContent = "Component";
  return _node;
};

export default nodes;
