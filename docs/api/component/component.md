# Component

__Table of Contents__

- [Component](#component)
  - [Introduction](#introduction)
  - [API](#api)
    - [Structure](#structure)
    - [`id`](#id)
    - [`uri`](#uri)
    - [`scope`](#scope)
    - [`apply`](#apply)
    - [`transform`](#transform)
    - [`select`](#select)
    - [`parseMarkup`](#parsemarkup)
      - [Syntax](#syntax)
      - [Parameters](#parameters)
      - [Return Value](#return-value)
    - [`run`](#run)
      - [Syntax](#syntax-1)
      - [Parameters](#parameters-1)
      - [Return Value](#return-value-1)
    - [`replace`](#replace)
      - [Syntax](#syntax-2)
      - [Parameters](#parameters-2)
      - [Return Value](#return-value-2)
    - [`createState`](#createstate)
      - [Syntax](#syntax-3)
      - [Parameters](#parameters-3)
      - [Return Value](#return-value-3)
    - [`render`](#render)
      - [Parameters](#parameters-4)
      - [Return Value](#return-value-4)


## Introduction

Acom uses components to build user interfaces. The components are instances of a class called __Component__. The class is one of the named exports of the framework. You can use the class directly. The default export [`acom`](exports.md#acom) is only a wrapper for the class. It executes certain processes according to attributes of a options (if provided) and returns the class. Using __Component__ directly means you will have to do the work done by __acom__ on your own. You can do this via the [API](#api).

## API

### Structure

```js
{
  id: String,
  uri: String,
  scope: Element | document,
  apply: Object,
  transform: Object,
  select: Function,
  parseMarkup: Function,
  insert: Function
}
```

### `id`

This is the id of the component. In HTML components, it is set via the `id` attribute of the `<meta>` tag. In JS components, it is set on the options. If you have not set this property, it is automatically set. The attribute is used for uniquely identifying `scope` of a component for styling and eventListeners purposes. It is also used for caching a component and `styles`.

> __Note__: If you have not set the `id` explicitly, it will not be used for caching purposes. Therefore, settiing `id` on a component guarantees caching. 

### `uri`

This property is set only on HTML components. It indicates the URI of the component (the HTML file). This is used for importing and caching components.

### `scope`

The `scope` of a component is the `Element` or `document` of that component. This is what is added to the DOM (if it is an `Element`). The `document` object of the `window` object is used as the scope of [`$createpp`](data.md#app), a global object (component) for sharing data within an app.

### `apply`

Styling and eventListeners are applied to a component using `apply`.

### `transform`

Transformations like inserting components into `scope` are done via `transform`. Check out [Transform](transform.md) for more details.

### `select`

This method selects elements of `scope`.

__Syntax__

```js
select(selector, selectAll)
```

__Parameters__

`selector`

A CSS selector string.

`selectAll`

A `Boolean` which determines whether all matching elements or only the first matching element must be returned from the function. The default value is `true`.

__Return Value__

A promise that resolves to an element if `selectAll` is set to `false` and an array of elements if `selectAll` is set to `true`. This includes all descendants including components and their descendants.

### `parseMarkup`

This method parses markup and assigns the resulting DOM to `scope`.

#### Syntax

```js
parseMarkup(markup [, middleware])
```

#### Parameters

`markup`

A `String` containing markup. For more, check out [`markup`]().

`middleware` (Optional)

An object containing middleware to handle transformation of `markup`.

Structure

```js
{
  parser: Function,
  converter: Function
}
```

`parser` (Optional)

Parses the markup.

Syntax

```js
parser(markup)
```

Parameters

`markup`

A markup `String`.

Return Value

A promise that resolves to an `Element`.

`converter` (Optional)

Converts from XML-based DOM to HTML DOM.

Syntax

```js
converter(element)
```

Parameters

`element`

An `Element` that is to be converted.

Return Value

A promise that resolves to an `HTMLElement` element.

#### Return Value

A promise that resolves to an `Element`.

### `run`

This method all the aforementioned transformations.

#### Syntax

```js
run(options)
```

#### Parameters

`options`

An `Object` containing data to use for transformations.

Structure

```js
{
  components: Object,
  elements: Object,
  markups: Object,
  texts: Object,
  slots: Object,
  data: Object,
  methods: Object
}
```

#### Return Value

A promise that resolves to an `Element` (`scope`).

### `replace`

This method inserts `scope` into the DOM or another `Element`.

#### Syntax

```js
replace(element)
```

#### Parameters

`element`

A CSS selector string or an `Element` `scope` is supposed to is supposed to use as a target element. If it is a string, the element matching the selector is going to be used as the target element.

#### Return Value

A promise that resolves to `undefined`.

### `createState`

This method is used to create either a state or a state machine for a component. This method uses third-party middleware to achieve this.

#### Syntax

```js
crateState(element)
```

#### Parameters

`element`

A CSS selector string or an `Element` `scope` is supposed to is supposed to use as a target element. If it is a string, the element matching the selector is going to be used as the target element.

#### Return Value

A promise that resolves to `undefined`.


### `render`

A function used for inserting a component into the DOM.

```js
render(target)
```

#### Parameters

`target`

A CSS selector for a target element or a target `Element`.

#### Return Value

A promise that resolves to `undefined`.
