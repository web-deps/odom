export const apply = async (element, action, attribute) => {
  const children = element.children;
  if (children[0]) await Promise.all(Array.from(children).map(child => apply(child, action, attribute)));
  if (attribute && !element.hasAttribute(attribute)) return;
  return action(element);
};