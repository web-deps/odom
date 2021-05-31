export const createModule = async (text) => {
  const b64moduleData = "data:text/javascript;base64," + btoa(text);
  return import(b64moduleData);
};
