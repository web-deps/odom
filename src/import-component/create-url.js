export const createURL = (uri, root) => {
  const urlRegex = /http[s]?:\/\/|^www\./;
  if (urlRegex.test(uri)) return uri;
  const origin = window.location.origin;

  if (root && root.startsWith("/")) root = `${origin}${root}`;
  else root = origin;

  return uri.startsWith("/") ? origin + uri : uri.startsWith(".") ? root + "/" + uri : uri;
};
