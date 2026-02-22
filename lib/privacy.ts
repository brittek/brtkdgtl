
/**
 * Simple hash for non-PII fingerprinting (Simulation of crypto.createHash)
 * In a real backend, this would use a secure salt and SHA-256.
 */
export const hashMetadata = (value: string | null | undefined): string | null => {
  if (!value) return null;
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    const char = value.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash).toString(16);
};
