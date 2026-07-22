import type {
  Author,
  SeoMeta,
  Status,
} from '../../../types/content';

export interface Tab {
  id: string;
  title: string;
  status: Status;
  author: Author;
  seo: SeoMeta;
}

export interface TabIndexEntry {
  id: string;
  slug: string;
  url: string;
}

export interface TabsIndexDoc {
  items: TabIndexEntry[];
}