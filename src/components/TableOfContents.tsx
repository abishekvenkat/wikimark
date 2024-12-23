import React, { useEffect } from 'react';
import { TableOfContentsItem } from '../types';
import clsx from 'clsx';
import ReactMarkdown from 'react-markdown';

interface TableOfContentsProps {
  items: TableOfContentsItem[];
  activeId: string;
}

export function TableOfContents({ items, activeId }: TableOfContentsProps) {
  useEffect(() => {
    if (activeId) {
      const activeElement = document.querySelector(`a[href="#${activeId}"]`);
      activeElement?.scrollIntoView({ block: 'nearest' });
    }
  }, [activeId]);

  return (
    <nav className="toc-container">
      <h2 className="text-lg font-semibold mb-4">Table of Contents</h2>
      <ul className="toc-list">
        {items.map((item) => (
          <li
            key={`${item.id}-${item.text}`}
            style={{ marginLeft: `${(item.level - 1) * 1}rem` }}
          >
            <a
              href={`#${item.id}`}
              className={clsx(
                'toc-item',
                activeId === item.id && 'active'
              )}
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById(item.id);
                element?.scrollIntoView({ behavior: 'smooth' }); 

                window.history.pushState({}, '', `#${item.id}`);
              }}
            >
              <ReactMarkdown>{item.text}</ReactMarkdown> { }
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
