import { createComponent } from "/src/main.js";


const eventListeners = async () => {
  const markup = /* html */`<button>Click</button>`;
  let message = "Passed";

  const _eventListeners = {
    "button": [{
      type: "click",
      listener: () => {
        console.info(message);
      }
    }] 
  };

  const options = { markup, eventListeners: _eventListeners };
  const EventListeners = await createComponent(options);
  EventListeners.scope.click();
  return EventListeners;
};


export default eventListeners;