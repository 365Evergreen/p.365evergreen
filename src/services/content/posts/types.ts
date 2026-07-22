import type {
  Author,
  SeoMeta,
  Status,
} from '../../../types/content';

export interface Post {
  id: string;
  title: string;
  status: Status;
  author: Author;
  seo: SeoMeta;
}

export interface PostIndexEntry {
  id: string;
  slug: string;
  url: string;
}

export interface PostsIndexDoc {
  items: PostIndexEntry[];
}