/** Formats an ISO date for display; falls back to the raw string if unparseable. */
export function formatDate(iso: string): string {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleDateString('en-GB', { year: 'numeric', month: 'short', day: 'numeric' })
}
