// Logs a message at most once per process, so a persistent misconfiguration
// (e.g. a missing s3:GetObject permission) surfaces in CloudWatch without
// repeating on every request.
const warned = new Set<string>()

export function warnOnce(message: string): void {
  if (warned.has(message)) {
    return
  }

  warned.add(message)
  // eslint-disable-next-line no-console -- server-side logging to CloudWatch
  console.error(message)
}
