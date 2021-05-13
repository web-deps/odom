import { Component } from "/src/main.js";
import logResult from "/tests/functionality/log-result.js";


const insertData = async () => {
  const markup = /* html */`
    <div title="@data.title"></div>
  `;

  const TITLE = "Insert Data";
  const data = { title: TITLE };
  const InsertData = new Component();
  await InsertData.parseMarkup(markup);
  await InsertData.transform.insertData({ data });
  const passed = InsertData.scope.getAttribute("title") === TITLE;
  logResult(passed);

  return InsertData;
};


export default insertData;