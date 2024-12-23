import React, { useState } from 'react';
import { Download } from 'lucide-react';
import { Settings } from './components/Settings';
import { TableOfContents } from './components/TableOfContents';
import { MainContent } from './components/MainContent';
import { PreviewCard } from './components/PreviewCard';
import { convertWikiToMarkdown } from './utils/wikiConverter';
import { generateTableOfContents } from './utils/tocGenerator';
import { handleWikiLinkClick } from './utils/linkHandler';
import { Settings as SettingsType, TableOfContentsItem } from './types';
import './styles/content.css';

export default function App() {
  const [url, setUrl] = useState('');
  const [markdown, setMarkdown] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeHeading, setActiveHeading] = useState('');
  const [toc, setToc] = useState<TableOfContentsItem[]>([]);
  const [pageTitle, setPageTitle] = useState('');
  const [settings, setSettings] = useState<SettingsType>({
    fontSize: 'medium',
    contentWidth: 'standard',
    showImages: true,
    showToc: true,
  });

  const handleConvert = async (wikiUrl: string) => {
    if (!wikiUrl) return;

    setLoading(true);
    setError('');

    try {
      const { markdown, title } = await convertWikiToMarkdown(wikiUrl);
      setMarkdown(markdown);
      setUrl(wikiUrl);
      setPageTitle(title);
      setToc(generateTableOfContents(markdown));
    } catch (err) {
      setError('Failed to convert the Wikipedia page. Please check the URL and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!pageTitle) return;
  
    const cleanTitle = pageTitle
      .replace(/<[^>]*>/g, '') 
      .replace(/[^a-zA-Z0-9\s-]/g, '') 
      .trim()
      .replace(/\s+/g, '-')
      .toLowerCase();
  
    const fileName = `${cleanTitle}.md`; 
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
  
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName; 
    document.body.appendChild(a);
    a.click();
  
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  

  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-gray-100">
    <header className="sticky top-0 z-50 bg-white dark:bg-black border-b dark:border-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex-1 flex items-center"> { }
            <span className="text-xl font-bold mr-6">Wiki&gt;M↓</span> { }
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter Wikipedia URL..."
              className="w-full px-4 py-2 border dark:border-gray-700 bg-white dark:bg-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
            <div className="flex items-center space-x-2 ml-4">
              <button
                onClick={() => handleConvert(url)}
                disabled={loading || !url}
                className="px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50"
              >
                {loading ? 'Converting...' : 'Convert'}
              </button>
              {markdown && (
                <button
                  onClick={handleDownload}
                  className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  <Download className="w-5 h-5" />
                </button>
              )}
              <Settings settings={settings} onSettingsChange={setSettings} />
              <PreviewCard />
            </div>
          </div>
        </div>
      </header>

      {error && (
        <div className="max-w-7xl mx-auto px-4 py-4 text-red-500">
          {error}
        </div>
      )}

      {markdown && (
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex gap-8">
            {settings.showToc && (
              <div className="hidden lg:block">
                <TableOfContents items={toc} activeId={activeHeading} />
              </div>
            )}
            <MainContent
              markdown={markdown}
              settings={settings}
              url={url}
              onWikiLinkClick={handleConvert}
            />
          </div>
        </div>
      )}
    </div>
  );
}