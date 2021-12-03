/**
 * @dnb/eufemia Component Story
 *
 */

import React from 'react'
import { Wrapper, Box } from 'storybook-utils/helpers'
import styled from '@emotion/styled'

import {
  Autocomplete,
  NumberFormat,
  IconPrimary,
  Button,
  FormRow,
} from '../../'
import { Anchor } from '../../../elements'
import { Context } from '../../../shared'
import { SubmitButton } from '../../input/Input'
import { format } from '../../number-format/NumberUtils'

export default {
  title: 'Eufemia/Components/Autocomplete',
}

const numbers = [
  format(20001234567, { ban: true }),
  format(22233344425, { ban: true }),
  format(1234.5, { currency: true }),
  format('+47116000', { phone: true }),
  '100.222.333,40',
  '123456',
  '100 222 444,50',
]

export const SearchNumbers = () => {
  return (
    <Autocomplete
      // input_value="123"
      input_value="201"
      // input_value="100 222 4"
      opened
      no_animation
      label="Label:"
      data={numbers}
      search_numbers
      // search_in_word_index={1}
    />
  )
}

const accounts = [
  { selected_id: 1, content: 'A' },
  { selected_id: 2, content: 'B' },
  { selected_id: 3, content: 'C' },
  { selected_id: 4, content: 'D' },
]
export function UpdateEachOther() {
  const [selectedA, setSelectedA] = React.useState(-1)
  const [selectedB, setSelectedB] = React.useState(-1)
  const [selectedAccountsA, setSelectedAccountsA] =
    React.useState(accounts)
  const [selectedAccountsB, setSelectedAccountsB] =
    React.useState(accounts)

  const indexA = selectedAccountsA.findIndex(({ selected_id }) => {
    return selected_id === selectedA
  })
  const indexB = selectedAccountsB.findIndex(({ selected_id }) => {
    return selected_id === selectedB
  })

  console.log('selectedA', { selectedAccountsA, selectedA, indexA })
  console.log('selectedB', { selectedAccountsB, selectedB, indexB })

  return (
    <>
      <Autocomplete
        top
        right
        label="selectedA"
        data={selectedAccountsA}
        value={indexA}
        on_change={({ data: account }) => {
          setSelectedA(account?.selected_id)
          setSelectedAccountsB(
            accounts.filter(({ selected_id }) => {
              return selected_id !== account?.selected_id
            })
          )
        }}
      />
      <Autocomplete
        top
        label="selectedB"
        data={selectedAccountsB}
        value={indexB}
        on_change={({ data: account }) => {
          setSelectedB(account?.selected_id)
          setSelectedAccountsA(
            accounts.filter(({ selected_id }) => {
              return selected_id !== account?.selected_id
            })
          )
        }}
      />
    </>
  )
}

export function onBlur() {
  return (
    <Autocomplete
      left
      data={['AAA', 'BBB', 'CCC']}
      // on_change={({ data }) => {
      //   console.log('on_change', data)
      // }}
      on_focus={({ value }) => {
        console.log('on_focus', value)
      }}
      on_blur={({ value }) => {
        console.log('on_blur', value)
      }}
    />
  )
}

export const SearchWithWrappers = () => {
  const topMovies = [
    { content: 'item aa', search_content: ['AA c'] },
    { content: 'item bb', search_content: ['BB cc zethx'] },
    { content: 'item cc', search_content: ['CC', 'cc'] },
    { content: 'item cc second', search_content: ['CC', 'cc', 'more'] },
    { content: 'item dd', search_content: ['DD', 'dd'] },
    { content: 'item ee', search_content: ['EE', 'ee'] },
  ]
  // const topMovies = ['AA c', 'BB cc zethx', { content: ['CC', 'cc'] }]
  return (
    <>
      <Autocomplete
        // input_value="123"
        input_value="cc bb more"
        // input_value="cc bb zethx"
        // input_value="the aa red"
        // input_value="red the"
        // input_value="100 222 4"
        opened
        no_animation
        label="Label:"
        data={topMovies}
        // disable_highlighting
        // search_in_word_index={1}
      />
    </>
  )
}

const CustomStyle = styled.div`
  .dnb-autocomplete__shell {
    width: 10rem; /* custom width */
  }
  .dnb-autocomplete__list {
    min-width: 10rem; /* custom width */
  }
`

const AutocompleteWithState = () => {
  const [results, setResults] = React.useState(null)

  return (
    <Autocomplete
      mode="async" // prevents showing no options message og typing
      no_scroll_animation
      // prevent_selection
      placeholder="Search ..."
      // label="Search"
      // label_sr_only="true"
      on_type={({
        value,
        showIndicator,
        hideIndicator,
        updateData,
        debounce,
      }) => {
        showIndicator()
        console.log('value 1', value)
        setResults(topMovies)
        debounce(
          ({ value, results }) => {
            // 1. simulate server delay
            const timeout = setTimeout(() => {
              console.log('value 2', value, results)
              updateData(results)
              hideIndicator()
            }, 600)

            // 2. if it gets debounced, we cancel this timeout
            return () => clearTimeout(timeout)
          },
          { value, results },
          1e3
        )
      }}
    />
  )
}

export const AutocompleteLimit = () => {
  const data = []

  const topMovies = [
    { content: 'aaa' },
    { content: 'bbb' },
    { content: 'ccc' },
  ]
  const multi = 20
  const total = topMovies.length

  for (let i = 0, l = total * multi; i < l; ++i) {
    console.log('c', i % l)
    const item = topMovies[i % total]
    item.__id = i
    data.push(item)
  }

  return (
    <Autocomplete
      opened
      prevent_close
      // no_animation
      // input_value="the"
      input_value="a"
      show_clear_button
      show_submit_button
      // limit_results={2}
      data={data}
    />
  )
}

export const AutocompleteSandbox = () => {
  // const [data, setData] = useState(autocompleteData)
  // const [value, setSelectedItem] = useState(0)
  return (
    <Wrapper>
      <Box>
        <Autocomplete
          label="Keep value"
          data={topMovies}
          input_value="does not exist"
          // keep_value
          // disable_filter
          keep_value_and_selection
          show_clear_button
          // prevent_selection
          // on_change={({ data }) => {
          //   console.log('on_change', data)
          // }}
          // on_show={({ event, data }) => {
          //   console.log('on_show', event, data)
          // }}
          // on_focus={({ event, data }) => {
          //   console.log('on_focus', event, data)
          // }}
          // on_blur={({ event, data }) => {
          //   console.log('on_blur', event, data)
          // }}
        />
      </Box>
      <Box>
        <Autocomplete
          label="Label:"
          show_submit_button="true"
          show_clear_button
          // icon="bell"
          // input_icon="bell"
          // submit_button_icon="bell"
          submit_element={<SubmitButton icon="bell" />}
          on_change={({ data }) => {
            console.log('on_change', data)
          }}
        >
          {() => topMovies}
        </Autocomplete>
      </Box>
      <Box>
        <UpdateDataExample />
      </Box>
      <Box>
        <CustomStyle>
          <Autocomplete
            drawer_class="drawer_class"
            size="small"
            value="A"
            data={['A']}
            icon_position="right"
          />
          <Autocomplete
            status="feil"
            size="default"
            value="A"
            data={['A']}
          />
          <Autocomplete size="medium" value="A" data={['A']} />
          <Autocomplete size="large" value="A" data={['A']} />
        </CustomStyle>
      </Box>
      <Box>
        <Autocomplete
          // opened
          // prevent_close
          // no_animation
          // input_value="foo bar th"
          // input_value="bb th x"
          input_value="co pr ti"
          show_clear_button
          show_submit_button
          // value="b"
          data={[
            {
              content: [
                'Component Properties',
                [
                  <Anchor key="a" href="/">
                    Pro Com 1
                  </Anchor>,
                  <a key="b" href="/" className="dnb-anchor">
                    Pro Com 2
                  </a>,
                  <a key="c" href="/" className="dnb-anchor">
                    Pro Com 3
                  </a>,
                ],
              ],
            },
            'More',
            'Comp X',
            // {
            //   content: [
            //     'Other Content',
            //     [
            //       <Anchor key="a" href="/" >
            //         ComponentX PropertiesX
            //       </Anchor>
            //     ]
            //   ]
            // }
          ]}
          // icon_position="left"
          // on_select={(e) => {
          //   console.log('on_select ???', e)
          // }}
          on_change={(e) => {
            console.log('on_change', e)
          }}
          options_render={({
            Items,
            // , Item
          }) => (
            <>
              <Items />
              {/* <Item selected>123</Item> */}
              <div>Additional</div>
            </>
          )}
        />
        <Autocomplete
          // opened
          // prevent_close
          // no_animation
          // input_value="foo bar th"
          input_value="bb c"
          // value={2}
          show_submit_button
          // value="b"
          data={{
            a: 'A1 A2 C',
            b: 'BB cC zethTHx',
            c: 'CCC',
          }}
          // icon_position="left"
          // on_select={(e) => {
          //   console.log('on_select ???', e)
          // }}
          on_change={(e) => {
            console.log('on_change', e)
          }}
        />
      </Box>
      <Box>
        <Autocomplete
          mode="async" // prevents showing no options message og typing
          label="No selection / no filter"
          // label_sr_only="true"
          prevent_selection
          disable_filter
          data={topMovies}
          on_type={({
            // value,
            dataList,
            showIndicator,
            hideIndicator,
            updateData,
            debounce,
          }) => {
            console.log('dataList', dataList)
            showIndicator()
            debounce(() => {
              // 1. simulate server delay
              const timeout = setTimeout(() => {
                // updateData(['topMovies'])
                updateData(topMovies)
                hideIndicator()
              }, 600)

              // 2. if it gets debounced, we cancel this timeout
              return () => clearTimeout(timeout)
            })
          }}
          no_scroll_animation="true"
        />
        <Autocomplete
          mode="async"
          enable_closest_observer
          // label="Search"
          // label_sr_only="true"
          keep_value
          on_type={({ value /* updateData, ... */ }) => {
            console.log('on_type', value)
          }}
          on_focus={({
            dataList,
            updateData,
            showIndicatorItem,
            setMode,
          }) => {
            if (!(dataList.length > 0)) {
              showIndicatorItem()
              setTimeout(() => {
                updateData(topMovies)
                setMode('sync')
              }, 100)
            }
          }}
          no_scroll_animation="true"
        />
        <AutocompleteWithState />
      </Box>
      <Box>
        <Autocomplete
          input_icon={null}
          title="Type to find ..."
          // opened
          // prevent_close
          // no_animation
          input_value="d"
          on_select={(e) => {
            console.log('on_select', e)
          }}
          on_change={(e) => {
            console.log('on_change', e)
          }}
          data={testData}
        />
        <Autocomplete
          // opened
          // prevent_close
          no_animation
          // prevent_selection
          // input_value="the g er"
          input_value="episode a I"
          mode="async"
          label="Top 100 movies"
          data={topMovies}
        />
      </Box>
      <Box>
        <Autocomplete
          data={{
            a: 'AA',
            b: 'BB',
          }}
          // icon_position="left"
          on_select={(e) => {
            console.log('on_select', e)
          }}
          on_change={(e) => {
            console.log('on_change', e)
          }}
        />
        <Autocomplete
          on_select={(e) => {
            console.log('on_select', e)
          }}
          on_change={(e) => {
            console.log('on_change', e)
          }}
        >
          {{
            a: 'AA',
            b: '🔥',
          }}
        </Autocomplete>
      </Box>
      <Box>
        <Autocomplete data={autocompleteData} value="3" />
      </Box>
      <Box>
        <Autocomplete data={autocompleteDataScrollable} />
      </Box>
      {/* <Box>
        <Autocomplete
          label="Top 100 movies"
          data={topMovies}
        />
      </Box> */}
    </Wrapper>
  )
}

const testData = [
  {
    content: [
      'Dropdown',
      'The Dropdown component is a custom-made data selection component.',
    ],
  },
  {
    content: 'B',
  },
  {
    selected_value: 99999999,
    content: [
      <NumberFormat phone key={99999999}>
        99999999
      </NumberFormat>,
      'C',
    ],
  },
  {
    selected_value: 99999999,
    content: [
      <NumberFormat phone key={99999999}>
        99999999
      </NumberFormat>,
      'D',
    ],
  },
  {
    content: 'E',
  },
  {
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

const autocompleteData = [
  {
    selected_value: 'Brukskonto - Kari Nordmann',
    content: (
      <>
        {/* <Checkbox checked aria-hidden />  */}
        Brukskonto - Kari Nordmann
      </>
    ),
  },
  {
    content: [
      <NumberFormat key={99999999} phone>
        99999999
      </NumberFormat>,
      'Sparekonto - Ole Nordmann',
    ],
  },
  {
    selected_value:
      'Feriekonto - Kari Nordmann med et kjempelangt etternavnsen',
    content: [
      <NumberFormat key={99999999} phone>
        99999999
      </NumberFormat>,
      'Feriekonto - Kari Nordmann med et kjempelangt etternavnsen',
    ],
  },
  {
    selected_value: <>Custom selected {'🔥'}</>,
    content: [
      <NumberFormat key={99999999} phone>
        99999999
      </NumberFormat>,
      <>Custom content {'🔥'}</>,
    ],
  },
]
const autocompleteDataScrollable = [
  {
    selected_value: 'AAA',
    content: 'AA',
  },
  {
    content: [
      <NumberFormat key={99999999} phone>
        99999999zwzz
      </NumberFormat>,
      'BB',
    ],
  },
  {
    selected_value: 'CCC',
    content: [
      <NumberFormat key={99999999} phone>
        99999999
      </NumberFormat>,
      'CC',
    ],
  },
  {
    selected_value: 'DDD',
    content: [
      <NumberFormat key={99999999} phone>
        99999999
      </NumberFormat>,
      'DD',
    ],
  },
  {
    content: <>E</>,
  },
  <>Custom content {'🔥'}</>,
  [<React.Fragment key="key1">Custom content X {'🔥'}</React.Fragment>],
  {
    content: 'EE',
  },
  {
    content: 'EEE',
  },
  {
    content: ['F1', 'F2', 'F3', 'F4', 'F5'],
  },
  {
    content: 'GG',
  },
  {
    content: 'HH',
  },
]

const topMovies = [
  {
    // content: [
    //   <IconPrimary icon="bell" />,
    //   <span className="custom-selector">The Shawshank Redemption</span>,
    //   <span className="custom-selector">xx</span>,
    // ],
    content: (
      <>
        <IconPrimary icon="bell" />
        {/* <div>The Shawshank xRedemption</div> */}

        <span className="custom-selector-a">The Shawshank Redemption</span>

        <span className="custom-selector-b">xx</span>

        <NumberFormat
          currency
          value={1234}
          style={{ color: 'var(--color-black-55)' }}
        />
        <NumberFormat
          currency
          value={1234}
          // className="dnb-typo-bold"
        />
      </>
    ),
    // search_content: ['aa', 're', 1234],
    year: 1994,
  },
  { content: 'The Godfather', year: 1972 },
  { content: 'The Godfather: Part II', year: 1974 },
  { content: 'The Dark Knight', year: 2008 },
  { content: '12 Angry Men', year: 1957 },
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

const initialData = [
  { selected_value: '1', content: '1' },
  { selected_value: '2', content: '2' },
  { selected_value: '3', content: '3' },
  { selected_value: '4', content: '4' },
]

function UpdateDataExample() {
  const [choiceData, setChoiceData] = React.useState(initialData)
  const [selectedData, setSelectedData] = React.useState([])

  return (
    <>
      <pre>
        Selected data:{' '}
        {selectedData.map((item) => (
          <Button
            key={item.selected_value}
            size="small"
            on_click={() => {
              const updatedSelectedData = selectedData.filter(
                (data) => item.selected_value !== data.selected_value
              )
              setSelectedData(updatedSelectedData)
              setChoiceData(
                initialData.filter(
                  (data) =>
                    updatedSelectedData.findIndex(
                      ({ selected_value: updatedValue }) =>
                        updatedValue === data?.selected_value
                    ) === -1
                )
              )
            }}
          >
            {item.content}
          </Button>
        ))}
      </pre>

      <Autocomplete
        prevent_selection
        title="Choose an item"
        // prevent_selection
        data={choiceData}
        on_change={({
          data,
          setInputValue,
          // , updateData
        }) => {
          // update our choices
          setChoiceData(
            choiceData.filter(
              (item) => item.selected_value !== data.selected_value
            )
          )

          // we could have used updateData
          // updateData(newData)

          // only update selected data if they do not exists in the list
          if (
            selectedData.findIndex(
              ({ selected_value }) =>
                selected_value === data.selected_value
            ) === -1
          ) {
            setSelectedData([...selectedData, data])
          }

          // only to reset keyboard input values
          setInputValue(null)
        }}
      />
    </>
  )
}

const WideStyle = styled.div`
  .dnb-drawer-list__root,
  .dnb-autocomplete__shell {
    /* custom width */
    width: 50vw;
    min-width: 15rem;
    max-width: 30rem;
  }
`

export function DataSuffix() {
  const { locale } = React.useContext(Context)
  const ban = format(21001234567, { ban: true, locale })
  const numbers = [
    {
      selected_value: `Brukskonto (${ban})`,
      suffix_value: (
        <NumberFormat lang="nb" currency srLabel="Total:">
          {12345678}
        </NumberFormat>
      ),
      content: ['Brukskonto', ban],
    },
    {
      selected_value: `BSU (${ban})`,
      suffix_value: (
        <NumberFormat currency srLabel="Total:">
          {2223}
        </NumberFormat>
      ),
      content: ['BSU', ban],
    },
    {
      selected_value: `Sparekonto (${ban})`,
      suffix_value: (
        <NumberFormat currency srLabel="Total:">
          {876555.5}
        </NumberFormat>
      ),
      content: ['Sparekonto', ban],
    },
    {
      selected_value: `Brukskonto (${ban})`,
      suffix_value: (
        <NumberFormat currency srLabel="Total:">
          {34999.2}
        </NumberFormat>
      ),
      content: ['Brukskonto', ban],
    },
  ]

  return (
    <WideStyle>
      <FormRow vertical>
        <Autocomplete
          lang="nb"
          value={0}
          data={numbers}
          size="medium"
          input_icon={null}
          show_submit_button
          label="From account"
          label_direction="vertical"
        />
      </FormRow>
    </WideStyle>
  )
}
