import { parse } from 'node-html-parser';
import fs from 'fs';

export default async function ({content}) {
  const root = parse(content);
  const images = root.querySelectorAll(`img[src*=".svg"]`);

  images.forEach((img) => {
    const contents = fs.readFileSync("static/" + img.getAttribute("src"), "utf8")
      .replace(/<\?xml.+\?>/g, "");

    const svgElement = parse(contents).querySelector("svg");
    
    svgElement.setAttributes({
      ...svgElement.attributes,
      ...img.attributes
    });

    img.replaceWith(svgElement);
  });

  const code = root.toString();

  return {code};
}