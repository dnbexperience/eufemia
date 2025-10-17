import { Flex, Hr } from '../../../'

export default {
  title: 'Eufemia/Elements/Hr',
}

export function HrThickness() {
  return (
    <>
      <Hr />
      <Hr top />
      <Hr top />
      <Hr breakout top />
      <Hr breakout top />
      <Hr breakout top />

      <Flex.Vertical top divider="line">
        <Hr />
        <Hr />
        <Hr breakout />
        <Hr breakout />
        <Hr breakout />
      </Flex.Vertical>
    </>
  )
}
