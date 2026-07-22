import { useEffect, useMemo, useState } from 'react'
import Form from '@rjsf/core'
import validator from '@rjsf/validator-ajv8'
import type { GetInTouchDefinition, GetInTouchProps } from './GetInTouch.types'
import { normalizeGetInTouchDefinition, toRjsf } from './getInTouchForm'
import styles from './GetInTouch.module.scss'

type DynamicFormData = Record<string, unknown>

async function loadDefinition(url: string): Promise<GetInTouchDefinition> {
  const response = await fetch(url, { headers: { Accept: 'application/json' } })
  if (!response.ok) {
    throw new Error(`Failed to load form definition (HTTP ${response.status})`)
  }

  const payload: unknown = await response.json()
  return normalizeGetInTouchDefinition(payload)
}

function GetInTouchForm({ blobStorageUrl }: GetInTouchProps) {
  const [loadState, setLoadState] = useState<{
    definition: GetInTouchDefinition | null
    error: Error | null
  }>({ definition: null, error: null })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  useEffect(() => {
    let active = true
    loadDefinition(blobStorageUrl).then(
      (definition) => {
        if (active) {
          setLoadState({ definition, error: null })
        }
      },
      (error: unknown) => {
        if (active) {
          setLoadState({
            definition: null,
            error: error instanceof Error ? error : new Error(String(error)),
          })
        }
      },
    )

    return () => {
      active = false
    }
  }, [blobStorageUrl])

  const { definition, error } = loadState
  const rjsf = useMemo(() => (definition ? toRjsf(definition) : null), [definition])

  if (!definition && !error) {
    return (
      <section className={styles.section} aria-live="polite">
        <p className={styles.status}>Loading contact form…</p>
      </section>
    )
  }

  if (error || !definition || !rjsf) {
    return (
      <section className={styles.section}>
        <p className={styles.error} role="alert">
          We couldn’t load the contact form. Please try again later.
        </p>
      </section>
    )
  }

  const contentWidth =
    definition.layout.columns.find((column) => column.id === 'content')?.width ?? 1
  const formWidth =
    definition.layout.columns.find((column) => column.id === 'form')?.width ?? 1
  const contactFormFlowUrl = 'https://9e393617e3e8e41fa3686bde5b1121.c3.environment.api.powerplatform.com:443/powerautomate/automations/direct/cu/07/workflows/5c335fadd5d74548833af7fcfcd6e1c3/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=HMFJG5bwsnycEvmQdQUqjhJOmWpzk8Bg_L0J6dmuJj4'
  const handleSubmit = async ({ formData }: { formData?: DynamicFormData }) => {
    setSubmitting(true)
    setSubmitError(null)

    try {
      const response = await fetch(contactFormFlowUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formId: definition.id,
          title: definition.content.title,
          source: 'get-in-touch',
          data: formData ?? {},
        }),
      })

      const payload = (await response.json().catch(() => ({}))) as { error?: unknown }
      if (!response.ok) {
        throw new Error(
          typeof payload.error === 'string'
            ? payload.error
            : `Form submission failed (${response.status})`,
        )
      }

      setSubmitted(true)
    } catch (submissionError) {
      setSubmitError(
        submissionError instanceof Error ? submissionError.message : 'Unable to submit form',
      )
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section
      className={styles.section}
      data-gap={definition.layout.gap}
      aria-labelledby={`${definition.id}-title`}
      style={{ gridTemplateColumns: `${contentWidth}fr ${formWidth}fr` }}
    >
      <div className={styles.content}>
        <h2 id={`${definition.id}-title`} className={styles.title}>
          {definition.content.title}
        </h2>
        <p className={styles.description}>{definition.content.description}</p>
        {definition.content.bullets.length > 0 ? (
          <ul className={styles.bullets}>
            {definition.content.bullets.map((bullet, index) => (
              <li key={`${index}-${bullet}`}>{bullet}</li>
            ))}
          </ul>
        ) : null}
      </div>

      <div className={styles.formColumn}>
        {submitError ? (
          <p className={styles.error} role="alert">
            {submitError}
          </p>
        ) : null}
        {submitted ? (
          <p className={styles.success} role="status">
            Thank you. We received your submission.
          </p>
        ) : (
          <div
            className={styles.formRoot}
            data-gap={definition.form.layout.gap}
            style={{
              gridTemplateColumns: `repeat(${definition.form.layout.columns}, minmax(0, 1fr))`,
            }}
          >
            <Form<DynamicFormData>
              schema={rjsf.schema}
              uiSchema={rjsf.uiSchema}
              validator={validator}
              noHtml5Validate
              disabled={submitting}
              onSubmit={handleSubmit}
            >
              <button type="submit" className={styles.submitButton} disabled={submitting}>
                {submitting ? 'Submitting…' : 'Submit'}
              </button>
            </Form>
          </div>
        )}
      </div>
    </section>
  )
}

export function GetInTouch({ blobStorageUrl }: GetInTouchProps) {
  return <GetInTouchForm key={blobStorageUrl} blobStorageUrl={blobStorageUrl} />
}

export default GetInTouch
