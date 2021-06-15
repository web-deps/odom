import { observeMutations } from "../../../dom/observe-mutations.js";

export const addStyleRemover = () => {
  observeMutations(
    document.body,
    (mutations) => {
      const promises = window.$app.styles.map((id, index) =>
        (async () => {
          if (document.body.querySelector(`[odom-scope="${id}"]`)) return;
          for (const mutation of mutations) removeStyles(id, index, mutation.removedNodes);
        })()
      );

      Promise.all(promises);
    },
    { childList: true, subtree: true }
  );
};

const removeStyles = async (id, index, removedNodes) => {
  let matchingNodesFound = false;

  removedNodes.forEach((node) => {
    if (node.getAttribute("odom-scope") === id) matchingNodesFound = true;
  });

  if (!matchingNodesFound) return;
  const styleElement = document.head.querySelector(`style[data-id="${id}"]`);
  if (!styleElement) return;
  styleElement.remove();
  window.$app.styles.splice(index, 1);
};
