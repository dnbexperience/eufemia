/**
 * UI lib Component Example
 *
 */

import React from 'react'
import ComponentBox from '../../../../shared/tags/ComponentBox'
import styled from '@emotion/styled'
import {
  Dropdown,
  NumberFormat,
  Icon,
  Link,
  HelpButton,
  P,
  Flex,
} from '@dnb/eufemia/src'
import {
  chevron_down,
  chevron_right,
  download,
  newspaper,
  trash,
} from '@dnb/eufemia/src/icons'

import type { DropdownAllProps } from '@dnb/eufemia/src/components/dropdown/Dropdown'

type VisibleWhenVisualTestReturn = Pick<
  DropdownAllProps,
  | 'opened'
  | 'prevent_close'
  | 'independent_width'
  | 'skip_portal'
  | 'direction'
>

const Wrapper = styled.div`
  .dnb-form-label {
    margin-right: 1rem;
  }
  [data-visual-test] {
    > :not(.dnb-dropdown--is-popup):not(
        .dnb-dropdown--independent-width
      ):not(.dnb-dropdown--stretch)
      .dnb-dropdown__shell {
      width: var(--dropdown-width);
    }
  }
  [data-visual-test-wrapper='dropdown-action_menu-custom'],
  [data-visual-test-wrapper='dropdown-more_menu'] {
    width: 20rem;
    height: 15rem !important;
  }
  [data-visual-test='dropdown-action_menu-custom'] .dnb-dropdown__list {
    width: 15rem;
  }
  [data-visual-test='dropdown-list'] .dnb-drawer-list__list {
    display: block;
    visibility: visible;
    position: relative;
    top: 0;
    width: var(--dropdown-width);
  }
`

const data = [
  // Every data item can, beside "content" - contain what ever
  {
    // (optional) can be what ever
    selected_key: 'key_0',

    // (optional) is show instead of "content", once selected
    selected_value: 'Item 1 Value',

    // Item content as a string or array
    content: 'Item 1 Content',
  },
  {
    selected_key: 'key_1',
    content: ['Item 2 Value', 'Item 2 Content'],
  },
  {
    selected_key: 'key_2',
    selected_value: 'Item 3 Value',
    content: ['Item 3 Content A', 'Item 3 Content B'],
  },
  {
    selected_key: 'key_3',
    selected_value: 'Item 4 Value',
    content: ['Item 4 Content A', <>Custom Component</>],
  },
]

export const DropdownFind = () => (
  <Wrapper>
    <ComponentBox>
      {() => {
        const scrollableData = [
          {
            content: 'A',
          },
          {
            content: 'B',
          },
          {
            selected_value: (
              <NumberFormat always_selectall ban>
                11345678962
              </NumberFormat>
            ),
            content: [
              <NumberFormat key="ban-1" always_selectall ban>
                11345678962
              </NumberFormat>,
              'C',
            ],
          },
          {
            selected_value: (
              <NumberFormat always_selectall ban>
                15349648901
              </NumberFormat>
            ),
            content: [
              <NumberFormat key="ban-2" always_selectall ban>
                15349648901
              </NumberFormat>,
              'D',
            ],
          },
          {
            content: 'E',
          },
          {
            selected_key: 'key_1',
            selected_value: 'Find me by keypress',
            content: ['F', 'F', 'F', 'F'],
          },
          {
            content: 'G',
          },
          {
            content: 'H',
          },
        ]

        return (
          <Dropdown
            data={scrollableData}
            value="key_1" // use either index (5) or selected_key: 'key_1'
            label="Label"
          />
        )
      }}
    </ComponentBox>
  </Wrapper>
)

export const DropdownNoValue = () => (
  <Wrapper>
    <ComponentBox data-visual-test="dropdown-closed">
      {() => {
        const data = [
          // Every data item can, beside "content" - contain what ever
          {
            // (optional) can be what ever
            selected_key: 'key_0',

            // (optional) is show instead of "content", once selected
            selected_value: 'Item 1 Value',

            // Item content as a string or array
            content: 'Item 1 Content',
          },
          {
            selected_key: 'key_1',
            content: ['Item 2 Value', 'Item 2 Content'],
          },
          {
            selected_value: (
              <NumberFormat always_selectall ban>
                11345678962
              </NumberFormat>
            ),
            content: [
              <NumberFormat key="ban" always_selectall ban>
                11345678962
              </NumberFormat>,
              'Bank account number',
            ],
          },
          {
            selected_key: 'key_2',
            selected_value: 'Item 3 Value',
            content: ['Item 3 Content A', 'Item 3 Content B'],
          },
          {
            selected_key: 'key_3',
            selected_value: 'Item 4 Value',
            content: ['Item 4 Content A', <>Custom Component</>],
          },
        ]

        return (
          <Dropdown
            data={data}
            label="Label"
            title="Please select a value"
            on_change={({ data }) => {
              console.log('on_change', data)
            }}
          />
        )
      }}
    </ComponentBox>
  </Wrapper>
)

export const DropdownEllipsisOverflow = () => (
  <Wrapper>
    <ComponentBox data-visual-test="dropdown-ellipsis">
      <Dropdown
        data={['Long text that will overflow with CSS ellipsis']}
        value={0}
        label="Label"
      />
    </ComponentBox>
  </Wrapper>
)

export const DropdownDirections = () => {
  const visualTestProps = (
    enabled: boolean,
  ): VisibleWhenVisualTestReturn => {
    if (!enabled) {
      return {}
    }
    return {
      direction: 'top',
    }
  }
  return (
    <Wrapper>
      <ComponentBox
        scope={{ visualTestProps }}
        data-visual-test="dropdown-item-directions"
      >
        <Dropdown
          label="Label"
          data={[
            ['Vertical', 'alignment'],
            <>
              <P modifier="medium">Vertical</P>
              <P>alignment</P>
            </>,
            <Dropdown.HorizontalItem key="item-1">
              <P modifier="medium" right="x-small">
                Horizontal
              </P>
              <P>alignment</P>
            </Dropdown.HorizontalItem>,
          ]}
          {...visualTestProps(globalThis.IS_TEST)}
        />
      </ComponentBox>
    </Wrapper>
  )
}

export const DropdownIconLeft = () => (
  <Wrapper>
    <ComponentBox scope={{ data }} data-visual-test="dropdown-left-icon">
      <Dropdown
        label="Label"
        icon_position="left"
        data={data}
        value={3}
        skip_portal={true}
        on_change={({ data: selectedDataItem }) => {
          console.log('on_change', selectedDataItem)
        }}
        on_show={() => {
          console.log('on_show')
        }}
      />
    </ComponentBox>
  </Wrapper>
)

export const DropdownActionMenu = () => (
  <Wrapper>
    <ComponentBox
      scope={{ trash, download }}
      data-visual-test="dropdown-action_menu"
    >
      <Dropdown
        title="ActionMenu"
        action_menu={true}
        align_dropdown="left"
        data={() => ({
          trash: (
            <>
              <Icon icon={trash} right />
              Move to trash
            </>
          ),
          download: (
            <>
              <Icon icon={download} right />
              Download
            </>
          ),
        })}
        on_change={({ value }) => console.log('action:', value)}
      />
    </ComponentBox>
  </Wrapper>
)

export const DropdownTertiary = () => (
  <Wrapper>
    <ComponentBox scope={{ data }} data-visual-test="dropdown-tertiary">
      <Dropdown
        variant="tertiary"
        direction="bottom"
        independent_width={true}
        icon_position="left"
        align_dropdown="left"
        data={data}
      />
    </ComponentBox>
  </Wrapper>
)

export const DropdownTertiaryRight = () => (
  <Wrapper>
    <ComponentBox
      scope={{ data }}
      data-visual-test="dropdown-tertiary-right"
    >
      <Dropdown
        variant="tertiary"
        direction="bottom"
        independent_width={true}
        icon_position="right"
        align_dropdown="right"
        data={data}
      />
    </ComponentBox>
  </Wrapper>
)

export const DropdownMoreMenu = () => {
  const visualTestProps = (
    enabled: boolean,
  ): VisibleWhenVisualTestReturn => {
    if (!enabled) {
      return {}
    }
    return {
      independent_width: true,
      direction: 'bottom',
    }
  }
  return (
    <Wrapper>
      <ComponentBox
        scope={{ visualTestProps }}
        data-visual-test="dropdown-more_menu"
      >
        <Dropdown
          more_menu={true}
          size="small"
          title="Choose an item"
          data={() => [
            <Link href="/" key="item-1">
              Go to this Link
            </Link>,
            'Or press on me',
            <>Custom component</>,
          ]}
          right="small"
          {...visualTestProps(globalThis.IS_TEST)}
        />
        <Dropdown
          prevent_selection={true}
          align_dropdown="right"
          size="small"
          title={null}
          aria-label="Choose an item"
          data={() => ({
            first: (
              <Link href="/" key="item-1">
                Go to this Link
              </Link>
            ),
            second: 'Or press on me',
            third: <>Custom component</>,
          })}
          right="small"
          {...visualTestProps(globalThis.IS_TEST)}
        />
        <Dropdown
          more_menu={true}
          title="Choose an item"
          data={[
            <Link href="/" key="item-1">
              Go to this Link
            </Link>,
            'Or press on me',
            <>Custom component</>,
          ]}
          right="small"
        />
        <Dropdown
          prevent_selection={true}
          align_dropdown="right"
          title={null}
          aria-label="Choose an item"
          data={() => ({
            first: (
              <Link href="/" key="item-1">
                Go to this Link
              </Link>
            ),
            second: 'Or press on me',
            third: <>Custom component</>,
          })}
          on_change={({ value }) => {
            console.log('on_change', value)
          }}
          on_select={({ active_item }) => {
            console.log('on_select', active_item)
          }}
        />
      </ComponentBox>
    </Wrapper>
  )
}

export const DropdownDisabled = () => (
  <Wrapper>
    <ComponentBox scope={{ data }} data-visual-test="dropdown-disabled">
      <Dropdown disabled data={['Disabled Dropdown']} label="Label" />
    </ComponentBox>
  </Wrapper>
)

export const DropdownDisabledOptions = () => (
  <Wrapper>
    <ComponentBox data-visual-test="dropdown-disabled-options">
      <Dropdown
        data={[
          {
            content: 'Item 1 Content',
          },
          { content: ['Item 2 Content', '(disabled)'], disabled: true },
          { content: ['Item 3 Content', '(disabled)'], disabled: true },
          {
            content: 'Item 4 Content A',
          },
        ]}
        label="Label"
      />
    </ComponentBox>
  </Wrapper>
)

export const DropdownDisabledTertiary = () => (
  <Wrapper>
    <ComponentBox data-visual-test="dropdown-disabled-tertiary">
      <Dropdown
        disabled
        variant="tertiary"
        data={['Disabled Dropdown']}
        label="Disabled tertiary dropdown"
      />
    </ComponentBox>
  </Wrapper>
)

export const DropdownCustomEvent = () => {
  const visualTestProps = (
    enabled: boolean,
  ): VisibleWhenVisualTestReturn => {
    if (!enabled) {
      return {}
    }
    return {
      prevent_close: true,
      independent_width: true,
      skip_portal: true,
      direction: 'bottom',
    }
  }
  return (
    <Wrapper>
      <ComponentBox
        scope={{ data, visualTestProps }}
        data-visual-test="dropdown-action_menu-custom"
      >
        {() => {
          const CustomComponent = () => (
            <CustomComponentInner
              onTouchStart={preventDefault}
              onClick={(e) => {
                console.log('Do something different')
                preventDefault(e)
              }}
            >
              Custom event handler
            </CustomComponentInner>
          )
          const CustomComponentInner = styled.span`
            display: block;
            width: 100%;
            margin: -1rem -2rem -1rem -1rem;
            padding: 1rem 2rem 1rem 1rem;
          `
          const preventDefault = (e) => {
            e.stopPropagation()
            e.preventDefault()
          }

          return (
            <Dropdown
              action_menu
              right
              label="Label"
              title="Choose an item"
              data={() => ({
                first: (
                  <Link href="/" key="item-1">
                    Go to this Link
                  </Link>
                ),
                second: 'Or press on me',
                third: <CustomComponent key="item-2" />,
              })}
              on_change={({ value }) => {
                console.log('More menu:', value)
              }}
              suffix={
                <HelpButton title="Modal Title">Modal content</HelpButton>
              }
              {...visualTestProps(globalThis.IS_TEST)}
            />
          )
        }}
      </ComponentBox>
    </Wrapper>
  )
}

export const DropdownSizes = () => (
  <Wrapper>
    <ComponentBox data-visual-test="dropdown-sizes" scope={{ data }}>
      <Flex.Vertical>
        <Dropdown label="Label" size="default" data={() => data} />
        <Dropdown label="Label" size="medium" data={() => data} />
        <Dropdown label="Label" size="large" data={() => data} />
      </Flex.Vertical>
    </ComponentBox>
  </Wrapper>
)

export const DropdownCustomWidth = () => (
  <Wrapper>
    <ComponentBox scope={{ data }}>
      {() => {
        const CustomWidthOne = styled(Dropdown)`
          .dnb-dropdown__shell {
            width: 10rem;
          }
        `
        const CustomWidthTwo = styled(Dropdown)`
          &.dnb-dropdown--is-popup .dnb-drawer-list__root {
            width: 12rem;
          }
        `
        const CustomWidthThree = styled(Dropdown)`
          /** Change the "__shell" width */
          .dnb-dropdown__shell {
            width: 10rem;
          }

          /** Change the "__list" width */
          .dnb-drawer-list__root {
            width: 20rem;
          }
        `
        const CustomWidthFour = styled(Dropdown)`
          width: 60%;
          min-width: 224px; /** 14rem (please use pixels on min-width!) */
          max-width: 25rem;

          /** In case we have a label */
          .dnb-form-label + .dnb-dropdown__inner {
            width: 100%;
          }
        `

        return (
          <Flex.Vertical>
            <CustomWidthOne
              label="Label"
              size="default"
              icon_position="left"
              data={data}
            />
            <CustomWidthTwo
              label="Label"
              size="small"
              more_menu
              data={data}
            />
            <CustomWidthThree
              label="Label"
              size="large"
              align_dropdown="right"
              data={data}
            />
            <CustomWidthFour
              title="Min and max width"
              stretch={true}
              data={data}
            />
          </Flex.Vertical>
        )
      }}
    </ComponentBox>
  </Wrapper>
)

export const DropdownStatusVertical = () => (
  <Wrapper>
    <ComponentBox
      data-visual-test="dropdown-status-error"
      scope={{ data }}
    >
      <Dropdown
        data={data}
        label="Label"
        label_direction="vertical"
        status="Message to the user"
      />
    </ComponentBox>
  </Wrapper>
)

export const DropdownListOpened = () => (
  <Wrapper>
    <ComponentBox
      data-visual-test="dropdown-list"
      scope={{ data }}
      hideCode
    >
      <span className="dnb-drawer-list__list">
        <ul className="dnb-drawer-list__options">
          <li className="dnb-drawer-list__option first-of-type">
            <span className="dnb-drawer-list__option__inner">
              Brukskonto - Kari Nordmann
            </span>
          </li>
          <li className="dnb-drawer-list__option dnb-drawer-list__option--selected">
            <span className="dnb-drawer-list__option__inner">
              <span className="dnb-drawer-list__option__item item-nr-1">
                <NumberFormat always_selectall key="n-1" ban>
                  12345678902
                </NumberFormat>
              </span>
              <span className="dnb-drawer-list__option__item">
                Sparekonto - Ole Nordmann
              </span>
            </span>
          </li>
          <li className="dnb-drawer-list__option">
            <span className="dnb-drawer-list__option__inner">
              <span className="dnb-drawer-list__option__item item-nr-1">
                <NumberFormat always_selectall key="n-2" ban>
                  11345678962
                </NumberFormat>
              </span>
              <span className="dnb-drawer-list__option__item">
                Feriekonto - Kari Nordmann med et kjempelangt etternavnsen
              </span>
            </span>
          </li>
          <li className="dnb-drawer-list__option last-of-type">
            <span className="dnb-drawer-list__option__inner">
              <span className="dnb-drawer-list__option__item item-nr-1">
                <NumberFormat always_selectall key="n-3" ban>
                  15349648901
                </NumberFormat>
              </span>
              <span className="dnb-drawer-list__option__item">
                Oppussing - Ole Nordmann
              </span>
            </span>
          </li>
          <li className="dnb-drawer-list__triangle" />
        </ul>
      </span>
    </ComponentBox>
  </Wrapper>
)

export const DropdownCustomizedLook = () => {
  return (
    <Wrapper>
      <ComponentBox scope={{ chevron_right, newspaper, chevron_down }}>
        {() => {
          const styles = {
            customTrigger: {
              backgroundColor: '#d4ecc5',
              color: '#14555a',
              border: 'none',
              borderRadius: '8px',
              padding: '8px 16px',
              fontWeight: 600,
            },
            customMenuItem: {
              display: 'flex',
              flexFlow: 'row nowrap',
              justifyContent: 'space-between',
              alignItems: 'center',
            },
            customMenuItemTitle: {
              display: 'flex',
              flexFlow: 'column',
              gap: '0.5rem',
            },
          }

          const MenuItem = ({ title, content, key }) => (
            <span style={styles.customMenuItem} key="item-1">
              <span style={styles.customMenuItemTitle}>
                {title}
                <span>{content}</span>
              </span>
              <Icon icon={chevron_right} />
            </span>
          )

          const data = {
            accounts: (
              <MenuItem
                key="item-1"
                title="Accounts"
                content={'Bills, Savings'}
              />
            ),
            loans: (
              <MenuItem
                key="item-2"
                title="Loans"
                content={'Mortgage, Car'}
              />
            ),
            cards: (
              <MenuItem
                key="item-3"
                title="Cards"
                content={'Visa, Mastercard'}
              />
            ),
            stocks: (
              <MenuItem
                key="item-4"
                title="Stocks"
                content={'Nvidia, Apple'}
              />
            ),
          }

          return (
            <Dropdown
              data={data}
              action_menu
              trigger_element={(props) => (
                <button {...props} style={styles.customTrigger}>
                  <Icon icon={newspaper} /> Custom trigger{' '}
                  <Icon icon={chevron_down} />
                </button>
              )}
            />
          )
        }}
      </ComponentBox>
    </Wrapper>
  )
}
