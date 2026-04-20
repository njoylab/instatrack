'use client';

import { useEffect } from 'react';

type ModelContextNavigator = Navigator & {
  modelContext?: {
    provideContext?: (context: unknown) => void | Promise<void>;
  };
};

export default function WebMcpProvider() {
  useEffect(() => {
    const modelContext = (navigator as ModelContextNavigator).modelContext;

    if (!modelContext?.provideContext) {
      return;
    }

    void modelContext.provideContext({
      tools: [
        {
          name: 'open_import_dialog',
          description: 'Open the InstaTrack import dialog for followers_1.json and following.json.',
          inputSchema: {
            type: 'object',
            properties: {},
            additionalProperties: false,
          },
          execute: async () => {
            window.dispatchEvent(new CustomEvent('instatrack:open-import'));
            return { ok: true };
          },
        },
        {
          name: 'open_restore_dialog',
          description: 'Open the InstaTrack backup restore dialog.',
          inputSchema: {
            type: 'object',
            properties: {},
            additionalProperties: false,
          },
          execute: async () => {
            window.dispatchEvent(new CustomEvent('instatrack:open-restore'));
            return { ok: true };
          },
        },
        {
          name: 'go_to_export_help',
          description: 'Navigate to the guide for exporting Instagram data.',
          inputSchema: {
            type: 'object',
            properties: {},
            additionalProperties: false,
          },
          execute: async () => {
            window.location.href = '/how-to-export';
            return { ok: true };
          },
        },
      ],
    });
  }, []);

  return null;
}
