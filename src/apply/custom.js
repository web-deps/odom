export const custom = async function (map, action) {
  const run = async () => {
    const entries = Object.entries(map);
    await Promise.all(entries.map(entry => forEachEntry(entry)));
  };

  const forEachEntry = async ([selector, data]) => {
    const elements = await this.select(selector);
    await Promise.all(elements.map(element => forEachElement(element, data)));
  };

  const forEachElement = async (element, data) => {
    await action(element, data);
  };

  await run();
};