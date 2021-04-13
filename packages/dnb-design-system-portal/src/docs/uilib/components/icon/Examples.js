/**
 * UI lib Component Example
 *
 */

import React from 'react'
import ComponentBox from 'Src/shared/tags/ComponentBox'
import {
  bell_medium as BellMedium,
  bell as Bell
} from '@dnb/eufemia/src/icons'
import * as PrimaryIconsMedium from '@dnb/eufemia/src/icons/primary_icons_medium'
import * as SecondaryIconsMedium from '@dnb/eufemia/src/icons/secondary_icons_medium'
import { getListOfIcons } from '../../../../shared/parts/icons/ListAllIcons'

export const IconDefault = () => (
  <ComponentBox
    data-visual-test="icon-default"
    scope={{ Bell, BellMedium }}
  >
    {() => /* jsx */ `
<Icon icon={Bell} title="Give Icons a Title, or ..." />
<Icon icon={BellMedium} aria-hidden />
<Bell title="I'm not responsive!" />{/* <- Not responsive! */}
`}
  </ComponentBox>
)

export const IconBorder = () => (
  <ComponentBox
    data-visual-test="icon-border"
    scope={{ Bell, BellMedium }}
  >
    {() => /* jsx */ `
<P>
  <Icon border="true" icon={Bell} right />
  <Icon border="true" icon={BellMedium} size="medium" right />
  <IconPrimary border="true" icon={"information"} right />
  <IconPrimary border="true" icon={"information"} size="medium" right />
  <Button
    icon={<IconPrimary icon="add" border />}
    text="Button"
  />
</P>
`}
  </ComponentBox>
)

export const IconInheritSized = () => (
  <ComponentBox
    data-visual-test="icon-inherit-sized"
    scope={{ Bell, BellMedium }}
  >
    {() => /* jsx */ `
<h1 className="dnb-h--xx-large">
  h1 with auto sized{' '}
  <Icon icon={BellMedium} size="auto" aria-hidden />{' '}
  icon
</h1>
`}
  </ComponentBox>
)

export const IconMedium = () => {
  if (!global.IS_TEST) {
    return null
  }

  return (
    <ComponentBox
      data-visual-test="icon-medium"
      scope={{ Bell, BellMedium }}
      title="Explicit defined size: medium"
    >
      {() => /* jsx */ `
<Icon icon={BellMedium} size="16" title="force default size" />
<Icon icon={BellMedium} title="is medium anyway" />
<Icon icon={Bell} size="medium" title="force medium size" />
<Icon icon={Bell} size="24" title="custom size: size=24" />
<Icon
  icon={Bell}
  width="24"
  height="24"
  title="not responsive"
/>
`}
    </ComponentBox>
  )
}

export const IconPrimary = () => {
  if (!global.IS_TEST) {
    return null
  }

  return (
    <ComponentBox
      data-visual-test="icon-all-primary"
      scope={{ getListOfIcons, PrimaryIconsMedium }}
      title="All **primary** icons listed as medium sized icons"
      noFragments={false}
    >
      {() => /* jsx */ `
() => {
  const Icons = () => getListOfIcons(PrimaryIconsMedium).map(
    ({name, Svg}) => (
      <Icon
        title={name}
        key={name}
        icon={Svg}
        size="medium"
        right="small"
        bottom="small"
      />
    )
  )
  return <Icons />
}
`}
    </ComponentBox>
  )
}

export const IconSecondary = () => {
  if (!global.IS_TEST) {
    return null
  }

  return (
    <ComponentBox
      data-visual-test="icon-all-secondary"
      scope={{ getListOfIcons, SecondaryIconsMedium }}
      title="All **secondary** icons listed as medium sized icons"
      noFragments={false}
    >
      {() => /* jsx */ `
() => {
  const Icons = () => getListOfIcons(SecondaryIconsMedium).map(
    ({name, Svg}) => (
      <Icon
        title={name}
        key={name}
        icon={Svg}
        size="medium"
        right="small"
        bottom="small"
      />
    )
  )
  return <Icons />
}
`}
    </ComponentBox>
  )
}

export default function IconTests() {
  return (
    <>
      <IconMedium />
      <IconPrimary />
      <IconSecondary />
    </>
  )
}
