export const getNestedValue = async (value, selector) => {
  if (!selector) return value;
  const keys = selector.split(".");
  for (const key of keys) value = value[key];
  return value;
};