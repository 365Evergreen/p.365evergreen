// components/DynamicTabEngine.tsx
import { useState, useEffect, useMemo } from 'react';
import type { PageTabIndex, DynamicTabSchema } from './TabsList.types';
import { SchemaRenderer } from './SchemaRenderer'; // The component that compiles JSON to UI

interface DynamicTabEngineProps {
  pageId: string;
  // You can pass the index down if pre-fetched via SSR/SSG, or fetch it inside useEffect
  tabIndexData: PageTabIndex[]; 
}

export function DynamicTabEngine({ pageId, tabIndexData }: DynamicTabEngineProps) {
  // Find tabs registered specifically to this page ID
  const pageConfig = tabIndexData.find((index) => index.pageId === pageId);
  const availableTabs = useMemo(() => pageConfig?.tabs || [], [pageConfig]);

  // Track the currently highlighted tab ID
  const [activeTabId, setActiveTabId] = useState<string | null>(
    availableTabs.length > 0 ? availableTabs[0].id : null
  );

  // Cache loaded schemas in an object dictionary to avoid fetching a blob twice
  const [schemaCache, setSchemaCache] = useState<Record<string, DynamicTabSchema>>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Automatically fetch the JSON Blob file whenever the user switches tabs
  useEffect(() => {
    if (!activeTabId) return;

    // Step A: Check if we have already fetched this specific tab's blob config
    if (schemaCache[activeTabId]) return;

    const targetTab = availableTabs.find((t) => t.id === activeTabId);
    if (!targetTab) return;

    const fetchTabSchemaFromBlob = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Step B: Download the raw JSON file from Azure/AWS Blob Storage
        const response = await fetch(targetTab.blobPath);
        if (!response.ok) {
          throw new Error(`Failed to load tab schema: ${response.statusText}`);
        }
        
        const schemaData: DynamicTabSchema = await response.json();

        // Step C: Save to localized cache using immutable updates
        setSchemaCache((prev) => ({
          ...prev,
          [activeTabId]: schemaData
        }));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown blob error');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTabSchemaFromBlob();
  }, [activeTabId, availableTabs, schemaCache]);

  if (availableTabs.length === 0) {
    return <div>No custom tabs configured for Page ID: "{pageId}"</div>;
  }

  const activeSchema = activeTabId ? schemaCache[activeTabId] : null;

  return (
    <div className="dynamic-tabs-layout">
      {/* 1. Header Navigation Bar */}
      <div className="tab-headers-row" style={{ display: 'flex', gap: '8px', borderBottom: '1px solid #ccc' }}>
        {availableTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTabId(tab.id)}
            style={{
              padding: '10px 16px',
              cursor: 'pointer',
              border: 'none',
              borderBottom: activeTabId === tab.id ? '3px solid #007acc' : '3px solid transparent',
              background: 'transparent',
              fontWeight: activeTabId === tab.id ? 'bold' : 'normal'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 2. Dynamic Content Display Area */}
      <div className="tab-panel-viewport" style={{ padding: '20px 0' }}>
        {isLoading && <div>Downloading tab schema from storage...</div>}
        
        {error && <div style={{ color: 'red' }}>Error: {error}</div>}
        
        {!isLoading && activeSchema && (
          /* Pass the verified type-safe schema blob over to your rendering pipeline */
          <SchemaRenderer schema={activeSchema} />
        )}
      </div>
    </div>
  );
}
