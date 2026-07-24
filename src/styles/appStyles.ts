import { makeStyles, shorthands, tokens } from '@fluentui/react-components';

export const useAppStyles = makeStyles({
  viewport: {
    height: '100vh',
    backgroundColor: tokens.colorNeutralBackground2,
    overflowX: 'hidden',
    width: '100%',
  },

  sidebar: {
    position: 'fixed',
    top: 0,
    left: 0,
    height: '100vh',
    zIndex: 1000,
    backgroundColor: tokens.colorNeutralBackground1,
    color: tokens.colorNeutralForeground1,
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.padding('20px'),
    gap: '16px',
    borderRight: `1px solid ${tokens.colorNeutralStroke2}`,
    width: '180px',
    transition: 'width 0.2s ease, box-sizing 0.2s ease',
    boxSizing: 'border-box',
    overflow: 'hidden',
  },

  sidebarCollapsed: {
    width: '52px',
    ...shorthands.padding('10px', '10px'),
    alignItems: 'center',
  },

  sidebarNavItems: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    width: '100%',
    marginTop: '8px',
    flex: 1,
    minHeight: 0,
  },

  sidebarFooter: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: 'auto',
  },

  sidebarAvatar: {
    cursor: 'pointer',
  },

  sidebarToggle: {
    alignSelf: 'flex-end',
  },

  sidebarToggleCollapsed: {
    alignSelf: 'center',
  },

  main: {
    display: 'grid',
    gridTemplateRows: '72px 1fr auto',
    minWidth: 0,
    marginLeft: '180px',
    width: 'calc(100% - 180px)',
    maxWidth: 'calc(100% - 180px)',
    transition: 'margin-left 0.2s ease, width 0.2s ease',
    '@media (max-width: 640px)': {
      marginLeft: '52px',
      width: 'calc(100% - 52px)',
      maxWidth: 'calc(100% - 52px)',
    },
  },

  mainCollapsed: {
    marginLeft: '52px',
    width: 'calc(100% - 52px)',
    maxWidth: 'calc(100% - 52px)',
  },

  topbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...shorthands.padding('16px', '20px'),
    backgroundColor: tokens.colorNeutralBackground1,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
  },

  content: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    minHeight: 0,
  },

  fullHeight: {
    height: '100%',
    minHeight: 0,
    overflow: 'hidden',
  },

  canvas: {
    overflowY: 'auto',
    ...shorthands.padding('24px'),
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    backgroundColor: tokens.colorNeutralBackground2,
    '@media (max-width: 640px)': {
      ...shorthands.padding('16px'),
    },
  },

  promptBarContainer: {
    backgroundColor: tokens.colorNeutralBackground1,
    borderTop: `1px solid ${tokens.colorNeutralStroke2}`,
    ...shorthands.padding('16px', '20px', '20px'),
  },

  messageRow: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },

  bubbleUser: {
    alignSelf: 'flex-end',
    maxWidth: '75%',
    backgroundColor: tokens.colorBrandBackground,
    color: tokens.colorNeutralForegroundOnBrand,
    ...shorthands.padding('12px', '14px'),
    ...shorthands.borderRadius(tokens.borderRadiusLarge),
  },

  bubbleAssistant: {
    alignSelf: 'flex-start',
    maxWidth: '80%',
    backgroundColor: tokens.colorNeutralBackground1,
    ...shorthands.padding('12px', '14px'),
    ...shorthands.borderRadius(tokens.borderRadiusLarge),
    boxShadow: tokens.shadow4,
  },

  cardGrid: {
    display: 'grid',
    gap: '12px',
    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
    '@media (max-width: 640px)': {
      gridTemplateColumns: 'minmax(0, 480px)',
      justifyContent: 'center',
      width: '100%',
    },
  },

  promptRow: {
    display: 'grid',
    gridTemplateColumns: '1fr auto',
    gap: '12px',
    alignItems: 'end',
  },

  quickActions: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    marginTop: '12px',
  },

  navButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    textDecorationLine: 'none',
    color: tokens.colorNeutralForeground1,
    ...shorthands.padding('8px', '12px'),
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    ':hover': {
      backgroundColor: tokens.colorNeutralBackground2,
    },
  },

  navButtonActive: {
    backgroundColor: tokens.colorNeutralBackground2,
    color: tokens.colorBrandForeground1,
  },

  muted: {
    color: tokens.colorNeutralForeground3,
  },

  actionStatusText: {
    color: tokens.colorNeutralForeground3,
  },

  landing: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 0,
    overflowY: 'auto',
    ...shorthands.padding('48px', '24px'),
    backgroundColor: tokens.colorNeutralBackground2,
  },

  landingContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '32px',
    width: '100%',
    maxWidth: '960px',
  },

  landingInputRow: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
  },

  landingInput: {
    width: '100%',
    maxWidth: '960px',
  },

  landingTip: {
    color: tokens.colorNeutralForeground3,
    textAlign: 'center',
  },

  landingSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    width: '100%',
  },

  landingSectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  landingUpNextCard: {
    width: '100%',
    cursor: 'default',
  },

  landingSuggestions: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
    gap: '12px',
    width: '100%',
    '@media (max-width: 640px)': {
      gridTemplateColumns: 'minmax(0, 480px)',
      justifyContent: 'center',
    },
  },

  landingSuggestionCard: {
    cursor: 'pointer',
    ':hover': {
      boxShadow: tokens.shadow8,
    },
  },

  blankScreen: {
    backgroundColor: tokens.colorNeutralBackground2,
    height: '100%',
    width: '100%',
  },

  queryLibrary: {
    display: 'grid',
    gridTemplateColumns: '320px 1fr',
    height: '100%',
    overflow: 'hidden',
    backgroundColor: tokens.colorNeutralBackground2,
  },

  queryLibrarySidebar: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    borderRight: `1px solid ${tokens.colorNeutralStroke2}`,
    backgroundColor: tokens.colorNeutralBackground1,
    ...shorthands.padding('16px'),
    minHeight: 0,
  },

  queryLibraryToolbar: {
    display: 'flex',
    gap: '8px',
    alignItems: 'center',
  },

  querySearchInput: {
    flex: 1,
  },

  queryList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    overflowY: 'auto',
    flex: 1,
    minHeight: 0,
  },

  queryGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },

  queryGroupTitle: {
    color: tokens.colorNeutralForeground3,
    textTransform: 'uppercase',
    fontSize: tokens.fontSizeBase200,
  },

  queryGroupItems: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },

  queryCard: {
    cursor: 'pointer',
    ':hover': {
      boxShadow: tokens.shadow4,
    },
  },

  queryLibraryMain: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    ...shorthands.padding('20px'),
    overflowY: 'auto',
    minHeight: 0,
  },

  queryEmptyState: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    flex: 1,
    color: tokens.colorNeutralForeground3,
  },

  queryDetail: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },

  queryDetailHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: '16px',
  },

  queryMetaGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
    gap: '12px',
  },

  queryParameters: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },

  queryParameterRow: {
    display: 'grid',
    gridTemplateColumns: '140px 1fr',
    gap: '12px',
    alignItems: 'center',
  },

  queryResults: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    flex: 1,
    minHeight: 0,
  },

  queryResultHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  queryResultJson: {
    flex: 1,
    minHeight: '240px',
    fontFamily: tokens.fontFamilyMonospace,
    fontSize: tokens.fontSizeBase300,
  },

  queryEditorDialog: {
    maxWidth: '560px',
  },

  queryEditorContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },

  contentView: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    overflow: 'hidden',
    backgroundColor: tokens.colorNeutralBackground2,
  },

  contentViewHeader: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    ...shorthands.padding('20px', '24px'),
    backgroundColor: tokens.colorNeutralBackground1,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
  },

  contentViewTitle: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },

  contentViewSearch: {
    display: 'flex',
    gap: '12px',
    alignItems: 'center',
  },

  contentViewSearchInput: {
    flex: 1,
  },

  contentViewBody: {
    flex: 1,
    overflowY: 'auto',
    ...shorthands.padding('24px'),
    minHeight: 0,
    '@media (max-width: 640px)': {
      ...shorthands.padding('16px'),
    },
  },

  contentViewGrid: {
    display: 'grid',
    gap: '16px',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    '@media (max-width: 640px)': {
      gridTemplateColumns: 'minmax(0, 480px)',
      justifyContent: 'center',
      width: '100%',
    },
  },

  contentViewEmpty: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    height: '100%',
    color: tokens.colorNeutralForeground3,
  },

  fileListItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    ...shorthands.padding('12px'),
    cursor: 'pointer',
    borderRadius: tokens.borderRadiusMedium,
    ':hover': {
      backgroundColor: tokens.colorNeutralBackground2,
    },
  },

  fileListIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40px',
    height: '40px',
    borderRadius: tokens.borderRadiusMedium,
    backgroundColor: tokens.colorBrandBackground2,
    color: tokens.colorBrandForeground2,
  },

  fileListMeta: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
    flex: 1,
    minWidth: 0,
  },

  fileListName: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },

  fileListPath: {
    color: tokens.colorNeutralForeground3,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },

  responseCard: {
    width: '100%',
    boxSizing: 'border-box',
  },

  documentCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    ...shorthands.padding('16px'),
    cursor: 'pointer',
    boxSizing: 'border-box',
    ':hover': {
      boxShadow: tokens.shadow8,
    },
  },

  documentCardIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '48px',
    height: '48px',
    borderRadius: tokens.borderRadiusMedium,
    flexShrink: 0,
  },

  documentCardContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    flex: 1,
    minWidth: 0,
  },

  documentCardTitle: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },

  documentCardMeta: {
    color: tokens.colorNeutralForeground3,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },

  documentCardActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    flexShrink: 0,
  },

  documentListItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    ...shorthands.padding('12px', '16px'),
    cursor: 'pointer',
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    backgroundColor: tokens.colorNeutralBackground1,
    ':hover': {
      backgroundColor: tokens.colorNeutralBackground2,
    },
  },

  documentListIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40px',
    height: '40px',
    flexShrink: 0,
  },

  documentListContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
    flex: 1,
    minWidth: 0,
  },

  documentListTitle: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },

  documentListMeta: {
    color: tokens.colorNeutralForeground3,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },

  documentListActions: {
    display: 'flex',
    alignItems: 'center',
    flexShrink: 0,
  },

  commandBar: {
    display: 'flex',
    gap: '8px',
    ...shorthands.padding('0', '0', '16px'),
  },

  newTaskDialogContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },

  taskCard: {
    width: '100%',
    boxSizing: 'border-box',
    cursor: 'pointer',
    ':hover': {
      boxShadow: tokens.shadow8,
    },
    ':focus-visible': {
      outlineColor: tokens.colorStrokeFocus2,
      outlineStyle: 'solid',
      outlineWidth: '2px',
    },
  },

  taskCardBadges: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap',
  },

  taskCardActions: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap',
    marginTop: '12px',
  },

  taskDetailDialogContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },

  topbarSearch: {
    display: 'flex',
    gap: '8px',
    alignItems: 'center'
  },

  videoArchiveGrid: {
    display: 'grid',
    gridTemplateColumns:
      'repeat(auto-fill, minmax(320px, 1fr))',
    gap: '20px',
    width: '100%',
    padding: '16px'
  },

  videoArchiveCard: {
    maxWidth: "400px",
    width: "100%",
    height: "fit-content",
  },

  ':hover': {
    transform: 'translateY(-4px)',
    boxShadow:
      '0 6px 20px rgba(0,0,0,0.15)'
  },
  
  videoArchiveCaption: {
    color: tokens.colorNeutralForeground3,
  },

  smallRadius: { borderRadius: tokens.borderRadiusSmall },

  grayBackground: {
    backgroundColor: tokens.colorNeutralBackground3,
  },

  videoArchiveLogoBadge: {
    padding: "5px",
    borderRadius: tokens.borderRadiusSmall,
    backgroundColor: "#FFF",
    boxShadow:
      "0px 1px 2px rgba(0, 0, 0, 0.14), 0px 0px 2px rgba(0, 0, 0, 0.12)",
  }, videoArchiveSmallRadius: {
    borderRadius: tokens.borderRadiusSmall,
  }, videoArchiveGreyBackground: {
    backgroundColor: tokens.colorNeutralBackground3,
  },
  videoViewerContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    overflow: 'hidden',
    backgroundColor: tokens.colorNeutralBackground2,
    padding: '16px'
  },
  videoPlayerContainer: {
  width: '100%',
  maxWidth: '1200px',
  margin: '0 auto',
  borderRadius: '12px',
  overflow: 'hidden',
  backgroundColor: tokens.colorNeutralBackground1,
  boxShadow: tokens.shadow16
},

videoPlayerTheatre: {
  maxWidth: '100%'
},

video: {
  display: 'block',
  width: '100%',
  aspectRatio: '16 / 9',
  backgroundColor: '#000'
},

videoToolbar: {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '12px 16px',
  flexWrap: 'wrap',
  gap: '12px'
},

videoToolbarLeft: {
  display: 'flex',
  gap: '8px'
},

videoToolbarRight: {
  display: 'flex',
  gap: '8px'
},

videoToolbarTitle: {
  flex: 1,
  textAlign: 'center' as const,
  fontWeight: 600,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap' as const
},
});
