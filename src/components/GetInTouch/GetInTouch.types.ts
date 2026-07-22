export type GetInTouchFieldType = 'text' | 'email' | 'phone' | 'textarea'
export type GetInTouchGap = 'sm' | 'md' | 'large'

export interface GetInTouchProps {
  blobStorageUrl: string
}

export interface GetInTouchColumnDefinition {
  id: 'content' | 'form'
  width: number
}

export interface GetInTouchFieldDefinition {
  id: string
  type: GetInTouchFieldType
  label: string
  columnSpan: number
  required: boolean
  placeholder?: string
  rows?: number
}

export interface GetInTouchDefinition {
  id: string
  type: 'form'
  layout: {
    container: 'two-column'
    gap: GetInTouchGap
    columns: GetInTouchColumnDefinition[]
  }
  content: {
    title: string
    description: string
    bullets: string[]
  }
  form: {
    layout: {
      columns: number
      gap: GetInTouchGap
    }
    fields: GetInTouchFieldDefinition[]
  }
}
