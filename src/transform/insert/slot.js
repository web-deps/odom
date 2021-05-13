export const insertSlot = async (element, slot) => {
  if (!slot) return;

  if (slot instanceof Array) {
    const slotFragment = document.createDocumentFragment();
    for (const oneSlot of slot) slotFragment.appendChild(oneSlot);
    if (slotFragment.firstChild) slot = slotFragment;
  };

  element.replaceWith(slot);
  return slot;
};