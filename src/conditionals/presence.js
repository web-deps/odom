export const presence = async (
  element,
  { action, conditions: { apply, media } },
  { transform, components, elements, markups, texts, props, data, methods }
) => {
  const remove = () => element.remove && element.remove();
  const add = async () => await transform({ element, components, elements, markups, texts, props, data, methods });

  if (apply) {
    if (media) {
      const mediaMatch = window.matchMedia(media.query);
      
      if (mediaMatch.matches) {
        if (action === "remove") remove();
        else await add();
      } else if (action === "add") remove();
    } else await add();
  } else if (action === "add") remove();
};