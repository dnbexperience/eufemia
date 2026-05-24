/**
 * UI lib Component Example
 *
 */

import ComponentBox from '../../../../shared/tags/ComponentBox'
import {
  bell_medium as BellMedium,
  bell as Bell,
  star as Star,
  heart as Heart,
  arrow_down,
  arrow_up,
  arrow_left,
  arrow_right,
  question,
  close,
} from '@dnb/eufemia/src/icons'
import * as PrimaryIconsMedium from '@dnb/eufemia/src/icons/dnb/primary_icons_medium'
import * as SecondaryIconsMedium from '@dnb/eufemia/src/icons/dnb/secondary_icons_medium'
import { getListOfIcons } from '../../../../shared/parts/icons/ListAllIcons'
import {
  Icon,
  P,
  H2,
  IconPrimary,
  Button,
  Flex,
  Avatar,
} from '@dnb/eufemia/src'
import styled from '@emotion/styled'
import { Field } from '@dnb/eufemia/src/extensions/forms'

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
    <Flex.Horizontal align="center">
      <Icon border={true} icon={Bell} />
      <Icon border={true} icon={BellMedium} size="medium" />
      <IconPrimary border={true} icon="information" />
      <IconPrimary border={true} icon="information" size="medium" />
      <Button icon={<IconPrimary icon="add" border />} text="Button" />
    </Flex.Horizontal>
  </ComponentBox>
)

export const IconFilled = () => (
  <ComponentBox data-visual-test="icon-filled" scope={{ Star, Heart }}>
    <Flex.Stack>
      <Flex.Horizontal align="center">
        <Icon icon={Star} fill />
        <Icon icon={Heart} fill />
        <Avatar icon={<Icon icon={Star} fill />} size="small" />
        <Button icon={<Icon icon={Heart} fill />} />
      </Flex.Horizontal>
    </Flex.Stack>
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
              }
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
              }
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

export const IconsSizes = () => (
  <ComponentBox data-visual-test="icon-sizes" scope={{ BellMedium }}>
    <Icon icon={BellMedium} title="Beach" size="large" />
    <Icon icon={BellMedium} title="Beach" size="x-large" />
    <Icon icon={BellMedium} title="Beach" size="xx-large" />
  </ComponentBox>
)

export function AllIconsTest() {
  return (
    <>
      <AllPrimaryIcons />
      <AllSecondaryIcons />
    </>
  )
}

export function IconTransitionExample() {
  return (
    <ComponentBox
      data-visual-test="icon-transition"
      scope={{ arrow_down, arrow_up, arrow_left, arrow_right }}
    >
      {() => {
        const directionIcon = Icon.transition({
          down: arrow_down,
          up: arrow_up,
          left: arrow_left,
          right: arrow_right,
        })

        const handleChange = (direction) => {
          const iconEl = document.querySelector(
            '[data-visual-test="icon-transition"] .dnb-icon'
          ) as HTMLElement
          if (iconEl) {
            Icon.transition.activate(iconEl, direction)
          }
        }

        return (
          <Flex.Horizontal align="center" gap="small">
            <Icon icon={directionIcon} />

            <Field.Selection
              variant="button"
              value="down"
              optionsLayout="horizontal"
              onChange={handleChange}
            >
              <Field.Option value="down" title="Down" />
              <Field.Option value="up" title="Up" />
              <Field.Option value="left" title="Left" />
              <Field.Option value="right" title="Right" />
            </Field.Selection>
          </Flex.Horizontal>
        )
      }}
    </ComponentBox>
  )
}

export function IconTransitionFallbackExample() {
  return (
    <ComponentBox
      data-visual-test="icon-transition-fallback"
      scope={{ question, close }}
    >
      {() => {
        const helpIcon = Icon.transition({ question, close })

        const handleChange = (state) => {
          const iconEl = document.querySelector(
            '[data-visual-test="icon-transition-fallback"] .dnb-icon'
          ) as HTMLElement
          if (iconEl) {
            Icon.transition.activate(iconEl, state)
          }
        }

        return (
          <Flex.Horizontal align="center" gap="small">
            <Icon icon={helpIcon} />

            <Field.Selection
              variant="button"
              value="question"
              optionsLayout="horizontal"
              onChange={handleChange}
            >
              <Field.Option value="question" title="Question" />
              <Field.Option value="close" title="Close" />
            </Field.Selection>
          </Flex.Horizontal>
        )
      }}
    </ComponentBox>
  )
}
