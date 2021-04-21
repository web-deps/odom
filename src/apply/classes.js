export const applyClasses = async function (classEntries) {
  await this.apply.custom(classEntries, (element, classes) => {
    element.className += ` ${classes.join(" ")}`;
  });
};