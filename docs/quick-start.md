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
    - [HTML File Contents](#html-file-contents)
    - [Markup](#markup)
    - [Styles](#styles)
    - [Testing](#testing)
      - [Defer](#defer)
      - [Visibility](#visibility)
      - [Display](#display)
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

Using Acom, you can add or remove elements to/from the DOM or change the visual status such as display and visibility of elements according to conditions you specify. Let us look at the different kinds of [conditionals](./conditionals.md) you can apply to DOM elements.

### HTML File Contents

We are going to use a single HTML file. THe file has the following general structure:

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

  <script src="/path-to-acom"></script>

  <script>
    (async () => {
      const markup = `<!-- markup -->`;
      const styles = `/* styles */`;

      const data = { show: true, hide: false };
      const utils = { data };
      const options = { markup, styles, utils };
      const Conditionals = await Acom.createComponent(options);
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
  <li acom-loading='{"type": "defer", "time": 3000}'>Loading - Defer (3s)</li>
  <li acom-visibility='{"value": ["hidden", "visible"], "conditions": ["@data.hide"]}'>Visibility</li>
  <li acom-display='{"value": ["none", "grid"], "conditions": ["@data.hide"]}'>Display</li>
  <li acom-presence='{"action": "add", "conditions": ["@data.show", {"query": "(min-width: 800px)"}]}'>Presence</li>
  <li acom-loading="lazy">Loading - Lazy</li>
</ul>
```

### Styles

Replace the comment in the value of `styles` with the following CSS code:

```css
:scope {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
}

li {
  display: grid;
  place-items: center;
  width: 400px;
  height: 400px;
  border: 1px solid black;
}
```

We are going to use the CSS to style our content so that the effects of the conditionals are observable.

### Testing

Open the HTML file in the browser and wait for about 3 seconds. After approximately 3 seconds, you should see another square being added to the page. While watching the scroll bar, scroll to the bottom of the page. Just before you reached the end of the page, you should have seen the scroll bar reduce in width a bit. This indicated that a new element was added to the page. If you have missed any of the steps, refresh the page and observe what happens. Let us look at each conditional we used in detail.

#### Defer

The conditional [Defer](./conditionals.md#defer) allows you to delay rendering of an element. The first element rendered approximately 3 seconds after the loading of the page. We made this happen via the attribute `acom-loading`. We used a JSON object to specify the options. The JSON object had a property `type` which was set to `defer`. This property enabled the delayed rendering of the element. The JSON object also had another property `time` which we set to `3000`. This property specified how much time (in miliseconds) should pass before the element is rendered.

#### Visibility

The visibility of an element can be set or changed via the conditional [Visibility](./conditionals.md#visibility). The second element's visibility was set via the attribute `acom-visibilty`. We used a JSON object. The property `value` was set to an array containing two values of visibility. The visibility is set to the first value if the conditional is true, and to the second if the conditional is false. The conditions checked were specified in the property `conditions`. The `conditions` were specified in an array which contained only one value. The value was a string with a data selector `@data.hide` which referred to `options.utils.data.hide`. The value referred to was set to `false`, which means the conditional failed. This resulted into the visibility of the element being set to `visible`. That is why you were able to see the element on the page.

Let us see what happens if we change the result of the conditional. Set the value of `options.utils.data.hide` to `true` and refresh the page. After refreshing, you should not be able to see the element on the page. This is because the conditonal failed and thus the visibility of the element set to `hidden`. Fore more information about the Visibility conditional, refer to [Visibility](./conditionals.md#visibility).

#### Display

We set the display value of the third element using the conditional [Display](./conditionals.md#display). In the value for the attribute `acom-display` we set the desired options via a JSON object. The property `value` specified the desired display values for the success and failure of the conditional using the first and second values of the array respectively. The property `conditions` was used to specify the conditions to be checked. The array contained only a data selector for the value `options.utils.data.hide`. Since the value was set to `false` the conditional failed and thus the value of the display was set to `grid`.

Let us see what happens if we change the conditions. Set the value of `options.utils.data.hide` (if you have not changed it already) to `true` and refresh the page. You should no longer see the element on the page. For more information about Display refer to [Display](./conditionals.md#display).

#### Presence

We can choose to add or remove and element from the DOM using the conditional [Presence](./conditionals.md#presence). The fourth element's presence in the DOM was set via the attribute `acom-presence`. The value for the attribute was a JSON object in which we specified the options for the conditional. The property `action` specified what was supposed to be done should the conditions be met, which in our case was to add the element to the DOM. The `conditions` were specified in an array with two values. The first value was a data selector of `options.utils.data.show`. The second value was a media query specifying the media conditions to be tested. All the values of the array must be true for the conditional to be successful. In our case, `options.utils.data.show` was set to `true`. The media query test depended on the width of the viewport. If your viewport width passed the test (was 800px or larger), you were able to see the element, and if not, you were not able to see it.

Change the width of the viewport so that it results into the opposite effect. Refresh the page and observe what happens. Refer to [Presence conditional](./conditionals.md#presence) for more details.

#### Lazy

We can apply lazy loading to any element in the DOM via the [Lazy loading conditional](./conditionals.md#lazy). The last element was lazily loaded as you observed in [Testing](#testing). In the attribute `acom-loading`, we specified the type of loading as `lazy`. This enabled the element to be lazily loaded. For more information about lazy loading refer to [Lazy](./conditionals.md#lazy).

## Collections

Using Acom, you can create collections of elements from collections of data. You can use these elements in lists, tables and the like.

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

  <script src="/path-to-acom"></script>

  <script>
    (async () => {
      const markup = `<!-- markup -->`;
      const styles = `/* styles */`;

      const users = // ...
      const data = { users };
      const utils = { data };
      const options = { markup, styles, utils };
      const Collections = await Acom.createComponent(options);
      Collections.render("#collections");
    })();
  </script>
</body>
</html>
```

We are going to modify the contents of the `script` element.

### Markup

Replace the comment in `markup` with the following HTML code:

```html
<ul acom-multiple="@data.users">
  <li title="@datum.username">
    <span>
      <span acom-text="@datum.id"></span>
    </span>
    <span>
      <span acom-text="@datum.username"></span>
    </span>
  </li>
</ul>
```

### Styles

We are going to style the `li` elements of our list so that they display the contents horizontally with a small space between them. Replace the comment in `styles` with the following CSS:

```css
li {
  display: flex;
  gap: 0.5rem;
}
```

### Users

We are going to use an array of users as our collection. Set the value of `users` to the following array (replace comment):

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

Let us look at how we made this possible. We put the attribute `acom-multiple` on the `li` element in our `markup`. This indicated that the element was a collection of type `multiple`. The value of the attribute was a data selector for the collection `options.utils.data.users`.

The `ul` element contained only one `li` element. This is the template which was used to generate the list items you saw on the page. The `li` element had an attribute `title` which was set to `@datum.id`. Every item of the collection was referenced by `@datum`. The properties of the each item was accessed using the dot notation. So, `@datum.id` referred to the `id` of each user.

The first element of the `li` element was a `span` element which contained another `span` element inside it. The inner `span` had an attribute `acom-text` which was set to `@datum.id`. The attribute `acom-text` indicated that the element was supposed to be used to insert a text asset. So, the `span` was replaced by the `id`. For more information about how to insert text into the DOM, refer to [texts](./api/create-component/utils.md#texts).

The second child of `li` followed the same pattern. The inner `span` was used to insert the `username` of the user.

For more information about collections, refer to [Collections](./collections.md).

## Documentation

[Documentation](./home.md).
