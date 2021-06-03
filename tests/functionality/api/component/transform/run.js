import { Component } from "/src/main.js";
import logResult from "/tests/functionality/log-result.js";

const run = async () => {
  const markup = /* html */ `
    <div>
      <div odom-src="/tests/functionality/assets/assets/esm-component.js"></div>
      <div odom-markup="/tests/functionality/assets/assets/markup.html"></div>
      <div odom-node="/tests/functionality/assets/assets/node.js"></div>
      <div id="text">
        <div odom-text="/tests/functionality/assets/assets/text.txt"></div>
      </div>
      <div odom-presence='{"action": "remove", "conditions": ["@data.remove"]}' id="conditional"></div>
      <ul id="collections">
        <li odom-multiple="@data.items">
          <span odom-text="@datum"></span>
        </li>
      </ul>
    </div>
  `;

  const items = ["Item 1", "Item 2", "Item 3"];
  const data = { remove: true, items };
  const utils = { data };
  const Run = new Component();
  await Run.parseMarkup(markup);
  await Run.transform.run({ utils });
  const assetSelectors = ["#esm-component", "#markup", "#node", "#text"];
  const assetPromises = [];

  for (const selector of assetSelectors) assetPromises.push(Run.select(selector, false));
  const assets = await Promise.all(assetPromises);
  assets.push(assets[3].textContent.trim());
  let assetsPassed = true;
  for (const asset of assets) assetsPassed = assetsPassed && !!asset;

  const conditionalsPassed = !(await Run.select("#conditionals", false));
  const collectionsPassed = Run.select("#collections", false).children.length === 3;
  const passed = assetsPassed && conditionalsPassed && collectionsPassed;
  logResult(passed);

  return Run;
};

export default run;
