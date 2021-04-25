# Conditionals

__Table of Contents__

- [Conditionals](#conditionals)
  - [Conditions](#conditions)
    - [Data](#data)
    - [Media Query](#media-query)
      - [Structure](#structure)
      - [`query`](#query)
      - [`watch` (Optional)](#watch-optional)
  - [Placeholders](#placeholders)
  - [Loading](#loading)
    - [Defer](#defer)
      - [JSON Structure](#json-structure)
    - [Lazy](#lazy)
    - [JSON Structure](#json-structure-1)
    - [Example](#example)
  - [Visibility](#visibility)
    - [JSON Structure](#json-structure-2)
    - [Example](#example-1)
  - [Display](#display)
    - [JSON Structure](#json-structure-3)
    - [Example](#example-2)
  - [Presence](#presence)
    - [JSON Structure](#json-structure-4)
    - [Example](#example-3)

Conditionals are a way to load an element or change its visual status according to a particular condition. The loading of an element can be delayed. An element can also be loaded lazily. This gives the freedom to load content only when needed. You can also choose to display, remove or change visibility of an element if certain conditions are met. 

## Conditions

A conditions can be of any a data value or media query. Let us look at each one of these condition types and how they are applied to elements.

### Data

Data can be any value in [`props`](data.md#props), [`schem.utils.data`](data.md#data), the return value of any function of [`options.utils.methods`](data.md#methods) or a global value specified in [`$createpp`](data.md#app). A data selector is used to select a particular data. The selector is prefixed with `@`. The rest of the selector uses dot notation. Refer to [Data](data.md) for a detailed description of all of these types of data.

### Media Query

This is a media query specifying the media on which an action must be performed. It is a JSON object containing a number of attributes for specifying the behavior of the media query.

#### Structure

```json
{
  "query": String,
  "watch": Boolean
}
```

#### `query`

A String of a CSS media query. Any media query string is valid.

#### `watch` (Optional)

When set to true, the media changes are watched and if the media matches, the attached action is performed. Setting this value to false means the media query will be checked once and thus the action attached to it run once. The default value is `true`.

> Note: <br />
> You can put any number of conditions in the array, but there can be only one media query. All values used for `props` and `data`, and the value returned by `methods` must must be `boolean`.

## Placeholders

Conditional loading uses placeholders for certain conditionals. [Loading](#loading) uses placeholders to conditionally load elements. Placeholders are used to replace elements so that the element is added to the DOM only if the conditions allow this. A placeholder is a `<div>` element. The div has the attribute `acom-placeholder` which is set to the name of the element (if present) or `""`. You can use this attribute to locate the element. A placeholder takes the exact position the element has. When conditions allow for loading of an element, the placeholder is replaced with the element. 

## Loading

The loading conditional is used to load content if a particular condition has been met. To use this conditional, add the attribute `acom-loading` to an element and specify conditions that if met, the element will be loaded. The conditions are specified in the value of this attribute.

The attribute `acom-loading` takes either a string that specifies a type of loading, or a JSON string that specifies the type of loading and other options. The type can have the values `"defer"` and `"lazy"`. The JSON string has a different structure depending on the type of loading.

### Defer

You use `defer` to load content after a component has been added to the DOM. Use the value `defer` for `acom-loading` or use a JSON string as described in [Conditions](#conditions).

#### JSON Structure

```json
{
  "type": string,
  "time": number
}
```

`type`

Set to `"defer"`.

`time`

The time that must pass before the element can be loaded after a component has been added to the DOM. Measured in seconds. The default value is `0`.

### Lazy

This is used to lazy load an element. It uses the [`IntersectionObserver`](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)  API.

### JSON Structure

```json
{
  "type": string,
  "options": object
}
```

`type`

set to `"lazy"`.

`options`

Structure:

```json
{
  "root": string,
  "threshold": string,
  "rootMargin": number | array<number>
}
```

Refer to [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) for a detailed explaination of how these values work.

`root`

A CSS selector for the element used to check the intersection. The selector is used the same way it is used in `select`. If not set, the root is considered to be the viewport.

`rootMargin`

A string indicating the margin around the `root`. It takes values valid for [CSS margin](https://developer.mozilla.org/en-US/docs/Web/CSS/margin).

`threshold`

A number or array of numbers which specify the percentage of the element's visibility the element should be loaded. The default value is `0`;


### Example

```html
<div>
  <div acom-loading="defer" class="div-1"></div>
  <div acom-loading='{"type": "defer", "time": 3000}' class="div-2"></div>
  <div acom-loading='{"type": "lazy"}' class="div-3"></div>
</div>
```

The first div (`div.div-1`) will load immediately the component has been added to the DOM. The second div (`div.div-1`) will load 3 seconds after the component has been added to the DOM. The third div (`div.div-1`) will be added if it intersects with its `root`.

## Visibility

This is used to make an element visible if certain conditions are met. It uses the attribute `acom-visibility`.

### JSON Structure

```json
{
  "value": string | array<string>,
  "conditions": array<string>
}
```

`value`

Specifies what value of visibility the element should have in case the conditions are met. It can be a string or an array containing two strings. If it is a string, the visibility will be set to the value specified if the conditions are met. If it is an array, the visibility will be set to the first value of the array if the conditions are met, otherwise the visibility is set to the second value. The value for visibility can be any valid CSS value for visibility.

`conditions`

An array containing [conditions](#conditions).

### Example

In this example, the element will have its visibility set to `"visible"` if `options.utils.data.makeVisible` is true.

```html
<div acom-visibility='{"value": "visible", "conditions": ["@data.makeVisible"]}'></div>
```

## Display

This is used to display an element if certain conditions are met. It uses the attribute `acom-display`.

### JSON Structure

```json
{
  "value": string | array<string>,
  "conditions": array<string>
}
```

`value`

Specifies what value of display the element should have in case the conditions are met. It can be a string or an array containing two strings. If it is a string, the display will be set to the value specified if the conditions are met. If it is an array, the display will be set to the first value of the array if the conditions are met, otherwise the display is set to the second value. The value for display can be any valid CSS value for display.

`conditions`

An array containing [conditions](#conditions).

### Example

In this example, the element will have its display set to `"none"` if `options.utils.data.hide` is true.

```html
<div acom-display='{"value": "none", "conditions": ["@data.hide"]}'></div>
```


## Presence

This is used to add an element to the DOM if certain conditions are met. It uses the attribute `acom-presence`.

### JSON Structure

```json
{
  "action": string | array<string>,
  "conditions": array<string>
}
```

`action`

Specifies wheather the element should be removed or not in case the conditions are met. It can be set to either `"add"` or `"remove"`. If it is set to `"add"`, the element will be added to the DOM. If it is set to `"remove"`, the element will be removed.

`conditions`

An array containing [conditions](#conditions).

### Example

In this example, the element will be removed from the DOM if the width of the browser window is at least `"992px"`.

```html
<div acom-presence='{"action": "remove", "conditions": [{ "query": "(min-width: 992px)" }]}'></div>
```

> __Note:__ The value `"watch"` of the media query has no effect as the action is performed only once for [Presence](#presence).
