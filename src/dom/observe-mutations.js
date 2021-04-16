let MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

export const observeMutations = (element, action, options) => {
  const mutationObserver = new MutationObserver(action);
  mutationObserver.observe(element, options);
  return mutationObserver;
};