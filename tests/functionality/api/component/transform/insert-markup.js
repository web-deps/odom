import { Component } from "/src/main.js";
import logResult from "/tests/functionality/log-result.js";

const insertMarkup = async () => {
  const markup = /* html */ `
    <div>
      <div odom-markup="/tests/functionality/assets/assets/markup.html"></div>
    </div>
  `;

  const InsertMarkup = new Component();
  await InsertMarkup.parseMarkup(markup);
  await InsertMarkup.transform.insertMarkup();
  const passed = !!InsertMarkup.select("#markup", false);
  logResult(passed);

  return InsertMarkup;
};

export default insertMarkup;
