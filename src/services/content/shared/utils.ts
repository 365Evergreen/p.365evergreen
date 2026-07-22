export function normalizeStringField(
  value: unknown
): string | undefined {
  if (typeof value !== "string") {
    return undefined;
  }

  const normalized = value.trim();

  if (
    normalized.length === 0 ||
    normalized.toLowerCase() === "string"
  ) {
    return undefined;
  }

  return normalized;
}