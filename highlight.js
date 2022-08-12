import hljs from "./static/js/highlight.min.js";
import { hljsFlat } from "./static/js/flat.js";

hljs.registerLanguage('flat', hljsFlat);

function escapeHTML(str) {
  return str.replaceAll(/[}{]/g, 
    tag => ({
      '{': '{`{`}',
      '}': '{`}`}'
    }[tag]));
}

export default async function ({content}) {
  let matches = [];

  let index = content.indexOf(`<code`);
  
  while (index > 0) {
    const start = content.indexOf(">", index + "<code".length) + 1;

    if (start === 0) {
      break;
    }

    const end = content.indexOf(`</code>`, start);

    if (end === -1) {
      break;
    }

    matches.push({start, end});

    index = content.indexOf(`<code`, end + "</code>".length);
  }

  for (let i = matches.length - 1; i >= 0; i--) {
    const start = matches[i].start;
    const end = matches[i].end;
    const trimmed = content.substring(start, end).trim();
    const value = trimmed.substring(2, trimmed.length - 2 - 1).trim();
    content = content.substring(0, start) + escapeHTML(hljs.highlight(value, {language: 'flat'}).value) + content.substring(end);
  }

  return {code: content};
}