export const select = async (scope, selector, selectAll = true) => {
  selector = selector.trim();

  return (
    selector === ":scope" ? scope
    : selector.startsWith(":scope.") ? scopeClass(scope, selector, selectAll)
    : selector.includes(",") ? list(scope, selector)
    : selectAll ? Array.from(scope.querySelectorAll(selector))
    : scope.querySelector(selector)
  );
};

const list = async (scope, selector) => {
  const selectors = selector.split(",");
  const elements = await Promise.all(selectors.map(selector => select(scope, selector)));
  return elements.flat();
};

const scopeClass = (scope, selector, selectAll) => {
  const [match, classSelector] = selector.match(/^:scope(\.[-\w]+)/);
  const newSelector = selector.replace(match, ":scope");
  if (!scope.matches(classSelector)) return selectAll ? [] : null;
  return select(scope, newSelector, selectAll);
};