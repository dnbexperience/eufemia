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
    ? typeof window !== 'undefined' && /-beta/.test(window.location.href)
      ? 'beta_eufemia_docs'
      : 'prod_eufemia_docs'
    : 'dev_eufemia_docs'

const algoliaApplicationID = 'SLD6KEYMQ9'
const algoliaAPIKey = '6cf238b7456ffd9f7a400d8de37318a3'

export const SearchBarInput = () => {
  const searchIndex = React.useRef(null)
  const [status, setStatus] = React.useState(null)

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
          .then(({ hits }) => {
            updateData(makeHitsHumanFriendly(hits))
            hideIndicator()
          })
          .catch((err) => {
            setStatus(err.message || err)
            hideIndicator()
          })
      },
      { value }
    )
    showIndicator()
  }

  const onChangeHandler = ({ data }) => {
    try {
      navigate(data.hit.slug)
    } catch (e) {
      setStatus(e.message)
    }
  }

  const onFocusHandler = () => {
    const searchClient = algoliasearch(algoliaApplicationID, algoliaAPIKey)
    searchIndex.current = searchClient.initIndex(indexName)
  }

  return (
    <StyledAutocomplete
      right
      mode="async"
      no_scroll_animation
      prevent_selection
      keep_placeholder
      size="medium"
      align_autocomplete="right"
      triangle_position="left"
      placeholder="Search ..."
      id="portal-search"
      status={status}
      on_type={onTypeHandler}
      on_change={onChangeHandler}
      on_focus={onFocusHandler}
    />
  )
}

const StyledAutocomplete = styled(Autocomplete)`
  .dnb-drawer-list__option__inner {
    .dnb-drawer-list__option__item {
      white-space: normal;
      font-size: var(--font-size-small);

      padding-bottom: 0.5rem;

      .dnb-anchor {
        display: inline-block;
        margin-right: 0.5rem;
        word-break: break-word;
        white-space: nowrap;
      }
    }

    .dnb-drawer-list__option__item:first-of-type {
      color: var(--color-sea-green);
      font-weight: var(--font-weight-default);
      font-size: var(--font-size-medium);
      padding-bottom: 0.5rem;
    }
  }

  .dnb-autocomplete__shell {
    &,
    input {
      width: 30vw;
    }
  }

  .dnb-autocomplete__list {
    width: 40vw;
    @media (max-width: 60em) {
      width: 60vw;
    }
    @media (max-width: 40em) {
      width: 80vw;
    }
  }

  .dnb-drawer-list__triangle {
    left: 10vw;
    @media (max-width: 60em) {
      left: 30vw;
    }
    @media (max-width: 40em) {
      left: 50vw;
    }
  }
`

const makeHitsHumanFriendly = (hits) => {
  const data = []

  hits.forEach((hit) => {
    const { slug, title, description, search } = hit

    const content = [title, description, search].filter(Boolean)

    const notes = hit.headings
      ?.map(({ value, slug: hash /* depth, slug */ }) => {
        if (value === title) {
          return null
        }
        return (
          <Anchor key={slug + hash} href={`/${slug}#${hash}`}>
            {value}
          </Anchor>
        )
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
