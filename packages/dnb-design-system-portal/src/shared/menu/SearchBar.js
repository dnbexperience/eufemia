/**
 * SearchBar
 *
 */

import React from 'react'
import styled from '@emotion/styled'
import algoliasearch from 'algoliasearch/lite'
import { Autocomplete } from 'dnb-ui-lib/src/components'
import { Anchor } from 'dnb-ui-lib/src/elements'
import { navigate } from 'gatsby'

const indexName =
  process.env.NODE_ENV === 'production'
    ? 'prod_eufemia_docs'
    : 'dev_eufemia_docs'

const algoliaApplicationID = 'SLD6KEYMQ9'
const algoliaAPIKey = '6cf238b7456ffd9f7a400d8de37318a3'

export const SearchBarInput = () => {
  const searchIndex = React.useRef(null)

  const onTypeHandler = ({
    value,
    showIndicator,
    hideIndicator,
    updateData,
    debounce
  }) => {
    debounce(
      ({ value }) => {
        searchIndex.current
          .search(value)
          .then(({ hits }) => updateData(makeHitsHumanFriendly(hits)))
          .catch(err => updateData([{ content: err.message || err }]))
        hideIndicator()
      },
      { value }
    )
    showIndicator()
  }

  const onChangeHandler = ({ data: { hit } }) => navigate(hit.slug)

  const onFocusHandler = () => {
    const searchClient = algoliasearch(algoliaApplicationID, algoliaAPIKey)
    searchIndex.current = searchClient.initIndex(indexName)
  }

  return (
    <StyledAutocomplete
      align_autocomplete="right"
      mode="async"
      no_scroll_animation
      prevent_selection
      right
      placeholder="Search ..."
      id="portal-search"
      on_type={onTypeHandler}
      on_change={onChangeHandler}
      on_focus={onFocusHandler}
    />
  )
}

const StyledAutocomplete = styled(Autocomplete)`
  .dnb-drawer-list__option__inner {
    .dnb-drawer-list__option__item {
      white-space: pre-wrap;
      font-size: var(--font-size-small);

      .dnb-anchor {
        margin-right: 0.5rem;
      }
    }

    .dnb-drawer-list__option__item:first-of-type {
      color: var(--color-sea-green);
      font-weight: var(--font-weight-default);
      font-size: var(--font-size-medium);
      padding-bottom: 0.5rem;
    }
  }

  ${'' /* .dnb-autocomplete__shell {
    width: 40rem;
  } */}
  .dnb-autocomplete__list {
    width: 40vw;
    @media (max-width: 40em) {
      width: 80vw;
    }
  }

  .dnb-drawer-list__triangle {
    right: 13rem;
  }
`

const makeHitsHumanFriendly = hits => {
  const data = []

  hits.forEach(hit => {
    const { slug, title, description } = hit

    const content = [title, description]

    const notes = hit.headings
      ?.map(({ value, slug: hash /* depth, slug */ }) => {
        if (value === title) {
          return null
        }
        return <Anchor href={`/${slug}#${hash}`}>{value}</Anchor>
      })
      .filter(Boolean)

    if (notes?.length > 0) {
      content.push(notes)
    }

    data.push({
      hit,
      content
    })
  })

  return data
}
