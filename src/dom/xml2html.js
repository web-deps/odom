import { apply } from "./apply.js";


export const xml2html = async xml => {
  const convert = async xml => {
    const tagName = xml.tagName;

    const html = (
      xml.hasAttribute("html")
      ? document.createElement(xml.getAttribute("html"))
      : document.createElement("div")
    );

    while (xml.firstChild) html.appendChild(xml.firstChild);
    const attributes = xml.attributes;
    for (const { name, value } of attributes) html.setAttribute(name, value);
    html.hasAttribute("html") && html.removeAttribute("html");
    html.setAttribute("xml", tagName);
    html.hasAttribute("name") || html.setAttribute("name", tagName);
    xml.replaceWith(html);
    return html;
  };

  return apply(xml, convert);
};