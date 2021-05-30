# Apply

- [Apply](#apply)
  - [Structure](#structure)
  - [`custom`](#custom)
    - [Syntax](#syntax)
    - [Parameters](#parameters)
    - [Return Value](#return-value)
    - [`action`](#action)
      - [Syntax](#syntax-1)
      - [Parameters](#parameters-1)
      - [Return Value](#return-value-1)
    - [Example](#example)
  - [`eventListeners`](#eventlisteners)
    - [Syntax](#syntax-2)
    - [Parameters](#parameters-2)
    - [Return Value](#return-value-2)
    - [Example](#example-1)
    - [Event Delegation](#event-delegation)
  - [`inlineStyles`](#inlinestyles)
    - [Syntax](#syntax-3)
    - [Parameters](#parameters-3)
    - [Return Value](#return-value-3)
    - [Example](#example-2)
    - [Vendor Prefixes](#vendor-prefixes)
  - [`mutations`](#mutations)
    - [Description](#description)
    - [Syntax](#syntax-4)
    - [Parameters](#parameters-4)
    - [Return Value](#return-value-4)
    - [`map`](#map)
      - [Structure](#structure-1)
      - [Properties](#properties)
  - [`run`](#run)
    - [Syntax](#syntax-5)
    - [Parameters](#parameters-5)
    - [Return Value](#return-value-5)
    - [`options`](#options)
      - [Structure](#structure-2)
      - [Properties](#properties-1)
  - [`styles`](#styles)
    - [Syntax](#syntax-6)
    - [Parameters](#parameters-6)
    - [Return Value](#return-value-6)

Styles, event listeners and more are applied to a component via `apply` a property of [`Component`](component.md). This is one of the functions performed by [`acom`](../exports.md#acom). Let us take a look at the structure and functionality of `apply`.

## Structure

```js
{
  custom: Function,
  eventListeners: Function,
  inlineStyles: Function,
  mutations: Function,
  run: Function,
  styles: Function
}
```

## `custom`

Used for selecting elements and performing actions on them. Through `custom`, you can map CSS selectors to data, then perform actions on each element matching the selector using the mapped data.

### Syntax

```js
custom(map, action)
```

### Parameters

- `map`:
  - Type: `Object`
  - Required: Yes
  - Usage: Maps CSS selectors to data. All the properties are CSS selectors. Each value can be of any kind.
- `action`:
  - Type: `Function`
  - Required: Yes
  - Usage: Manipulates elements according to the mapped data.
  - Reference: [`action`](#action)

### Return Value

A promise that resolves to `undefined`.

### `action`

A function that runs processes using selected elements and mapped data. It is called for each element selected.

#### Syntax

```js
action(element, data)
```

#### Parameters

- `element`:
  - Type: `Element`
  - Required: Yes.
  - Usage: It is the element on which an action is applied.
- `data`:
  - Type: `any`
  - Required: Yes
  - Usage: The data that is specific to the element on which an action is applied.

#### Return Value

A promise that resolves to `undefined`.

### Example

Let us look at how we can use `custom` by applying data attributes to elements.

```js
// ...

const Demo = await createComponent(options);

const applyDataAttributes = async (element, attributes) => {
  for (const name in attributes) element.dataset[name] = attributes[name];
};

const dataAttributes = {
  ":scope": {
    demo: "Demo attribute"
  }
};

await Demo.apply.custom(dataAttributes, applyDataAttributes);

// ...
```

We used a function `applyDataAttributes` that applies data attributes to elements. We mapped the selector `:scope` to an object containing a data attribute name and value. We used the map and the function set the data attribute `demo` to `Demo attribute` on the root element of the component.

## `eventListeners`

Used to attach event listeners to a component.

### Syntax

```js
eventListeners(map)
```

### Parameters

- `map`:
  - Type: `Object`
  - Required: Yes
  - Usage: Maps CSS selectors to event options.

### Return Value

No return value.

### Example

In this example, we are going to apply a click event listener to the root element of a component.

```js
// ...

const Demo = await createComponent(options);

const eventListerners = {
  ":scope": [
    {
      type: "click",
      listener: (event, component) => {
        alert("Clicked");
      }
    }
  ]
};

await Demo.apply.eventListeners(eventListeners);

// ..
```

In `eventListeners`, mapped the selector `:scope` to the event options. In the options, we specified the type of event as `click`. The listener was specified via `listener`. The listener took two paramers, `event` and `component`. The event object is referenced by `event` and component refers to `Demo`.

### Event Delegation

Acom uses event delegation. All listener are attached to [`Component.scope`](../component/component.md#scope). So, `Event.currentTarget` refers to `Component.scope`.

## `inlineStyles`

This is used to apply inline styles to a component.

### Syntax

```js
inlineStyles(map)
```

### Parameters

- `map`:
  - Type: `Object`
  - Required: Yes
  - Usage: Contains the inline styles mapped to CSS selectors.

### Return Value

A promise that resolves to `undefined`.

### Example

Let look at how we can apply inline styles to a component.

```js
// ...

const Demo = await createComponent(options);

const inlineStyles = {
  ":scope": {
    "width": "100vw",
    "height": "100vh",
    "background-color": "green"
  }
};

await Demo.apply.inlineStyles(inlineStyles);

// ...
```

Each property of `inlineStyles` is a CSS selector for elements we want to apply styles to. Each value is an object that maps CSS properties to CSS values.

### Vendor Prefixes

All styles applied via [`inlineStyles`](#inlinestyles) are vender-prefixed. Both the properties and values are prefixed only when needed. The need for prefixing is detected at runtime. So, if no prefixing is needed, it is not applied.

## `mutations`

### Description

Applying multiple changes to the DOM is usually costly. Acom provides performant ways to apply mutations to components. The method `mutations` is used to apply mutations to components.

### Syntax

```js
mutations(map)
```

### Parameters

- `map`:
  - Type: `Object`
  - Required: Yes
  - Usage: Maps CSS selectors to options for mutating.
  - Reference: [map](#map-1)

### Return Value

A promise that resolves to `undefined`.

### `map`

An object that maps CSS selectors to options for mutating. Each property in `map` is a CSS selector for elements you want to apply mutations to. The corresponding values are options for mutating the selected elements.

#### Structure

The options object has the following structure:

```js
{
  mutator: Function,
  preserve: Object,
  type: string
}
```

#### Properties

`mutator`

A function that applies mutations to elements in a component.

**Syntax**:

```js
mutator(subject)
```

**Parameters**:

- `subject`:
  - Type: `HTMLElement`
  - Required: Yes.
  - Usage: It is the element to which mutations are applied.

**Return Value**:

A promise that resolves to an `HTMLElement`. The element is the mutated version of `subject`. This is the value that ends up in the DOM.

`preserve`

An object used to specify how the element to be mutated should be removed from the DOM. It specifies what parts of that element should be kept when the element has been removed. It is used when `type` is set to `"major"`. It has the following structure:

```js
{
  observers: Boolean,
  subtree: Boolean,
  documentSubtree: Boolean
}
```

**Properties**:

- `observers`: Specifies whether or not observers like event listeners should be kept.
- `subtree`: Specifies whether the subtree of the element upon which the mutation is applied should be kept.
- `documentSubtree`: Specifies whether or not the subtree in the DOM should be preserved. When set to false, the user can not see the subtree while the mutation is taking place. The default value is `true`.

`type`

Indicates the type of mutation that is to be carried out. It can be set to either `"major"` or `"minor"`. Whether a mutation is major or minor is determined by the time complexity of the mutation operations, excluding the rendering process.

A mutation operation that takes a short period of time (typically less than 16.67ms) to be performed is considered to be a minor mutation. Acom uses element cloning for major mutations

A mutation operation that takes long (typically takes more than 16.67ms) to be performed is considered to be a major mutation. Acom uses `requestAnimationFrame` (thus the 16.67ms) for minor mutions.

## `run`

Applies `attributes`, `classes`, `inlineStyles`, `styles`, `eventListeners` and `mutations` to `scope`.

### Syntax

```js
run(options)
```

### Parameters

- `param`:
  - Type: `Object`
  - Required: Yes.
  - Usage: Contains all utilites that are applied to a component.
  - Reference: [`options`](#options).

### Return Value

A promise that resolves to `undefined`.

### `options`

#### Structure

```js
{
  styles: String,
  eventListeners: Object,
  stylesmiddleware: Object
}
```

#### Properties

`styles`

A `String` that contains CSS or any language that can be converted to CSS via [`middleware`](../create-component/middleware.md#styles).

`eventListeners`

Event listeners for a component. Refer to [`eventListeners`](../create-component/create-component.md#eventListeners) for more information.

`stylesMiddleware`

Middleware used to process `styles`. Refer to [`styles`](../create-component/create-component.md#styles) for more information.

## `styles`

This is used to apply styling to a component.

### Syntax

```js
styles(styles [, middleware])
```

### Parameters

- `styles`:

  - Type: `String`
  - Required: Yes
  - Usage: Contains styles to be applied on a component. It can CSS or any code that can be transformed to CSS via `middleware`.

- `middleware`:
  - Type: `Object`
  - Required: No
  - Usage: Contains functions used to transform `styles`. Refer to [`styles`](../create-component/middleware.md) for more information.

### Return Value

A promise that resolves to `undefined`.
