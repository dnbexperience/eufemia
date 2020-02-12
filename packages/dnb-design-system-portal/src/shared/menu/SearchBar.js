/**
 * SearchBar
 *
 */

import React from 'react'
import styled from '@emotion/styled'
import { Input } from 'dnb-ui-lib/src'
import { isCi } from 'is-ci'

import {
  InstantSearch,
  Index,
  Hits,
  connectSearchBox,
  connectStateResults
} from 'react-instantsearch-dom'
import algoliasearch from 'algoliasearch/lite'

const HitsWrapper = styled.span`
  position: absolute;
  z-index: 10;
  top: 4rem;
  left: 0;
  bottom: 0;
  height: 100%;
  width: 30rem;
  background: hotpink;
`
const SearchWrapper = styled.span`
  @media (max-width: 50em) {
    input {
      max-width: 60vw;
    }
  }
`

// const Summary = ({ children, ...rest }) => {
//   return children
// }

const Stats = connectStateResults(
  ({ searchResults: res }) =>
    res &&
    res.nbHits > 0 &&
    `${res.nbHits} result${res.nbHits > 1 ? `s` : ``}`
)

const indexName =
  process.env.NODE_ENV === 'production'
    ? 'prod_eufemia_docs'
    : 'dev_eufemia_docs'
const searchClient = algoliasearch(
  'SLD6KEYMQ9',
  '6cf238b7456ffd9f7a400d8de37318a3'
)

export const SearchBarProvider = props => {
  return (
    <InstantSearch
      searchClient={searchClient}
      indexName={indexName}
      // onSearchStateChange={({ query }) => (searchQuery = query)}
      // root={{ Root, props: { ref } }}
      {...props}
    />
  )
}

export const SearchBarInput = connectSearchBox(({ refine }) => {
  if (isCi) {
    return <></>
  }
  return (
    <Input
      right
      type="search"
      placeholder="Search ..."
      id="portal-search"
      on_change={({ value }) => {
        console.log('on_change', value)
        refine(value)
      }}
    />
  )
})

export const SearchBarResults = connectStateResults(
  ({ searchResults: result }) => {
    // console.log('state', state)
    // const result = response.results[0]
    // console.log('results', result)

    if (!result) {
      return <></>
    }

    return (
      <SearchWrapper>
        <HitsWrapper
          hidden={!(result.query.length > 0 && result.nbHits > 0)}
        >
          <Index key={indexName} indexName={indexName}>
            <Stats />
            <Hits
            // hitComponent={Summary()}
            />
          </Index>
          {/* <PoweredBy /> */}
        </HitsWrapper>
      </SearchWrapper>
    )
  }
)

const response = JSON.parse(
  '{"results":[{"hits":[{"slug":"uilib/components/input","title":"Input","description":"The input component is an umbrella component for all inputs which share the same style as the classic text input field.","search":null,"headings":[],"category":{"slug":"uilib","tag":"category","title":"UI Library"},"objectID":"49e612d9-c2de-5a2e-a834-9f3790c9fd50","_highlightResult":{"title":{"value":"<ais-highlight-0000000000>Input</ais-highlight-0000000000>","matchLevel":"full","fullyHighlighted":true,"matchedWords":["input"]},"description":{"value":"The <ais-highlight-0000000000>input</ais-highlight-0000000000> component is an umbrella component for all inputs which share the same style as the classic text <ais-highlight-0000000000>input</ais-highlight-0000000000> field.","matchLevel":"full","fullyHighlighted":false,"matchedWords":["input"]},"category":{"title":{"value":"UI Library","matchLevel":"none","matchedWords":[]}}}},{"slug":"uilib/components/input-masked","title":"InputMasked","description":"The InputMasked component uses the basic input component, but with some additional masking functionality.","search":null,"headings":[],"category":{"slug":"uilib","tag":"category","title":"UI Library"},"objectID":"a5ac4c37-b89e-5dc3-b251-c68a50612d23","_highlightResult":{"title":{"value":"<ais-highlight-0000000000>Input</ais-highlight-0000000000>Masked","matchLevel":"full","fullyHighlighted":false,"matchedWords":["input"]},"description":{"value":"The <ais-highlight-0000000000>Input</ais-highlight-0000000000>Masked component uses the basic <ais-highlight-0000000000>input</ais-highlight-0000000000> component, but with some additional masking functionality.","matchLevel":"full","fullyHighlighted":false,"matchedWords":["input"]},"category":{"title":{"value":"UI Library","matchLevel":"none","matchedWords":[]}}}},{"slug":"uilib","title":"UI Library","description":"Buttons, dropdowns, input fields, components etc.","search":null,"headings":[{"value":"UI Library","depth":1,"slug":"ui-library"}],"category":{"slug":"uilib","tag":"category","title":"UI Library"},"objectID":"a196deef-568d-5650-8bff-6dd33f542447","_highlightResult":{"title":{"value":"UI Library","matchLevel":"none","matchedWords":[]},"description":{"value":"Buttons, dropdowns, <ais-highlight-0000000000>input</ais-highlight-0000000000> fields, components etc.","matchLevel":"full","fullyHighlighted":false,"matchedWords":["input"]},"headings":[{"value":{"value":"UI Library","matchLevel":"none","matchedWords":[]}}],"category":{"title":{"value":"UI Library","matchLevel":"none","matchedWords":[]}}}},{"slug":"uilib/components/textarea","title":"Textarea","description":"The Textarea component has to be used as a multi-line text input control with an unlimited number of characters possible.","search":null,"headings":[],"category":{"slug":"uilib","tag":"category","title":"UI Library"},"objectID":"24c3a74d-5bbf-572b-8c4c-f45aef7fd6b4","_highlightResult":{"title":{"value":"Textarea","matchLevel":"none","matchedWords":[]},"description":{"value":"The Textarea component has to be used as a multi-line text <ais-highlight-0000000000>input</ais-highlight-0000000000> control with an unlimited number of characters possible.","matchLevel":"full","fullyHighlighted":false,"matchedWords":["input"]},"category":{"title":{"value":"UI Library","matchLevel":"none","matchedWords":[]}}}},{"slug":"uilib/usage/first-steps/web-components","title":"Web Components","description":null,"search":null,"headings":[{"value":"Web Components","depth":1,"slug":"web-components"},{"value":"Example usage","depth":2,"slug":"example-usage"},{"value":"Button","depth":3,"slug":"button"},{"value":"Input","depth":3,"slug":"input"},{"value":"Events","depth":2,"slug":"events"},{"value":"Example","depth":2,"slug":"example"}],"category":{"slug":"uilib","tag":"category","title":"UI Library"},"objectID":"0e3180af-5173-5f83-afea-7ab0a6d1a86d","_highlightResult":{"title":{"value":"Web Components","matchLevel":"none","matchedWords":[]},"headings":[{"value":{"value":"Web Components","matchLevel":"none","matchedWords":[]}},{"value":{"value":"Example usage","matchLevel":"none","matchedWords":[]}},{"value":{"value":"Button","matchLevel":"none","matchedWords":[]}},{"value":{"value":"<ais-highlight-0000000000>Input</ais-highlight-0000000000>","matchLevel":"full","fullyHighlighted":true,"matchedWords":["input"]}},{"value":{"value":"Events","matchLevel":"none","matchedWords":[]}},{"value":{"value":"Example","matchLevel":"none","matchedWords":[]}}],"category":{"title":{"value":"UI Library","matchLevel":"none","matchedWords":[]}}}},{"slug":"uilib/components","title":"Components","description":null,"search":null,"headings":[{"value":"Components","depth":1,"slug":"components"},{"value":"Button","depth":2,"slug":"button"},{"value":"Checkbox","depth":2,"slug":"checkbox"},{"value":"DatePicker","depth":2,"slug":"datepicker"},{"value":"Dropdown","depth":2,"slug":"dropdown"},{"value":"FormLabel","depth":2,"slug":"formlabel"},{"value":"FormRow","depth":2,"slug":"formrow"},{"value":"FormSet","depth":2,"slug":"formset"},{"value":"FormStatus","depth":2,"slug":"formstatus"},{"value":"GlobalError","depth":2,"slug":"globalerror"},{"value":"GlobalStatus","depth":2,"slug":"globalstatus"},{"value":"Icon","depth":2,"slug":"icon"},{"value":"IconPrimary","depth":2,"slug":"iconprimary"},{"value":"Input","depth":2,"slug":"input"},{"value":"InputMasked","depth":2,"slug":"inputmasked"},{"value":"Logo","depth":2,"slug":"logo"},{"value":"Modal","depth":2,"slug":"modal"},{"value":"Number","depth":2,"slug":"number"},{"value":"ProgressIndicator","depth":2,"slug":"progressindicator"},{"value":"StepIndicator","depth":2,"slug":"stepindicator"},{"value":"Notification","depth":2,"slug":"notification"},{"value":"Radio","depth":2,"slug":"radio"},{"value":"Slider","depth":2,"slug":"slider"},{"value":"Space","depth":2,"slug":"space"},{"value":"Switch","depth":2,"slug":"switch"},{"value":"Tabs","depth":2,"slug":"tabs"},{"value":"Textarea","depth":2,"slug":"textarea"},{"value":"ToggleButton","depth":2,"slug":"togglebutton"}],"category":{"slug":"uilib","tag":"category","title":"UI Library"},"objectID":"727c2c11-557a-581a-870a-5f6d38d54c87","_highlightResult":{"title":{"value":"Components","matchLevel":"none","matchedWords":[]},"headings":[{"value":{"value":"Components","matchLevel":"none","matchedWords":[]}},{"value":{"value":"Button","matchLevel":"none","matchedWords":[]}},{"value":{"value":"Checkbox","matchLevel":"none","matchedWords":[]}},{"value":{"value":"DatePicker","matchLevel":"none","matchedWords":[]}},{"value":{"value":"Dropdown","matchLevel":"none","matchedWords":[]}},{"value":{"value":"FormLabel","matchLevel":"none","matchedWords":[]}},{"value":{"value":"FormRow","matchLevel":"none","matchedWords":[]}},{"value":{"value":"FormSet","matchLevel":"none","matchedWords":[]}},{"value":{"value":"FormStatus","matchLevel":"none","matchedWords":[]}},{"value":{"value":"GlobalError","matchLevel":"none","matchedWords":[]}},{"value":{"value":"GlobalStatus","matchLevel":"none","matchedWords":[]}},{"value":{"value":"Icon","matchLevel":"none","matchedWords":[]}},{"value":{"value":"IconPrimary","matchLevel":"none","matchedWords":[]}},{"value":{"value":"<ais-highlight-0000000000>Input</ais-highlight-0000000000>","matchLevel":"full","fullyHighlighted":true,"matchedWords":["input"]}},{"value":{"value":"InputMasked","matchLevel":"none","matchedWords":[]}},{"value":{"value":"Logo","matchLevel":"none","matchedWords":[]}},{"value":{"value":"Modal","matchLevel":"none","matchedWords":[]}},{"value":{"value":"Number","matchLevel":"none","matchedWords":[]}},{"value":{"value":"ProgressIndicator","matchLevel":"none","matchedWords":[]}},{"value":{"value":"StepIndicator","matchLevel":"none","matchedWords":[]}},{"value":{"value":"Notification","matchLevel":"none","matchedWords":[]}},{"value":{"value":"Radio","matchLevel":"none","matchedWords":[]}},{"value":{"value":"Slider","matchLevel":"none","matchedWords":[]}},{"value":{"value":"Space","matchLevel":"none","matchedWords":[]}},{"value":{"value":"Switch","matchLevel":"none","matchedWords":[]}},{"value":{"value":"Tabs","matchLevel":"none","matchedWords":[]}},{"value":{"value":"Textarea","matchLevel":"none","matchedWords":[]}},{"value":{"value":"ToggleButton","matchLevel":"none","matchedWords":[]}}],"category":{"title":{"value":"UI Library","matchLevel":"none","matchedWords":[]}}}}],"nbHits":6,"page":0,"nbPages":1,"hitsPerPage":20,"exhaustiveNbHits":true,"query":"input","params":"highlightPreTag=%3Cais-highlight-0000000000%3E&highlightPostTag=%3C%2Fais-highlight-0000000000%3E&query=input&facets=%5B%5D&tagFilters=","index":"dev_eufemia_docs","processingTimeMS":1}]}'
)
console.log('response', response)
