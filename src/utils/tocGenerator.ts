import { TableOfContentsItem } from '../types';

function generateUniqueId(text: string, existingIds: Set<string>): string {
  let id = text.toLowerCase().replace(/[^\w]+/g, '-');
  let uniqueId = id;
  let counter = 1;
  
  while (existingIds.has(uniqueId)) {
    uniqueId = `${id}-${counter}`;
    counter++;
  }
  
  existingIds.add(uniqueId);
  return uniqueId;
}

export function generateTableOfContents(markdown: string): TableOfContentsItem[] {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  const items: TableOfContentsItem[] = [];
  const existingIds = new Set<string>();
  let match;

  while ((match = headingRegex.exec(markdown)) !== null) {
    const level = match[1].length;
    const text = match[2];
    const id = generateUniqueId(text, existingIds);
    
    items.push({ id, text, level });
  }

  return items;
}