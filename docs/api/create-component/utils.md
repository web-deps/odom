# Utils

**Table of Contents**

- [Utils](#utils)
  - [Introduction](#introduction)
  - [Generic Utilities](#generic-utilities)
    - [Description](#description)
    - [Data Selectors](#data-selectors)
      - [Example](#example)
  - [Specific Utilities](#specific-utilities)
    - [Description](#description-1)
    - [Usage](#usage)
    - [Example](#example-1)

## Introduction

A property of [`options`](./create-component.md#options). It contains data and assets used to build a component.

```javascript
{
  data: Object,
  methods: Object,
  components: Object,
  nodes: Object,
  markups: Object,
  texts: Object
}
```

The utilities in the collection are divided into two categories, generic and specific.

## Generic Utilities

### Description

Generic utilities are used for general purposes. The following are the items in this category:

1. `data`: An object containing data of any type.
2. `methods`: An object containing functions.

### Data Selectors

Generic utilities are accessed using any markup attribute via data selectors. Data selectors are a way of accessing generic utilities using a special syntax in attribute values. To access `data` or `methods` use the name of the utility and prefix it with the symbol `@`. Then you use the dot notation to access nested properties.

#### Example

Let us set the title of an element using `data`.

HTML:

```html
<span title="@data.title"></span>
```

JS:

```javascript
const data = { title: "Hello" };
const utils = { data };
// ...
const options = { ..., utils };
// ...
```

The title attribute of `<span>` will be updated to `Hello`.

> Note: <br />
> All generic data is converted to `string` for all nodes except target nodes. If the target element has ordinary attributes, the attributes will be converted to props as they are in the utility collections.

## Specific Utilities

### Description

Specific utilities are used for inserting content into the DOM. The items in this category are:

1. `components`: An object of components.
2. `nodes`: An object of DOM nodes.
3. `markups`: An object of markup text (HTML, XML, etc).
4. `texts`: An object of strings.

### Usage

_Attribute Names_

Specific utilities are used with specific attributes. All attribute names are prefixed with `odom-`. The table below shows specific utilities and corresponding attribute names.

| Utility      | Attribute Name |
| ------------ | -------------- |
| `components` | `odom-src`     |
| `nodes`      | `odom-node`    |
| `markups`    | `odom-markup`  |
| `texts`      | `odom-text`    |

_Attribute Values_

Attribute values are simple, just set the attribute value to the name of the item as it is in the collection. Odom will look up the item in the utility collection corresponding to the attribute value.

### Example

Let us insert a component `footer` into the markup. For this, we are going to use the attribute `odom-src`. The value will be the name of our component.

HTML:

```html
<div odom-src="footer">
```

JS:

```javascript
const footer = await importComponent("/src/components/footer.htm");
const components = { footer };
const utils = { components };

// ...

const options = { ..., utils };

// ...
```

The component `footer` will be inserted into the DOM by replacing `<div>`. If `<div>` has extra attributes that are not special, they will be considered as props and will be used to instantiate the component.
