export const importModule = async (script, name) => {
  if (typeof script !== "string") {
    name = script.getAttribute("name");
    script = script.textContent;
  };
  
  const b64moduleData = "data:text/javascript;base64," + btoa(script);
  const module = await import(b64moduleData);
  return name ? module[name] : Object.values(module)[0];
};