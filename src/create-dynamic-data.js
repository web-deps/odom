export const createDynamicData = (data) => {
	const update = value => value;
	
	for (const name in data) {
		const value = data[name];
		
		if (typeof value === "string") {
			data[name] = {
				data: value,
				update
			};
		} else data[name] = value;
	};

  data.elements = {};
	
	return new Proxy(data, {
		get(target, name) {
			if (!Reflect.has(target, name)) {
				console.error(`Could not find data with "${name}".`)
				return undefined;
			};
			
      if (name === "elements") return target.elements;
			return target[name].data;
		},
		set(target, name, value) {
			if (!Reflect.has(target, name)) {
				return console.error(`Could not find data with "${name}".`);
			};

      if (target[name].data === value) return true;
			target[name].data = target[name].update(value);

      if (`${name}` in data.elements) {
        for (const { target, attributeName } of data.elements[name]) {
          if (target) target.setAttribute(attributeName, value);
        };
      };

			return true;
		}
	});
};