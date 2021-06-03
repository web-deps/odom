import { Component } from "/src/main.js";
import logResult from "/tests/functionality/log-result.js";

const map = async () => {
  const markup = /* html */ `
    <table>
      <thead>
          <tr>
            <td>Username</td>
            <td>Name</td>
          </tr>
      </thead>
      <tbody odom-map="@data.users">
        <tr title="@datum.username">
          <td>
            <span odom-text="@datum.username"></span>
          </td>
          <td>
            <span odom-text="@datum.name"></span>
          </td>
        </tr>
      </tbody>
    </table>
  `;

  const users = [
    {
      name: "First User",
      username: "@user-1"
    },
    {
      name: "Second User",
      username: "@user-2"
    },
    {
      name: "Third User",
      username: "user-3"
    }
  ];

  const data = { users };
  const _Map = new Component();
  await _Map.parseMarkup(markup);
  await _Map.transform.map({ data });
  const passed = _Map.select("tbody", false).children.length === 3;
  logResult(passed);

  return _Map;
};

export default map;
