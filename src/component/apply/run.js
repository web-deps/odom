export const run = async function ({ styles, stylesMiddleware, attributes, classes, ...rest }) {
  attributes && await this.apply.attributes(attributes);
  classes && await this.apply.classes(classes);
  const processes = [];
  styles && processes.push(this.apply.styles(styles, stylesMiddleware));
  
  for (const property in rest) {
    const value = rest[property];
    value && processes.push(this.apply[property](value));
  };
  
  await Promise.all(processes);
};