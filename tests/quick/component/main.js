export const HelloWorld = async () => {
  const markup = await odom.assetManager.fetchAsset("/tests/quick/component/markup.html");
  const styles = await odom.assetManager.fetchAsset("/tests/quick/component/styles.css");

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
