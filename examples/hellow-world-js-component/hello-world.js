import { $create } from "acom";


export const helloWorld = async props => {
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

  const styles = /* css */`
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

  const eventListeners = {
    "button": [
      {
        type: "click",
        listener: async function (event, HelloWorld) {
          const whom = await HelloWorld.select("h1 span", false);
          const input = await HelloWorld.select(".input-group input", false);
          const name = input.value;
          whom.textContent = name;
        }
      }
    ]
  };
    
  const HelloWorld = await $create({ markup, styles, eventListeners });
  return HelloWorld;
};