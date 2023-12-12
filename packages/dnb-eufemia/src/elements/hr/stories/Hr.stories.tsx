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
      <Hr fullscreen top light />
      <Hr fullscreen top />
      <Hr fullscreen top medium />

      <Flex.Vertical top divider="line">
        <Hr light />
        <Hr />
        <Hr medium />
        <Hr fullscreen light />
        <Hr fullscreen />
        <Hr fullscreen medium />
      </Flex.Vertical>
    </>
  )
}
