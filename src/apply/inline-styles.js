export const applyInlineStyles = async function (styleEntries) {
  await this.apply.custorm(styleEntries, (element, styles) => {
    let style = element.style;

    for (const property in styles) {
      const value = styles[property];

      if (!(property in element.style)) {
        [property, value] = addVendorPrefixes(property, value)[0];
      };

      style += `${property}:${value};`;
    };

    element.setAttribute("style", style);
  });
};

const addVendorPrefixes = (property, value) => {
  let prefixedProperty = "";
  const vendorPrefixes = ["-webkit-", "-moz-", "-o-", "-ms-"];

  for (const prefix of vendorPrefixes) {
    prefixedProperty = `${prefix}${property}`;

    if (prefixedProperty in element.style) {
      property = prefixedProperty;
      break;
    };
  };

  return [property, value];
};