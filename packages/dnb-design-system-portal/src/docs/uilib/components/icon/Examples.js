/**
 * UI lib Component Example
 *
 */

import React from 'react'
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

class Example extends React.PureComponent {
  render() {
    return (
      <React.Fragment>
        <ComponentBox
          data-dnb-test="icon-default"
          scope={{ Bell, BellMedium }}
          title="Default and Medium sized icons (Responsive)"
        >
          {
            /* @jsx */ `
<Icon icon={Bell} title="Give Icons a Title, or ..." />
<Icon icon={BellMedium} aria-hidden />
<Bell title="I'm not responsive!" />{/* <- Not responsive! */}
          `
          }
        </ComponentBox>

        <ComponentBox
          data-dnb-test="icon-border"
          scope={{ Bell, BellMedium }}
          title="Icons with border. **NB:** Use it with caution. It should not be used where the usage can confuse users to be a clickable button."
        >
          {
            /* @jsx */ `
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
          `
          }
        </ComponentBox>

        <ComponentBox
          data-dnb-test="icon-inherit-sized"
          scope={{ Bell, BellMedium }}
          title="Responsive to its inherited `font-size`"
        >
          {
            /* @jsx */ `
<h1 className="dnb-h--xx-large">
  h1 with auto sized{' '}
  <Icon icon={BellMedium} size="auto" aria-hidden />{' '}
  icon
</h1>
          `
          }
        </ComponentBox>
        {typeof window !== 'undefined' && window.IS_TEST && (
          <ComponentBox
            data-dnb-test="icon-medium"
            scope={{ Bell, BellMedium }}
            title="Explicit defined size: medium"
          >
            {
              /* @jsx */ `
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
              `
            }
          </ComponentBox>
        )}
        {typeof window !== 'undefined' && window.IS_TEST && (
          <ComponentBox
            data-dnb-test="icon-all-primary"
            scope={{ PrimaryIconsMedium }}
            title="All **primary** icons listed as medium sized icons"
            noFragments={false}
          >
            {
              /* @jsx */ `
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
          `
            }
          </ComponentBox>
        )}
        {typeof window !== 'undefined' && window.IS_TEST && (
          <ComponentBox
            data-dnb-test="icon-all-secondary"
            scope={{ SecondaryIconsMedium }}
            title="All **secondary** icons listed as medium sized icons"
            noFragments={false}
          >
            {
              /* @jsx */ `
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
          `
            }
          </ComponentBox>
        )}
      </React.Fragment>
    )
  }
}

export default Example
