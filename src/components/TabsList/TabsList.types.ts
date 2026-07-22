// types/tabs.ts

// 1. Structure of the main index mapping page IDs to available tabs
export interface PageTabIndex {
  pageId: string;
  tabs: Array<{
    id: string;       // Unique identifier (matches the blob filename, e.g., 'profile-schema.json')
    label: string;    // Human-readable title displayed on the tab button
    blobPath: string; // The URL or relative path to fetch the JSON from blob storage
  }>;
}

// 2. Shape of the individual tab configuration files stored in Blob Storage
export interface DynamicTabSchema {
  version: string;
  componentType: 'form' | 'dashboard' | 'markdown' | 'data-grid';
  meta: {
    title: string;
    description?: string;
  };
  // The layout engine uses this schema field to render UI fields/widgets dynamically
  fields: Array<{
    name: string;
    type: 'text' | 'number' | 'boolean' | 'select';
    label: string;
    defaultValue?: never;
    options?: string[]; // Used if type is 'select'
  }>;
}
