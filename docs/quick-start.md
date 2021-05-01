# Quick Start

## Table of Contents

- [Quick Start](#quick-start)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
    - [CDN](#cdn)
    - [NPM](#npm)
  - [Creting a Component](#creting-a-component)
  - [Adding Styles](#adding-styles)
  - [Adding eventListeners](#adding-eventlisteners)
  - [Inserting Data](#inserting-data)
  - [Inserting Text](#inserting-text)
  - [__Documentation__](#documentation)



## Installation

### CDN

```html
<script src="https://unpkg.com/acom"></script>
```

or

```html
<script src="https://cdn.jsdelivr.net/npm/acom"></script>
```

### NPM

`$ npm i acom --save`


## Creting a Component

Acom uses components to build user interfaces. The components are then inserted into the DOM. To create a component, you use `acom`, the default export of the framework. In this guide, we are going to use `$create`, the alias of `acom`. In this guide, we are going to create a "Hello World" app. Refer to [Hello World](). Our program will be used to say hellow to the world.

We are going to use a CDN for our app. Add a CDN to the head section of the HTML file as illustrated in [Installation](#installation). Then add the following markup to the body of the HTML:

```html
<main id="hello-world"></main>
```

Create a script tag and add the following code. Put the script tag in the body after the element (`main`).

```js
(async () => {
  const markup = /* html */`
    <main>
      <button>Say Hello</button>
    </main>
  `;

  const options = { markup };
  const HelloWorld = await $create(options);
  HelloWorld.replace("#hello-world");
})();
```

Open the HTML file in the browser. You should be able to see a button with the text "Say Hello" in the browser. What we have done is create a component using the markup in `markup`. We created the and added the markup for our component and assigned it to `markup`. Then we put the markup in an object called `options`. The options was then passed to the function `$create`. The function `$create` returned the component `HelloWorld`. When we called the method `replace` of `HelloWorld`, the element created from our markup was inserted into the DOM.

## Adding Styles

At this point, our app looks quite basic. Let us add some styling to make it look better. Change the JavaScript code as follows:

```js
// ...

  const styles = `
    :scope {
      margin: 0;
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
    }

    #say-hello {
      padding: 1rem;
      font-size: 2rem;
      font-weight: bold;
      color: #0cffff;
      background-color: #7f3fff;
      cursor: pointer;
    }
  `;

  const options = { markup, styles };

  // ...
```

Refresh the page. You should see the CSS in `styles` has been applied to the element.

## Adding eventListeners

We have created our component and added styles, but our app can not say "Hello World" yet. Let us add an `click` event to the element to make this possible. Add the following code to the script.

```js
// ...

const eventListeners = {
  "#say-hello": [
    {
      type: "click",
      listener: function (event) {
        alert("Hello World!");
      }
    }
  ]
};

const options = { markup, styles, eventListeners };

// ...
```

Refresh the page and click the button. Upon clicking the button, an alert must pop up with the message "Hellow World".

## Inserting Data

Let us now add a title attribute to our button programatically. To do say, we are going the create data, then insert is into the DOM. Add the following code to JavaScript.

```js
const markup = /* html */`
  <main title="@data.title">
    <button>Say Hello</button>
  </main>
`;

// ...

const data = { title: "Say Hellow" };
const utils = { data };
const options = { markup, styles, eventListeners, utils };

// ...
```

Refresh the page and hover over the button. You will see the tooltip "Say Hellow". The value `@data.title` refers to `options.utils.data.title`.

## Inserting Text

Let us insert the text on the button programatically. Make the following changes to the JavaScript code:

```js
const markup = /* html */`
  <main title="@data.title">
    <button>
      <span acom-text="buttonText"></span>
    </button>
  </main>
`;

// ...

const texts = { buttonText: "Say Hellow" };
const utils = { data, texts };
const options = { markup, styles, eventListeners, utils };

// ...
```

Refresh the page. You should see the same button as before. In the attribute `acom-text`, we put the value `buttonText`. The value refers to `options.utils.texts.buttonText`;

## __Documentation__

[Documentation](./documentation/home.md).
