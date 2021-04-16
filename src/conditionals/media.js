export const media = async ({ query, onMatched, onNotMatched, watch = false }) => {
  const mediaMatch = window.matchMedia(query);
  const handleMediaChange = async e => {
    if (e.matches && onMatched) await onMatched(e);
    else if (onNotMatched) await onNotMatched(e);
  };

  const registerEventListener = () => {
    if (mediaMatch.addEventListener) mediaMatch.addEventListener("change", handleMediaChange);
    else mediaMatch.addListener(handleMediaChange);
  };
  
  watch && registerEventListener();
  handleMediaChange(mediaMatch);
};