import { Component } from "/src/main.js";
import logResult from "/tests/functionality/log-result.js";

const insertText = async () => {
  const markup = /* html */ `
    <div>
      <div odom-text="/tests/functionality/assets/assets/text.txt"></div>
    </div>
  `;

  const InsertText = new Component();
  await InsertText.parseMarkup(markup);
  await InsertText.transform.insertText();
  const passed = InsertText.scope.textContent.includes("text");
  logResult(passed);

  return InsertText;
};

export default insertText;
