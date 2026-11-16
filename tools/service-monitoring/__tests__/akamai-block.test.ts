import { expect, it } from 'vitest'
import { readAkamaiBlockNote } from '../../monitoring/akamai-block.ts'

// Captured from server.eufemia.dnb.no on 2026-11-16.
const denyPage = `<HTML><HEAD>
<TITLE>Access Denied</TITLE>
</HEAD><BODY>
<H1>Access Denied</H1>
 
You don't have permission to access "http&#58;&#47;&#47;server&#46;eufemia&#46;dnb&#46;no&#47;healthz&#63;" on this server.<P>
Reference&#32;&#35;18&#46;2fa10017&#46;1794824490&#46;61a27a1
<P>https&#58;&#47;&#47;errors&#46;edgesuite&#46;net&#47;18&#46;2fa10017&#46;1794824490&#46;61a27a1</P>
</BODY>
</HTML>
`

function response(status: number, server: string | null, body = denyPage) {
  return new Response(body, {
    status,
    headers: server ? { Server: server } : {},
  })
}

it('names the Akamai reference when Akamai denies a request', async () => {
  expect(await readAkamaiBlockNote(response(403, 'AkamaiGHost'))).toBe(
    ' (blocked by Akamai, reference 18.2fa10017.1794824490.61a27a1)'
  )
})

it.each([
  ['an origin 403', response(403, null, '{"message":"Forbidden"}')],
  ['another Akamai status', response(503, 'AkamaiGHost')],
  ['an Akamai 403 without a reference', response(403, 'AkamaiGHost', '')],
])('adds nothing for %s and consumes the body', async (_, denied) => {
  expect(await readAkamaiBlockNote(denied)).toBe('')
  expect(denied.bodyUsed).toBe(true)
})
