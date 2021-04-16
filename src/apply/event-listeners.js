export const eventListeners = async function (param) {
  const run = async () => {
    await this.apply.custom(param, forEachElement);
  };

  const forEachElement = async (element, evs) => {
    await Promise.all(evs.map(event => forEachEvent(element, event)));
  };

  const forEachEvent = async (element, event) => {
    const { type, listener, useCapture, wantsUntrusted, options } = event;
    const eventListener = e => listener(e, this);

    if (useCapture === undefined) element.addEventListener(type, eventListener, options);
    else element.addEventListener(type, eventListener, useCapture, wantsUntrusted);
  };

  await run();
};