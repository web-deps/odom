export const applyClasses = async function (classEntries) {
  await this.apply.custom(classEntries, (element, classes) => {
    for (const className of classList) element.classList.add(className);
  });
};