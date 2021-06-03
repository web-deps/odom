import { Component } from "/src/main.js";
import logResult from "/tests/functionality/log-result.js";

const multiple = async () => {
  const markup = /* html */ `
    <table>
      <thead>
          <tr>
            <td>Username</td>
            <td>Name</td>
          </tr>
      </thead>
      <tbody>
        <tr odom-multiple="@data.users">
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
  const Multiple = new Component();
  await Multiple.parseMarkup(markup);
  await Multiple.transform.multiple({ data });
  const passed = Multiple.select("tbody", false).children.length === 3;
  logResult(passed);

  return Multiple;
};

export default multiple;
