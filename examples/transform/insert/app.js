import { $create } from "/src/main.js";


export const app = async props => {
  const markup = /* html */`
    <main>
      <header acom-src="/examples/transform/insert/header.js"></header>
      <section acom-markup="/examples/transform/insert/description.htm" acom-filetype="text"></section>
      <footer>
        <a acom-src="link" link="@data.home.link" icon="@data.home.icon" text="@data.home.text"></a>
        <a acom-src="link" link="@data.twitter.link" icon="@data.twitter.icon" text="@data.twitter.text"></a>
        <a acom-src="link" link="@data.facebook.link" icon="@data.facebook.icon" text="@data.facebook.text"></a>
      </footer>
    <main>
  `;
 
  const styles = /* css */`
    :scope {
      border-radius: 2rem;
      padding: 2rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      border: 3px solid #7f3fff;
    }

    [name="description"] {
      padding: 1rem;
    }

    [name="description"] a {
      text-decoration: none;
      color: #7f3fff;
    }

    footer {
      display: flex;
      gap: 1rem;
    }
  `;

  const data = {
    home: {
      link: "",
      icon: "./images/home.svg",
      text: "Home"
    },
    twitter: {
      link: "",
      icon: "./images/twitter.svg",
      text: "Twitter"
    },
    facebook: {
      link: "",
      icon: "./images/facebook.svg",
      text: "Facebook"
    }
  };

  const utils = {
    data,
    components: { link }
  };

  const options = { props, markup, styles, utils };
  return $create(options);
};

const link = async props => {
  const markup = /* html */`
    <a href="${props.link}" target="_blank">
      <img src="${props.icon}" />
      <span>
        <span acom-text="text"></span>
      </span>
    </a>
  `;

  const styles = /* css */`
    :scope {
      border-radius: 0.25rem;
      padding: 0.5rem 1rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      text-decoration: none;
      color: #3f3f3f;
      border: 2px solid #7f3fff;
      transition: color, background-color 0.4s;
    }

    img {
      width: 1.5rem;
      filter: invert(33%);
      transition: filter 0.4s;
    }

    :scope:hover {
      color: #ffffff;
      background-color: #7f3fff
    }

    :scope:hover img {
      filter: invert(100%);
    }
  `;

  const texts = { text: props.text };
  const utils = { texts };
  const id = "link";
  const options = { id, props, markup, styles, utils };
  return $create(options);
};