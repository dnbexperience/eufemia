/**
 * Redirect to Codesandbox starter
 */
export default function Page() {
  if (typeof location !== 'undefined') {
    location.href = 'https://codesandbox.io/s/eufemia-starter-0gcwo'
  }
  return 'Redirecting ...'
}
