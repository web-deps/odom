export const createDynamicData = async (data) => {
  const update = (value) => value;
  const setValue = createValueSetter(data);

  for (const name in data) {
    const value = data[name];
    const includeUpdator = typeof value !== "object" || !("data" in value && "updates" in value);

    if (includeUpdator) {
      data[name] = {
        data: value,
        updates: [update]
      };
    }

    data[name].elements = [];
  }

  return new Proxy(data, {
    get(target, name) {
      if (!Reflect.has(target, name)) {
        if (name === "addElement") {
          const addElement = (dataName, elementData) => {
            const datum = Reflect.get(target, dataName);
            datum.elements.push(elementData);
          };

          return addElement;
        } else if (name === "setValueFromAttribute") {
          return setValue;
        }

        // console.error(`Could not find dynamic data with named "${name}".`);
        return undefined;
      }

      return target[name].data;
    },
    set(target, name, value) {
      if (!Reflect.has(target, name)) {
        return console.error(`Could not find data named "${name}".`);
      }

      if (!setValue(name, value)) return true;

      if (data[name].elements.length) {
        for (const {target, attributeName} of data[name].elements) {
          if (target.getAttribute(attributeName) === value) continue;
          if (target) target.setAttribute(attributeName, value);
        }
      }

      return true;
    }
  });
};

const createValueSetter = (target) => {
  return (name, value) => {
    if (target[name].data === value) return false;
    for (const update of target[name].updates) value = update(value);
    target[name].data = value;
    return true;
  };
};
