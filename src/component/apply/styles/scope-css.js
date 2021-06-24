export const scopeCSS = async (css, id) => {
  const attributeSelector = `[odom-scope="${id}"]`;
  let scopedSelector = attributeSelector;

  const regexes = {
    selector: /\s*([^%{}]+)\s*(?=\{)/g,
    comments: /(\/\*[\s\S]*?\*\/)/g,
    animationName: /animation(?:-name)?:\s*([-\w]+)/g,
    keyframesName: /\s+([-\w]+)/
  };

  const scopeAnimationNames = () => {
    css = css.replace(regexes.animationName, (match, animationName) => {
      return match.replace(animationName, `${animationName}-${id}`);
    });
  };

  const removeComments = () => {
    css = css.replace(regexes.comments, "");
  };

  const scopeSelectors = () => {
    css = css.replace(regexes.selector, (match, selector) => {
      return scopeSelector(selector);
    });
  };

  const scopeSelector = (selector) => {
    const scopeAtRule = () => {
      const scopeKeyframesName = (match, keyframesName) => ` ${keyframesName}-${id}`;

      return selector.startsWith("@keyframes") ? selector.replace(regexes.keyframesName, scopeKeyframesName) : selector;
    };

    selector = selector.trim();

    return !selector
      ? ""
      : selector.includes(",")
      ? selector
          .split(",")
          .map((sel) => scopeSelector(sel))
          .join(",")
      : selector.startsWith("@")
      ? scopeAtRule()
      : selector === ":scope"
      ? scopedSelector
      : selector.startsWith(":scope")
      ? selector.replace(":scope", attributeSelector)
      : /:root|from|to/.test(selector)
      ? selector
      : `${attributeSelector} ${selector}`;
  };

  removeComments();
  scopeSelectors();
  scopeAnimationNames();
  return css;
};
