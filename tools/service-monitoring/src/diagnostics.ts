import { SlackNotificationError } from './slack.ts'

const errorNames = new Set([
  'AccessDeniedException',
  'ResourceNotFoundException',
  'ProvisionedThroughputExceededException',
  'ThrottlingException',
  'UnrecognizedClientException',
  'ExpiredTokenException',
  'InternalServerError',
  'TimeoutError',
  'AbortError',
  'SyntaxError',
  'SlackNotificationError',
])

export function logFailure(
  service: string,
  stage: string,
  error: unknown
) {
  const name =
    error instanceof Error && errorNames.has(error.name)
      ? error.name
      : 'Error'
  process.stdout.write(
    JSON.stringify({
      service,
      stage,
      error: name,
      ...(error instanceof SlackNotificationError && error.httpStatus
        ? { httpStatus: error.httpStatus }
        : {}),
    }) + '\n'
  )
}
