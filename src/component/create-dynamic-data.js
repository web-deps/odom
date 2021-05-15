export const createDynamicData = async (data) => {
	const update = value => value;
	
	for (const name in data) {
		const value = data[name];
		const includeUpdator = typeof value !== "object" || !("data" in value && "update" in value);
		
		if (includeUpdator) {
			data[name] = {
				data: value,
				update
			};
		};

		data[name].elements = [];
	};
	
	return new Proxy(data, {
		get(target, name) {
			if (!Reflect.has(target, name)) {
				if (name === "addElement") {
					const addElement = (dataName, elementData) => {
						const datum = Reflect.get(target, dataName);
						datum.elements.push(elementData);
					};

					return addElement;
				};

				console.error(`Could not find dynamic data with named "${name}".`)
				return undefined;
			};
			
			return target[name].data;
		},
		set(target, name, value) {
			if (!Reflect.has(target, name)) {
				return console.error(`Could not find data with "${name}".`);
			};

      if (target[name].data === value) return true;
			target[name].data = target[name].update(value);
			value = target[name].data;

      if (data[name].elements.length) {
        for (const { target, attributeName } of data[name].elements) {
          if (target) target.setAttribute(attributeName, value);
        };
      };

			return true;
		}
	});
};