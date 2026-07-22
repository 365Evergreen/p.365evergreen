// components/Tabs.tsx
import { useState, useEffect } from 'react';

// --- TypeScript Contracts ---
export interface TabIndexItem {
  id: string;
  label: string;
  blobPath: string;
}

export interface PageTabIndex {
  pageId: string;
  tabs: TabIndexItem[];
}

export interface DynamicTabSchema {
  version: string;
  componentType: 'form' | 'markdown';
  meta: {
    title: string;
    description?: string;
  };
  fields: Array<{
    name: string;
    type: 'text' | 'number' | 'boolean' | 'select';
    label: string;
    defaultValue?: string | number | boolean;
    options?: string[];
  }>;
}

interface TabsProps {
  pageId: string;
  indexUrl: string; // The URL endpoint to download your master index mapping JSON file
}

export function Tabs({ pageId, indexUrl }: TabsProps) {
  // State elements for managing the layout lifecycle
  const [availableTabs, setAvailableTabs] = useState<TabIndexItem[]>([]);
  const [activeTabId, setActiveTabId] = useState<string | null>(null);
  const [schemaCache, setSchemaCache] = useState<Record<string, DynamicTabSchema>>({});
  
  // UI Status Tracking
  const [indexLoading, setIndexLoading] = useState<boolean>(true);
  const [blobLoading, setBlobLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Stage 1: Fetch the core page layout mapping on component mount
  useEffect(() => {
    const fetchPageIndex = async () => {
      try {
        setIndexLoading(true);
        const res = await fetch(indexUrl);
        if (!res.ok) throw new Error('Could not download master page tab index.');
        
        const allIndices: PageTabIndex[] = await res.json();
        const currentPageConfig = allIndices.find((item) => item.pageId === pageId);
        
        if (currentPageConfig && currentPageConfig.tabs.length > 0) {
          setAvailableTabs(currentPageConfig.tabs);
          setActiveTabId(currentPageConfig.tabs[0].id); // Auto-focus the first configured tab
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed loading layout parameters.');
      } finally {
        setIndexLoading(false);
      }
    };

    fetchPageIndex();
  }, [pageId, indexUrl]);

  // Stage 2: Lazy download the chosen tab's distinct JSON block file content upon activation
  useEffect(() => {
    if (!activeTabId) return;
    if (schemaCache[activeTabId]) return; // Skip if file configuration is already locally cached

    const targetTab = availableTabs.find((t) => t.id === activeTabId);
    if (!targetTab) return;

    const fetchTabBlob = async () => {
      try {
        setBlobLoading(true);
        setError(null);
        
        const res = await fetch(targetTab.blobPath);
        if (!res.ok) throw new Error(`Could not fetch data for tab: ${targetTab.label}`);
        
        const schemaData: DynamicTabSchema = await res.json();
        
        setSchemaCache((prev) => ({
          ...prev,
          [activeTabId]: schemaData
        }));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error syncing block layout contents.');
      } finally {
        setBlobLoading(false);
      }
    };

    fetchTabBlob();
  }, [activeTabId, availableTabs, schemaCache]);

  // Render Status Checkpoints
  if (indexLoading) return <div className="loading-state">Resolving layout config for Page {pageId}...</div>;
  if (error && availableTabs.length === 0) return <div className="error-state" style={{ color: 'red' }}>Layout configuration error: {error}</div>;
  if (availableTabs.length === 0) return <div className="empty-state">No dynamic tabs map to Page ID "{pageId}".</div>;

  const currentActiveSchema = activeTabId ? schemaCache[activeTabId] : null;

  return (
    <div className="dynamic-tabs-wrapper" style={{ fontFamily: 'sans-serif', margin: '20px' }}>
      {/* Tab Navigation Header Controls */}
      <div className="tabs-nav-bar" style={{ display: 'flex', borderBottom: '2px solid #e2e8f0', gap: '4px' }}>
        {availableTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTabId(tab.id)}
            style={{
              padding: '12px 24px',
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              fontSize: '16px',
              borderBottom: activeTabId === tab.id ? '3px solid #3182ce' : '3px solid transparent',
              fontWeight: activeTabId === tab.id ? '600' : '400',
              color: activeTabId === tab.id ? '#3182ce' : '#4a5568',
              transition: 'all 0.2s ease'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Dynamic Main View Content Panel Area */}
      <div className="tab-viewport-panel" style={{ padding: '24px 0' }}>
        {blobLoading && <div className="skeleton-loader">Downloading block configuration from blob container...</div>}
        
        {error && !blobLoading && <div style={{ color: 'red', margin: '10px 0' }}>Failed to render panel contents: {error}</div>}
        
        {!blobLoading && currentActiveSchema && (
          <TabPanelRenderer schema={currentActiveSchema} />
        )}
      </div>
    </div>
  );
}

// --- Component Content Layout Factory ---
interface TabPanelRendererProps {
  schema: DynamicTabSchema;
}

function TabPanelRenderer({ schema }: TabPanelRendererProps) {
  return (
    <div className="compiled-content-view">
      <h2 style={{ margin: '0 0 8px 0', color: '#1a202c' }}>{schema.meta.title}</h2>
      {schema.meta.description && (
        <p style={{ margin: '0 0 20px 0', color: '#718096', lineHeight: '1.5' }}>
          {schema.meta.description}
        </p>
      )}

      {/* Dynamic Content Structure Block Mapping */}
      {schema.componentType === 'form' && (
        <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '400px' }}>
          {schema.fields.map((field) => (
            <div key={field.name} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '14px', fontWeight: '600', color: '#4a5568' }}>{field.label}</label>
              
              {field.type === 'select' ? (
                <select 
                  defaultValue={String(field.defaultValue)} 
                  style={{ padding: '8px', borderRadius: '4px', border: '1px solid #cbd5e0' }}
                >
                  {field.options?.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              ) : field.type === 'boolean' ? (
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontWeight: 'normal' }}>
                  <input type="checkbox" defaultChecked={Boolean(field.defaultValue)} />
                  <span>Toggle choice</span>
                </label>
              ) : (
                <input 
                  type="text" 
                  defaultValue={String(field.defaultValue || '')} 
                  style={{ padding: '8px', borderRadius: '4px', border: '1px solid #cbd5e0' }} 
                />
              )}
            </div>
          ))}
          <button type="submit" style={{ padding: '10px', background: '#3182ce', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: '600' }}>
            Save Options
          </button>
        </form>
      )}

      {schema.componentType === 'markdown' && (
        <div className="markdown-static-block" style={{ borderLeft: '4px solid #cbd5e0', paddingLeft: '16px', fontStyle: 'italic', color: '#4a5568' }}>
          <p>This layout section functions as a verified rich content block read direct from storage config.</p>
        </div>
      )}
    </div>
  );
}
