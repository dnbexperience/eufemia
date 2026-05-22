import { renderWithFormatting } from '@dnb/eufemia/shared'

const text =
  'Use **bold**, _italic_, `AB12-XYZ9` and a link https://www.dnb.no{br}Next line'

export function InlineFormattingExample() {
  return <>{renderWithFormatting(text)}</>
}
