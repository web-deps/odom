import { loading } from "./loading/loading.js";
import { interpretConditions } from "./interpret-conditions.js";
import { visibility } from "./visibility.js";
import { display } from "./display.js";
import { presence } from "./presence.js";


export const conditionals = async function ({
  element,
  type,
  options,
  components,
  elements,
  markups,
  texts,
  props,
  data,
  methods,
  transform
}) {
  let value;

  if (options.startsWith("@")) value = options;
  else if (/^\s*{/.test(options)) value = JSON.parse(options);
  else value = options;
  

  if (type === "loading") {
    await loading.call(
      this,
      element,
      value,
      { transform, components, elements, markups, texts, props, data, methods }
    );
  } else {
    const interpretedConditions = await interpretConditions({ conditions: value.conditions, props, data, methods });
    value.conditions = interpretedConditions;
    const conditions = ["visibility", "display", "presence"];
    const actions = { visibility, display, presence };

    const action = async condition => {
      if (type === condition) {
        element.removeAttribute(`acom-${condition}`);

        if (condition !== "presence") {
          element = await transform({ element, components, elements, markups, texts, props, data, methods });
        };

        await actions[condition](
          element,
          value,
          condition === "presence" && { transform, components, elements, markups, texts, props, data, methods }
        );
      };
    };

    await Promise.all(conditions.map(condition => action(condition)));
  };
};