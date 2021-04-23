# __Data__

__Table of Contents__

- [__Data__](#data)
  - [__Introduction__](#introduction)
  - [Data Access](#data-access)
    - [Data Selectors](#data-selectors)
  - [__Props__](#props)
    - [__Introduction__](#introduction-1)
    - [__Attributes__](#attributes)
      - [__Description__](#description)
      - [__Example__](#example)
    - [__Slots__](#slots)
      - [__Description__](#description-1)
      - [__Example__](#example-1)
  - [__Utils__](#utils)
    - [__Introduction__](#introduction-2)
    - [__Generic__](#generic)
      - [__Description__](#description-2)
      - [__Example__](#example-2)
    - [__Specific__](#specific)
      - [__Description__](#description-3)
      - [__Usage__](#usage)
      - [__Example__](#example-3)
  - [__App__](#app)
    - [__Description__](#description-4)
    - [__Example__](#example-4)


## __Introduction__

Acom provides a number of ways in which data can be shared within a component, across components and within an applications as a whole. Data can be shared using the following structures:

* Props: data transfered from one asset to another
* `utils`: an attribute of [`options`](options.md)
* `$createpp` (a window object).

## Data Access

Data can be accessed via attributes in markup. For some special attributes, data can be accessed by simply providing the property name of the data provided that the data is stored in the appropriate structure. User defined attributes and some special attributes can access data via data selectors.

### Data Selectors

A data selector is an attribute value that is used to access data stored in the data structures mentioned in [Introduction](#introduction). A data selector has the following structure:

`@structure.property`

The structure has three parts, these are:

* `@`: necessary to indicate that the attribute value is special
* `sturcture`: the data structure which can be any of these values;
  * [`props`](#props) - props of an component
  * [`data`](#data) - attribute of [`options.utils`](options.md#utils)
  * [`methods`](#methods) - attribute of [`options.utils`](options.md#utils)
  * [`$createpp`](#app) - a global object
  * `datum` - used in [Collections](collections.md)
* `property`: a property of the data structure (it can use dot notation to select nested values).

## __Props__

### __Introduction__

Data can be passed from a component to an asset or another component using `props`. Components, elements, markup and text can use `props` to provide variable instances of themselves before they are inserted into the DOM. Props are derived from attributes and slots.

### __Attributes__

#### __Description__

One way of using props is by using attributes on target elements (elements that assets and utilites are supposed to replace when inserted into the DOM). All attributes that are not special (i.e. not used for special purposes, e.g. attributes prefixed with `acom-`) are considered as props. Attributes are added to props as key-value pairs of attribute names and values. Props are used to instantiate assets and utilities.

#### __Example__

In this example we will import a component and instantiate it using props.

```html
<div acom-src="/src/components/header.htm" page="home"></div>
```

In this example, `page` will be considered as a prop of the component at `/src/components/header.htm`. The component will be imported and instantiated with an object (`props`) containing `page` as a prop. The object will be:

```javascript
{
  page: "home"
}
```

Inside the component being imported, the props can be accessed from the markup using data selectors. For example, the prop `page` can be accessed using `@props.page` in any of the attributes. For this to work, the props must be included in the options of the component (`home`).

### __Slots__

#### __Description__

Any child of the target element is considered to be a slot. All slots are added to props. If there is more than one child, all the children are collected in an array and put in `props.slots`. Slots are used only with components.

#### __Example__

In this example we will import a component and pass a slot into it throu props.

_Importing Module_

```html
<div acom-src="/src/components/button.htm">
  <div name="text"></div>
</div>
```

_Exporting Module_

Acom inserts slots on all elements in the component that have the same value for the attribute `acom-slot` as the name of the attribute `name` on a slot from the importing component.

```html
<div>
  <div acom-slot="text"></slot>
</div>
```

The `<div>` with the attribute `acom-slot` will be replaced with `props.slots.text`. If text was an array, the `<div>` would have be replaced with all the slots.

## __Utils__

### __Introduction__

A component can have a collection of local utilities called `utils`. The collection `utils` has the following structure:

```javascript
{
  data: Object,
  methods: Object,
  components: Object,
  elements: Object,
  markups: Object,
  texts: Object
}
```

The utilities in the collection are divided into two categories, generic and specific.

### __Generic__

#### __Description__

Generic utilities are used for general purposes. The following are the items in generic data:

1. `data`: An object containing data of any type.
2. `methods`: An object of function.

Generic utilities are accessed using any attribute name using data selectors.

#### __Example__

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
> All generic data is converted to `string` for all elements except target elements. If the target element has ordinary attributes, the attributes will be converted to props as they are in the utility collections.

### __Specific__

#### __Description__

Specific utilities are used for inserting content into the DOM. The items in this category are:

1. `components`: An object of components.
2. `elements`: An object of DOM elements (HTMLElement, SVGElement etc).
3. `markups`: An object of markup text (HTML, XML, etc).
4. `texts`: An object of strings.

#### __Usage__

_Attribute Names_

Specific utilities are used with specific attributes. All attribute names are prefixed with `acom-`. The table below shows specific utilities and corresponding attribute names.


Utility       | Attribute Name 
--------------|----------------
`components`  | `acom-src`     
`elements`    | `acom-node`  
`markups`     | `acom-markup`  
`texts`       | `acom-text`   

_Attribute Values_

Attribute values are simple, just put the name of the item as the value. Acom will look up the item in the utility collection corresponding to the attribute value.

#### __Example__

Let us insert a component `footer` into the markup. For this, we are going to use the attribute `acom-src`. The value will be the name of our component.

HTML:

```html
<div acom-src="footer">
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

## __App__

### __Description__

To share data within a web app as a whole, Acom uses the global object `$createpp`. You can explicitly add this object to the window object. If you have not added it, Acom will add it automatically when needed. Through `$createpp` you can share any kind of data globally within your app. You can make the object an instance of [`Component`](component/component.md). The window object `document` is used as `scope` for the component. This means that you can use some of the methods of the API such as [`select`](component/component.md#select) to select elements in the whole document (DOM). You create the component using [`createApp`](component/component.md#createapp).

### __Example__

In our app, we will create the component and store the approximate time at which our app was started in `$createpp`.

```javascript
// ...

const props = { startTime: Date.now() };
const $createpp = await createApp(props);
```

Any data that you want to share via `$createpp` has to be put in `props`. All `props` will be properties of `$createpp`. So, we can access `startTime` using `$createpp.startTime`.

> __Note:__ If you have not explicitly created `$createpp` as a component, Acom will use an object literal instead.