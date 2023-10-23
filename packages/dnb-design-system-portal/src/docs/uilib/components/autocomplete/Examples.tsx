/**
 * UI lib Component Example
 *
 */

import React from 'react'
import ComponentBox from '../../../../shared/tags/ComponentBox'
import { format } from '@dnb/eufemia/src/components/number-format/NumberUtils'
import styled from '@emotion/styled'
import Context from '@dnb/eufemia/src/shared/Context'
import {
  Autocomplete,
  Flex,
  IconPrimary,
  NumberFormat,
} from '@dnb/eufemia/src'

const Wrapper = styled.div`
  [data-visual-test] {
    > :not(.dnb-autocomplete--is-popup) .dnb-autocomplete__shell {
      width: var(--autocomplete-width);
    }
  }
  [data-visual-test='autocomplete-opened'] {
    width: 45rem;
    height: 22rem !important;
  }
`

export const AutocompleteDefaultExample = () => (
  <Wrapper>
    <ComponentBox scope={{ topMovies }}>
      <Autocomplete data={topMovies} label="Label:" />
    </ComponentBox>
  </Wrapper>
)

export const AutocompleteStatusExample = () => (
  <Wrapper>
    <ComponentBox
      data-visual-test="autocomplete-status"
      scope={{ topMovies }}
    >
      <Autocomplete
        data={topMovies}
        label="Label:"
        status="Please select a valid date"
        status_state="info"
        show_submit_button
      />
    </ComponentBox>
  </Wrapper>
)

const numbersData = [
  format(20001234567, { ban: true }),
  format(22233344425, { ban: true }),
  format(1234.5, { currency: true }),
  format('+47116000', { phone: true }),
] as string[]

export const AutocompleteNumbersExample = () => (
  <Wrapper>
    <ComponentBox scope={{ numbersData }}>
      <Autocomplete
        input_value="201"
        show_clear_button
        label="Label:"
        data={numbersData}
        search_numbers={true}
      />
    </ComponentBox>
  </Wrapper>
)

export const AutocompleteWithCustomTitle = () => (
  <Wrapper>
    <ComponentBox
      data-visual-test="autocomplete-closed"
      scope={{ topMovies }}
    >
      <Autocomplete
        data={topMovies}
        keep_value={true}
        show_clear_button={true}
        label="Label:"
        placeholder="Custom placeholder ..."
        on_change={({ data }) => {
          console.log('on_change', data)
        }}
      />
    </ComponentBox>
  </Wrapper>
)

export const AutocompleteDynamicallyUpdatedData = () => (
  <Wrapper>
    <ComponentBox scope={{ topMovies }}>
      {() => {
        const onTypeHandler = ({
          value,
          showIndicator,
          hideIndicator,
          updateData,
          debounce,
          /* ... */
        }) => {
          console.log('typed value:', value)

          showIndicator()
          debounce(
            ({ value }) => {
              console.log('debounced value:', value)

              // simulate server delay
              const timeout = setTimeout(() => {
                // update the drawerList
                updateData(topMovies)
                hideIndicator()
              }, 600)

              // cancel invocation method
              return () => clearTimeout(timeout)
            },
            { value },
            250,
          )
        }
        return (
          <Autocomplete
            mode="async"
            on_type={onTypeHandler}
            no_scroll_animation={true}
            placeholder="Search ..."
          />
        )
      }}
    </ComponentBox>
  </Wrapper>
)

export const AutocompleteFirstFocusUpdate = () => (
  <Wrapper>
    <ComponentBox scope={{ topMovies }}>
      {() => {
        const onFocusHandler = ({
          updateData,
          dataList,
          showIndicatorItem,
        }) => {
          if (!dataList.length) {
            showIndicatorItem()
            setTimeout(() => {
              updateData(topMovies)
            }, 1e3)
          }
        }

        return (
          <Autocomplete
            mode="async"
            no_scroll_animation={true}
            prevent_selection={true}
            on_type={({ value /* updateData, ... */ }) => {
              console.log('on_type', value)
            }}
            on_focus={onFocusHandler}
          />
        )
      }}
    </ComponentBox>
  </Wrapper>
)

export const AutocompleteToggleExample = () => (
  <Wrapper>
    <ComponentBox
      data-visual-test="autocomplete-drawer-button"
      scope={{ topMovies }}
    >
      <Autocomplete
        label="Label:"
        value={10}
        show_submit_button={true}
        on_change={({ data }) => {
          console.log('on_change', data)
        }}
      >
        {() => topMovies}
      </Autocomplete>
    </ComponentBox>
  </Wrapper>
)

export const AutocompletePredefinedInput = () => (
  <Wrapper>
    <ComponentBox
      data-visual-test="autocomplete-drawer-search"
      scope={{ topMovies }}
    >
      <Autocomplete
        label="Label:"
        input_value="the pa ther"
        no_animation
        on_change={({ data }) => {
          console.log('on_change', data)
        }}
      >
        {() => topMovies}
      </Autocomplete>
    </ComponentBox>
  </Wrapper>
)

export const AutocompleteDifferentSizes = () => (
  <Wrapper>
    <ComponentBox
      data-visual-test="autocomplete-sizes"
      scope={{ topMovies }}
    >
      <Flex.Vertical>
        <Autocomplete
          label="Label:"
          size="default"
          data={() => topMovies}
        />
        <Autocomplete
          label="Label:"
          size="medium"
          data={() => topMovies}
        />
        <Autocomplete label="Label:" size="large" data={() => topMovies} />
      </Flex.Vertical>
    </ComponentBox>
  </Wrapper>
)

export const AutocompleteCustomWidth = () => (
  <ComponentBox
    data-visual-test="autocomplete-input-width"
    scope={{ topMovies }}
  >
    {() => {
      const CustomWidthOne = styled(Autocomplete)`
        .dnb-autocomplete__shell {
          width: 10rem;
        }
      `

      const CustomWidthTwo = styled(Autocomplete)`
        &.dnb-autocomplete--is-popup .dnb-drawer-list__root {
          width: 12rem;
        }
      `
      const CustomWidthThree = styled(Autocomplete)`
        /** Change the "__shell" width */
        .dnb-autocomplete__shell {
          width: 12rem;
        }

        /** Change the "__list" width */
        .dnb-drawer-list__root {
          width: 20rem;
        }
      `
      return (
        <Flex.Vertical>
          <CustomWidthOne
            label="Label:"
            label_sr_only
            size="default"
            icon_position="left"
            data={topMovies}
          />
          <CustomWidthTwo
            label="Label:"
            label_sr_only
            size="medium"
            data={topMovies}
          />
          <CustomWidthThree
            label="Label:"
            label_sr_only
            size="large"
            align_autocomplete="right"
            icon_position="right"
            input_icon="bell"
            data={topMovies}
          />
        </Flex.Vertical>
      )
    }}
  </ComponentBox>
)

export const AutocompleteSuffix = () => {
  const { locale } = React.useContext(Context)
  const ban = format(20001234567, { ban: true, locale }) as string
  const suffix_value = format(12345678, {
    currency: true,
    locale,
  }) as string
  const numbers = [
    {
      selected_value: 'Brukskonto',
      suffix_value,
      content: ['Brukskonto', ban],
    },
    {
      selected_value: 'BSU',
      suffix_value,
      content: ['BSU', ban],
    },
    {
      selected_value: 'Sparekonto',
      suffix_value,
      content: ['Sparekonto', ban],
    },
    {
      selected_value: 'Brukskonto',
      suffix_value,
      content: ['Brukskonto', ban],
    },
  ]
  return (
    <ComponentBox
      data-visual-test="autocomplete-suffix"
      scope={{ numbers }}
    >
      {() => {
        const CustomWidth = styled(Autocomplete)`
          .dnb-drawer-list__root,
          .dnb-autocomplete__shell {
            width: 50vw;
            min-width: 15rem;
            max-width: 30rem;
          }
        `
        return (
          <CustomWidth
            value={1}
            data={numbers}
            size="medium"
            input_icon={null}
            show_submit_button
            label="From account"
            label_direction="vertical"
          />
        )
      }}
    </ComponentBox>
  )
}

export const AutocompleteOpened = () => {
  return (
    <Wrapper>
      <ComponentBox
        data-visual-test="autocomplete-opened"
        scope={{ topMovies }}
        hideCode
      >
        <Autocomplete
          label="Label:"
          input_value="lord"
          opened
          no_animation
          direction="bottom"
          prevent_close
          data={topMovies}
          right="large"
        />
        <Autocomplete
          label="Label:"
          input_value="angry"
          skip_portal
          opened
          no_animation
          direction="bottom"
          prevent_close
          data={topMovies}
          className="focus-trigger"
        />
      </ComponentBox>
    </Wrapper>
  )
}

const topMovies = [
  {
    content: (
      <Autocomplete.HorizontalItem>
        <IconPrimary size="medium" icon="bell" right="x-small" />
        The Shawshank Redemption
      </Autocomplete.HorizontalItem>
    ),
    year: 1994,
  },
  { content: ['The Godfather', 'Line with more info'], year: 1972 },
  {
    content: [
      'The Godfather: Part II',
      <a key="a-1" className="dnb-anchor" href="/">
        Anchor 1
      </a>,
      <a key="a-2" className="dnb-anchor" href="/">
        Anchor 2
      </a>,
      'Line with more info',
    ],
    year: 1974,
  },
  { content: 'The Dark Knight', year: 2008 },
  { content: ['12 Angry Men', 'Second row', 'Third row'], year: 1957 },
  { content: "Schindler's List", year: 1993 },
  { content: 'Pulp Fiction', year: 1994 },
  { content: 'The Lord of the Rings: The Return of the King', year: 2003 },
  { content: 'The Good, the Bad and the Ugly', year: 1966 },
  { content: 'Fight Club', year: 1999 },
  {
    content: 'The Lord of the Rings: The Fellowship of the Ring',
    year: 2001,
  },
  {
    content: 'Star Wars: Episode V - The Empire Strikes Back',
    year: 1980,
  },
  { content: 'Forrest Gump', year: 1994 },
  { content: 'Inception', year: 2010 },
  { content: 'The Lord of the Rings: The Two Towers', year: 2002 },
  { content: "One Flew Over the Cuckoo's Nest", year: 1975 },
  { content: 'Goodfellas', year: 1990 },
  { content: 'The Matrix', year: 1999 },
  { content: 'Seven Samurai', year: 1954 },
  { content: 'Star Wars: Episode IV - A New Hope', year: 1977 },
  { content: 'City of God', year: 2002 },
  { content: 'Se7en', year: 1995 },
  { content: 'The Silence of the Lambs', year: 1991 },
  { content: "It's a Wonderful Life", year: 1946 },
  { content: 'Life Is Beautiful', year: 1997 },
  { content: 'The Usual Suspects', year: 1995 },
  { content: 'Léon: The Professional', year: 1994 },
  { content: 'Spirited Away', year: 2001 },
  { content: 'Saving Private Ryan', year: 1998 },
  { content: 'Once Upon a Time in the West', year: 1968 },
  { content: 'American History X', year: 1998 },
  { content: 'Interstellar', year: 2014 },
  { content: 'Casablanca', year: 1942 },
  { content: 'City Lights', year: 1931 },
  { content: 'Psycho', year: 1960 },
  { content: 'The Green Mile', year: 1999 },
  { content: 'The Intouchables', year: 2011 },
  { content: 'Modern Times', year: 1936 },
  { content: 'Raiders of the Lost Ark', year: 1981 },
  { content: 'Rear Window', year: 1954 },
  { content: 'The Pianist', year: 2002 },
  { content: 'The Departed', year: 2006 },
  { content: 'Terminator 2: Judgment Day', year: 1991 },
  { content: 'Back to the Future', year: 1985 },
  { content: 'Whiplash', year: 2014 },
  { content: 'Gladiator', year: 2000 },
  { content: 'Memento', year: 2000 },
  { content: 'The Prestige', year: 2006 },
  { content: 'The Lion King', year: 1994 },
  { content: 'Apocalypse Now', year: 1979 },
  { content: 'Alien', year: 1979 },
  { content: 'Sunset Boulevard', year: 1950 },
  {
    content:
      'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb',
    year: 1964,
  },
  { content: 'The Great Dictator', year: 1940 },
  { content: 'Cinema Paradiso', year: 1988 },
  { content: 'The Lives of Others', year: 2006 },
  { content: 'Grave of the Fireflies', year: 1988 },
  { content: 'Paths of Glory', year: 1957 },
  { content: 'Django Unchained', year: 2012 },
  { content: 'The Shining', year: 1980 },
  { content: 'WALL·E', year: 2008 },
  { content: 'American Beauty', year: 1999 },
  { content: 'The Dark Knight Rises', year: 2012 },
  { content: 'Princess Mononoke', year: 1997 },
  { content: 'Aliens', year: 1986 },
  { content: 'Oldboy', year: 2003 },
  { content: 'Once Upon a Time in America', year: 1984 },
  { content: 'Witness for the Prosecution', year: 1957 },
  { content: 'Das Boot', year: 1981 },
  { content: 'Citizen Kane', year: 1941 },
  { content: 'North by Northwest', year: 1959 },
  { content: 'Vertigo', year: 1958 },
  { content: 'Star Wars: Episode VI - Return of the Jedi', year: 1983 },
  { content: 'Reservoir Dogs', year: 1992 },
  { content: 'Braveheart', year: 1995 },
  { content: 'M', year: 1931 },
  { content: 'Requiem for a Dream', year: 2000 },
  { content: 'Amélie', year: 2001 },
  { content: 'A Clockwork Orange', year: 1971 },
  { content: 'Like Stars on Earth', year: 2007 },
  { content: 'Taxi Driver', year: 1976 },
  { content: 'Lawrence of Arabia', year: 1962 },
  { content: 'Double Indemnity', year: 1944 },
  { content: 'Eternal Sunshine of the Spotless Mind', year: 2004 },
  { content: 'Amadeus', year: 1984 },
  { content: 'To Kill a Mockingbird', year: 1962 },
  { content: 'Toy Story 3', year: 2010 },
  { content: 'Logan', year: 2017 },
  { content: 'Full Metal Jacket', year: 1987 },
  { content: 'Dangal', year: 2016 },
  { content: 'The Sting', year: 1973 },
  { content: '2001: A Space Odyssey', year: 1968 },
  { content: "Singin' in the Rain", year: 1952 },
  { content: 'Toy Story', year: 1995 },
  { content: 'Bicycle Thieves', year: 1948 },
  { content: 'The Kid', year: 1921 },
  { content: 'Inglourious Basterds', year: 2009 },
  { content: 'Snatch', year: 2000 },
  { content: '3 Idiots', year: 2009 },
  { content: 'Monty Python and the Holy Grail', year: 1975 },
]

export const AutocompleteDisabledExample = () => (
  <Wrapper>
    <ComponentBox
      scope={{ topMovies }}
      data-visual-test="autocomplete-disabled"
    >
      <Autocomplete
        disabled
        show_submit_button
        data={topMovies}
        value={1}
        label="Label:"
        bottom
      />
      <br />
      <Autocomplete
        disabled
        show_submit_button
        data={topMovies}
        value={1}
        label="Label:"
        suffix="Suffix"
        size="large"
      />
    </ComponentBox>
  </Wrapper>
)

export const AutocompleteContentAsArrayExample = () => (
  <Wrapper>
    <ComponentBox hidePreview>
      <Autocomplete
        data={[
          {
            content: [
              <IconPrimary icon="bell" key="item-1" />,
              <span className="custom-selector-a" key="item-2">
                The Shawshank Redemption
              </span>,
              <span className="custom-selector-b" key="item-3">
                The Dark Knight
              </span>,
              // etc.
              <NumberFormat value={1234} key="item-4" />, // <-- Not searchable nor highlightable
            ],
          },
        ]}
        label="Label:"
      />
    </ComponentBox>
  </Wrapper>
)

export const AutocompleteContentAsFragmentExample = () => (
  <Wrapper>
    <ComponentBox hidePreview>
      <Autocomplete
        data={[
          {
            content: (
              <>
                <IconPrimary icon="bell" />
                <span className="custom-selector-a">
                  The Shawshank Redemption
                </span>
                <span className="custom-selector-b">The Dark Knight</span>
              </>
            ),
          },
        ]}
        label="Label:"
      />
    </ComponentBox>
  </Wrapper>
)

export const AutocompleteContentDecoupledExample = () => (
  <Wrapper>
    <ComponentBox hidePreview>
      <Autocomplete
        data={[
          {
            content: ['your visual content'],
            search_content: ['your search content'],
          },
        ]}
        label="Label:"
      />
    </ComponentBox>
  </Wrapper>
)
