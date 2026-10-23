const DAY = 86_400_000
const WARNING_DAYS = [14, 7, 3, 1]

type TokenStatus = { message: string; notify: boolean }

export async function checkTokenExpiry(
  name: string,
  token: string | undefined,
  { now = Date.now(), request = fetch } = {}
): Promise<TokenStatus> {
  if (!token) {
    return { message: `${name} is not set`, notify: false }
  }

  const response = await request('https://api.dnb.ghe.com/rate_limit', {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
    },
    signal: AbortSignal.timeout(15_000),
    redirect: 'error',
  })
  if (response.status === 401) {
    return { message: `${name} has expired or was revoked`, notify: true }
  }
  if (!response.ok) {
    throw new Error(
      `${name} could not be checked: HTTP ${response.status}`
    )
  }

  const header = response.headers.get(
    'GitHub-Authentication-Token-Expiration'
  )
  if (!header) {
    return { message: `${name} has no expiry date`, notify: false }
  }
  const expiresAt = Date.parse(header)
  if (Number.isNaN(expiresAt)) {
    throw new Error(`${name} has an unreadable expiry date`)
  }

  const daysLeft = Math.floor((expiresAt - now) / DAY)
  const date = new Date(expiresAt).toISOString().slice(0, 10)
  return {
    message: `${name} expires in ${daysLeft} ${daysLeft === 1 ? 'day' : 'days'} (${date})`,
    notify: WARNING_DAYS.includes(daysLeft),
  }
}
