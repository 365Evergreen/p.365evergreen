import type {
  Author,
  SeoMeta,
  Status,
} from '../../../types/content';

export interface Resource {
  id: string;
  title: string;
  status: Status;
  author: Author;
  seo: SeoMeta;
}

export interface ResourceIndexEntry {
  id: string;
  slug: string;
  url: string;
}

export interface ResourcesIndexDoc {
  items: ResourceIndexEntry[];
}