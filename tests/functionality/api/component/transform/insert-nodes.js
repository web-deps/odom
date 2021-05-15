import { Component } from "/src/main.js";
import logResult from "/tests/functionality/log-result.js";


const insertNodes = async () => {
  const markup = /* html */`
    <div>
      <div acom-node="/tests/functionality/assets/assets/node.js"></div>
    </div>
  `;

  const InsertNodes = new Component();
  await InsertNodes.parseMarkup(markup);
  await InsertNodes.transform.insertNodes();
  const passed = !!InsertNodes.select("#node", false);
  logResult(passed);

  return InsertNodes;
};


export default insertNodes;