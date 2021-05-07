export const select = function (scope, selector, selectAll = true) {
  selector = selector.trim();

  return (
    selector === ":scope" ? scope
    : selector.startsWith(":scope.") ? scopeClass(scope, selector, selectAll)
    : selector.startsWith(":scope") ? startsWithScope(scope, selector)
    : selector.includes(",") ? multiple()
    : selectAll ? Array.from(this.querySelectorAll(selector))
    : this.querySelector(selector)
  );
};

const multiple = async (scope, selector) => {
  const selectors = selector.split(",");
  const elements = await Promise.all(selectors.map(selector => select(scope, selector)));
  return elements.flat();
};

const scopeClass = (scope, selector, selectAll) => {
  const [match, classSelector] = selector.match(/^:scope(\.[-\w]+)/);
  const newSelector = selector.replace(match, ":scope");
  if (!scope.matches(classSelector)) return null;
  return select(scope, newSelector, selectAll);
};

const startsWithScope = async (scope, selector) => {
  const rest = await select(selector.replace(/^:scope/, ""));
  return [scope, rest].flat();
};