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

export const HelloWorld = async () => {
  const eventListeners = {
    button: [
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

  const id = "hello-world";
  const options = { id, markup, styles, eventListeners };
  return odom.createComponent(options);
};
