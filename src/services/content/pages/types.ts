import type {
  Author,
  SeoMeta,
  Status,
} from '../../../types/content';

export interface Page {
  id: string;
  title: string;
  status: Status;
  author: Author;
  seo: SeoMeta;
}

export interface PageIndexEntry {
  id: string;
  slug: string;
  url: string;
}

export interface PagesIndexDoc {
  items: PageIndexEntry[];
}