export interface ContentItem {
  metadata: Metadata;
  content: Block[];
}

export interface Metadata {
  id: string;
  title: string;
  slug: string;
  description?: string;
  publishedDate?: string;
}

export interface Block {
  id: string;
  type: string;
  props: Record<string, unknown>;
}
