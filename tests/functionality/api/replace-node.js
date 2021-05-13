import { replaceNode } from "/src/main.js";
import logResult from "/tests/functionality/log-result.js";


const _replaceNode = async () => {
  const target = document.createElement("div");
  const node = document.createElement("div");
  node.setAttribute("id", "replace-node");
  document.body.appendChild(target);
  await replaceNode(target, node, replacer);
};

const replacer = (target, node) => {
  target.replaceWith(node);
  const passed = !!document.body.querySelector("#replace-node");
  logResult(passed);
};


export default _replaceNode;