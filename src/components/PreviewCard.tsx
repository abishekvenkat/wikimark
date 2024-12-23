import React from 'react';
import { Eye } from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';

export function PreviewCard() {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700">
          <Eye className="w-5 h-5" />
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-black p-6 w-[90vw] max-w-2xl max-h-[85vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <Dialog.Title className="text-xl font-semibold">Preview</Dialog.Title>
            <Dialog.Close className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700">
              <span className="sr-only">Close</span>
              ×
            </Dialog.Close>
          </div>
          
          <div className="prose dark:prose-invert max-w-none">
            <h2>Support</h2>
            <ul>
              <li>If you like this project, <a href="https://github.com/abishekvenkat/wikimark.git">⭐ on GitHub</a>!</li>           
            </ul>
            <h2>Features</h2>
            <ul>
              <li>Convert Wikipedia articles to clean Markdown</li>
              <li>Preserve formatting and tables</li>
              <li>Interactive table of contents</li>
              <li>Customizable display settings</li>
            </ul>

            <h2>Coming Soon</h2>
            <ol>
              <li>Infobox parsing</li>
              <li>Formatting fixes</li>
            </ol>
            
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}