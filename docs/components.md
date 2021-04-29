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
      - [Main HTML File](#main-html-file)
      - [HTML Component Constructor URIs](#html-component-constructor-uris)
  - [Multiple File Components](#multiple-file-components)
    - [File Structure](#file-structure)
    - [Markup](#markup-2)
    - [Styles](#styles-2)
    - [Constructor](#constructor-1)
    - [Main HTML File](#main-html-file-1)
    - [Asset Import Options](#asset-import-options)
      - [`fetchAsset`](#fetchasset)
      - [`fetch`](#fetch)
      - [Build Tools](#build-tools)
      - [Conclusion](#conclusion)

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
export const HelloWorld = async (props) => {
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

Let us rewrite the [Hello World](#js-components) app we created earlier (using a JS component) using an HTML single file component.

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

The markup of a component can be wrapped in any HTML element that can be displayed. The markup has to have only one root element. In our case, the element is an `HTMLMainElement`. The attribute "acom-ml" is used to indicate what type of markup is used. The attribute has been set to "html" because we are using HTML. The default value for the attribute is "html", so, it is okay to leave it out in this case.

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

The CSS used to style our component is put inside the `style` element. The selector `:scope` is used to select the root element, which in this case is the root element of the markup (`main`).

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

The `script` tag contains a module that exports the [Constructor](#constructor). The constructor is what is used to create the component. The constructor takes one parameter `data`. The parameter is required as it contains the markup, styles and the ID. We are using `createComponent` to create our component, so, we have to pass the parameter `data` into `options`. You do not have to include the attribute `type` on the script element.

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
    
    return Acom.createComponent({ data, eventListeners });
  };
</script>
```

#### Main HTML File

We are going to use our HTML component in `index.html`. The file contents are very similar to those of the file we used in the JS component. The only difference is the extension used for the URI of the component file specified in the attribute `acom-src` on the `main` element. Openning the file in the browser, you will see the component displayed on the page.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hello World</title>
  </head>
  <body>
    <main acom-src="./hello-world.html"></main>

    <script src="/path-to-acom"></script>

    <script>
      Acom.render();
    </script>
  </body>
<html>
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

## Multiple File Components

A component that has its markup and/or styles (e.g CSS) in a seperate file (or files) is called a multiple file component. The assets (markup and styles) are imported in the file containing the [Constructor](#constructor). They are then used to build a component.

Acom provides a way to dynamically import these assets via [`assetManager`](api/asset-manager.md). In this section we are going to rewrite the app we wrote using a [JS single file component](#js-components) and an [HTML single file component](#html-components).

### File Structure

All the files for the component are put in a single folder `component`.

```txt
|-- hellow-world-multiple-file-component
    |-- component
        |-- styles.css
        |-- markup.html
        |-- main.js
    |-- index.html
```

### Markup

The markup for the component is put in the file `markup.html`. The file has the following contents:

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

### Styles

The CSS for styling the component is put in `styles.css`. The file contains the following contents:

```css
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
```

### Constructor

The [Constructor](#constructor) of the component contaned in `main.js`. The file is a module that exports the constructor. In the constructor, we import the assets using [`assetManager.fetchAsset`](api/asset-manager.md#fetchasset). The method `fetchAsset` of `assetManager` returns a promise that resolves to a string containing the contents of the file specified in the URI passed in as the parameter. The module has the following contents:

```js
export const HelloWorld = async (props) => {
  const markup = await Acom.assetManager.fetchAsset("./markup.html");
  const styles = await Acom.assetManager.fetchAsset("./styles.css");

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

  const id = "hello-world";
  const options = { id, markup, styles, events };
  return Acom.createComponent(options);
};
```

### Main HTML File

The main HTML file `index.html` contains content so similar to that used for single file components. The only difference is the URI for the main file (`main.js`) for the component. The HTML file has the following contents:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hello World</title>
  </head>
  <body>
    <main acom-src="./component/main.js"></main>

    <script src="/path-to-acom"></script>

    <script>
      Acom.render();
    </script>
  </body>
<html>
```

### Asset Import Options

You can use a number of ways to import assets into the component modules. One way we have looked at already is using `assetManager.fetchAsset`. The other two ways is by using the fetch API of the window object and using file loaders of build tools. Let us look at each one of these methods in detail.

#### `fetchAsset`

The method `assetManager.fetchAsset` allows us to import assets dynamically into our component module. This method provides a simpler API than the fetch API (which we will look into shortly) as you do not have to convert the file contents to a string on your own. However, `fetchAsset` has the same disadvantage as the aforementioned alternative, dynamic importation. For assets required in a module, dynamic imports/fetches are usually not the best way to do things. Dynamic imports result into many requests being made to the server at runtime. This usually results in poor performance.

#### `fetch`

The API `fetch` of the `window` object can be used to import text content from files. Unlike `assetManager.fetchAsset`, you have to convert the file contents to a string on your own by reading the response to completion using the method `text` of the response object. This method has the disadvantage described in [`fetchAsset`](#fetchasset) section. The `fetch` API has other alternatives that offer similar functionality.

#### Build Tools

Build tools provide a way to statically import assets into a module at build time. This avoids importing assets at runtime, which usually results in performance gains. However, build tools are harder to work with than the aforementioned alternatives. Build tools have to be installed, may require a special syntax to import non-JavaScript files and may require configurations.

#### Conclusion

You can use whichever method best suits your use case. If you have decided not to use build tools, your best alternative would in most cases be [`fetchAsset`](#fetchasset) as you do less work than using [`fetch`](#fetch). If you use build tools, you use appropriate file loaders for each type of asset. If a component is so complex, you might want to import other assets other than markup and styles. For example, you might put all events in an `[`eventListeners`](api/create-component/create-component.md#eventListeners) object in a different JavaScript module.
