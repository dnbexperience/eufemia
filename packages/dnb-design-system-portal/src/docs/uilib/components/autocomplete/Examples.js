/**
 * UI lib Component Example
 *
 */

import React, { PureComponent, Fragment } from 'react'
import ComponentBox from 'Src/shared/tags/ComponentBox'
import styled from '@emotion/styled'

class Example extends PureComponent {
  render() {
    return (
      <Fragment>
        <ComponentBox
          title="Default autocomplete, with long list to make it scrollable and searchable"
          scope={{ topMovies }}
        >
          {/* @jsx */ `
<Autocomplete
  data={topMovies}
  label="Label:"
/>
          `}
        </ComponentBox>
        <ComponentBox
          title="Autocomplete with a title"
          data-dnb-test="autocomplete-closed"
          scope={{ topMovies }}
        >
          {/* @jsx */ `
<Autocomplete
  data={topMovies}
  label="Label:"
  title="Find cc ..."
  on_change={({ data }) => {
    console.log('on_change', data)
  }}
/>
          `}
        </ComponentBox>
        <ComponentBox
          title="Update data dynamically during typing"
          description="**1.** Simualte server delay and **2.** If it gets debounced, we cancel this timeout"
          scope={{ topMovies }}
          useRender
        >
          {/* @jsx */ `
const onType = ({
  showIndicator,
  hideIndicator,
  updateData,
  debounce
}) => {
  showIndicator()
  debounce(() => {
    const timeout = setTimeout(() => {
      updateData(topMovies)
      hideIndicator()
    }, 600)

    return () => clearTimeout(timeout)
  })
}
render(<Autocomplete
  mode="async"
  on_type={onType}
  no_scroll_animation="true"
/>)
          `}
        </ComponentBox>
        <ComponentBox
          title="Update data dynamically on first focus"
          scope={{ topMovies }}
          useRender
        >
          {/* @jsx */ `
const onFocus = ({ updateData, showIndicator, hideIndicator }) => {
  showIndicator()
  setTimeout(() => {
    updateData(topMovies)
    hideIndicator()
  }, 1e3)
}
render(<Autocomplete
  on_type={({ value /* updateData, ... */ }) => {
    console.log('on_type', value,)
  }}
  on_focus={onFocus}
  no_scroll_animation="true"
/>)
          `}
        </ComponentBox>
        <ComponentBox
          title="Autocomplete with a button to toggle the open / closed state"
          description="**NB:** The data is given as a function and as children."
          data-dnb-test="autocomplete-drawer-button"
          scope={{ topMovies }}
        >
          {/* @jsx */ `
<Autocomplete
  label="Label:"
  show_drawer_button="true"
  on_change={({ data }) => {
    console.log('on_change', data)
  }}
>
  {() => (topMovies)}
</Autocomplete>
          `}
        </ComponentBox>
        <ComponentBox
          title="Autocomplete in different sizes"
          description="Four sizes are available: `small`, `default`, `medium` and `large`"
          data-dnb-test="autocomplete-sizes"
          scope={{ topMovies }}
        >
          {/* @jsx */ `
<FormRow direction="vertical">
  <Autocomplete
    label="Label:"
    size="default"
    bottom
    data={() => (topMovies)}
  />
  <Autocomplete
    label="Label:"
    size="medium"
    bottom
    data={() => (topMovies)}
  />
  <Autocomplete
    label="Label:"
    size="large"
    bottom
    data={() => (topMovies)}
  />
</FormRow>
          `}
        </ComponentBox>
      </Fragment>
    )
  }
}

const Wrapper = styled.div`
  [data-dnb-test] {
    > :not(.dnb-autocomplete--is-popup) .dnb-autocomplete__shell {
      width: var(--autocomplete-width);
    }
  }
`

export { Example }
export default () => (
  <Wrapper>
    <Example />
  </Wrapper>
)

const topMovies = [
  { content: 'The Shawshank Redemption', year: 1994 },
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
