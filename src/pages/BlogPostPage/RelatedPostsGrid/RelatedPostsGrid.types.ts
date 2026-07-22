export interface RelatedPostItem {
  pageId?: string
  category?: string
  title: string
  excerpt?: string
  meta?: string
  linkTo: string
}

export interface RelatedPostsGridProps {
  heading: string
  posts: RelatedPostItem[]
  viewAllLabel?: string
  viewAllLink?: string
}
