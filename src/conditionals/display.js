import { media as setMediaQuery } from "./media.js";


export const display = async (element, { value, conditions: { apply, media } = {} }) => {
  let positive, negative;

  if (typeof value === "string") positive = value;
  else {
    positive = value[0];
    negative = value[1];
  };

  const onMatched = () => element.style.setProperty("display", positive);
  const onNotMatched = () => element.style.setProperty("display", negative);

  if (apply) {
    if (media) {
      const options = {
        query: media.query,
        watch: media.watch,
        onMatched
      };

      if (negative) options.onNotMatched = onNotMatched;
      await setMediaQuery(options);
    };
  } else negative && onNotMatched();
};