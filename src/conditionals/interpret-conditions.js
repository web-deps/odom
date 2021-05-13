import { getNestedValue } from "../get-nested-value.js";


export const interpretConditions = async ({ conditions, transformOptions: { utils, dynamicData } }) => {
  const interpretedConditions = {
    apply: true,
    media: null
  };

  const { props, data, methods } = utils;

  const getType = condition => {
    const types = ["props", "data", "methods", "$app"];
    for (const type of types) if (condition.startsWith(`@${type}`)) return type;
  };

  const DATA = {
    "props": props,
    "data": data,
    "methods": methods,
    "$app": window.$app
  };

  const setCondition = async condition => {
    if (typeof condition === "string") {
      const type = getType(condition);
      let value = await DATA[type];
      value = await getNestedValue(value, condition.replace(`@${type}.`, ""));
      if (value === false) interpretedConditions.apply = false;
    } else interpretedConditions.media = condition;
  };

  await Promise.all(conditions.map(condition => setCondition(condition)));
  return interpretedConditions;
};