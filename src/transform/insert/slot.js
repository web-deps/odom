export const insertSlot = async (element, slots) => {
  const slotName = element.getAttribute("acom-slot");
  if (!slotName) slotName = element.getAttribute("name");
  if (!slotName) element;
  let slot;
  
  for (const name of Object.keys(slots)) {
    if (name === slotName) {
      if (slots[name] instanceof Array) {
        const slotFragment = document.createDocumentFragment();
        for (const s of slot) slotFragment.appendChild(s);
        if (slotFragment.firstChild) slot = slotFragment;
      } else slot = slots[name];
    };
  };

  element.replaceWith(slot);
};