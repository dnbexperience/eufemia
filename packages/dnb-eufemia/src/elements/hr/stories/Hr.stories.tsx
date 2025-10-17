import { Flex, Hr } from '../../../'

export default {
  title: 'Eufemia/Elements/Hr',
}

export function HrThickness() {
  return (
    <>
      <Hr light />
      <Hr top />
      <Hr top />
      <Hr breakout top light />
      <Hr breakout top />
      <Hr breakout top />

      <Flex.Vertical top divider="line">
        <Hr light />
        <Hr />
        <Hr />
        <Hr breakout light />
        <Hr breakout />
        <Hr breakout />
      </Flex.Vertical>
    </>
  )
}
