/**
 * dnb-ui-lib Component Story
 *
 */

import React from 'react'
import { Wrapper, Box } from '../helpers'
import styled from '@emotion/styled'

import { Autocomplete, Number, Button } from '../../src/components'
import { Anchor } from '../../src/elements'

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
      prevent_selection
      placeholder="Search ..."
      // label="Search"
      // label_sr_only="true"
      on_type={({
        value,
        showIndicator,
        hideIndicator,
        updateData,
        debounce
      }) => {
        showIndicator()
        console.log('value 1', value)
        setResults(topMovies)
        debounce(
          ({ value, results }) => {
            // 1. simualte server delay
            const timeout = setTimeout(() => {
              console.log('value 2', value, results)
              updateData(results)
              hideIndicator()
            }, 600)

            // 2. if it gets debounced, we cancel this timeout
            return () => clearTimeout(timeout)
          },
          { value, results }
        )
      }}
    />
  )
}

const AutocompleteStory = () => {
  // const [data, setData] = useState(autocompleteData)
  // const [value, setSelectedItem] = useState(0)
  return (
    <Wrapper>
      <Box>
        <UpdateDataExample></UpdateDataExample>
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
                  </a>
                ]
              ]
            },
            'More',
            'Comp X'
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
            Items
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
            c: 'CCC'
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
          // label="Search"
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
            debounce
          }) => {
            console.log('dataList', dataList)
            showIndicator()
            debounce(() => {
              // 1. simualte server delay
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
            setMode
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
          prevent_selection
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
            b: 'BB'
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
            b: '🔥'
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

export default ['Autocomplete', AutocompleteStory]

const testData = [
  {
    content: [
      'Dropdown',
      'The Dropdown component is a custom-made data selection component.'
    ]
  },
  {
    content: 'B'
  },
  {
    selected_value: 99999999,
    content: [
      <Number phone key={99999999}>
        99999999
      </Number>,
      'C'
    ]
  },
  {
    selected_value: 99999999,
    content: [
      <Number phone key={99999999}>
        99999999
      </Number>,
      'D'
    ]
  },
  {
    content: 'E'
  },
  {
    selected_value: 'Find me by keypress',
    content: ['F', 'F', 'F', 'F']
  },
  {
    content: 'G'
  },
  {
    content: 'H'
  }
]

const autocompleteData = [
  {
    selected_value: 'Brukskonto - Kari Nordmann',
    content: (
      <>
        {/* <Checkbox checked aria-hidden />  */}
        Brukskonto - Kari Nordmann
      </>
    )
  },
  {
    content: [
      <Number key={99999999} phone>
        99999999
      </Number>,
      'Sparekonto - Ole Nordmann'
    ]
  },
  {
    selected_value:
      'Feriekonto - Kari Nordmann med et kjempelangt etternavnsen',
    content: [
      <Number key={99999999} phone>
        99999999
      </Number>,
      'Feriekonto - Kari Nordmann med et kjempelangt etternavnsen'
    ]
  },
  {
    selected_value: <>Custom selected {'🔥'}</>,
    content: [
      <Number key={99999999} phone>
        99999999
      </Number>,
      <>Custom content {'🔥'}</>
    ]
  }
]
const autocompleteDataScrollable = [
  {
    selected_value: 'AAA',
    content: 'AA'
  },
  {
    content: [
      <Number key={99999999} phone>
        99999999
      </Number>,
      'BB'
    ]
  },
  {
    selected_value: 'CCC',
    content: [
      <Number key={99999999} phone>
        99999999
      </Number>,
      'CC'
    ]
  },
  {
    selected_value: 'DDD',
    content: [
      <Number key={99999999} phone>
        99999999
      </Number>,
      'DD'
    ]
  },
  {
    content: <>E</>
  },
  <>Custom content {'🔥'}</>,
  [<React.Fragment key="key1">Custom content X {'🔥'}</React.Fragment>],
  {
    content: 'EE'
  },
  {
    content: 'EEE'
  },
  {
    content: ['F1', 'F2', 'F3', 'F4', 'F5']
  },
  {
    content: 'GG'
  },
  {
    content: 'HH'
  }
]

const topMovies = [
  { content: 'The Shawshank Redemption', year: 1994 },
  { content: 'The Godfather the godfather The Godfather', year: 1972 },
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
    year: 2001
  },
  {
    content: 'Star Wars: Episode V - The Empire Strikes Back',
    year: 1980
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
    year: 1964
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
  { content: 'Monty Python and the Holy Grail', year: 1975 }
]

const initialData = [
  { selected_value: '1', content: '1' },
  { selected_value: '2', content: '2' },
  { selected_value: '3', content: '3' },
  { selected_value: '4', content: '4' }
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
                ({ selected_value }) =>
                  item.selected_value !== selected_value
              )
              setSelectedData(updatedSelectedData)
              setChoiceData(
                initialData.filter(
                  ({ selected_value }) =>
                    updatedSelectedData.findIndex(
                      ({ selected_value: updatedValue }) =>
                        updatedValue === selected_value
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
        title="Choose an item"
        prevent_selection
        data={choiceData}
        on_change={({
          data,
          setInputValue
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
