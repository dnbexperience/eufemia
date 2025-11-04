/**
 * @dnb/eufemia Component Story
 *
 */

import React, { useState } from 'react'
import { Wrapper, Box } from 'storybook-utils/helpers'
import styled from '@emotion/styled'

import {
  Autocomplete,
  NumberFormat,
  IconPrimary,
  Button,
  GlobalStatus,
  Input,
} from '../..'
import { Anchor, Li, Ol, P, Section, Space } from '../../../'
import { Context, Provider } from '../../../shared'
import { SubmitButton } from '../../input/Input'
import { format } from '../../number-format/NumberUtils'
import {
  DrawerListData,
  DrawerListDataArray,
} from '../../../fragments/DrawerList'

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
] as DrawerListData

export const SearchNumbers = () => {
  return (
    <Autocomplete
      inputValue="201"
      opened
      noAnimation
      label="Label:"
      data={numbers}
      searchNumbers
    />
  )
}

export const SearchNumbersNonAlphaNumericChars = () => {
  return (
    <Autocomplete
      label="Label:"
      data={[
        ['Edgar Wuckert', '1234.56.78901'],
        ['Megan Abshire Jr.', '1234 56 78901'],
        ['Åge Ørn Ærlig', '12345678901'],
        ["Andrè O'Neill", '12345678901'],
      ]}
      searchNumbers
    />
  )
}

const accounts = [
  { selectedKey: 1, content: 'A' },
  { selectedKey: 2, content: 'B' },
  { selectedKey: 3, content: 'C' },
  { selectedKey: 4, content: 'D' },
]
export function UpdateEachOther() {
  const [selectedA, setSelectedA] = React.useState(-1)
  const [selectedB, setSelectedB] = React.useState(-1)
  const [selectedAccountsA, setSelectedAccountsA] =
    React.useState(accounts)
  const [selectedAccountsB, setSelectedAccountsB] =
    React.useState(accounts)

  const indexA = selectedAccountsA.findIndex(({ selectedKey }) => {
    return selectedKey === selectedA
  })
  const indexB = selectedAccountsB.findIndex(({ selectedKey }) => {
    return selectedKey === selectedB
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
          setSelectedA(account?.selectedKey)
          setSelectedAccountsB(
            accounts.filter(({ selectedKey }) => {
              return selectedKey !== account?.selectedKey
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
          setSelectedB(account?.selectedKey)
          setSelectedAccountsA(
            accounts.filter(({ selectedKey }) => {
              return selectedKey !== account?.selectedKey
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
    { content: 'item aa', searchContent: ['AA c'] },
    { content: 'item bb', searchContent: ['BB cc zethx'] },
    { content: 'item cc', searchContent: ['CC', 'cc'] },
    { content: 'item cc second', searchContent: ['CC', 'cc', 'more'] },
    { content: 'item dd', searchContent: ['DD', 'dd'] },
    { content: 'item ee', searchContent: ['EE', 'ee'] },
  ]

  return (
    <>
      <Autocomplete
        inputValue="cc bb more"
        opened
        noAnimation
        label="Label:"
        data={topMovies}
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
      noScrollAnimation
      placeholder="Search ..."
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
            const timeout = setTimeout(() => {
              console.log('value 2', value, results)
              updateData(results)
              hideIndicator()
            }, 600)
            return () => clearTimeout(timeout)
          },
          { value, results },
          1e3
        )
      }}
    />
  )
}

export const AutocompleteSandbox = () => {
  return (
    <Wrapper>
      <Box>
        <Autocomplete
          label="Keep value"
          data={topMovies}
          inputValue="does not exist"
          keepValueAndSelection
          showClearButton
        />
      </Box>
      <Box>
        <Autocomplete
          label="Label:"
          showSubmitButton={true}
          showClearButton
          submitElement={<SubmitButton icon="bell" />}
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
            drawerClass="drawerClass"
            size="small"
            value="A"
            data={['A']}
            iconPosition="right"
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
          inputValue="co pr ti"
          showClearButton
          showSubmitButton
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
          ]}
          on_change={(e) => {
            console.log('on_change', e)
          }}
          optionsRender={({ Items }) => (
            <>
              <Items />
              {/* <Item selected>123</Item> */}
              <div>Additional</div>
            </>
          )}
        />
        <Autocomplete
          inputValue="bb c"
          showSubmitButton
          data={{
            a: 'A1 A2 C',
            b: 'BB cC zethTHx',
            c: 'CCC',
          }}
          on_change={(e) => {
            console.log('on_change', e)
          }}
        />
      </Box>
      <Box>
        <Autocomplete
          mode="async" // prevents showing no options message og typing
          label="No selection / no filter"
          preventSelection
          disableFilter
          data={topMovies}
          on_type={({
            dataList,
            showIndicator,
            hideIndicator,
            updateData,
            debounce,
          }) => {
            console.log('dataList', dataList)
            showIndicator()
            debounce(() => {
              const timeout = setTimeout(() => {
                updateData(topMovies)
                hideIndicator()
              }, 600)
              return () => clearTimeout(timeout)
            })
          }}
          noScrollAnimation={true}
        />
        <Autocomplete
          mode="async"
          keepValue
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
          noScrollAnimation={true}
        />
        <AutocompleteWithState />
      </Box>
      <Box>
        <Autocomplete
          inputIcon={null}
          title="Type to find ..."
          inputValue="d"
          on_select={(e) => {
            console.log('on_select', e)
          }}
          on_change={(e) => {
            console.log('on_change', e)
          }}
          data={testData}
        />
        <Autocomplete
          noAnimation
          inputValue="episode a I"
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
    selectedValue: 99999999,
    content: [
      <NumberFormat phone key={99999999}>
        99999999
      </NumberFormat>,
      'C',
    ],
  },
  {
    selectedValue: 99999999,
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
    selectedValue: 'Find me by keypress',
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
    selectedValue: 'Brukskonto - Kari Nordmann',
    content: <>Brukskonto - Kari Nordmann</>,
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
    selectedValue:
      'Feriekonto - Kari Nordmann med et kjempelangt etternavnsen',
    content: [
      <NumberFormat key={99999999} phone>
        99999999
      </NumberFormat>,
      'Feriekonto - Kari Nordmann med et kjempelangt etternavnsen',
    ],
  },
  {
    selectedValue: <>Custom selected {'🔥'}</>,
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
    selectedValue: 'AAA',
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
    selectedValue: 'CCC',
    content: [
      <NumberFormat key={99999999} phone>
        99999999
      </NumberFormat>,
      'CC',
    ],
  },
  {
    selectedValue: 'DDD',
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
        <NumberFormat currency value={1234} />
      </>
    ),
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
  { selectedValue: '1', content: '1' },
  { selectedValue: '2', content: '2' },
  { selectedValue: '3', content: '3' },
  { selectedValue: '4', content: '4' },
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
            key={item.selectedValue}
            size="small"
            on_click={() => {
              const updatedSelectedData = selectedData.filter(
                (data) => item.selectedValue !== data.selectedValue
              )
              setSelectedData(updatedSelectedData)
              setChoiceData(
                initialData.filter(
                  (data) =>
                    updatedSelectedData.findIndex(
                      ({ selectedValue: updatedValue }) =>
                        updatedValue === data?.selectedValue
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
        preventSelection
        title="Choose an item"
        data={choiceData}
        on_change={({ data, setInputValue }) => {
          setChoiceData(
            choiceData.filter(
              (item) => item.selectedValue !== data.selectedValue
            )
          )
          if (
            selectedData.findIndex(
              ({ selectedValue }) => selectedValue === data.selectedValue
            ) === -1
          ) {
            setSelectedData([...selectedData, data])
          }
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
  const ban = format(21001234567, { ban: true, locale }) as string
  const numbers: DrawerListDataArray = [
    {
      selectedValue: `Brukskonto (${ban})`,
      suffixValue: (
        <NumberFormat lang="nb" currency srLabel="Total:">
          {12345678}
        </NumberFormat>
      ),
      content: ['Brukskonto', ban],
    },
    {
      selectedValue: `BSU (${ban})`,
      suffixValue: (
        <NumberFormat currency srLabel="Total:">
          {2223}
        </NumberFormat>
      ),
      content: ['BSU', ban],
    },
    {
      selectedValue: `Sparekonto (${ban})`,
      suffixValue: (
        <NumberFormat currency srLabel="Total:">
          {876555.5}
        </NumberFormat>
      ),
      content: ['Sparekonto', ban],
    },
    {
      selectedValue: `Brukskonto (${ban})`,
      suffixValue: (
        <NumberFormat currency srLabel="Total:">
          {34999.2}
        </NumberFormat>
      ),
      content: ['Brukskonto', ban],
    },
  ]

  return (
    <WideStyle>
      <Provider formElement={{ labelDirection: 'vertical' }}>
        <Autocomplete
          lang="nb"
          value={0}
          data={numbers}
          size="medium"
          inputIcon={null}
          showSubmitButton
          label="From account"
          labelDirection="vertical"
        />
      </Provider>
    </WideStyle>
  )
}

export const GlobalStatusExample = () => {
  return (
    <>
      <GlobalStatus id="my-id" />
      <Autocomplete
        noAnimation
        label="Label:"
        data={numbers}
        searchNumbers
        globalStatus={{ id: 'my-id', message: 'my message' }}
        status="Message"
      />
    </>
  )
}

export const AsyncSearchExample = () => {
  const dataA = [
    { selectedKey: 'a', content: 'AAA' },
    { selectedKey: 'c', content: 'CCC' },
  ]
  const dataB = [
    { selectedKey: 'b', content: 'BBB' },
    { selectedKey: 'e', content: 'EEE' },
  ]

  const [onChangeValue, setOnChangeValue] = useState()

  const onTypeHandler = ({
    value,
    showIndicator,
    hideIndicator,
    updateData,
    debounce,
  }) => {
    showIndicator()
    debounce(
      ({ value }) => {
        let newData = []
        if (value.toLowerCase() === 'a') {
          newData = dataA
        } else if (value.toLowerCase() === 'b') {
          newData = dataB
        } else {
          newData = [...dataA, ...dataB]
        }
        const timeout = setTimeout(() => {
          updateData(newData)
          hideIndicator()
        }, 600)
        return () => clearTimeout(timeout)
      },
      { value },
      150
    )
  }
  return (
    <Section spacing>
      <Space left>
        <P>In this demo/recreation:</P>
        <Ol>
          <Li>Type "A" and select the option available</Li>
          <Li>Type "B" and select the option available</Li>
        </Ol>
        <P>on_change should also be firing when selecting "B".</P>
        <Autocomplete
          top
          mode="async"
          on_type={onTypeHandler}
          noScrollAnimation={true}
          placeholder="Search ..."
          on_change={({ data }) => {
            console.log('on_change', data)
            setOnChangeValue(data?.content)
          }}
        />
        <P top>Value from on_change: {onChangeValue || '–'}</P>
      </Space>
    </Section>
  )
}

export const EmptyDataExample = () => {
  return <Autocomplete />
}

export const OpenOnFocusEmptyDataExample = () => {
  return (
    <>
      <Autocomplete openOnFocus />
      <Input />
    </>
  )
}

export const OpenedEmptyDataExample = () => {
  return (
    <>
      <Autocomplete opened />
      <Input />
    </>
  )
}
