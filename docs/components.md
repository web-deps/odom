# Components

__Table of Contents__

- [Components](#components)
  - [Introduction](#introduction)
  - [Local Components](#local-components)
  - [Global Components](#global-components)
  - [Constructor](#constructor)
  - [Single File Components](#single-file-components)
    - [JS Components](#js-components)
      - [JS Component File Contents](#js-component-file-contents)
      - [Markup](#markup)
      - [Styles](#styles)
      - [Event Listeners](#event-listeners)
      - [ID](#id)
      - [Component Constructor](#component-constructor)
      - [Using the component](#using-the-component)
      - [HTML](#html)
    - [HTML Components](#html-components)
      - [HTML Component Structure](#html-component-structure)
      - [Head](#head)
      - [Markup](#markup-1)
      - [Styles](#styles-1)
      - [module](#module)
      - [HTML Component Constructor URIs](#html-component-constructor-uris)

## Introduction

Acom is a component based framework. Components put content, presentation and behavour in the same place. In Acom, omponents are created using [`createComponent`](api/create-component/create-component.md), one of the named exports. The method has an alias `$create`. You can build a component at once using `createComponent`, or you can only create an instance of [`Component`](api/component/component.md) first then transform the component bit by bit using the [API](api/component/component.md#api).

## Local Components

Internal components are created and used in the same file. This file can be a script or module. Internal components can be inserted directly into the DOM or they can be used by other components in the same file.

## Global Components

External components are created in one file and used in another file. A module can export one or more components. These components can then be imported and used by other modules.

## Constructor

A constructor is any function that returns a promise that resolves to a [`Component`](api/component/component.md). Constructors are used in all of the aforementioned types of a component.

## Single File Components

Single file components are created using one file, which can be either an HTML file or an ES6 module. If created in an ES6 module, the module has only one export - the component. The [`constructor`](#constructor) of an HTML single file component always exports the component as the only export.

### JS Components

JavaScript single file components are ES6 modules that have a [`constructor`](#constructor) as the only export.

Let us create a "Hello World" app using a JS single file component. The app has a header that initially reads "Hello World". It also has a text input field into which the user can put their name. It also has a button which the user can click after puting their name in the input field. Upon clicking the button, the heading will be update to "Hello [name of user]", where [name of user] is the name of the user put into the input field.

The app has the following file system:

```txt
|-- hellow-world-js-component
    |-- hello-world.js
    |-- index.html
```

#### JS Component File Contents

The module, `hello-world.js` has the following general structure:

```js
export const HelloWorld = (props) => {
  const markup = // ...
  const styles = // ...
  const eventListeners = // ...
  const id = "hello-world";
  const options = { id, markup, styles, events };
  return Acom.createComponent(options);
};
```

Let us look at each one of the variables in detail in the following sections.

#### Markup

The markup for the component is put in the variable `markup`. The markup is required to have only one root element, which in our case is an `HTMLMainElement`. The attribute `acom-ml` is used to indicate the type of markup used. We are using HTML for the markup, thus, the value was set to "html". The default value for the attribute is "html". Therefore, we are not required to include the attribute in this case.

```js
const markup = /* html */`
  <main acom-ml="html">
    <h1>
      Hello <span>World</span>
    </h1>
    <section>
      <div class="input-group">
        <label for="">To:</label>
        <input type="text" placeholder="Enter Your Name" />
      </div>
      <button>Say Hello</button>
    </section>
  </main>
`;
```

#### Styles

The styles of the component are were put into the variable `styles`. We are using CSS in this case. The selector `:scope` is used to select the root element of our markup (`main`).

```js
const styles = `
  :scope {
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  h1 {
    text-align: center;
  }

  h1 span {
    color: #0cffff;
  }

  section {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  button {
    padding: 0.5rem;
    font-size: 1.5rem;
    font-weight: bold;
    color: #0cffff;
    background-color: #7f3fff;
    cursor: pointer;
  }
`;
```

#### Event Listeners

The event listener of the button was put in the variable `eventListeners`. The value of `eventListeners` is an object which has only one property (`button`). The property `button` is a CSS selector for the element we wish to add listeners to, which in this case is the `button` element. The value for the property `button` is an array. The array has only one item - an object that contains the options for the event listener. We can add as many CSS selectors as we like and as many listeners as we like for each selector.

The event we wish to add a listener for is the click event. Therefore, the property `type` was set to `"click"` in the object. The listener is a function that changes the text of the heading according to the name entered by the user in the input field.

```js
const eventListeners = {
  "button": [
    {
      type: "click",
      listener: async function (event, $helloWorld) {
        const whom = await $helloWorld.select("h1 span", false);
        const input = await $helloWorld.select(".input-group input", false);
        const name = input.value;
        whom.textContent = name;
      }
    }
  ]
};
```

#### ID

The varible `id` indicates the ID of the component. The ID is not required, but it is used for caching. If not set, the ID is automatically generated.

#### Component Constructor

The [Constructor](#constructor) is the single named export of the module `HelloWorld`. The constructor is used to create the component. The component is created using `createComponent`, one of the named exports of Acom. The constructor then returns the component instance, which is what the promise returned by `createComponent` resolves to.

#### Using the component

The file `index.html` has the following contents:

#### HTML

The first element of the `body` is `main` which has an attribute `acom-src`. The attribute indicates that the element is to be replaced by a component. The value of the attribute is the URI of the component (`"./hello-world.js"`). The following element is a `script` element that refers to an Acom CDN. The last element is also a `script` element with code that inserts our component into the DOM. The script involkes the method `Acom.render` without any parameters. The method `Acom.render` will go through the DOM looking for [target elements](assets#target-elements). When it finds `main`, it will look for the component specified via the attribute `acom-src`. When it finds the component, it then replaces `main` with the component. If you open the HTML file in the browser, you will see the component on the page.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hello World</title>
  </head>
  <body>
    <main acom-src="./hello-world.js"></main>

    <script src="/path-to-acom"></script>

    <script>
      Acom.render();
    </script>
  </body>
<html>
```

### HTML Components

HTML single file components are created using standard HTML files. Each file contains markup used just as it would be used for a single page. In other words, each HTML component is also a page on its own. One strict rule is that the `style` element should be placed inside the `body` element.

Let us rewrite the "Hello World" app we created using a JS component using an HTML single file component.

The app has the following file system:

```txt
|-- hellow-world-html-component
    |-- hello-world.html
    |-- index.html
```

#### HTML Component Structure

The HTML component file (`hello-world.html`) has the following HTML structure:

```html
<!DOCTYPE html>
<html>
  <head>
    <!-- ... -->
  </head>
  <body>
    <main>
      <!-- ... -->
    </main>
    <style>
      /* ... */
    </style>
    <script>
      // ...
    </script>
  </body>
</html>
```

In the following sections we will look at the contents of each one of the main elements of the HTML.

#### Head

The first element we will look at is the `meta` element in the `head` element. The meta element is not required, but it is used to set the ID of the component. So, the value "hello-world" of the attribute "id" represents the ID of the component.

```html
<head>
  <meta id="hello-world">
</head>
```

#### Markup

The markup of a component can be wrapped in any HTML element that can be displayed. The markup has to have only one root element. In our case, the element is an `HTMLMainElement`. The attribute "acom-ml" is used to indicate what type of markup is being used. The attribute has been set to "html" because we are using HTML. The default value for the attribute is "html", so, it is okay to leave it out in this case.

```html
<main acom-ml="html">
  <h1>
    Hello <span>World</span>
  </h1>
  <section>
    <div class="input-group">
      <label for="">To:</label>
      <input type="text" placeholder="Enter Your Name" />
    </div>
    <button>Say Hello</button>
  </section>
</main>
```

#### Styles

The CSS used to style our component is put inside the "style" tag. The selector `:scope` is used to select the root element, which in this case is the root element of the markup (`main`).

```html
<style>
  :scope {
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  h1 {
    text-align: center;
  }

  h1 span {
    color: #0cffff;
  }

  section {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  button {
    padding: 0.5rem;
    font-size: 1.5rem;
    font-weight: bold;
    color: #0cffff;
    background-color: #7f3fff;
    cursor: pointer;
  }
</style>
```

#### module

The `script` tag contains a module that exports the [Constructor](#constructor). The constructor is what is used to create the component. The constructor takes one parameter `data`. The parameter is required as it contains the markup, styles, props and the ID. We are using `createComponent` to create our component, so, we have to pass the parameter `data` into `options`. You do not have to include the attribute `type` on the script element.

```html
<script type="module">
  export const HelloWorld = async data => {
    const eventListeners = {
      "button": [
        {
          type: "click",
          listener: async function (event, $helloWorld) {
            const whom = await $helloWorld.select("h1 span", false);
            const input = await $helloWorld.select(".input-group input", false);
            const name = input.value;
            whom.textContent = name;
          }
        }
      ]
    };
    
    return createComponent({ data, eventListeners });
  };
</script>
```

#### HTML Component Constructor URIs

In the constructor of HTML components, not all relative URIs work. The module is considered to be from a different origin because of the method Acom uses to import the modules. Therefore, using relative URLs works for the following cases:

- Statice imports: all relative URIs in ES static imports work.
- Dynamic imports: all relative URIs us as the parameter to the ES dynamic import method `import` work. However, calculated URIs do not work.
- [importComponent](exports.md#importcomponent): relative URIs used in the method `importComponent` (one of the named exports of Acom) work.
- fetch API: relative URIs used in the window method `fetch` work.

To use relative URLs other than in the aforementioned cases, the URLs must start with the following charactors:

- `/`
- `www.`