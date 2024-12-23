export function cleanWikiStyles(html: string): string {
  return html.replace(/.mw-parser-output\s*{[^}]*}/g, '')
    .replace(/class="mw-parser-output"/g, '')
    .replace(/@media\s*{[^}]*}/g, '');
}

export function parseInfobox(html: string): string {
  const infoboxRegex = /<table class="infobox[^>]*>([\s\S]*?)<\/table>/g;
  return html.replace(infoboxRegex, (match) => {
    return match
      .replace(/style="[^"]*"/g, '')
      .replace(/class="[^"]*"/g, 'class="info-table"');
  });
}