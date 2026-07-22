export const CONTENT_BASE_URL =
  "https://cdn.365evergreen.com/content";

export const CONTENT_URLS = {
  POSTS: `${CONTENT_BASE_URL}/posts/posts.json`,
  PAGES: `${CONTENT_BASE_URL}/pages/index.json`,
  NAVIGATION: `${CONTENT_BASE_URL}/navigation/navigation.json`,
  CATEGORIES: `${CONTENT_BASE_URL}/categories/categories.json`,
  FORMS: `${CONTENT_BASE_URL}/forms/index.json`,
  RESOURCES: `${CONTENT_BASE_URL}/resources/index.json`,
  TABS: `${CONTENT_BASE_URL}/tabs/index.json`,
} as const;