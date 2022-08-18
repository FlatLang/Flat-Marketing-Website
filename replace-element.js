export default async function ({content}) {
  const templateStartPattern = /<\s*element\s+id="([^"]+)"\s*>/g;
  const templateEndPattern = /<\/element>/g;
  const replacementPattern = /<\s*replace\s+id="([^"]+)"[^>]*?><\/replace>/g;

  const startMatches = Array.from(content.matchAll(templateStartPattern));
  const endMatches = Array.from(content.matchAll(templateEndPattern));

  if (startMatches?.length > 0 && startMatches.length === endMatches?.length) {
    const elements = {};

    for (let i = startMatches.length - 1; i >= 0; i--) {
      const start = startMatches[i];
      const end = endMatches[i];
      const value = content.substring(start.index + start[0].length, end.index).trim();

      content = content.substring(0, start.index) + content.substring(end.index + end[0].length);

      elements[start[1]] = value;
    }

    content = content.replace(replacementPattern, (str, id) => {
      return elements[id] || str;
    });
  }

  return {code: content};
}