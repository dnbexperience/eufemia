import{n as e,s as t,t as n}from"./jsx-runtime-DnlWeMvz.js";import{l as r}from"./SpacingUtils-zztAGE8o.js";import{g as i,t as a}from"./Anchor-DN_sG59G.js";import{s as o}from"./ToggleButton-Bh3Eln0h.js";import{Bt as s,Vt as c,zt as l}from"./forms-Ce7VSRGW.js";import{t as u}from"./Autocomplete-BMBTNqbT.js";import{t as d}from"./ListExport-BgHwvYvI.js";import{t as f}from"./NumberFormatExport-BcYLJr-2.js";import{w as p}from"./index-DHCu7dhB.js";import{t as m}from"./ComponentBox-CmvipvMU.js";var h=t(e()),g=t(n()),_=p.div`
  [data-visual-test] {
    > :not(.dnb-autocomplete--is-popup) .dnb-autocomplete__shell {
      width: var(--autocomplete-width);
    }
  }
  [data-visual-test='autocomplete-opened'] {
    width: 45rem;
    height: 22rem !important;
  }
`,v=()=>(0,g.jsx)(_,{children:(0,g.jsx)(m,{scope:{topMovies:N},stableName:`AutocompleteDefaultExample`,sourceImports:[`import { useContext } from 'react'`,`import { formatPhoneNumber, formatBankAccountNumber, formatCurrency } from '@dnb/eufemia/components/number-format/NumberUtils'`,`import styled from '@emotion/styled'`,`import Context from '@dnb/eufemia/shared/Context'`,`import { Autocomplete, Flex, IconPrimary, NumberFormat, List } from '@dnb/eufemia'`],__buildScope:{Autocomplete:u},children:`<Autocomplete data={topMovies} label="Label" />
`})}),y=()=>(0,g.jsx)(_,{children:(0,g.jsx)(m,{"data-visual-test":`autocomplete-status-information`,scope:{topMovies:N},stableName:`AutocompleteStatusInfoExample`,sourceImports:[`import { useContext } from 'react'`,`import { formatPhoneNumber, formatBankAccountNumber, formatCurrency } from '@dnb/eufemia/components/number-format/NumberUtils'`,`import styled from '@emotion/styled'`,`import Context from '@dnb/eufemia/shared/Context'`,`import { Autocomplete, Flex, IconPrimary, NumberFormat, List } from '@dnb/eufemia'`],__buildScope:{Autocomplete:u},children:`<Autocomplete
  data={topMovies}
  label="Label"
  status="You need to select a movie"
  statusState="information"
  showSubmitButton
/>
`})}),b=()=>(0,g.jsx)(_,{children:(0,g.jsx)(m,{"data-visual-test":`autocomplete-status-error`,scope:{topMovies:N},stableName:`AutocompleteStatusErrorExample`,sourceImports:[`import { useContext } from 'react'`,`import { formatPhoneNumber, formatBankAccountNumber, formatCurrency } from '@dnb/eufemia/components/number-format/NumberUtils'`,`import styled from '@emotion/styled'`,`import Context from '@dnb/eufemia/shared/Context'`,`import { Autocomplete, Flex, IconPrimary, NumberFormat, List } from '@dnb/eufemia'`],__buildScope:{Autocomplete:u},children:`<Autocomplete
  label="Status error"
  data={[topMovies[0]]}
  status="Error"
  statusState="error"
  showSubmitButton
  open
  noAnimation
  preventClose
  direction="bottom"
/>
`})}),x=[l(20001234567),l(22233344425),c(1234.5),s(`+47116000`)],S=()=>(0,g.jsx)(_,{children:(0,g.jsx)(m,{scope:{numbersData:x},stableName:`AutocompleteNumbersExample`,sourceImports:[`import { useContext } from 'react'`,`import { formatPhoneNumber, formatBankAccountNumber, formatCurrency } from '@dnb/eufemia/components/number-format/NumberUtils'`,`import styled from '@emotion/styled'`,`import Context from '@dnb/eufemia/shared/Context'`,`import { Autocomplete, Flex, IconPrimary, NumberFormat, List } from '@dnb/eufemia'`],__buildScope:{Autocomplete:u},children:`<Autocomplete
  inputValue="201"
  showClearButton
  label="Label"
  data={numbersData}
  searchNumbers={true}
/>
`})}),C=()=>(0,g.jsx)(_,{children:(0,g.jsx)(m,{"data-visual-test":`autocomplete-closed`,scope:{topMovies:N},stableName:`AutocompleteWithCustomTitle`,sourceImports:[`import { useContext } from 'react'`,`import { formatPhoneNumber, formatBankAccountNumber, formatCurrency } from '@dnb/eufemia/components/number-format/NumberUtils'`,`import styled from '@emotion/styled'`,`import Context from '@dnb/eufemia/shared/Context'`,`import { Autocomplete, Flex, IconPrimary, NumberFormat, List } from '@dnb/eufemia'`],__buildScope:{Autocomplete:u},children:`<Autocomplete
  data={topMovies}
  keepValue={true}
  showClearButton={true}
  label="Label"
  placeholder="Custom placeholder ..."
  onChange={({ data }) => {
    console.log('onChange', data)
  }}
/>
`})}),w=()=>(0,g.jsx)(_,{children:(0,g.jsx)(m,{scope:{topMovies:N},stableName:`AutocompleteDynamicallyUpdatedData`,sourceImports:[`import { useContext } from 'react'`,`import { formatPhoneNumber, formatBankAccountNumber, formatCurrency } from '@dnb/eufemia/components/number-format/NumberUtils'`,`import styled from '@emotion/styled'`,`import Context from '@dnb/eufemia/shared/Context'`,`import { Autocomplete, Flex, IconPrimary, NumberFormat, List } from '@dnb/eufemia'`],__buildScope:{Autocomplete:u},noInline:!0,children:`const onTypeHandler = ({
  value,
  showIndicator,
  hideIndicator,
  updateData,
  showNoOptionsItem,
  debounce,
  /* ... */
}) => {
  console.log('typed value:', value)
  showIndicator()
  debounce(
    ({ value }) => {
      console.log('debounced value:', value)
      const normalizedValue = value.trim().toLowerCase()
      const filteredData = topMovies.filter(({ content }) => {
        if (typeof content === 'string') {
          return content.toLowerCase().includes(normalizedValue)
        }
        if (Array.isArray(content)) {
          return content
            .filter((part) => typeof part === 'string')
            .join(' ')
            .toLowerCase()
            .includes(normalizedValue)
        }
        return false
      })
      const newData = normalizedValue.length > 0 ? filteredData : topMovies

      // simulate server delay
      const timeout = setTimeout(() => {
        // update the drawerList
        updateData(newData)
        hideIndicator()
        if (newData.length === 0) {
          showNoOptionsItem()
        }
      }, 600)

      // cancel invocation method
      return () => clearTimeout(timeout)
    },
    {
      value,
    },
    250
  )
}
render(
  <Autocomplete
    mode="async"
    onType={onTypeHandler}
    noScrollAnimation={true}
    placeholder="Search ..."
  />
)
`})}),T=()=>(0,g.jsx)(_,{children:(0,g.jsx)(m,{scope:{topMovies:N},stableName:`AutocompleteFirstFocusUpdate`,sourceImports:[`import { useContext } from 'react'`,`import { formatPhoneNumber, formatBankAccountNumber, formatCurrency } from '@dnb/eufemia/components/number-format/NumberUtils'`,`import styled from '@emotion/styled'`,`import Context from '@dnb/eufemia/shared/Context'`,`import { Autocomplete, Flex, IconPrimary, NumberFormat, List } from '@dnb/eufemia'`],__buildScope:{Autocomplete:u},noInline:!0,children:`const onFocusHandler = ({ updateData, dataList, showIndicatorItem }) => {
  if (!dataList.length) {
    showIndicatorItem()
    setTimeout(() => {
      updateData(topMovies)
    }, 1e3)
  }
}
render(
  <Autocomplete
    mode="async"
    noScrollAnimation={true}
    preventSelection={true}
    onType={({ value /* updateData, ... */ }) => {
      console.log('onType', value)
    }}
    onFocus={onFocusHandler}
  />
)
`})}),E=()=>(0,g.jsx)(_,{children:(0,g.jsx)(m,{"data-visual-test":`autocomplete-drawer-button`,scope:{topMovies:N},stableName:`AutocompleteToggleExample`,sourceImports:[`import { useContext } from 'react'`,`import { formatPhoneNumber, formatBankAccountNumber, formatCurrency } from '@dnb/eufemia/components/number-format/NumberUtils'`,`import styled from '@emotion/styled'`,`import Context from '@dnb/eufemia/shared/Context'`,`import { Autocomplete, Flex, IconPrimary, NumberFormat, List } from '@dnb/eufemia'`],__buildScope:{Autocomplete:u},children:`<Autocomplete
  label="Label"
  value={10}
  showSubmitButton={true}
  onChange={({ data }) => {
    console.log('onChange', data)
  }}
>
  {() => topMovies}
</Autocomplete>
`})}),D=()=>(0,g.jsx)(_,{children:(0,g.jsx)(m,{"data-visual-test":`autocomplete-drawer-search`,scope:{topMovies:N},stableName:`AutocompletePredefinedInput`,sourceImports:[`import { useContext } from 'react'`,`import { formatPhoneNumber, formatBankAccountNumber, formatCurrency } from '@dnb/eufemia/components/number-format/NumberUtils'`,`import styled from '@emotion/styled'`,`import Context from '@dnb/eufemia/shared/Context'`,`import { Autocomplete, Flex, IconPrimary, NumberFormat, List } from '@dnb/eufemia'`],__buildScope:{Autocomplete:u},children:`<Autocomplete
  label="Label"
  inputValue="the pa ther"
  noAnimation
  onChange={({ data }) => {
    console.log('onChange', data)
  }}
>
  {() => topMovies}
</Autocomplete>
`})}),O=()=>(0,g.jsx)(_,{children:(0,g.jsx)(m,{"data-visual-test":`autocomplete-sizes`,scope:{topMovies:N},stableName:`AutocompleteDifferentSizes`,sourceImports:[`import { useContext } from 'react'`,`import { formatPhoneNumber, formatBankAccountNumber, formatCurrency } from '@dnb/eufemia/components/number-format/NumberUtils'`,`import styled from '@emotion/styled'`,`import Context from '@dnb/eufemia/shared/Context'`,`import { Autocomplete, Flex, IconPrimary, NumberFormat, List } from '@dnb/eufemia'`],__buildScope:{Flex:o,Autocomplete:u},children:`<Flex.Vertical>
  <Autocomplete label="Label" size="default" data={() => topMovies} />
  <Autocomplete label="Label" size="medium" data={() => topMovies} />
  <Autocomplete label="Label" size="large" data={() => topMovies} />
</Flex.Vertical>
`})}),k=()=>(0,g.jsx)(m,{"data-visual-test":`autocomplete-input-width`,scope:{topMovies:N},stableName:`AutocompleteCustomWidth`,sourceImports:[`import { useContext } from 'react'`,`import { formatPhoneNumber, formatBankAccountNumber, formatCurrency } from '@dnb/eufemia/components/number-format/NumberUtils'`,`import styled from '@emotion/styled'`,`import Context from '@dnb/eufemia/shared/Context'`,`import { Autocomplete, Flex, IconPrimary, NumberFormat, List } from '@dnb/eufemia'`],__buildScope:{Autocomplete:u,Flex:o},noInline:!0,children:`const CustomWidthOne = styled(Autocomplete)\`
  .dnb-autocomplete__shell {
    width: 10rem;
  }
\`
const CustomWidthTwo = styled(Autocomplete)\`
  &.dnb-autocomplete--is-popup .dnb-drawer-list__root {
    width: 12rem;
  }
\`
const CustomWidthThree = styled(Autocomplete)\`
  /** Change the "__shell" width */
  .dnb-autocomplete__shell {
    width: 12rem;
  }

  /** Change the "__list" width */
  .dnb-drawer-list__root {
    width: 20rem;
  }
\`
render(
  <Flex.Vertical>
    <CustomWidthOne
      label="Label"
      labelSrOnly
      size="default"
      iconPosition="left"
      data={topMovies}
    />
    <CustomWidthTwo
      label="Label"
      labelSrOnly
      size="medium"
      data={topMovies}
    />
    <CustomWidthThree
      label="Label"
      labelSrOnly
      size="large"
      align="right"
      iconPosition="right"
      icon="bell"
      data={topMovies}
    />
  </Flex.Vertical>
)
`}),A=()=>(0,g.jsx)(_,{children:(0,g.jsx)(m,{"data-visual-test":`autocomplete-icon-right-submit-button`,scope:{topMovies:N},stableName:`AutocompleteIconRightWithSubmitButton`,sourceImports:[`import { useContext } from 'react'`,`import { formatPhoneNumber, formatBankAccountNumber, formatCurrency } from '@dnb/eufemia/components/number-format/NumberUtils'`,`import styled from '@emotion/styled'`,`import Context from '@dnb/eufemia/shared/Context'`,`import { Autocomplete, Flex, IconPrimary, NumberFormat, List } from '@dnb/eufemia'`],__buildScope:{Autocomplete:u},children:`<Autocomplete
  label="Label"
  icon="bell"
  iconPosition="right"
  showSubmitButton
  data={topMovies}
/>
`})}),j=()=>{let{locale:e}=(0,h.useContext)(r),t=l(20001234567,{locale:e}),n=c(12345678,{locale:e});return(0,g.jsx)(m,{"data-visual-test":`autocomplete-suffix`,scope:{numbers:[{selectedValue:`Brukskonto`,suffixValue:n,content:[`Brukskonto`,t]},{selectedValue:`BSU`,suffixValue:n,content:[`BSU`,t]},{selectedValue:`Sparekonto`,suffixValue:n,content:[`Sparekonto`,t]},{selectedValue:`Brukskonto`,suffixValue:n,content:[`Brukskonto`,t]}]},stableName:`AutocompleteSuffix`,sourceImports:[`import { useContext } from 'react'`,`import { formatPhoneNumber, formatBankAccountNumber, formatCurrency } from '@dnb/eufemia/components/number-format/NumberUtils'`,`import styled from '@emotion/styled'`,`import Context from '@dnb/eufemia/shared/Context'`,`import { Autocomplete, Flex, IconPrimary, NumberFormat, List } from '@dnb/eufemia'`],__buildScope:{Autocomplete:u},noInline:!0,children:`const CustomWidth = styled(Autocomplete)\`
  .dnb-drawer-list__root,
  .dnb-autocomplete__shell {
    width: 50vw;
    min-width: 15rem;
    max-width: 30rem;
  }
\`
render(
  <CustomWidth
    value={1}
    data={numbers}
    size="medium"
    icon={null}
    showSubmitButton
    label="From account"
  />
)
`})},M=()=>(0,g.jsx)(_,{children:(0,g.jsx)(m,{"data-visual-test":`autocomplete-opened`,scope:{topMovies:N},hideCode:!0,stableName:`AutocompleteOpened`,sourceImports:[`import { useContext } from 'react'`,`import { formatPhoneNumber, formatBankAccountNumber, formatCurrency } from '@dnb/eufemia/components/number-format/NumberUtils'`,`import styled from '@emotion/styled'`,`import Context from '@dnb/eufemia/shared/Context'`,`import { Autocomplete, Flex, IconPrimary, NumberFormat, List } from '@dnb/eufemia'`],__buildScope:{Autocomplete:u},children:`
<Autocomplete
  label="Label"
  inputValue="lord"
  open
  noAnimation
  direction="bottom"
  preventClose
  data={topMovies}
  right="large"
  labelDirection="horizontal"
/>
<Autocomplete
  label="Label"
  inputValue="angry"
  skipPortal
  open
  noAnimation
  direction="bottom"
  preventClose
  data={topMovies}
  className="focus-trigger"
  labelDirection="horizontal"
/>

`})}),N=[{content:(0,g.jsxs)(u.HorizontalItem,{children:[(0,g.jsx)(i,{size:`medium`,icon:`bell`,right:`x-small`}),`The Shawshank Redemption`]}),year:1994},{content:[`The Godfather`,`Line with more info`],year:1972},{content:[`The Godfather: Part II`,(0,g.jsx)(`a`,{className:`dnb-anchor`,href:`/`,children:`Anchor 1`},`a-1`),(0,g.jsx)(`a`,{className:`dnb-anchor`,href:`/`,children:`Anchor 2`},`a-2`),`Line with more info`],year:1974},{content:`The Dark Knight`,year:2008},{content:[`12 Angry Men`,`Second row`,`Third row`],year:1957},{content:`Schindler's List`,year:1993},{content:`Pulp Fiction`,year:1994},{content:`The Lord of the Rings: The Return of the King`,year:2003},{content:`The Good, the Bad and the Ugly`,year:1966},{content:`Fight Club`,year:1999},{content:`The Lord of the Rings: The Fellowship of the Ring`,year:2001},{content:`Star Wars: Episode V - The Empire Strikes Back`,year:1980},{content:`Forrest Gump`,year:1994},{content:`Inception`,year:2010},{content:`The Lord of the Rings: The Two Towers`,year:2002},{content:`One Flew Over the Cuckoo's Nest`,year:1975},{content:`Goodfellas`,year:1990},{content:`The Matrix`,year:1999},{content:`Seven Samurai`,year:1954},{content:`Star Wars: Episode IV - A New Hope`,year:1977},{content:`City of God`,year:2002},{content:`Se7en`,year:1995},{content:`The Silence of the Lambs`,year:1991},{content:`It's a Wonderful Life`,year:1946},{content:`Life Is Beautiful`,year:1997},{content:`The Usual Suspects`,year:1995},{content:`Léon: The Professional`,year:1994},{content:`Spirited Away`,year:2001},{content:`Saving Private Ryan`,year:1998},{content:`Once Upon a Time in the West`,year:1968},{content:`American History X`,year:1998},{content:`Interstellar`,year:2014},{content:`Casablanca`,year:1942},{content:`City Lights`,year:1931},{content:`Psycho`,year:1960},{content:`The Green Mile`,year:1999},{content:`The Intouchables`,year:2011},{content:`Modern Times`,year:1936},{content:`Raiders of the Lost Ark`,year:1981},{content:`Rear Window`,year:1954},{content:`The Pianist`,year:2002},{content:`The Departed`,year:2006},{content:`Terminator 2: Judgment Day`,year:1991},{content:`Back to the Future`,year:1985},{content:`Whiplash`,year:2014},{content:`Gladiator`,year:2e3},{content:`Memento`,year:2e3},{content:`The Prestige`,year:2006},{content:`The Lion King`,year:1994},{content:`Apocalypse Now`,year:1979},{content:`Alien`,year:1979},{content:`Sunset Boulevard`,year:1950},{content:`Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb`,year:1964},{content:`The Great Dictator`,year:1940},{content:`Cinema Paradiso`,year:1988},{content:`The Lives of Others`,year:2006},{content:`Grave of the Fireflies`,year:1988},{content:`Paths of Glory`,year:1957},{content:`Django Unchained`,year:2012},{content:`The Shining`,year:1980},{content:`WALL·E`,year:2008},{content:`American Beauty`,year:1999},{content:`The Dark Knight Rises`,year:2012},{content:`Princess Mononoke`,year:1997},{content:`Aliens`,year:1986},{content:`Oldboy`,year:2003},{content:`Once Upon a Time in America`,year:1984},{content:`Witness for the Prosecution`,year:1957},{content:`Das Boot`,year:1981},{content:`Citizen Kane`,year:1941},{content:`North by Northwest`,year:1959},{content:`Vertigo`,year:1958},{content:`Star Wars: Episode VI - Return of the Jedi`,year:1983},{content:`Reservoir Dogs`,year:1992},{content:`Braveheart`,year:1995},{content:`M`,year:1931},{content:`Requiem for a Dream`,year:2e3},{content:`Amélie`,year:2001},{content:`A Clockwork Orange`,year:1971},{content:`Like Stars on Earth`,year:2007},{content:`Taxi Driver`,year:1976},{content:`Lawrence of Arabia`,year:1962},{content:`Double Indemnity`,year:1944},{content:`Eternal Sunshine of the Spotless Mind`,year:2004},{content:`Amadeus`,year:1984},{content:`To Kill a Mockingbird`,year:1962},{content:`Toy Story 3`,year:2010},{content:`Logan`,year:2017},{content:`Full Metal Jacket`,year:1987},{content:`Dangal`,year:2016},{content:`The Sting`,year:1973},{content:`2001: A Space Odyssey`,year:1968},{content:`Singin' in the Rain`,year:1952},{content:`Toy Story`,year:1995},{content:`Bicycle Thieves`,year:1948},{content:`The Kid`,year:1921},{content:`Inglourious Basterds`,year:2009},{content:`Snatch`,year:2e3},{content:`3 Idiots`,year:2009},{content:`Monty Python and the Holy Grail`,year:1975}],P=()=>(0,g.jsx)(_,{children:(0,g.jsx)(m,{scope:{topMovies:N},"data-visual-test":`autocomplete-disabled`,stableName:`AutocompleteDisabledExample`,sourceImports:[`import { useContext } from 'react'`,`import { formatPhoneNumber, formatBankAccountNumber, formatCurrency } from '@dnb/eufemia/components/number-format/NumberUtils'`,`import styled from '@emotion/styled'`,`import Context from '@dnb/eufemia/shared/Context'`,`import { Autocomplete, Flex, IconPrimary, NumberFormat, List } from '@dnb/eufemia'`],__buildScope:{Autocomplete:u},children:`
<Autocomplete
  disabled
  showSubmitButton
  data={topMovies}
  value={1}
  label="Label"
  bottom
/>
<br />
<Autocomplete
  disabled
  showSubmitButton
  data={topMovies}
  value={1}
  label="Label"
  suffix="Suffix"
  size="large"
/>

`})}),F=()=>(0,g.jsx)(_,{children:(0,g.jsx)(m,{"data-visual-test":`autocomplete-disabled-options`,stableName:`AutocompleteDisabledOptionsExample`,sourceImports:[`import { useContext } from 'react'`,`import { formatPhoneNumber, formatBankAccountNumber, formatCurrency } from '@dnb/eufemia/components/number-format/NumberUtils'`,`import styled from '@emotion/styled'`,`import Context from '@dnb/eufemia/shared/Context'`,`import { Autocomplete, Flex, IconPrimary, NumberFormat, List } from '@dnb/eufemia'`],__buildScope:{Autocomplete:u,IconPrimary:i,Anchor:a},children:`<Autocomplete
  showSubmitButton
  data={[
    {
      disabled: true,
      content: (
        <Autocomplete.HorizontalItem>
          <IconPrimary size="medium" icon="bell" right="x-small" />
          The Shawshank Redemption
        </Autocomplete.HorizontalItem>
      ),
      year: 1994,
    },
    {
      disabled: true,
      content: ['The Godfather', 'Line with more info'],
      year: 1972,
    },
    {
      disabled: true,
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
    {
      disabled: true,
      content: 'The Dark Knight',
      year: 2008,
    },
  ]}
  label="Label"
  bottom
/>
`})}),I=()=>(0,g.jsx)(_,{children:(0,g.jsx)(m,{hidePreview:!0,stableName:`AutocompleteContentAsArrayExample`,sourceImports:[`import { useContext } from 'react'`,`import { formatPhoneNumber, formatBankAccountNumber, formatCurrency } from '@dnb/eufemia/components/number-format/NumberUtils'`,`import styled from '@emotion/styled'`,`import Context from '@dnb/eufemia/shared/Context'`,`import { Autocomplete, Flex, IconPrimary, NumberFormat, List } from '@dnb/eufemia'`],__buildScope:{Autocomplete:u,IconPrimary:i,NumberFormat:f},children:`<Autocomplete
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
        <NumberFormat.Number value={1234} key="item-4" />, // <-- Not searchable nor highlightable
      ],
    },
  ]}
  label="Label"
/>
`})}),L=()=>(0,g.jsx)(_,{children:(0,g.jsx)(m,{hidePreview:!0,stableName:`AutocompleteContentAsFragmentExample`,sourceImports:[`import { useContext } from 'react'`,`import { formatPhoneNumber, formatBankAccountNumber, formatCurrency } from '@dnb/eufemia/components/number-format/NumberUtils'`,`import styled from '@emotion/styled'`,`import Context from '@dnb/eufemia/shared/Context'`,`import { Autocomplete, Flex, IconPrimary, NumberFormat, List } from '@dnb/eufemia'`],__buildScope:{Autocomplete:u,IconPrimary:i},children:`<Autocomplete
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
  label="Label"
/>
`})}),R=()=>(0,g.jsx)(_,{children:(0,g.jsx)(m,{hidePreview:!0,stableName:`AutocompleteContentDecoupledExample`,sourceImports:[`import { useContext } from 'react'`,`import { formatPhoneNumber, formatBankAccountNumber, formatCurrency } from '@dnb/eufemia/components/number-format/NumberUtils'`,`import styled from '@emotion/styled'`,`import Context from '@dnb/eufemia/shared/Context'`,`import { Autocomplete, Flex, IconPrimary, NumberFormat, List } from '@dnb/eufemia'`],__buildScope:{Autocomplete:u},children:`<Autocomplete
  data={[
    {
      content: ['your visual content'],
      searchContent: ['your search content'],
    },
  ]}
  label="Label"
/>
`})}),z=()=>(0,g.jsx)(_,{children:(0,g.jsx)(m,{scope:{List:d},"data-visual-test":`autocomplete-list-item-content`,stableName:`AutocompleteWithListItemContent`,sourceImports:[`import { useContext } from 'react'`,`import { formatPhoneNumber, formatBankAccountNumber, formatCurrency } from '@dnb/eufemia/components/number-format/NumberUtils'`,`import styled from '@emotion/styled'`,`import Context from '@dnb/eufemia/shared/Context'`,`import { Autocomplete, Flex, IconPrimary, NumberFormat, List } from '@dnb/eufemia'`],__buildScope:{Autocomplete:u,List:d},noInline:!0,children:`// A List row keeps its end cell at content width, so the row needs
// horizontal room. Give the Autocomplete a width of its own, or the
// title column will be squeezed by the end cell.
const AccountAutocomplete = styled(Autocomplete)\`
  .dnb-autocomplete__shell,
  .dnb-drawer-list__root {
    width: 22rem;
  }
\`
const data = [
  {
    selectedKey: 'accounts',
    // selectedValue is the plain text shown in the input once selected;
    // searchContent keeps typing/filtering working with rich content
    selectedValue: 'Accounts',
    searchContent: 'Accounts Bills Savings',
    content: (
      <List.Item.Basic element="span">
        <List.Cell.Title element="span">Accounts</List.Cell.Title>
        <List.Cell.End element="span">Bills, Savings</List.Cell.End>
      </List.Item.Basic>
    ),
  },
  {
    selectedKey: 'loans',
    selectedValue: 'Loans',
    searchContent: 'Loans Mortgage Car',
    content: (
      <List.Item.Basic element="span">
        <List.Cell.Title element="span">Loans</List.Cell.Title>
        <List.Cell.End element="span">Mortgage, Car</List.Cell.End>
      </List.Item.Basic>
    ),
  },
  {
    selectedKey: 'cards',
    selectedValue: 'Cards',
    searchContent: 'Cards Visa Mastercard',
    content: (
      <List.Item.Basic element="span">
        <List.Cell.Title element="span">Cards</List.Cell.Title>
        <List.Cell.End element="span">Visa, Mastercard</List.Cell.End>
      </List.Item.Basic>
    ),
  },
]
render(<AccountAutocomplete data={data} label="Label" />)
`})}),B=()=>(0,g.jsx)(_,{children:(0,g.jsx)(m,{"data-visual-test":`autocomplete-groups`,stableName:`AutocompleteGroups`,sourceImports:[`import { useContext } from 'react'`,`import { formatPhoneNumber, formatBankAccountNumber, formatCurrency } from '@dnb/eufemia/components/number-format/NumberUtils'`,`import styled from '@emotion/styled'`,`import Context from '@dnb/eufemia/shared/Context'`,`import { Autocomplete, Flex, IconPrimary, NumberFormat, List } from '@dnb/eufemia'`],__buildScope:{Autocomplete:u},children:`<Autocomplete
  groups={[undefined, 'Pets', 'Cars']}
  data={[
    {
      groupIndex: 0,
      content: 'Default 1',
    },
    {
      groupIndex: 0,
      content: 'Default 2',
    },
    {
      groupIndex: 1,
      content: 'Cat',
    },
    {
      groupIndex: 1,
      content: 'Dog',
    },
    {
      groupIndex: 2,
      content: 'Jeep',
    },
    {
      groupIndex: 2,
      content: 'Van',
    },
  ]}
/>
`})}),V=()=>(0,g.jsx)(_,{children:(0,g.jsx)(m,{stableName:`AutocompleteNoDivider`,sourceImports:[`import { useContext } from 'react'`,`import { formatPhoneNumber, formatBankAccountNumber, formatCurrency } from '@dnb/eufemia/components/number-format/NumberUtils'`,`import styled from '@emotion/styled'`,`import Context from '@dnb/eufemia/shared/Context'`,`import { Autocomplete, Flex, IconPrimary, NumberFormat, List } from '@dnb/eufemia'`],__buildScope:{Autocomplete:u},children:`<Autocomplete
  noDivider
  data={['Cat', 'Dog', 'Canary', 'Hamster', 'Piglet']}
/>
`})});export{z as S,b as _,v as a,E as b,F as c,B as d,A as f,D as g,M as h,k as i,w as l,S as m,L as n,O as o,V as p,R as r,P as s,I as t,T as u,y as v,C as x,j as y};