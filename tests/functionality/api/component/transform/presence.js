import { Component } from "/src/main.js";
import logResult from "/tests/functionality/log-result.js";

const presence = async () => {
  const markup = /* html */ `
    <div>
      <div odom-presence='{"action": "remove", "conditions": ["@data.remove"]}'></div>
    </div>
  `;

  const data = { remove: true };
  const Presence = new Component();
  await Presence.parseMarkup(markup);
  await Presence.transform.presence({ data });
  const passed = !Presence.scope.firstElementChild;
  logResult(passed);

  return Presence;
};

export default presence;
