export const select = function (selector, selectAll = true) {
  selector = selector.trim();

  const run = async () => {
    return (
      selector === ":scope" ? scopeElement(selectAll)
      : selector.startsWith(":scope,") ? startsWithScope()
      : selector.includes(",") ? multiple()
      : selectAll ? Array.from(this.querySelectorAll(selector))
      : this.querySelector(selector)
    );
  };

  const scopeElement = () => {
    return selectAll ? [this] : this;
  };
  
  const multiple = async () => {
    const selectors = selector.split(",");
    const elements = await Promise.all(selectors.map(selector => select(selector)));
    return elements.flat();
  };

  const startsWithScope = async () => {
    const rest = await select(selector.replace(/^:scope/, ""));
    return [this, rest].flat();
  };

  return run();
};