import { scopeCSS } from "./scope-css.js";

export const processStyles = async (options) => {
  let {
    styles,
    middleware: { preprocessor, postprocessor, custom }
  } = options;

  const processCSS = async () => {
    if (postprocessor) styles = await postprocessor(styles);
    return styles;
  };

  if (custom) for (const middleware of custom) styles = await middleware(styles);
  if (preprocessor) styles = await preprocessor(styles);

  styles = await processCSS();
  return styles;
};
