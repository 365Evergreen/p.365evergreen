import React, { useState } from 'react';

export interface TabConfig {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface TabsListProps {
  tabs: TabConfig[];
  defaultActiveTabId?: string;
  className?: string;
  tabsClassName?: string;
  contentClassName?: string;
  activeTabClassName?: string;
  tabClassName?: string;
}

const TabsList: React.FC<TabsListProps> = ({
  tabs,
  defaultActiveTabId,
  className = '',
  tabsClassName = '',
  contentClassName = '',
  activeTabClassName = '',
  tabClassName = '',
}) => {
  const [activeTabId, setActiveTabId] = useState<string>(
    defaultActiveTabId || (tabs.length > 0 ? tabs[0].id : '')
  );

  if (tabs.length === 0) {
    return null;
  }

  const activeTab = tabs.find((tab) => tab.id === activeTabId) || tabs[0];

  return (
    <div className={`tabs-container ${className}`}>
      <div className={`tabs-list ${tabsClassName}`} role="tablist" style={{ display: 'flex', borderBottom: '1px solid #e2e8f0' }}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            id={`tab-${tab.id}`}
            role="tab"
            aria-selected={activeTabId === tab.id}
            aria-controls={`panel-${tab.id}`}
            onClick={() => setActiveTabId(tab.id)}
            className={`${tabClassName} ${activeTabId === tab.id ? activeTabClassName : ''}`}
            style={{
              padding: '12px 24px',
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              borderBottom: activeTabId === tab.id ? '2px solid #3182ce' : '2px solid transparent',
              fontWeight: activeTabId === tab.id ? '600' : '400',
              color: activeTabId === tab.id ? '#3182ce' : '#4a5568',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div
        className={`tab-content ${contentClassName}`}
        id={`panel-${activeTab.id}`}
        role="tabpanel"
        aria-labelledby={`tab-${activeTab.id}`}
        style={{ padding: '20px 0' }}
      >
        {activeTab.content}
      </div>
    </div>
  );
};

export default TabsList;