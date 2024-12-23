import TurndownService from 'turndown';
import { gfm } from 'turndown-plugin-gfm';
import { cleanupWikiContent, removeUnwantedElements, processInfobox, truncateAfterReferences, removeEdit } from './wikiParser';
import { extractPageTitle } from './linkHandler';

const turndownService = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced',
  bulletListMarker: '-'
});

turndownService.addRule('table', {
  filter: 'table',
  replacement: function(content, node) {
    const table = node as HTMLTableElement;
    if (!table.rows.length) return '';

    let markdown = '\n';
    
    if (table.rows[0]) {
      markdown += '| ' + Array.from(table.rows[0].cells)
        .map(cell => cell.textContent?.trim() || '')
        .join(' | ') + ' |\n';
      
      markdown += '| ' + Array(table.rows[0].cells.length)
        .fill('---')
        .join(' | ') + ' |\n';
    }

    for (let i = 1; i < table.rows.length; i++) {
      markdown += '| ' + Array.from(table.rows[i].cells)
        .map(cell => cell.textContent?.trim() || '')
        .join(' | ') + ' |\n';
    }

    return markdown + '\n';
  }
});

turndownService.use(gfm);

export async function convertWikiToMarkdown(url: string): Promise<{ markdown: string; title: string }> {
  try {
    const pageTitle = extractPageTitle(url);
    const apiUrl = `https://en.wikipedia.org/w/api.php?action=parse&page=${pageTitle}&format=json&prop=text|displaytitle&origin=*`;

    const response = await fetch(apiUrl);
    const data = await response.json();
//    console.log(data);
    
    if (data.error) {
      throw new Error(data.error.info);
    }

    let content = data.parse.text['*'];
    const title = (data?.parse?.displaytitle || pageTitle)?.replace(/<[^>]*>/g, '');

    content = removeEdit(content);
    content = processInfobox(content); 
    content = cleanupWikiContent(content);
    content = truncateAfterReferences(content);
    content = removeUnwantedElements(content);
    
    const markdown = turndownService.turndown(content);
    const markdownWithTitle = `# ${title}\n\n${markdown}`;


    return {
      markdown: markdownWithTitle,
      title
    };
  } catch (error) {
    console.error('Error converting Wiki to Markdown:', error);
    throw error;
  }
}