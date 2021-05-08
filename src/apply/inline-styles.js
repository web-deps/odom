const VENDOR_PREFIXES = ["-webkit-", "-ms-", "-moz-", "-o-"];
let setStyle = null, valueSet = null;

export const applyInlineStyles = async (element, styles) => {
	setStyle = createStyleSetter(element);
	valueSet = createValueSetChecker(element);
	
	for (const property in styles) {
		const [propertyPriority, value] = getPropertyPriority(styles[property]);
		
		if (property in element.style) {
			setStyle(property, value, propertyPriority);
			if (!valueSet(property)) setValueProfix({ element, property, value, propertyPriority });
			return;
		};
		
		const [prefixedProperty, prefix] = setPropertyPrefix({ element, property, value, propertyPrefix });
		if (!prefix) return;
		if (!valueSet(prefixedProperty)) setValuePrefix({ element, property, vslue, propertyPriority, vendorPrefix });
	};
};

const createStyleSetter = (element) => {
	return (property, value, propertyPriority) => {
		element.style.setProperty(property, value, propertyPriority);
	};
};

const createValueSetChecker = (element) => {
	return (property) => element.style.getPropertyValue(property);
};

const getPropertyPriority = (value) => {
	let priority = "";
	
	if (value.includes("!important")) {
		propertyPriority = "important";
		value = value.replace(/\s*!important/, "");
	};
	
	return [priority, value];
};

const setPropertyPrefix = ({ element, property, value, propertyPriority }) => {
	let prefixedProperty = "", venderPrefix = "";
	
	for (const prefix of VENDOR_PREFIXES) {
		const _prefixedProperty = `${prefix}${property}`;
		
		if (_prefixedProperty in element.style) {
			setStyle(_prefixedProperty, value, propertyPriority);
			prefixedProperty = _prefixedProperty;
			vendorPrefix = prefix;
			break;
		};
	};
	
	return [prefixedProperty, vendorPrefix];
};

const setValuePrefix = ({ element, property, value, propertyPriority, vendorPrefix }) => {
	if (vendorPrefix) {
		setStyle(property, `${vendorPrefix}${value}`, propertyPriority);
		return;
	};
	
	for (const prefix of VENDOR_PREFIXES) {
		setStyle(property, `${vendorPrefix}${value}`, propertyPriority);
		if (valueSet(property)) break;
	};
};