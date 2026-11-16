// The reference lets the Akamai owners look up which rule denied the request.
export async function readAkamaiBlockNote(response: Response) {
  if (
    response.status !== 403 ||
    response.headers.get('server') !== 'AkamaiGHost'
  ) {
    await response.body?.cancel()
    return ''
  }
  // The deny page encodes its text: Reference&#32;&#35;18&#46;2fa10017...
  const text = (await response.text()).replace(/&#(\d+);/g, (_, code) =>
    String.fromCharCode(Number(code))
  )
  const reference = text.match(/Reference #([0-9a-f.]+)/)?.[1]
  return reference ? ` (blocked by Akamai, reference ${reference})` : ''
}
