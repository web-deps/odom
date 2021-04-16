import {media as setMediaQuery} from "./media.js";


export const visibility = async (element, { value, conditions: { apply, media } = {} }) => {
  let positive, negative;

  if (typeof value === "string") positive = value;
  else {
    positive = value[0];
    negative = value[1];
  };
  
  const onMatched = () => element.style.setProperty("visibility", positive);
  const onNotMatched = () => element.style.setProperty("visibility", negative);

  if (apply) {
    if (media) {
      const options = {
        query: media.query,
        watch: media.watch,
        onMatched
      };

      if (negative) options.onNotMatched = onNotMatched;
      await setMediaQuery(options);
    } else onMatched();
  } else negative && onNotMatched();
};