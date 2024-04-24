import { Flex, Hr } from '../../../'

export default {
  title: 'Eufemia/Elements/Hr',
}

export function HrThickness() {
  return (
    <>
      <Hr light />
      <Hr top />
      <Hr top medium />
      <Hr breakout top light />
      <Hr breakout top />
      <Hr breakout top medium />

      <Flex.Vertical top divider="line">
        <Hr light />
        <Hr />
        <Hr medium />
        <Hr breakout light />
        <Hr breakout />
        <Hr breakout medium />
      </Flex.Vertical>
    </>
  )
}
