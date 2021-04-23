# Components

__Table of Contents__

- [Components](#components)
  - [Introduction](#introduction)
  - [Internal Components](#internal-components)
  - [External Components](#external-components)
  - [Single File Components](#single-file-components)
    - [HTML Components](#html-components)
      - [Markup](#markup)
      - [Styles](#styles)
      - [creator](#creator)
    - [URIs](#uris)
    - [JS Components](#js-components)
      - [Markup](#markup-1)
      - [Styles](#styles-1)
      - [eventListeners](#eventlisteners)
      - [creator](#creator-1)
    - [Using the components](#using-the-components)
      - [HTML](#html)
      - [JS](#js)

## Introduction

Acom is a component based framework. Components put content, presentation and behavour in the same place. Components are created using `acom`, a method of the framework. The method has an alias `$create`. You can build a component at once using a `options`, or you can only create the API first them build the component bit by bit. Using a `options` is the easiest way. A `options` is an object containing attributes used to construct a component. In this documentation, we will refer to the components [Hello World HTML Component](../examples/hello-world-html-component/index.htm) and [Hello World JS Component](../examples/hello-world-js-component/index.htm).

## Internal Components

Internal components are created and used in the same file. This file can be a script or module. Internal components can be inserted directly into the DOM or they can be used by other components in the same file.

## External Components

External components are created in one file and used in another file. A module can export one or more components. These components can then be imported and used by other modules.

## Single File Components

Single file components are created using either HTML files or ES6 modules. If created in an ES6 module, the module have only one export - the component. The creator of an HTML single file component always exports the component as the only export.

The application used to illustrate single file components is a hello world component. The component is used as the only component in an app. The a pp displays a message "Hello World" in the heading. There is also a text field for a user to enter their name. When the user enters their name and click the button, the message changes to "Hello [user]", where user is the name entered by the user.

### HTML Components

HTML single file components are created using standard HTML files. Each file contains markup used just as it would be used for a single page. In other words, each HTML component is also a page on its own. One strict rule is that the `style` element tag should be inside the `body` element. We are going to use [Hello World HTML Component](../examples/hello-world-html-component.md) for this section.

The app has the following file system:

hellow-world-html-component/
  hello-world.htm
  index.htm

#### Markup

```html
<main acom-scope mime-type="text/html">
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

```html
<style acom-styles="text/css">
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

#### creator

```html
<script acom-creator="module/javascript">
  export const helloWorld = async data => {
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
    
    const $helloWorld = await $create({ data, eventListeners });
    return $helloWorld;
  };
</script>
```

### URIs

In the creator of HTML components, not all URIs that would normally work in normal ES module work. The module is considered to be from a different origin because of the method Acom used to import the creators. Therefore, using relative URLs works for special conditions, except in the following cases:

* Statice imports
* Dynamic imports
* [importComponent](exports.md#importcomponent)
* fetch API

To use relative URLs other than in the aforementioned cases, the URLs must start with:

* `/`
* `www.`

### JS Components

JavaScript single file components are ES6 modules that have a creator as the only export. Let us rewrite the HTML component using an ES6 module. Refer to Hello World JS Component. We are going to use [Hello World JS Component](../examples/hello-world-js-component.htm).

The app has the following file system:

hellow-world-js-component/
  hello-world.js
  index.htm

#### Markup

```js
const markup = /* html */`
  <main acom-scope mime-type="text/html">
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

#### eventListeners

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

#### creator

```js
import { $create } from "acom";


export const helloWorld = async props => {
  // ...
    
  const $helloWorld = await $create({ markup, styles, eventListeners });
  return $helloWorld;
};
```

### Using the components

In index.htm.

#### HTML

```html
<main id="hello-world"></main>
```

#### JS

```js
import { importComponent } from "/src/acom.js";


(async () => {
  const str = "hello";
  const helloWorld = await importComponent("./hello-world.htm");
  const $HelloWorld = await helloWorld({name: "hello-world"});
  $HelloWorld.replace("#hello-world");
})();
```