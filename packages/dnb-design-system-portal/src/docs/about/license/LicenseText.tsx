import { Fragment } from 'react'
import { Anchor, Dd, Dl, Dt, H2, P } from '@dnb/eufemia/src'

export type LicenseBlock =
  | { type: 'heading'; text: string }
  | { type: 'paragraph'; text: string }
  | {
      type: 'facts'
      items: Array<{ term: string; description: string }>
    }

// A "Term: value" line, such as "Licensor: DNB Bank ASA".
// The term may not contain a colon, so "https://…" never matches.
const factLinePattern = /^([^:]+):\s+(\S.*)$/

// A URL ends before any punctuation that follows it, like "." or ")."
const urlPattern = /(https?:\/\/[^\s]+?)(?=[.,;:!?)]*(?:\s|$))/g

/**
 * Splits the plain-text LICENSE file into blocks that can be rendered as
 * real HTML. The file is hard-wrapped at about 70 characters, so the lines
 * inside a paragraph are joined again. This lets the text wrap to the
 * width of the screen.
 */
export function parseLicense(license: string): LicenseBlock[] {
  return license
    .replace(/\r\n?/g, '\n')
    .split(/\n[ \t]*\n/)
    .map((paragraph) =>
      paragraph
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean)
    )
    .filter((lines) => lines.length > 0)
    .map((lines, index): LicenseBlock => {
      if (index === 0 && lines.length === 1) {
        return { type: 'heading', text: lines[0] }
      }

      const facts = lines.map((line) => line.match(factLinePattern))
      if (lines.length > 1 && facts.every(Boolean)) {
        return {
          type: 'facts',
          items: facts.map(([, term, description]) => ({
            term,
            description,
          })),
        }
      }

      return { type: 'paragraph', text: lines.join(' ') }
    })
}

function TextWithLinks({ text }: { text: string }) {
  return (
    <>
      {text.split(urlPattern).map((part, index) =>
        // split() with a capture group puts the URLs at the odd indexes
        index % 2 === 1 ? (
          <Anchor key={index} href={part}>
            {part}
          </Anchor>
        ) : (
          <Fragment key={index}>{part}</Fragment>
        )
      )}
    </>
  )
}

export default function LicenseText({ license }: { license: string }) {
  return (
    <div style={{ maxWidth: 'var(--prose-max-width)' }}>
      {parseLicense(license).map((block, index) => {
        switch (block.type) {
          case 'heading':
            return (
              <H2 key={index} size="large">
                {block.text}
              </H2>
            )
          case 'facts':
            return (
              <Dl key={index} layout="grid">
                {block.items.map(({ term, description }) => (
                  <Fragment key={term}>
                    <Dt>{term}</Dt>
                    <Dd>
                      <TextWithLinks text={description} />
                    </Dd>
                  </Fragment>
                ))}
              </Dl>
            )
          default:
            return (
              <P key={index}>
                <TextWithLinks text={block.text} />
              </P>
            )
        }
      })}
    </div>
  )
}
