export const getSlots = async children => {
  const slots = {};

  for (const child of children) {
    const name = child.getAttribute("name");

    if (name) {
      if (name in slots) {
        if (slots[name] instanceof Array) slots[name].push(child);
        else slots[name] = [child];
      } else slots[name] = child;
    };
  };

  return slots;
};