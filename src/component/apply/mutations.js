export const applyMutations = async (element, { type, mutator, preserve }) => {
  if (type === "major") await major(element, mutator, preserve);
  else if (type === "minor") minor(element, mutator);
  else throw new Error(`Invalid mutation type "${type}"`);
};

const major = async (element, mutator, { subtree = true, observers = true, documentSubtree = true } = {}) => {
  let subject = null,
    placeholder = null;

  if (observers) {
    const clone = element.cloneNode(documentSubtree);
    element.replaceWith(clone);
    if (!subtree) element.innerHTML = "";
    subject = element;
    placeholder = clone;
  } else {
    subject = element.cloneNode(subtree);
    if (!documentSubtree) {
      placeholder = subject.cloneNode(false);
      element.replaceWith(placeholder);
    } else placeholder = element;
  }

  const mutant = await mutator(subject);
  placeholder.replaceWith(mutant);
};

const minor = (element, mutator) => {
  const mutate = () => mutator(element);
  requestAnimationFrame(mutate);
};
