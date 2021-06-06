# Components

**Table of Contents**

- [Components](#components)
  - [Introduction](#introduction)
  - [Local Components](#local-components)
    - [Creating an App using a Local Component](#creating-an-app-using-a-local-component)
      - [Introduction](#introduction-1)
      - [File Structure](#file-structure)
      - [General Content Structure](#general-content-structure)
      - [Creating the Component](#creating-the-component)
      - [Adding Styles](#adding-styles)
      - [Adding Event Listeners](#adding-event-listeners)
      - [ID](#id)
  - [Global Components](#global-components)
  - [Single-file Components](#single-file-components)
    - [Description](#description)
    - [JS Components](#js-components)
      - [Creating an App using a JS Single-file Component](#creating-an-app-using-a-js-single-file-component)
      - [JS Component File Contents](#js-component-file-contents)
      - [Markup](#markup)
      - [Styles](#styles)
      - [Event Listeners](#event-listeners)
      - [Component Constructor](#component-constructor)
      - [Using the component](#using-the-component)
    - [HTML Components](#html-components)
      - [HTML Component Structure](#html-component-structure)
      - [Head](#head)
      - [Markup](#markup-1)
      - [Styles](#styles-1)
      - [module](#module)
      - [Main HTML File](#main-html-file)
      - [HTML Component Module URLs](#html-component-module-urls)
      - [Installation Support](#installation-support)
  - [Multiple-file Components](#multiple-file-components)
    - [File Structure](#file-structure-1)
    - [Markup](#markup-2)
    - [Styles](#styles-2)
    - [Module](#module-1)
    - [Main HTML File](#main-html-file-1)
    - [Asset Import Options](#asset-import-options)
      - [`assetManager`](#assetmanager)
      - [Build Tools](#build-tools)
      - [Conclusion](#conclusion)

## Introduction

In Odom, components are created using [`createComponent`](api/create-component/create-component.md) or [`Component`](api/component/component.md). Components are reusable and self-contained parts of an application. They put content, presentation and behavior in one place.

## Local Components

Local components are created and used in the same file. This file can be a script or module. Local components can be inserted directly into the DOM or they can be used by other components in the same file.

### Creating an App using a Local Component

#### Introduction

Let us create a "Hello World" app using a local component. The app will have a heading which initially reads "Hello World". It will have a text input field into which the user can put their name. It will also have a button which the user can click after putting their name in the input field. Upon clicking the button, the heading will be updated to "Hello [name of user]", where [name of user] is the name of the user put into the input field.

#### File Structure

We are going to use a single HTML file for our app. Create a folder named "local-component" and in it, put a file named "index.html". The structure of your files should resemble the following file structure:

```txt
|-- local-component
    |-- index.html
```

#### General Content Structure

The index.html file will have the following general structure:

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

Put the code in the file and save. The `body` of the html document has a `div` element with the ID `hello-world`. This is the element that is going to be replaced by our component. The following element is a `script` element having its `src` attribute set to the CDN for Odom. The last element of the `body` is a `script` element from which we are going to create the component and insert it into the DOM. So, in the following sections, we are going to focus on the contents of this element.

#### Creating the Component

First we are going to create our component using `odom.createComponent`. We are only going to build our component with markup we put into the argument of `createComponent`.

Put the following code into the `script` element:

```js
(async () => {
  const markup = `
    <main odom-ml="html">
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

  const id = "hello-world";
  const options = { id, markup };
  const HelloWorld = await odom.createComponent(options);
  HelloWorld.render("#hello-world");
})();
```

Save the file. Open the HTML file in the browser. You should be able to see the heading reading "Hello World", an input field with the label "To:" and a button with the text "Say Hello". Let us look at each step we have taken to make this happen.

1. **Create Markup**: First, we put the markup for our component in a string and assigned it to the variable `markup`. This is the markup used to build the element that replaced `div#hello-world`.
2. **Create `options`**: Next, we created an `options` object and put our markup in it.
3. **Create Component**: Next, we created our component using `odom.createComponent`. We passed the object `options` as the only parameter to the method `createComponent`. The method is asynchronous, thus we had to use the `await` keyword when calling it. Also note that we wrapped our code in an asynchronous IIFE. The IIFE is asynchronous (indicated by the `async` keyword), this enabled us to use the keyword `await` in the code inside it.
4. **Render the Component**: Finally, we rendered the component to the DOM using the our component's method `render`. In this case, we used a CSS selector as the only parameter of the method. The method looked for the element that matched the selector in the DOM and replaced it with the component.

#### Adding Styles

Right now, our component looks quite basic. Let us make it look better by adding some styles to it. Modify the code as follows:

```js
// ...

const styles = `
  :scope {
    padding: 3rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #cccccc;
  }

  h1, label {
    color: #444444;
  }

  h1 {
    text-align: center;
  }

  h1 span {
    color: #222222;
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
    color: #cccccc;
    background-color: #444444;
    cursor: pointer;
    border-radius: 0.5rem;
  }
`;

const options = { ..., styles };

// ...
```

Refresh the page. You should be able to see the content updated with the styles. We used the selector `:scope` to select the root element (`main` in `markup`) of our component. All selectors in `styles` are scoped. Which means that they apply only to the component. If any element outside the component matches any of the selectors, it will not be selected.

#### Adding Event Listeners

At this point, our component does not have the desired behavior. Let us add behavior to it using an event listener. We are going to add a `click` event listener on the `button` so that we can be able to update our page when the use clicks it. Add the following code to the `script`:

```js
// ...

const eventListeners = {
  "button": [
    {
      type: "click",
      listener: async function (event, HelloWorld) {
        const whom = HelloWorld.select("h1 span", false);
        const input = HelloWorld.select(".input-group input", false);
        const name = input.value;
        whom.textContent = name;
      }
    }
  ]
};

const options = { ..., eventListeners };

// ...
```

Refresh the page. Enter your name in the text field and click the `button`. You should be able to see the heading displaying a message saying hello to you. The object `eventListeners` takes CSS selectors as its properties. The CSS selectors are used to select elements inside the component that match the selectors. We used the selector `button` to select the button in our component. The value for `button` is an array containing only one item. The object the array contains options for our event. The property `type` is used to indicated what type of event we wanted to listen to. The property `listener` specified the listener we wanted to attach to the event. The listener updated the heading when you clicked the button. The array specified by `button` can have as many event objects as we want.

#### ID

The variable `id` specifies the ID of the component. You are not required to set the ID. If not set, the ID is automatically generated. When explicitly set, it is used for caching, reusability of styles and more.

## Global Components

Global components are created in one file and used in another file. A module may export one or more components. These components can then be imported and used by other modules.

## Single-file Components

### Description

Single-file components are created using one file, which can be either an HTML file or an ES module. If created in an ES module, the module must have only one export - the [constructor](./assets.md#constructor).

### JS Components

JavaScript single-file components are ES6 modules that have a [`constructor`](#constructor) as the only export.

#### Creating an App using a JS Single-file Component

**Introduction**

Let us rewrite the component we created in [Creating an App using a Local Component](#creating-an-app-using-a-local-component) section.

**File Structure**

Create the following file structure:

```txt
|-- hello-world-js-component
    |-- hello-world.js
    |-- index.html
```

#### JS Component File Contents

Into `hello-world.js` put the following code:

```js
const markup = `<!-- markup -->`;
const styles = `/* styles */`;

export const HelloWorld = async () => {
  const eventListeners = {}; // Event listeners
  const id = "hello-world";
  const options = { id, markup, styles, eventListeners };
  return odom.createComponent(options);
};
```

Save the file. Let us look at each one of the variables in detail in the following sections.

#### Markup

The markup for the component is put in the variable `markup`. Replace the comment in the template string with the following the code in [Creating the Component](#creating-the-component):

#### Styles

Replace the comment in the template literal assigned to `styles` with the CSS in [Adding Styles](#adding-styles).

#### Event Listeners

Replace the empty object assigned to `eventListeners` with the object assigned to the variable of the same name in [Adding Event Listeners](#adding-event-listeners).

#### Component Constructor

The constructor is the single named export of the module `hello-world.js`. The constructor is used to create the component. The component is created using `createComponent`, one of the named exports of Odom. The constructor then returns the component instance, which is what the promise returned by `createComponent` resolves to.

#### Using the component

We are going to use `index.html` to as the page for our app. The first element of the `body` is `main` which has an attribute `odom-src`. The attribute indicates that the element is to be replaced by a component. The value of the attribute is the URL of the component (`"./hello-world.js"`). The following element is a `script` element that refers to an Odom CDN. The last element is also a `script` element with code that inserts our component into the DOM. The script invokes the method `odom.render` without any parameters. The method `odom.render` will go through the DOM looking for [target elements](assets#target-elements). When it finds `main`, it will look for the component specified via the attribute `odom-src`. When it finds the component, it then replaces `main` with the component. If you open the HTML file in the browser, you will see the component on the page.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hello World</title>
  </head>
  <body>
    <main odom-src="/hello-world.js"></main>

    <script src="https://cdn.jsdelivr.net/npm/odom"></script>

    <script>
      odom.render();
    </script>
  </body>
<html>
```

### HTML Components

HTML single-file components are created using standard HTML files. Each file contains markup used just as it would be used for a single page. In other words, each HTML component is also a page on its own.

Let us rewrite the [Hello World](#js-components) app we created earlier (using a JS component) using an HTML single-file component.

Create the following file system:

```txt
|-- hello-world-html-component
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

Put the markup in the file and save. In the following sections, we will look at the contents of each one of the elements of the HTML that have comments in them.

#### Head

The first element we will look at is the `meta` element in the `head` element. The meta element is not required, but it is used to set the ID of the component. The attribute `name` is used to specify the type of the meta content. The attribute content is used to specify the content. So, the value "hello-world" represents the ID of the component.

```html
<head>
  <meta name="id" content="hello-world">
</head>
```

#### Markup

The markup of a component can be wrapped in any HTML element that can be displayed. The markup has to have only one root element. In our case, the element is an `HTMLMainElement`. Replace the `main` element with the markup specified via `markup` in [Creating the Component](#creating-the-component).

#### Styles

The CSS used to style our component is put inside the `style` element. The `style` element can placed in the `body` or the `head`. Replace the style element with code specified via `styles` in [Adding Styles](#adding-styles).

#### module

The `script` tag contains a module that exports the [Constructor](#constructor). The constructor is what is used to create the component. A special syntax is used to include the markup and styles in the module. Interpolation is used to replace a special combination of characters with the corresponding asset. The characters must always be wrapped in back ticks. For markup, `<scope />` is used. For styles, `@import "styles";` is used. Replace the empty object assigned to `eventListeners` with the value assigned to the variable of the same name in [Adding Event Listeners](#adding-event-listeners). Save the file.

```html
<script>
  const markup = `<scope />`;
  const styles = `@import "scope";`;

  export const HelloWorld = async () => {
    const eventListeners = {}; // Event listeners

    id = "hello-world";
    const options = { id, markup, styles, eventListeners };
    return odom.createComponent(options);
  };
</script>
```

#### Main HTML File

We are going to use our HTML component in `index.html`. The file contents are very similar to those of the file we used for the [JS component](#js-component-file-contents). The only difference is the extension used for the URL of the component file specified in the attribute `odom-src` on the `main` element. Opening the file in the browser, you should be able to see the component displayed on the page.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hello World</title>
  </head>
  <body>
    <main odom-src="/hello-world.html"></main>

    <script src="https://cdn.jsdelivr.net/npm/odom"></script>

    <script>
      odom.render();
    </script>
  </body>
<html>
```

#### HTML Component Module URLs

In the module (inside the `script` element) of HTML components, not all relative URLs work. Relative URLs are guaranteed to work in the following cases:

- Root relative URLs: All root relative URLs (i.e. URLs that start with `/`) work.
- Static imports: All relative URLs in ES static imports work.
- Dynamic imports: All relative URLs used in the ES dynamic import method `import` work. However, calculated relative URLs do not work.
- [importComponent](./api/api.md#importcomponent): Relative URLs used in the method `importComponent` work.
- [fetchAsset](./api/asset-manager.md#fetchasset): Relative URLs used in `fetchAsset` work.
- [prefetch](./api/asset-manager.md#prefetch): Relative URLs used in `prefetch` work.
- fetch API: Relative URLs used in the window method `fetch` work.

#### Installation Support

Importing Odom in HTML single-file components is supported only in some types of installation. You can access Odom in the following cases:

- CDN: Using a CDN, you can access Odom the same way you would in any module or script.
- NPM: The only way you can access Odom using NPM is by directly importing from the node modules folder. This way, you will be importing the source files and not the bundle. In the `node_modules` folder, the main source file for Odom is located at `node_modules/odom/src/main.js`.

> NOTE: This might change in the future. Build tools for Odom might be implemented in the future to address this.

## Multiple-file Components

A component that has its markup and/or styles (e.g CSS) in a separate file (or files) is called a multiple-file component. The assets (markup and styles) are imported in the file containing the [Constructor](#constructor). They are then used to build a component.

Odom provides a way to dynamically import these assets via [`assetManager`](api/asset-manager.md). In this section we are going to rewrite the app we wrote using a [JS single-file component](#js-components) and an [HTML single-file component](#html-components).

### File Structure

All the files for the component are put in a single folder `component`.

```txt
|-- hello-world-multiple-file-component
|   |-- component
|     |-- styles.css
|     |-- markup.html
|     |-- main.js
|-- index.html
```

### Markup

The markup for the component is put in the file `markup.html`. Put the markup specified in [Creating the Component](#creating-the-component) into the file.

### Styles

The CSS for styling the component is put in `styles.css`. Put the styles specified via `styles` in [Adding Styles](#adding-styles) into the file.

### Module

The module containing the constructor of the component contained in `main.js`. The file is a module that exports the constructor. In the constructor, we import the assets using [`assetManager.fetchAsset`](api/asset-manager.md#fetchasset). The method `fetchAsset` of `assetManager` returns a promise that resolves to a string containing the contents of the file specified in the URI passed in as the parameter. Put the following code into the module:

```js
export const HelloWorld = async (props) => {
  const markup = await odom.assetManager.fetchAsset("/component/markup.html");
  const styles = await odom.assetManager.fetchAsset("/component/styles.css");

  const eventListeners = {}; // Event listeners

  const id = "hello-world";
  const options = { id, markup, styles, events };
  return odom.createComponent(options);
};
```

Replace the empty object assigned to `eventListeners` to the value of the variable of the same name in [Adding Event Listeners](#adding-event-listeners). Save the file.

### Main HTML File

The main HTML file `index.html` contains content so similar to that used for single-file components. The only difference is the URI for the main file (`main.js`) for the component. The HTML file has the following contents:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hello World</title>
  </head>
  <body>
    <main odom-src="./component/main.js"></main>

    <script src="https://cdn.jsdelivr.net/npm/odom"></script>

    <script>
      odom.render();
    </script>
  </body>
<html>
```

### Asset Import Options

You can use a number of ways to import assets into the component modules. One way we have looked at already is using `assetManager.fetchAsset`. The other two ways is by using the fetch API of the window object and using file loaders of build tools. Let us look at each one of these methods in detail.

#### `assetManager`

The method `assetManager.fetchAsset` allows us to import assets dynamically into our component module. The export `assetManager` has other methods used for importing modules. The method [`importModule`](./api/asset-manager.md#importmodule) is used to import ES modules and [`prefetch`](./api/asset-manager.md#prefetch) is used to prefetch all kinds of assets. The method `fetchAsset` provides a simpler API than the `window.fetch` API (which we will look into shortly) as you do not have to convert the file contents to a string on your own. Also, `importModule` also has a simpler interface than `window.import` because it gets the module contents on your behalf. However, `assetManager` has the same disadvantage as the aforementioned alternatives - dynamic importation. For assets required in a module, dynamic imports/fetches are usually not the best way to do things. Dynamic imports result into many requests being made to the server at runtime. This usually results in poor performance.

#### Build Tools

Build tools provide a way to statically import assets into a module at build time. This avoids importing assets at runtime, which usually results in performance gains. However, build tools are harder to work with than the aforementioned alternatives. Build tools have to be installed, may require a special syntax to import non-JavaScript files and may require configurations.

#### Conclusion

You can use whichever method best suits your use case. If you have decided not to use build tools, your best alternative would in most cases be [`assetManager`](#assetmanager) as you do less work than using `window.fetch` or `window.import`. If you use build tools, you can use appropriate file loaders for each type of asset.

If a component is so complex, you might want to import other assets other than markup and styles. For example, you might put all events in an [`eventListeners`](./api/create-component/create-component.md#eventListeners) object in a different JavaScript module.
