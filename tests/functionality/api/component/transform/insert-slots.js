import { Component, createComponent } from "/src/main.js";
import logResult from "/tests/functionality/log-result.js";

const insertSlots = async () => {
  const markup = /* html */ `
    <div>
      <div odom-src="slotComponent">
        <div name="slot" class="slot"></div>
        <div name="slot-group" class="slot"></div>
        <div name="slot-group" class="slot"></div>
        <div name="slot-group" class="slot"></div>
      </div>
    </div>
  `;

  const components = { slotComponent };
  const InsertSlots = new Component();
  await InsertSlots.parseMarkup(markup);
  await InsertSlots.transform.insertComponents({ components });
  const slots = InsertSlots.select("#slot-component .slot");
  const passed = slots.length === 4;
  logResult(passed);

  return InsertSlots;
};

const slotComponent = async (props) => {
  const markup = /* html */ `
    <div id="slot-component">
      <div odom-slot="slot"></div>
      <div odom-slot="slot-group"></div>
    </div>
  `;

  const SlotComponent = new Component();
  await SlotComponent.parseMarkup(markup);
  await SlotComponent.transform.insertSlots(props.slots);
  return SlotComponent;
};

export default insertSlots;
