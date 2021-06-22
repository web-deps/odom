# `createComponent`

**Table of Contents**:

- [`createComponent`](#createcomponent)
  - [Introduction](#introduction)
  - [Syntax](#syntax)
  - [Parameters](#parameters)
  - [Return Value](#return-value)
  - [`options`](#options)
    - [Description](#description)
    - [Structure](#structure)
    - [`attributes`](#attributes)
      - [Description](#description-1)
      - [Example](#example)
    - [`classes`](#classes)
      - [Description](#description-2)
      - [Example](#example-1)
    - [`eventListeners`](#eventlisteners)
      - [Description](#description-3)
      - [Structure](#structure-1)
      - [Event Object Properties](#event-object-properties)
      - [Example](#example-2)
    - [`extension`](#extension)
    - [`id`](#id)
    - [`importType`](#importtype)
    - [`inlineStyles`](#inlinestyles)
      - [Description](#description-4)
      - [Structure](#structure-2)
      - [Example](#example-3)
    - [`markup`](#markup)
    - [`middleware`](#middleware)
    - [`mutations`](#mutations)
      - [`mutator`](#mutator)
      - [`preserve`](#preserve)
      - [`type`](#type)
    - [`onIDSet`](#onidset)
    - [`onScopeCreated`](#onscopecreated)
    - [`onAttributesSet`](#onattributesset)
    - [`onDynamicDataCreated`](#ondynamicdatacreated)
    - [`onTransformationCompleted`](#ontransformationcompleted)
    - [`onStylesAndEventsApplied`](#onstylesandeventsapplied)
    - [`props`](#props)
    - [`scope`](#scope)
    - [`src`](#src)
    - [`styles`](#styles)
    - [`utils`](#utils)

## Introduction

Components can be created using `createComponent`, a method of the [API](../api.md). The method creates and manipulates a component using [`options`](#options). The method has an alias `$create`, which is available on the API.

> **Note:** If you create a component directly using [`Component`](../component/component.md), you have to manipulate the component on your own using the [`API`](../component/component.md#api) of the component.

## Syntax

```js
createComponent(options, CustomComponent);
```

## Parameters

- `options`
  - Type: `Object`
  - Required: Yes
  - Usage: Contains utilities for manipulating a component
  - Reference: [`options`](#options)
- `CustomComponent`:
  - Type: `Function`
  - Required: No.
  - Usage: A class that extends [`Component`](../component/component.md). It is used to customize `Component`. When provided, `createComponent`uses it to create a component instance (as opposed to using `Component`).

## Return Value

A promise that resolves to an instance of [`Component`](#component).

## `options`

### Description

The options are utilities that are used to create and manipulate a component.

### Structure

```js
{
  attributes: Object,
  classes: Object,
  eventListeners: Object,
  extension: Object,
  id: string,
  importType: string,
  inlineStyles: Object,
  markup: string,
  middleware: Object,
  mutations: Object,
  onIDSet: Function,
  onScopeCreated: Function,
  onAttributesSet: Function,
  onDynamicDataCreated: Function,
  onTransformationCompleted: Function,
  onStylesAndEventsApplied: Function,
  props: Object,
  scope: Element,
  src: string,
  styles: string,
  utils: Object
}
```

`scope`

An `Element` used to set the [`scope`](../component/component.md#scope) of a component.

### `attributes`

#### Description

Used to set attributes for the elements of a component. It maps CSS selectors to key-value pairs of attributes. When using frameworks like Bootstrap, you end up with long class names and/or a lot of attributes. This can be used to make the markup more readable by reducing the amount of attributes set in markup.

#### Example

```js
{
  "#username": {
    name: "username",
    type: "text",
    class: "form-control"
  }
}
```

The property of the object `.username` selects an `input` element. The values for the property will be applied as attributes on the element. Assuming there are no other attributes on the element apart from the `id`, it will end with the following structure:

```html
<input type="text" id="username" name="username" class="form-control"/>
```

### `classes`

#### Description

Used to set classes on the elements of a component. It maps CSS selectors to arrays of classes. When using frameworks like Tailwind, you end with class names that are long. This can be used to reduce the value of the class attribute set in markup.

#### Example

```js
{
  "button": ["btn", "btn-secondary", "text-light"]
}
```

The object contains a CSS selector `button`. The selector selects a `button` element. The values in the array are added to the class name of the button. Assuming there are no other attributes on the element, it will end up with the following structure:

```html
<button class="btn btn-secondary text-light"></button>
```

### `eventListeners`

#### Description

Used to specify event listeners you want to apply to a component.

#### Structure

A map of CSS selectors and event types is used to specify the event listeners. Each property of the map is a CSS selector that is used to select elements in a component. Each value is an array of objects that are used to specify the type of event to listen to and other options. The objects have the following structure:

```js
{
  type: String,
  listener: Function,
  useCapture: Boolean,
  wantsUntrusted: Boolean,
  options: Object
}
```

The properties of the even objects are the [parameters](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#parameters) of [`addEventLister`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener). Let us look at what each one of the properties means.

#### Event Object Properties

Let us look at what each each one of the properties of the event objects.

`type`

- Type: `string`
- Required: Yes.
- Usage: Indicates the type of the event e.g `click`. This can be any valid JavaScript event type.

`listener`

The event listener. It is a function that is called every time an event to which it listens is fired.

**Syntax**:

```js
listener(event, component)
```

**Parameters**:

- `event`:
  - Type: `Event`
  - Required: Yes.
  - Usage: The event object.
- `component`:
  - Type: `Object`
  - Required: No.
  - Usage: It is the component on which `eventListeners` are applied.

**Return Value**:

A promise that resolves to `undefined`.

`useCapture`

- Type: `Boolean`
- Required: No.
- Usage: Indicates whether the event will be dispatched to the registered `listener` before being dispatched to any `EventTarget` beneath it in the DOM tree.

`wantsUntrusted`

- Type: `Boolean`
- Required: No.
- Usage: It is a Firefox (Gecko)-specific parameter. If true, the `listener` receives synthetic events dispatched by web content (the default is false for browser chrome and true for regular web pages).

`options`

**Structure**:

```js
{
  capture: Boolean,
  once: Boolean,
  passive: Boolean,
  mozSystemGroup: Boolean
}
```

**Properties**:

- `capture`:
  - Type: `Boolean`
  - Required: No.
  - Usage: Indicates that events of this type will be dispatched to the registered listener before being dispatched to any `EventTarget` beneath it in the DOM tree.
- `once`:
  - TYpe: `Boolean`
  - Required: No.
  - Usage: Indicates that the listener should be invoked at most once after being added. If true, the listener would be automatically removed when invoked.
- `passive`:
  - Type: `Boolean`
  - Required: No.
  - Usage: Indicates that the function specified by `listener` will never call `preventDefault()`. If a passive listener does call `preventDefault()`, the user agent will do nothing other than generate a console warning.
- `mozSystemGroup`:
  - Type: `Boolean`
  - Required: No.
  - Usage: Indicates whether the `listener` should be added to the system group. Available only in code running in XBL or in the chrome of the Firefox browser.

#### Example

Let us look at how we can apply event listeners to a component by applying a click event in a button element of a component.

```js
{
  "button": [
    {
      type: "click",
      listener: () => alert("Button clicked!")
    }
  ]
}
```

The button element in the component will be selected and the `listener` will be applied for the `click` event. When you click the button, an alert will pop up with the message "Button clicked!".

> **Note**: <br />
> Odom uses event delegation to apply event listeners. All event listeners are attached to [`scope`](#scope). So, `event.currentTarget` always refers to `scope`.

### `extension`

This is used when the `options` are being imported. It is an extension of the imported `options`.

### `id`

The ID of the component. For HTML components, `id` is set via the meta tag or [`options`](#options). For JS components, the id is set via `options`. If not provided, it is generated. The id must be unique in whole app.

### `importType`

The type of imported `options`. It have any of the following values:

- `"module"`: A JavaScript (ESM) module.
- `"json"`: A JSON file or string. The JSON is fetched and the response is read to completion as JSON.

The default value is `"module"`. If the imported module is a function, the function is invoked and the return value will be used as the imported `options`.

### `inlineStyles`

#### Description

The inline styles that you want to apply to a component. Unlike [`styles`](#styles), inline styles do not affect descendant components.

#### Structure

You specify the inline styles using a map of CSS selectors and the styles you want to apply. The properties of the map are CSS selectors and each value is an object containing key value pairs of CSS properties and values.

#### Example

Let us look at an example on how we can apply inline styles to elements in a component. We will use a map with the following structure:

```js
{
  ".main-content": {
    "width": 50vw;
    "min-height": 60vh;
  }
}
```

This will select the element with the class `main-content` and make its width half of the window width and its height 60% of the viewport height.

### `markup`

The markup used to construct the DOM of a component. The markup can be HTML, XML or any XML-compliant markup. For types of markup other than HTML, the root element of the markup must have the attribute `odom-ml` set to `xml`. The attribute is not required for HTML, but it is permitted, in which case you set it to `html`.

For all non-HTML markup, all elements are converted to the `div` element of HTML by default. To specify which HTML element should be used in place of an element, you set the attribute `html` to the HTML element tag name. All other attributes on the element will be preserved. An attribute `xml` is set to the XML tag name during conversion from XML to HTML.

**Example**:

The following code snippets illustrate how to convert XML to HTML.

XML

```xml
<container odom-ml="xml" html="main">
  <link html="a" href="/example">Visit</link>
</container>
```

HTML Equivalent

```html
<main odom-ml="xml" xml="container">
  <a href="/example" xml="link">Visit</button>
</main>
```

### `middleware`

Used to provide utilities that are used to manipulate [`markup`](#markup) and [`styles`](#styles). Refer to [middleware](./middleware.md) for more details.

### `mutations`

Used to apply mutations to a component. It is an object that maps CSS selectors to options for mutating. Each property in the object is a CSS selector for elements you want to apply mutations to. The corresponding values are options for mutating the selected elements. The options object has the following structure:

```js
{
  mutator: Function,
  preserve: Object,
  type: string
}
```

#### `mutator`

Used to apply mutations to elements. Refer to [`mutations`](../component/apply.md#mutations) for more details.

#### `preserve`

Indicates which parts of an element should be kept after cloning. Refer to [`mutations`](../component/apply.md#mutations) for more details.

#### `type`

Indicates the type of mutation you want to apply. Refer to [`mutations`](../component/apply.md#mutations) for more details.

### `onIDSet`

A lifecycle hook called after the ID of the component has been set. Refer to [Lifecycle hooks](./lifecycle-hooks.md) for more information.

### `onScopeCreated`

A lifecycle hook called after the element of the component has been created. Refer to [Lifecycle hooks](./lifecycle-hooks.md) for more information.

### `onAttributesSet`

A lifecycle hook called after the attributes of the component have been set. Refer to [Lifecycle hooks](./lifecycle-hooks.md) for more information.

### `onDynamicDataCreated`

A lifecycle hook called after the [dynamic data](../component/component.md#dynamicData) of the component have been created. Refer to [Lifecycle hooks](./lifecycle-hooks.md) for more information.

### `onTransformationCompleted`

A lifecycle hook called after [transformations](../component/transform.md) of the component have been completed. Refer to [Lifecycle hooks](./lifecycle-hooks.md) for more information.

### `onStylesAndEventsApplied`

A lifecycle hook called after the [styles](#styles) and [event listeners](#eventlisteners) of the component have been applied. Refer to [Lifecycle hooks](./lifecycle-hooks.md) for more information.

### `props`

Contains data that define a component. The data can be inserted into the DOM via the data selector `@props`. All data (except any value with the property named 'id') is going to be added to the properties of [`Component`](../component/component.md).

### `scope`

An `Element` used for the DOM of the component. It is required if `markup` is not included in `options`.

### `src`

You can import options via this property. You provide a URL of either an ES module or JSON file.

### `styles`

The styling for the component is specified via `styles`. This is `string` containing CSS or any code that can be converted to CSS. Note the following things about styles:

- All styles are scoped including animations. When using the short-hand property for animations (i.e. `animation`), always start with the animation name.
- Styles can leak into descendant components.
- The selector `:scope` is used to select the root element of the component.
- Only absolute URLs and root relative URLs (URLs that start with `/`) are guaranteed to work in `@import` rules.
- Imported styles are not scoped.
- If you have explicitly set an ID on a component, the following will happen:
  - The `styles` will be reused every time a new component is created.
  - The styles will be discarded if all the components that use them are removed from the DOM.

### `utils`

This is an object containing the utilities of a component. Refer to [Utils](./utils.md) for more.
