export const select = (scope, selector, selectAll = true) => {
  selector = selector.trim();

  return (
    selector === ":scope" ? selectScope(scope, selectAll)
    : selector.startsWith(":scope.") ? scopeClass(scope, selector, selectAll)
    : selector.includes(",") ? list(scope, selector)
    : selectAll ? Array.from(scope.querySelectorAll(selector))
    : scope.querySelector(selector)
  );
};

const selectScope = (scope, selectAll) => selectAll ? [scope] : scope;

const list = (scope, selector) => {
  const selectors = selector.split(",");
  const elements = selectors.map(selector => select(scope, selector));
  return elements.flat();
};

const scopeClass = (scope, selector, selectAll) => {
  const [match, classSelector] = selector.match(/^:scope(\.[-\w]+)/);
  const newSelector = selector.replace(match, ":scope");
  if (!scope.matches(classSelector)) return selectAll ? [] : null;
  return select(scope, newSelector, selectAll);
};