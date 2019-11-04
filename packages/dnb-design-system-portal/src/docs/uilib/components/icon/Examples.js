/**
 * UI lib Component Example
 *
 */

import React, { PureComponent, Fragment } from 'react'
import ComponentBox from 'Src/shared/tags/ComponentBox'
import {
  bell_medium as BellMedium,
  bell as Bell
} from 'dnb-ui-lib/src/icons'
import * as PrimaryIconsMedium from 'dnb-ui-lib/src/icons/primary_icons_medium'
import * as SecondaryIconsMedium from 'dnb-ui-lib/src/icons/secondary_icons_medium'

// In case we want so sort the icons
// const allIcons = Object.entries({
//   ...PrimaryIconsMedium,
//   ...SecondaryIconsMedium
// })
// .sort(([a], [b]) => (a > b ? 1 : -1))

class Example extends PureComponent {
  render() {
    return (
      <Fragment>
        <ComponentBox
          data-dnb-test="icon-default"
          scope={{ Bell, BellMedium }}
          caption="Default and Medium sized icons (Responsive)"
        >
          {/* @jsx */ `
<Icon icon={Bell} title="Give Icons a Title, or ..." />
<Icon icon={BellMedium} aria-hidden />
<Bell title="I'm not responsive!" />{/* <- Not responsive! */}
          `}
        </ComponentBox>

        <ComponentBox
          data-dnb-test="icon-border"
          scope={{ Bell, BellMedium }}
          caption="Icons with border"
        >
          {/* @jsx */ `
<Icon border="true" icon={Bell} right="x-small" />
<Icon border="true" icon={BellMedium} size="medium" right="x-small" />
<IconPrimary border="true" icon={"information"} right="x-small" />
<IconPrimary border="true" icon={"information"} size="medium" />
<h1 className="dnb-h1">
  h1 with  <Icon icon={Bell} border /> Icon
</h1>
          `}
        </ComponentBox>

        <ComponentBox
          data-dnb-test="icon-inherit-sized"
          scope={{ Bell, BellMedium }}
          caption="Responsive to its inherited `font-size`"
        >
          {/* @jsx */ `
<h1 className="dnb-h1">
  h1 with
  <Icon icon={BellMedium} aria-hidden />{' '}
  Icon and auto sized
  <Icon icon={BellMedium} size="auto" aria-hidden />{' '}
  Icon
</h1>
          `}
        </ComponentBox>
        {typeof window !== 'undefined' && window.IS_TEST && (
          <ComponentBox
            data-dnb-test="icon-medium"
            scope={{ Bell, BellMedium }}
            caption="Explicit defined size: medium"
          >
            {/* @jsx */ `
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
        )}
        {typeof window !== 'undefined' && window.IS_TEST && (
          <ComponentBox
            data-dnb-test="icon-all-primary"
            scope={{ PrimaryIconsMedium }}
            caption="All **primary** icons listed as medium sized icons"
            noFragments={false}
          >
            {/* @jsx */ `
() => {
  const Icons = () => Object.entries(PrimaryIconsMedium).map(
    ([name, SvgMedium]) => (
      <Icon
        title={name}
        key={name}
        icon={SvgMedium}
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
        )}
        {typeof window !== 'undefined' && window.IS_TEST && (
          <ComponentBox
            data-dnb-test="icon-all-secondary"
            scope={{ SecondaryIconsMedium }}
            caption="All **secondary** icons listed as medium sized icons"
            noFragments={false}
          >
            {/* @jsx */ `
() => {
  const Icons = () => Object.entries(SecondaryIconsMedium).map(
    ([name, SvgMedium]) => (
      <Icon
        title={name}
        key={name}
        icon={SvgMedium}
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
        )}
      </Fragment>
    )
  }
}

export { Example }
export default () => <Example />
