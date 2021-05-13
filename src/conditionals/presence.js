export const presence = async (
  element,
  { action, conditions: { apply, media } },
  { transform, transformOptions }
) => {
  const remove = () => element.remove && element.remove();
  const add = async () => await transform({element, ...transformOptions});

  if (apply) {
    if (media) {
      const mediaMatch = window.matchMedia(media.query);
      
      if (mediaMatch.matches) {
        if (action === "remove") remove();
        else await add();
      } else if (action === "add") remove();
    } else {
      if (action === "remove") remove();
      else await add();
    };
  } else if (action === "add") remove();
};