export const applyClasses = async (element, classes) => {
  element.className += ` ${classes.join(" ")}`;
};