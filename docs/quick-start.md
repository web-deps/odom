# Quick Start

**Table of Contents**

- [Quick Start](#quick-start)
  - [Installation](#installation)
    - [CDN](#cdn)
    - [NPM](#npm)
  - [Importing](#importing)
  - [Creating a Simple App](#creating-a-simple-app)
    - [Introduction](#introduction)
    - [Creating the Component](#creating-the-component)
    - [Adding Styles](#adding-styles)
    - [Adding Event Listeners](#adding-event-listeners)
    - [Inserting Data](#inserting-data)
  - [Conditionals](#conditionals)
    - [HTML File Contents](#html-file-contents)
    - [Markup](#markup)
    - [Styles](#styles)
    - [Testing](#testing)
      - [Defer](#defer)
      - [Presence](#presence)
      - [Lazy](#lazy)
  - [Collections](#collections)
    - [File Content Structure](#file-content-structure)
    - [Markup](#markup-1)
    - [Styles](#styles-1)
    - [Users](#users)
    - [Viewing the Collection](#viewing-the-collection)
  - [Documentation](#documentation)

## Installation

### CDN

```html
<script src="https://cdn.jsdelivr.net/npm/odom"></script>
```

or

```html
<script src="https://unpkg.com/odom"></script>
```

### NPM

`$ npm i --save odom`

## Importing

```js
import { createComponent } from "odom";
```

## Creating a Simple App

### Introduction

In this section, we will learn some basic concepts of Odom by creating a simple "Hello World" app. Our app is going to have a single button at the center of the page. When the user clicks the button, an alert with the greeting "Hello World" pops up. We are going to use a [CDN](#cdn) for our app. We will create the app using a single HTML file. The HTML file will have the following general structure:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hello World</title>
  </head>
  <body>
    <div id="hello-world"></div>

    <script src="https://cdn.jsdelivr.net/npm/odom"></script>

    <script>
      // ...
    </script>
  </body>
<html>
```

Create an HTML file, put the markup in the file and save. We are going to focus on the contents of the `body` element. The `body` contains a `div` element with the `id` attribute set to `hello-world`. We are going to replace `div` with a component we are going to create shortly. The `div` element is followed by a `script` element with the `src` attribute set to a CDN as illustrated in [CDN](#cdn). The last element is also a `script` element with nothing but a comment in it. In the following sections, we are going to modify only the contents of the this `script` element.

### Creating the Component

Let us create a component and insert it into the DOM. Replace the comment in the `script` with the following code:

```js
(async () => {
  const markup = `
    <main>
      <button>Say Hello</button>
    </main>
  `;

  const options = { markup };
  const HelloWorld = await odom.createComponent(options);
  HelloWorld.render("#hello-world");
})();
```

Save and open the HTML file in the browser. You should be able to see a button with the text "Say Hello" on the page. Let us look at each step we took to make this happen:

1. **Create Markup**: First, we created HTML markup in a string and assigned it to the variable `markup`.
2. **Create Options**: The second thing we did was create an object (`options`) and added our markup to it.
3. **Create Component**: We created a component (`HelloWorld`) using `odom.createComponent`. The `options` object we created earlier was used as the only parameter to `odom.createComponent`. `odom.createComponent` is asynchronous. That is why we used the keyword `await` when calling it. Also notice that our entire code is wrapped in an asynchronous IIFE (indicated by the `async` keyword). This was done to enable us to use the `await` keyword in the code inside it.
4. **Render Component**: Finally, we rendered our component to the DOM by calling `HelloWorld.render`. The parameter to `HelloWorld.render` was a CSS selector corresponding to the element (`div#hello-world`) we wished to replace with our component.

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
      margin: auto;
      display: grid;
      place-items: center;
      width: 90vw;
      height: 90vh;
    }

    button {
      padding: 0.5rem 1rem;
      font-size: 1.5rem;
      font-weight: bold;
      color: #cccccc;
      background-color: #444444;
      border-radius: 0.5rem;
      cursor: pointer;
    }
  `;
  // End of added code

  const options = { markup, styles }; // Modified line
  const HelloWorld = await odom.createComponent(options);
  HelloWorld.render("#hello-world");
})();
```

Refresh the page. You see the component with the `styles` applied. Notice the use of the selector `:scope`. The selector is used to select the root element of our component, which in this case is `main`. All selectors in `styles` are scoped. This means that they apply to only elements in the component. So, event if there was another element in the DOM which matched the selector `button`, it could not have been selected. For more details about styles, refer to [`styles`](./api/create-component/create-component.md#styles).

### Adding Event Listeners

We have created our component and added styles, but our app can not say "Hello World" yet. Let us add a `click` event listener to the `button` element to make this happen. Replace the code in the script with the following:

```js
(async () => {
  const markup = `
    <main>
      <button>Say Hello</button>
    </main>
  `;

  const styles = `
    :scope {
      margin: auto;
      display: grid;
      place-items: center;
      width: 90vw;
      height: 90vh;
    }

    button {
      padding: 0.5rem 1rem;
      font-size: 1.5rem;
      font-weight: bold;
      color: #cccccc;
      background-color: #444444;
      border-radius: 0.5rem;
      cursor: pointer;
    }
  `;

  // Beginning of added code
  const eventListeners = {
    "button": [
      {
        type: "click",
        listener: function (event) {
          alert("Hello World");
        }
      }
    ]
  };
  // End of added code

  const options = { markup, styles, eventListeners }; // Modified line
  const HelloWorld = await odom.createComponent(options);
  HelloWorld.render("#hello-world");
})();
```

Refresh the page and click the button. Upon clicking the button, an alert must pop up with the message "Hello World". The `eventListeners` object contained an array under the property `button`. The property `button` was a CSS selector for the element (`button`) we wanted to apply an event listener to. The array contained an object specifying the options for the event listener. The property `type` specified what type of event we wanted to listen to, which in our case was the click event. The property `listener` specified the listener we wanted to attach to the event. When the button was clicked, the listener showed the alert. For more information about event handling, refer to [`eventListeners`](./api/create-component/create-component.md#eventlisteners).

### Inserting Data

Let us add a title attribute to our button and set its value using odom. Modify the code as follows:

```js
// Code before

const markup = `
  <main>
    <button title="@data.title">Say Hello</button> <!-- Modified line -->
  </main>
`;

// Code in-between

// Beginning of added code
const data = { title: "Say Hello" };
const utils = { data };
// End of added code

const options = { markup, styles, eventListeners, utils }; // Modified line

// Code after
```

Save the file. Refresh the page and hover over the button. You should be able to see the tooltip "Say Hello". In the `markup`, we set the title attribute of the `button` to `@data.title`. We created an object called `data` and put the `title` of the `button` in it. We then put `data` in `utils`. And finally, we put `utils` in `options`. The value `@data.title` for the `title` attribute of the `button` refers to `options.utils.data.title`. For more details about working with data in Odom, refer to [Data](./data.md).

## Conditionals

Using Odom, you can conditionally add, remove and load elements in the DOM. Let us look at some of the [conditionals](./conditionals.md) you can apply to DOM elements.

### HTML File Contents

We are going to use a single HTML file. The file has the following general structure:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Conditionals</title>
</head>
<body>
  <main id="conditionals"></main>

  <script src="https://cdn.jsdelivr.net/npm/odom"></script>

  <script>
    (async () => {
      const markup = `<!-- markup -->`;
      const styles = `/* styles */`;

      const data = { show: true, hide: false };
      const utils = { data };
      const options = { markup, styles, utils };
      const Conditionals = await odom.createComponent(options);
      Conditionals.render("#conditionals");
    })();
  </script>
</body>
</html>
```

We are going to focus on the contents of the last `script` element.

### Markup

Replace the comment in the value for `markup` with the following HTML code:

```html
<ul>
  <li odom-loading='{"type": "defer", "time": 3000}' class="conditional">Loading - Defer (3s)</li>
  <li class="empty">Empty</li>
  <li class="empty">Empty</li>
  <li class="empty">Empty</li>
  <li odom-presence='{"action": "add", "conditions": ["@data.show", {"query": "(min-width: 800px)"}]}'  class="conditional">Presence</li>
  <li odom-loading="lazy"  class="conditional">Loading - Lazy</li>
</ul>
```

### Styles

Replace the comment in the value of `styles` with the following CSS code:

```css
:scope {
  margin: 0 auto;
  width: 90vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.empty, .conditional {
  margin-top: 1rem;
  display: grid;
  place-items: center;
  width: 30vh;
  height: 30vh;
  color: #cccccc;
  background-color: #444444;
}
```

We are going to use the CSS to style our content so that the effects of the conditionals are observable.

### Testing

Open the HTML file in the browser and wait for about 3 seconds. After approximately 3 seconds, you should see another square appear at the top of the page. If you did not observe this, refresh the page and observe. While watching the scroll bar, scroll to the bottom of the page. Just before you reached the end of the page, you should have seen the height of the scroll bar reduce a bit. This indicated that a new element had been added to the page. If you missed any of the steps, refresh the page and observe what happens. Let us look at each conditional we used in detail.

#### Defer

The conditional [Defer](./conditionals.md#defer) allows you to delay rendering of an element. The first element rendered approximately 3 seconds after the loading of the page. We made this happen via the attribute `odom-loading`. We used a JSON object to specify the options for the delay. The JSON object had a property `type` which was set to `defer`. This property indicated the type of loading we wanted. The JSON object also had another property `time` which we set to `3000`. This property specified how much time (in milliseconds) was supposed to pass before the element was rendered.

#### Presence

We can choose to add or remove an element from the DOM using the conditional [Presence](./conditionals.md#presence). The fifth element's presence in the DOM was set via the attribute `odom-presence`. The value for the attribute was a JSON object in which we specified the options for the conditional. The property `action` specified what was supposed to be done should the conditions be met, which in our case was to keep the element in the DOM. The `conditions` were specified in an array with two values. The first value was a [data selector](./data.md#data-selectors) referring to `options.utils.data.show`. The second value was a media query specifying the media conditions to be tested. All the values of the array must be true for the conditional to be successful. In our case, `options.utils.data.show` was set to `true`. The media query test result depended on the width of the browser window. If your window width passed the test (was 800px or larger), you were able to see the element, and if not, you were not able to see it.

Change the width of the window so that it results into the opposite effect. Refresh the page and observe what happens.

#### Lazy

We can apply lazy loading to any element in the DOM via the [Lazy loading](./conditionals.md#lazy) conditional. The last element was lazily loaded as you observed in [Testing](#testing). In the attribute `odom-loading`, we specified the type of loading as `lazy`. This enabled the element to be lazily loaded. For more information about lazy loading refer to [Lazy](./conditionals.md#lazy).

## Collections

Using Odom, you can create collections of elements from collections of data. You can use these elements in lists, tables and the like.

### File Content Structure

We are going to use a single HTML file which has the following general structure:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Collections</title>
</head>
<body>
  <main id="collections"></main>

  <script src="https://cdn.jsdelivr.net/npm/odom"></script>

  <script>
    (async () => {
      const markup = `<!-- markup -->`;
      const styles = `/* styles */`;

      const users = []; // Users
      const data = { users };
      const utils = { data };
      const options = { markup, styles, utils };
      const Collections = await odom.createComponent(options);
      Collections.render("#collections");
    })();
  </script>
</body>
</html>
```

Create an HTML file, put the markup in it and save the file. We are going to modify the contents of the `script` element in the following sections.

### Markup

Replace the comment in `markup` with the following HTML code:

```html
<ul>
  <li odom-multiple="@data.users" title="@datum.username">
    <span>
      <span odom-text="@datum.id"></span>
    </span>
    <span>
      <span odom-text="@datum.username"></span>
    </span>
  </li>
</ul>
```

### Styles

We are going to style the `li` elements of our list so that they display the contents horizontally with a small space between them. Replace the comment in `styles` with the following CSS:

```css
li {
  display: flex;
}

span + span {
  margin-left: 0.5rem;
}
```

### Users

We are going to use an array of users as our collection. Set the value of `users` to the following array (replace empty array):

```js
[
  {
    id: "1",
    username: "@user-1"
  },
  {
    id: "2",
    username: "@user-2"
  },
  {
    id: "3",
    username: "@user-3"
  }
]
```

### Viewing the Collection

Save the file and open it in the browser. You should be able to see a list displaying three items. Each item has a number and followed by some text prefixed with `@`.

Let us look at how we made this possible. We put the attribute `odom-multiple` on the `li` element in our `markup`. This indicated that the element was a template for a collection of type `multiple`. The value of the attribute was a [data selector](./data.md#data-selectors) for the collection `options.utils.data.users`.

The `ul` element contained only one `li` element. This is the template which was used to generate the list items you saw on the page. The `li` element had an attribute `title` which was set to `@datum.id`. Every item of the collection was referenced by `@datum`. The properties of the each item was accessed using the dot notation. So, `@datum.id` referred to the `id` of each user.

The first element of the `li` element was a `span` element which contained another `span` element inside it. The inner `span` had an attribute `odom-text` which was set to `@datum.id`. The attribute `odom-text` indicated that the element was supposed to be used to insert text. So, the `span` was replaced by the `id`.

The second child of `li` followed the same pattern. The inner `span` was used to insert the `username` of the user.

For more information about how to insert text into the DOM, refer to [texts](./api/create-component/utils.md#specific-utilities). For more information about collections, refer to [Collections](./collections.md).

## Documentation

Refer to the [Documentation](./home.md) for more information about how to use odom.
