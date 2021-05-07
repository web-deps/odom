import { createComponent } from "/src/main.js";


const eventListeners = async () => {
  const markup = /* html */`<button>Click</button>`;

  const _eventListeners = {
    "button": [{
      type: "click",
      listener: () => alert("Passed")
    }] 
  };

  const options = { markup, eventListeners: _eventListeners };
  const EventListeners = await createComponent(options);
  return EventListeners;
};


export default eventListeners;