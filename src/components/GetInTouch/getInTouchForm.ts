import type { RJSFSchema, UiSchema } from '@rjsf/utils'
import type {
  GetInTouchColumnDefinition,
  GetInTouchDefinition,
  GetInTouchFieldDefinition,
  GetInTouchFieldType,
  GetInTouchGap,
} from './GetInTouch.types'

const fieldTypes = new Set<GetInTouchFieldType>(['text', 'email', 'phone', 'textarea'])
const gapSizes = new Set<GetInTouchGap>(['sm', 'md', 'large'])
const fieldIdPattern = /^[A-Za-z][A-Za-z0-9_-]*$/

function asRecord(value: unknown, location: string): Record<string, unknown> {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    throw new Error(`${location} must be an object`)
  }
  return value as Record<string, unknown>
}

function readString(record: Record<string, unknown>, key: string, location: string): string {
  const value = record[key]
  if (typeof value !== 'string' || value.trim().length === 0) {
    throw new Error(`${location}.${key} must be a non-empty string`)
  }
  return value.trim()
}

function readPositiveInteger(
  record: Record<string, unknown>,
  key: string,
  location: string,
  maximum: number,
): number {
  const value = record[key]
  if (!Number.isInteger(value) || typeof value !== 'number' || value < 1 || value > maximum) {
    throw new Error(`${location}.${key} must be an integer from 1 to ${maximum}`)
  }
  return value
}

function readGap(record: Record<string, unknown>, key: string, location: string): GetInTouchGap {
  const value = record[key]
  if (typeof value !== 'string' || !gapSizes.has(value as GetInTouchGap)) {
    throw new Error(`${location}.${key} must be one of: sm, md, large`)
  }
  return value as GetInTouchGap
}

function normalizeColumns(value: unknown): GetInTouchColumnDefinition[] {
  if (!Array.isArray(value) || value.length !== 2) {
    throw new Error('layout.columns must contain content and form columns')
  }

  const columns = value.map((column, index): GetInTouchColumnDefinition => {
    const location = `layout.columns[${index}]`
    const record = asRecord(column, location)
    const id = readString(record, 'id', location)
    if (id !== 'content' && id !== 'form') {
      throw new Error(`${location}.id must be content or form`)
    }

    const rawWidth = readString(record, 'width', location)
    const width = Number(rawWidth)
    if (!Number.isInteger(width) || width < 1 || width > 12) {
      throw new Error(`${location}.width must be an integer string from 1 to 12`)
    }

    return { id, width }
  })

  if (new Set(columns.map((column) => column.id)).size !== 2) {
    throw new Error('layout.columns must contain one content column and one form column')
  }

  return columns
}

function normalizeFields(value: unknown, formColumns: number): GetInTouchFieldDefinition[] {
  if (!Array.isArray(value) || value.length === 0) {
    throw new Error('form.fields must contain at least one field')
  }

  const fieldIds = new Set<string>()
  return value.map((field, index): GetInTouchFieldDefinition => {
    const location = `form.fields[${index}]`
    const record = asRecord(field, location)
    const id = readString(record, 'id', location)
    if (!fieldIdPattern.test(id)) {
      throw new Error(`${location}.id must start with a letter and contain only letters, numbers, _ or -`)
    }
    if (fieldIds.has(id)) {
      throw new Error(`${location}.id duplicates the field ID "${id}"`)
    }
    fieldIds.add(id)

    const type = readString(record, 'type', location)
    if (!fieldTypes.has(type as GetInTouchFieldType)) {
      throw new Error(`${location}.type "${type}" is not supported`)
    }

    const rows =
      record.rows === undefined
        ? undefined
        : readPositiveInteger(record, 'rows', location, 20)

    if (rows !== undefined && type !== 'textarea') {
      throw new Error(`${location}.rows is only valid for textarea fields`)
    }

    const placeholder =
      record.placeholder === undefined ? undefined : readString(record, 'placeholder', location)

    return {
      id,
      type: type as GetInTouchFieldType,
      label: readString(record, 'label', location),
      columnSpan: readPositiveInteger(record, 'columnSpan', location, formColumns),
      required: record.required === true,
      placeholder,
      rows,
    }
  })
}

export function normalizeGetInTouchDefinition(payload: unknown): GetInTouchDefinition {
  const root = asRecord(payload, 'form definition')
  const layout = asRecord(root.layout, 'layout')
  const content = asRecord(root.content, 'content')
  const form = asRecord(root.form, 'form')
  const formLayout = asRecord(form.layout, 'form.layout')

  if (root.type !== 'form') {
    throw new Error('type must be "form"')
  }
  if (layout.container !== 'two-column') {
    throw new Error('layout.container must be "two-column"')
  }

  const id = readString(root, 'id', 'form definition')
  if (!fieldIdPattern.test(id)) {
    throw new Error('form definition.id must start with a letter and contain only letters, numbers, _ or -')
  }

  const formColumns = readPositiveInteger(formLayout, 'columns', 'form.layout', 12)
  const rawBullets = content.bullets
  if (!Array.isArray(rawBullets) || rawBullets.some((bullet) => typeof bullet !== 'string')) {
    throw new Error('content.bullets must be an array of strings')
  }

  const bullets = rawBullets.map((bullet) => bullet.trim()).filter(Boolean)

  return {
    id,
    type: 'form',
    layout: {
      container: 'two-column',
      gap: readGap(layout, 'gap', 'layout'),
      columns: normalizeColumns(layout.columns),
    },
    content: {
      title: readString(content, 'title', 'content'),
      description: readString(content, 'description', 'content'),
      bullets,
    },
    form: {
      layout: {
        columns: formColumns,
        gap: readGap(formLayout, 'gap', 'form.layout'),
      },
      fields: normalizeFields(form.fields, formColumns),
    },
  }
}

export function toRjsf(
  definition: GetInTouchDefinition,
): { schema: RJSFSchema; uiSchema: UiSchema } {
  const properties: Record<string, RJSFSchema> = {}
  const required: string[] = []
  const uiSchema: UiSchema = {}

  for (const field of definition.form.fields) {
    const property: RJSFSchema = {
      type: 'string',
      title: field.label,
    }

    if (field.type === 'email') {
      property.format = 'email'
    }

    properties[field.id] = property
    if (field.required) {
      required.push(field.id)
    }

    uiSchema[field.id] = {
      'ui:classNames': `get-in-touch-field get-in-touch-field--span-${field.columnSpan}`,
      'ui:style': { gridColumn: `span ${field.columnSpan}` },
      ...(field.placeholder ? { 'ui:placeholder': field.placeholder } : {}),
      ...(field.type === 'phone'
        ? { 'ui:widget': 'text', 'ui:options': { inputType: 'tel' } }
        : {}),
      ...(field.type === 'textarea'
        ? { 'ui:widget': 'textarea', 'ui:options': { rows: field.rows ?? 4 } }
        : {}),
    }
  }

  return {
    schema: {
      type: 'object',
      properties,
      ...(required.length > 0 ? { required } : {}),
    },
    uiSchema,
  }
}
