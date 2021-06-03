import { createComponent } from "/src/main.js";

const map = async () => {
  const markup = /* html */ `
    <table>
      <thead>
          <tr>
            <td>Username</td>
            <td>Name</td>
          </tr>
      </thead>
      <tbody odom-map='{"data": "@data.users", "createNode": "@methods.createNode"}'></tbody>
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

  const createNode = (user) => {
    return `
      <tr>
        <td>${user.username}</td>
        <td>${user.name}</td>
      </tr>
    `;
  };

  const data = { users };
  const methods = { createNode };
  const utils = { data, methods };
  const options = { markup, utils };
  const MapComponent = await createComponent(options);
  const firstUserTD = MapComponent.select("tbody td", false);
  let passed = firstUserTD.textContent.includes("@");

  if (passed) console.info("Passed");
  else console.error("Failed");

  return MapComponent;
};

export default map;
