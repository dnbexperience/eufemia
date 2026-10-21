import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from '@aws-sdk/client-secrets-manager'

const secrets = new SecretsManagerClient({
  maxAttempts: 2,
  requestHandler: { connectionTimeout: 3000, requestTimeout: 10_000 },
})

export async function readSecret(arn: string) {
  const result = await secrets.send(
    new GetSecretValueCommand({ SecretId: arn })
  )
  if (!result.SecretString) {
    throw new Error('Monitor secret must contain a string')
  }
  return result.SecretString
}
