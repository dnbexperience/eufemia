import { renderWithFormatting } from '@dnb/eufemia/shared'

function ArrayInputExample() {
  const parts = ['Hello', '{br}', 'world! See https://example.com']
  return <>{renderWithFormatting(parts)}</>
}

function DynamicExample({ refId }: { refId: string }) {
  const text = `Keep your reference \`${refId}\` for support.`
  return <>{renderWithFormatting(text)}</>
}
