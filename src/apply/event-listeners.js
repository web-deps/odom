export const eventListeners = async function (map) {
  const run = async () => {
  	const selectors = Object.keys(map);
    await Promise.all(selectors.map(selector => forEachSelector(selector)));
  };

  const forEachSelector = async (selector) => {
  	const events = map[selector];
    await Promise.all(events.map(event => forEachEvent(event, selector)));
  };

  const forEachEvent = async (event, selector) => {
  	const eventListener = async (event) => {
  		if (!event.target.matches(selector)) return;
  		await listener(event, this);
  	};
  	
    const { type, listener, useCapture, wantsUntrusted, options } = event;

    if (useCapture === undefined) this.scope.addEventListener(type, eventListener, options);
    else this.scope.addEventListener(type, eventListener, useCapture, wantsUntrusted);
  };

  await run();
};