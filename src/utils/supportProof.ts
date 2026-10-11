export function isValidSupportProof(platform: string, value: string): boolean {
  if (platform !== 'Ko-fi' || value !== value.trim() || value.length > 2048) return false;
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && url.hostname.toLowerCase() === 'ko-fi.com' && !url.port && !url.username && !url.password;
  } catch {
    return false;
  }
}