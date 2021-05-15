import { xml2html } from "./xml2html.js";


export const parseMarkup = async ({ markup, middleware = {}, mltype, convertMarkup = true }) => {
  const { parser, converter, custom } = middleware;

  if (!mltype) {
    const mlMatch = markup.match(/(?:acom-ml)=["']?((?:.(?!["'`]?\s+(?:\S+)=|\s*\/?[>"']))+.)["']?/);
    if (mlMatch) mltype = mlMatch[1];
    if (!mltype) mltype = "html";
  };

  const tagName = markup.match(/<([A-Za-z0-9:_\-]+)/)[1];
  let dom;

  if (custom) {
    dom = markup;
    for (const middleware of custom) dom = await middleware(dom);
  } else {
    dom = await (
      parser ? parser(markup, mltype)
      : parse({ markup, type: mltype, root: tagName, convertMarkup })
    );

    if (mltype !== "html" && convertMarkup) dom = converter ? converter(dom) : xml2html(dom);
  };

  return dom;
};

const parse = async ({ markup, type, root, converter, convertMarkup }) => {
  let doc;
  
  if (/thead|tbody|th|tr|td/.test(root)) {
    const element = document.createElement(root);
    element.innerHTML = markup;
    return element;
  }
  else if (window.DOMParser) doc = new DOMParser().parseFromString(markup, `text/${type}`);
  else {
    doc = new ActiveXObject("Microsoft.XMLDOM");
    doc.async = false;
    doc.loadXML(markup);
  };

  return (
    root ? doc.querySelector(root)
    : doc.querySelector("body").firstElementChild
  );
};