const UNWANTED_SELECTORS = [
  '.mw-editsection',
  '.reference',
  '.error',
  '.noprint',
  '.navigation-not-searchable',
  '.hatnote',
  '.portal',
  '.sistersitebox',
  '.navbox',
  'img[alt="Edit this at Wikidata"]',
  '.mw-empty-elt',
  'span.mw-editsection',
  'a.mw-editsection-visualeditor',
  '.mw-editsection-bracket',
  '[data-mw-editsection]'
];

export function cleanupWikiContent(html: string): string {
  return html
    .replace(/class="[^"]*"/g, '')
    .replace(/style="[^"]*"/g, '')
    .replace(/.mw-parser-output[^{]*{[^}]*}/g, '')
    .replace(/@media\s*{[^}]*}/g, '')
    .replace(/@media[^{]*{[^}]*}/g, '');
}

export function removeEdit(html: string): string {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');

  const editSections = doc.querySelectorAll('.mw-editsection');
  editSections.forEach(editSection => {
    editSection.remove();
  });

  return doc.body.innerHTML;
}


export function truncateAfterReferences(html: string): string {
  const referenceIndex = html.indexOf('<h2 id="References"');
  if (referenceIndex !== -1) {
    
    const referencesEndIndex = html.indexOf('</ol>', referenceIndex);
    if (referencesEndIndex !== -1) {
      return html.slice(0, referencesEndIndex + 5);
    }
  }
  return html;
}


export function processInfobox(html: string): string {
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;

  const infoboxes = tempDiv.querySelectorAll('.infobox, .infotable');

  infoboxes.forEach(infobox => {
    infobox.outerHTML = ""; 
  });

  return tempDiv.innerHTML;
}


export function removeUnwantedElements(html: string): string {
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;
  
  UNWANTED_SELECTORS.forEach(selector => {
    tempDiv.querySelectorAll(selector).forEach(el => el.remove());
  });
  
  return tempDiv.innerHTML;
}