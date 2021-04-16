import { scopeCSS } from "./scope-css.js";


export const processStyles = async ({
  id,
	selector,
  styles,
  scopeStyles,
  middleware: { preprocessor, postprocessor, custom },
  createElement
}) => {
	const processCSS = async () => {
		if (postprocessor) styles = await postprocessor(styles);
		if (scopeStyles) styles = await scopeCSS(styles, selector);
			
		if (createElement) {
			const styleElement = document.createElement("style");
			styleElement.textContent = styles;
      if (id) styleElement.classList.add(id);
			styles = styleElement;
		};
			
		return styles;
	};
	
	
	if (custom) for (const middleware of custom) styles = await middleware(styles);
	if (preprocessor) styles = await preprocessor(styles);
	
	styles = await processCSS();
	return styles;
};