# Quick Start

__Table of Contents__

- [Quick Start](#quick-start)
  - [Installation](#installation)
    - [CDN](#cdn)
    - [NPM](#npm)
  - [Creating a Simple App](#creating-a-simple-app)
    - [Introduction](#introduction)
    - [Creating a Component](#creating-a-component)
    - [Adding Styles](#adding-styles)
    - [Adding Event Listeners](#adding-event-listeners)
    - [Inserting Data](#inserting-data)
  - [Conditionals](#conditionals)
  - [Collections](#collections)
  - [Documentation](#documentation)

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

`$ npm i --save acom`

## Creating a Simple App

### Introduction

In this section, we will learn some basic concepts of Acom by creating a simple "Hello World" app. Our app is going to have a single button at the center of the page. When the user clicks the button, an alert with the greeting "Hello World!" is going to pop up. We are going to use a CDN for our app. We will create the app using a single HTML file. The HTML file will have the following general structure:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hello World</title>
  </head>
  <body>
    <main id="hello-world"></main>

    <script src="https://cdn.jsdelivr.net/npm/acom"></script>

    <script>
      // ...
    </script>
  </body>
<html>
```

Create and HTML file and put the markup in the file. In this guide, we are going to focus on the contents of the `body` elements. The `body` contains a `main` element with the `id` attribute set to `hello-world`. We are going to replace `main` with a component we are going to create shortly. The `main` element is followed by a `script` element with the `src` attribute set to a CDN as described in [Installation](#installation). The last element is also a `script` element with nothing but a comment in it. In the following sections, we are going to modify only the contents of the this `script` element.

### Creating a Component

Let us create a component and insert it into the DOM. Replace the comment in the `script` with the following code:

```js
(async () => {
  const markup = `
    <main>
      <button>Say Hello</button>
    </main>
  `;

  const options = { markup };
  const HelloWorld = await Acom.createComponent(options);
  HelloWorld.render("#hello-world");
})();
```

Open the HTML file in the browser. You should be able to see a button with the text "Say Hello" on the page. Let us look at each step we took to make this happen:

1. Create markup: First, we created HTML markup and put in the variable `markup`.
2. Create options: The second thing we did was create an object and added our markup in it. We then put the object in the variable `options`.
3. Create component: We created a component (`HelloWorld`) using `Acom.createComponent`. The `options` object we created earlier was used as the only parameter to `Acom.createComponent`. `Acom.createComponent` is asynchronous. That is why we used the keyword `await` when calling it. Also notice that our entire code is wrapped in an asynchronous IIFE (indicated by the `async` keyword). This was done to enable us to use the `await` keyword in the code inside it.
4. Render component: Finally, we rendered our component to the DOM by calling `HelloWorld.render`. The parameter to `HelloWorld.render` was a CSS selector corresponding to the element (`main#hello-world`) we wished to replace with our component.

### Adding Styles

At this point, our app looks quite basic. Let us add some styling to make it look better. Replace the code in the `script` with the following:

```js
(async () => {
  const markup = `
    <main>
      <button>Say Hello</button>
    </main>
  `;

  // Beginning of added code
  const styles = `
    :scope {
      margin: 0;
      padding: 0;
      display: grid;
      place-items: center;
      height: 100vh;
    }

    button {
      padding: 0.5rem 1rem;
      font-size: 2rem;
      font-weight: bold;
      color: #0cffff;
      background-color: #7f3fff;
      cursor: pointer;
    }
  `;
  // End of added code

  const options = { markup, styles }; // Modified line
  const HelloWorld = await Acom.createComponent(options);
  HelloWorld.render("#hello-world");
})();
```

Refresh the page. You should see the CSS in `styles` has been applied to the element. Notice the use of the selector `:scope`. The selector is used to select the root element of our component, which in this case is `main`. All selectors in `styles` are scoped. This means that they apply to only elements in the component. So, event if there was another element in the `document` which matched the selector `button`, it could not have been selected.

### Adding Event Listeners

We have created our component and added styles, but our app can not say "Hello World" yet. Let us add a `click` event to the `button` element to make this possible. Update the code in the script as follows:

```js
(async () => {
  const markup = `
    <main>
      <button>Say Hello</button>
    </main>
  `;

  const styles = `
    :scope {
      margin: 0;
      padding: 0;
      display: grid;
      place-items: center;
      height: 100vh;
    }

    button {
      padding: 0.5rem 1rem;
      font-size: 2rem;
      font-weight: bold;
      color: #0cffff;
      background-color: #7f3fff;
      cursor: pointer;
    }
  `;

  // Beginning of added code
  const eventListeners = {
    "button": [
      {
        type: "click",
        listener: function (event) {
          alert("Hello World!");
        }
      }
    ]
  };
  // End of added code

  const options = { markup, styles, eventListeners }; // Modified line
  const HelloWorld = await Acom.createComponent(options);
  HelloWorld.render("#hello-world");
```

Refresh the page and click the button. Upon clicking the button, an alert must pop up with the message "Hellow World". The `eventListeners` object contains an array under the property `button`. The property `button` is a CSS selector for the element (`button`) we wanted to apply an event listener to. We can can put as many CSS selectors as we want in `eventListeners`. The array contains an object specifying the options for the event listener. The property `type` indicated what type of event we wished to listen to, which in our case was the click event. The property `listener` specified the listener we wanted to attach to the event. When the button was clicked, the listener show an alert message with the message "Hello World!". We can put as many event objects in the array for `button` as we wish to.

### Inserting Data

Let us add a title attribute to our button and set its value using Acom. Modify the code as follows:

```js
// Code before

const markup = `
  <main>
    <button title="@data.title">Say Hello</button> <!-- Modified line -->
  </main>
`;

// Code in-between

// Begining of added code
const data = { title: "Say Hello" };
const utils = { data };
// End of added code

const options = { markup, styles, eventListeners, utils }; // Modified line

// Code after
```

Refresh the page and hover over the button. You will see the tooltip "Say Hello". In the `markup`, we set the title attribute of the `button` to `@data.title`. We created an object called `data` and put the title of the `button` in the property `title`. We then put `data` in `utils`. And finally, we put `utils` in `options`. The value `@data.title` for the `title` attribute of the `buttton` refers to `options.utils.data.title`. For more details about working with data in Acom, refer to [Data](./data.md).

## Conditionals

Using Acom, you can add or remove elements to/from the DOM or change the visual status such as display and visibility of elements according to conditions you specify.

## Collections

Using Acom, you can create collections of elements from collections of data. You can use these elements in lists, tables and the like.

## Documentation

[Documentation](./home.md).
