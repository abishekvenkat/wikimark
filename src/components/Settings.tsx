import React from 'react';
import { Settings as SettingsIcon, X } from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';
import * as Select from '@radix-ui/react-select';
import { Settings as SettingsType } from '../types';

interface SettingsProps {
  settings: SettingsType;
  onSettingsChange: (settings: SettingsType) => void;
}

export function Settings({ settings, onSettingsChange }: SettingsProps) {
  return (
  <Dialog.Root>
  <Dialog.Trigger asChild>
    <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700">
      <SettingsIcon className="w-5 h-5" />
    </button>
  </Dialog.Trigger>
  <Dialog.Portal>
    <Dialog.Overlay className="fixed inset-0 bg-black/50" />
    <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-black p-6 w-[90vw] max-w-md">
      <div className="flex justify-between items-center mb-4">
        <Dialog.Title className="text-xl font-semibold dark:text-white">
          Settings
        </Dialog.Title>
        <Dialog.Close asChild>
          <button className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700">
            <X className="w-5 h-5 dark:text-white" />
          </button>
        </Dialog.Close>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block mb-2 dark:text-white">Font Size</label>
          <Select.Root
            value={settings.fontSize}
            onValueChange={(value: SettingsType['fontSize']) =>
              onSettingsChange({ ...settings, fontSize: value })
            }
          >
            <Select.Trigger className="w-full p-2 border dark:border-gray-600 dark:bg-black dark:text-white">
              <Select.Value className="dark:text-white" />
            </Select.Trigger>
            <Select.Portal>
              <Select.Content className="bg-white dark:bg-black border shadow-lg dark:border-gray-600">
                <Select.Viewport>
                  <Select.Item value="small" className="p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white">
                    <Select.ItemText className="dark:text-white">Small</Select.ItemText>
                  </Select.Item>
                  <Select.Item value="medium" className="p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white">
                    <Select.ItemText className="dark:text-white">Medium</Select.ItemText>
                  </Select.Item>
                  <Select.Item value="large" className="p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white">
                    <Select.ItemText className="dark:text-white">Large</Select.ItemText>
                  </Select.Item>
                </Select.Viewport>
              </Select.Content>
            </Select.Portal>
          </Select.Root>
        </div>

        <div>
          <label className="block mb-2 dark:text-white">Content Width</label>
          <Select.Root
            value={settings.contentWidth}
            onValueChange={(value: SettingsType['contentWidth']) =>
              onSettingsChange({ ...settings, contentWidth: value })
            }
          >
            <Select.Trigger className="w-full p-2 border dark:border-gray-600 dark:bg-black dark:text-white">
              <Select.Value className="dark:text-white" />
            </Select.Trigger>
            <Select.Portal>
              <Select.Content className="bg-white dark:bg-black border shadow-lg dark:border-gray-600 dark:text-white">
                <Select.Viewport>
                  <Select.Item value="standard" className="p-2 cursor-pointer hover:bg-black dark:hover:bg-gray-700">
                    <Select.ItemText className="dark:text-white">Standard</Select.ItemText>
                  </Select.Item>
                  <Select.Item value="wide" className="p-2 cursor-pointer hover:bg-blackts  dark:hover:bg-gray-700">
                    <Select.ItemText className="dark:text-white">Wide</Select.ItemText>
                  </Select.Item>
                </Select.Viewport>
              </Select.Content>
            </Select.Portal>
          </Select.Root>
        </div>

        <div className="flex items-center justify-between">
          <label className="dark:text-white">Show Images</label>
          <input
            type="checkbox"
            checked={settings.showImages}
            onChange={(e) => onSettingsChange({ ...settings, showImages: e.target.checked })}
            className="w-4 h-4"
          />
        </div>

        <div className="flex items-center justify-between">
          <label className="dark:text-white">Show Table of Contents</label>
          <input
            type="checkbox"
            checked={settings.showToc}
            onChange={(e) => onSettingsChange({ ...settings, showToc: e.target.checked })}
            className="w-4 h-4"
          />
        </div>
      </div>
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>
  );
}