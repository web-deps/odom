import { observeMutations } from "../../../dom/observe-mutations.js";

export const addStyleRemover = () => {
  observeMutations(
    document.body,
    (mutations) => {
      const promises = window.$app.styles.map((id, index) => removeStyles(id, index));
      Promise.all(promises);
    },
    { childList: true, subtree: true }
  );
};

const removeStyles = async (id, index) => {
  if (document.body.querySelector(`[acom-scope="${id}"]`)) return;
  const styleElement = document.head.querySelector(`[data-id="${id}"]`);
  if (!styleElement) return;
  styleElement.remove();
  window.$app.styles.splice(index, 1);
};
