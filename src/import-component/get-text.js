export const getText = async (text, regex) => {
  let matchedText;

  text.value = text.value.replace(regex, (match, group) => {
    matchedText = typeof group === "string" ? group : match;
    return "";
  });

  return matchedText;
};
