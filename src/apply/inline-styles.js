export const applyInlineStyles = async function (styleEntries) {
  await this.apply.custorm(styleEntries, (element, styles) => {
    for (const property in styles) {
      let value = styles[property],
        propertyPriority = "";
      
      if (value.includes("!important")) {
        propertyPriority = "important";
        value = value.replace(/\s*important/, "");
      };
      
      element.style.setProperty(property, value, propertyPriority);
    };
  });
};