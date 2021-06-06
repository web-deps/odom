import { loading } from "./loading/loading.js";
import { interpretConditions } from "./interpret-conditions.js";
import { visibility } from "./visibility.js";
import { display } from "./display.js";
import { presence } from "./presence.js";
import { createPlaceholder } from "./create-placeholder.js";

export const conditionals = async function ({ element, type, options, transform, ...transformOptions }) {
  let value;

  if (/^\s*{/.test(options)) value = JSON.parse(options);
  else value = options;

  if (type === "loading") {
    element.removeAttribute("odom-loading");

    await loading.call(this, element, value, { transform, transformOptions });
  } else {
    const interpretedConditions = await interpretConditions({ conditions: value.conditions, transformOptions });
    value.conditions = interpretedConditions;
    const conditions = ["visibility", "display", "presence"];
    const actions = { visibility, display, presence };

    const action = async (condition) => {
      if (type === condition) {
        element.removeAttribute(`odom-${condition}`);
        const placeholder = createPlaceholder(element);
        const container = document.createElement("div");
        container.appendChild(element);

        if (condition !== "presence") {
          element = await transform({ element, transformOptions });
          if (!element) element = container.firstElementChild;
        }

        placeholder.replaceWith(element);
        await actions[condition](element, value, condition === "presence" && { transform, transformOptions });
      }
    };

    await Promise.all(conditions.map((condition) => action(condition)));
  }
};
