/**
 * UI lib Component Example
 *
 */

import React from 'react'
import ComponentBox from '../../../../shared/tags/ComponentBox'
import {
  bell_medium as BellMedium,
  bell as Bell,
} from '@dnb/eufemia/src/icons'
import * as PrimaryIconsMedium from '@dnb/eufemia/src/icons/dnb/primary_icons_medium'
import * as SecondaryIconsMedium from '@dnb/eufemia/src/icons/dnb/secondary_icons_medium'
import { getListOfIcons } from '../../../../shared/parts/icons/ListAllIcons'

import { Icon, P, H2, IconPrimary, Button } from '@dnb/eufemia/src'
import styled from '@emotion/styled'

export const IconDefault = () => (
  <ComponentBox
    data-visual-test="icon-default"
    scope={{ Bell, BellMedium }}
  >
    <Icon icon={Bell} title="Give Icons a Title, or ..." />
    <Icon icon={BellMedium} aria-hidden />
    <Bell title="I'm not responsive!" />
    {/* <- Not responsive! */}
  </ComponentBox>
)

export const IconBorder = () => (
  <ComponentBox
    data-visual-test="icon-border"
    scope={{ Bell, BellMedium }}
  >
    <P>
      <Icon border={true} icon={Bell} right />
      <Icon border={true} icon={BellMedium} size="medium" right />
      <IconPrimary border={true} icon={'information'} right />
      <IconPrimary
        border={true}
        icon={'information'}
        size="medium"
        right
      />
      <Button icon={<IconPrimary icon="add" border />} text="Button" />
    </P>
  </ComponentBox>
)

export const IconInheritSized = () => (
  <ComponentBox
    data-visual-test="icon-inherit-sized"
    scope={{ Bell, BellMedium }}
  >
    <h1 className="dnb-h--xx-large">
      h1 with auto sized <Icon icon={BellMedium} size="auto" aria-hidden />{' '}
      icon
    </h1>
  </ComponentBox>
)

export const IconMedium = () => {
  return (
    <ComponentBox
      data-visual-test="icon-medium"
      scope={{ Bell, BellMedium }}
    >
      <Icon icon={BellMedium} size="16" title="force default size" />
      <Icon icon={BellMedium} title="is medium anyway" />
      <Icon icon={Bell} size="medium" title="force medium size" />
      <Icon icon={Bell} size="24" title="custom size: size=24" />
      <Icon icon={Bell} width="24" height="24" title="not responsive" />
    </ComponentBox>
  )
}

export const IconAlignment = () => {
  return (
    <ComponentBox
      data-visual-test="icon-alignment"
      scope={{ Bell, BellMedium }}
    >
      {() => {
        const ColoredP = styled(P)`
          display: inline-block;
          background-color: yellowgreen;
        `
        const ColoredH = styled(H2)`
          display: inline-block;
          margin: 0 0 0.5rem 0 !important;
          background-color: yellowgreen;
        `
        const ColoredIcon = styled(Icon)`
          background-color: yellow;
        `
        return (
          <div className="dnb-core-style">
            <ColoredH>
              <ColoredIcon icon={Bell} />
              Text
            </ColoredH>
            <br />
            <ColoredP>
              <ColoredIcon icon={Bell} />
              Text
            </ColoredP>
          </div>
        )
      }}
    </ComponentBox>
  )
}

export const AllPrimaryIcons = () => {
  return (
    <ComponentBox
      data-visual-test="icon-all-primary"
      scope={{ getListOfIcons, PrimaryIconsMedium }}
    >
      {() => {
        const Icons = () => (
          <>
            {getListOfIcons(PrimaryIconsMedium).map(
              ({ iconName, Svg }) => {
                return (
                  <Icon
                    title={iconName}
                    key={iconName}
                    icon={Svg}
                    size="medium"
                    right="small"
                    bottom="small"
                  />
                )
              },
            )}
          </>
        )
        return <Icons />
      }}
    </ComponentBox>
  )
}

export const AllSecondaryIcons = () => {
  return (
    <ComponentBox
      data-visual-test="icon-all-secondary"
      scope={{ getListOfIcons, SecondaryIconsMedium }}
    >
      {() => {
        const uniqueList = {}
        const Icons = () => (
          <>
            {getListOfIcons(SecondaryIconsMedium).map(
              ({ iconName, Svg }) => {
                if (uniqueList[iconName]) {
                  console.warn('The icon is already used:', iconName, Svg)
                }
                uniqueList[iconName] = true

                return (
                  <Icon
                    title={iconName}
                    key={iconName}
                    icon={Svg}
                    size="medium"
                    right="small"
                    bottom="small"
                  />
                )
              },
            )}
          </>
        )
        return <Icons />
      }}
    </ComponentBox>
  )
}

export const IconColors = () => {
  return (
    <ComponentBox data-visual-test="icon-colors" scope={{ BellMedium }}>
      <Icon
        icon={BellMedium}
        color="var(--color-fire-red)"
        title="CSS variable"
      />
      <Icon icon={BellMedium} color="#DC2A2A" title="Hex" />
      <Icon icon={BellMedium} color="rgb(220,42,42)" title="RGB" />
    </ComponentBox>
  )
}

export function AllIconsTest() {
  return (
    <>
      <AllPrimaryIcons />
      <AllSecondaryIcons />
    </>
  )
}
