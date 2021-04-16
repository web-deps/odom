export const applyAttributes = async function (attributeEntries) {
  await this.apply.custom(attributeEntries, (element, attributes) => {
    for (const name in attributes) element.setAttribute(attributes[name]);
  });
};