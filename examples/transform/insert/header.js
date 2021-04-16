import { $create } from "/src/main.js";


export const header = props => {
  const markup = /* html */`
    <header>
      <a href="/">
        <img src="/examples/transform/insert/images/logo@256.png" />
      </a>
      <h1>Acom</h1>
      <span>A JavaScript framework for building web app UI.</span>
    </header>
  `;

  const styles = /* css */`
    :scope {
      padding: 1rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    img {
      width: 5rem;
    }
  `;

  const options = { props, markup, styles };
  return $create(options);
};