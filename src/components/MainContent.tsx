import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import clsx from 'clsx';
import { Settings } from '../types';

interface MainContentProps {
  markdown: string;
  settings: Settings;
  url: string;
  onWikiLinkClick: (url: string) => void;
}

export function MainContent({ markdown, settings, url, onWikiLinkClick }: MainContentProps) {
  const contentClasses = clsx(
    'prose dark:prose-invert max-w-none',
    'w-full lg:ml-64',
    !settings.showToc && 'lg:ml-0',
    {
      'prose-sm': settings.fontSize === 'small',
      'prose-base': settings.fontSize === 'medium',
      'prose-lg': settings.fontSize === 'large',
      'max-w-3xl': settings.contentWidth === 'standard',
      'max-w-5xl': settings.contentWidth === 'wide',
    }
  );

  function generateId(text: React.ReactNode): string {
    return String(text).toLowerCase().replace(/[^\w]+/g, '-');
  }

  return (
    <div className={contentClasses}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          img: ({ node, ...props }) => (
            settings.showImages ? <img {...props} /> : null
          ),
          a: ({ node, children, href, ...props }) => (
            <a
              href={href}
              {...props}
              onClick={(e) => {
                e.preventDefault();
                if (href) onWikiLinkClick(href);
              }}
            >
              {children}
            </a>
          ),
          h1: ({ node, ...props }) => <h1 id={generateId(props.children)} {...props} />,
          h2: ({ node, ...props }) => <h2 id={generateId(props.children)} {...props} />,
          h3: ({ node, ...props }) => <h3 id={generateId(props.children)} {...props} />,
          h4: ({ node, ...props }) => <h4 id={generateId(props.children)} {...props} />,
          h5: ({ node, ...props }) => <h5 id={generateId(props.children)} {...props} />,
        }}
      >
        {markdown}
      </ReactMarkdown>
      {url && (
        <div className="mt-8 pt-4 border-t dark:border-gray-800">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Open original Wikipedia article →
          </a>
        </div>
      )}
    </div>
  );
}