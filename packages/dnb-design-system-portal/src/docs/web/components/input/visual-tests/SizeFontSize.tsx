import { Flex, Input } from '@dnb/eufemia/src'

const fontSizes = `
  [data-visual-test='input-size-font-size'] .dnb-input {
    --input-font-size--small: 0.875rem;
    --input-font-size--medium: 1.25rem;
    --input-font-size--large: 1.5rem;
  }
`

export default function SizeFontSize() {
  return (
    <Flex.Vertical data-visual-test="input-size-font-size" gap="small">
      <style>{fontSizes}</style>
      {(['small', 'medium', 'large'] as const).map((size) => (
        <Flex.Horizontal key={size} gap="small">
          <Input size={size} value="Value" label={`${size} value`} />
          <Input
            size={size}
            placeholder="Placeholder"
            label={`${size} placeholder`}
          />
        </Flex.Horizontal>
      ))}
    </Flex.Vertical>
  )
}
