/**
 * SearchBar
 *
 */

import React from 'react'
import classnames from 'classnames'
import algoliasearch from 'algoliasearch/lite'
import { Autocomplete } from '@dnb/eufemia/src/components'
import { Anchor } from '@dnb/eufemia/src/elements'
import { Link, navigate } from 'gatsby'
import { scrollToAnimation } from '../parts/Layout'
import { getIndexName } from '../../uilib/search/searchHelpers'
import {
  autocompleteStyle,
  portalClassStyle,
  drawerClassStyle,
} from './SearchBar.module.scss'

const indexName = getIndexName()
const algoliaApplicationID = 'SLD6KEYMQ9'
const algoliaAPIKey = '6cf238b7456ffd9f7a400d8de37318a3'

export const SearchBarInput = () => {
  const searchIndex = React.useRef(null)
  const [status, setStatus] = React.useState(null)

  const onTypeHandler = ({
    value,
    setHidden,
    emptyData,
    showIndicator,
    hideIndicator,
    updateData,
    debounce,
  }) => {
    debounce(
      ({ value }) => {
        searchIndex.current
          ?.search(value)
          .then(({ hits }) => {
            updateData(
              makeHitsHumanFriendly({ hits, setHidden, emptyData })
            )
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
      navigate(`/${data.hit.slug}`.replace('//', '/'))
    } catch (e) {
      setStatus(e.message)
    }
  }

  const onFocusHandler = () => {
    const searchClient = algoliasearch(algoliaApplicationID, algoliaAPIKey)
    searchIndex.current = searchClient.initIndex(indexName)
  }

  return (
    <Autocomplete
      id="portal-search"
      className={classnames(autocompleteStyle, 'portal-search')}
      mode="async"
      show_clear_button
      no_scroll_animation
      prevent_selection
      disable_filter
      fixed_position
      size="medium"
      align_autocomplete="right"
      placeholder="Search ..."
      label="Search the Eufemia documentation"
      label_sr_only
      status={status}
      portal_class={portalClassStyle}
      drawer_class={drawerClassStyle}
      on_type={onTypeHandler}
      on_change={onChangeHandler}
      on_focus={onFocusHandler}
      page_offset={0} // drawer-list property
      options_render={({ Items, data }) => (
        <>
          <Items />
          {data.length > 1 && (
            <li align="right">
              <SearchLogo />
            </li>
          )}
        </>
      )}
    />
  )
}

const SearchLogo = (props) => (
  <svg
    width="40"
    height="10"
    viewBox="0 0 40 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="search-logo"
    {...props}
  >
    <title>The search index is powered by Algolia</title>
    <path
      d="M1.4 0h7.3c.7 0 1.3.5 1.3 1.2v7.4c0 .7-.6 1.3-1.3 1.3H1.4C.7 10 0 9.3 0 8.6V1.2C0 .5.7 0 1.4 0"
      fill="#5468FF"
    />
    <path
      d="M6 2.1v-.3-.3l-.4-.1h-1l-.3.1-.1.3v.4a3.1 3.1 0 011.8 0zm-2.7.5l-.2-.2a.4.4 0 00-.4 0h-.2l-.2.2a.4.4 0 000 .6l.2.2a3.3 3.3 0 01.8-.7v-.1zm1.8 1v1.6h.1l1.3-.7c-.2-.5-.7-.8-1.3-.9zm0 3.7c-1 0-2-1-2-2 0-1.1 1-2 2-2 1.1 0 2 .9 2 2a2 2 0 01-2 2zm0-4.9a2.8 2.8 0 00-2.8 2.9C2.3 6.8 3.6 8 5.1 8a2.8 2.8 0 000-5.7"
      fill="#fff"
    />
    <path
      d="M19.8 7.8c-2 0-2-1.5-2-1.8V.1l1.3-.2v5.9c0 .1 0 1 .7 1v1zm-4.8-1h.9V5.6a2.4 2.4 0 00-.7 0h-.8l-.2.3-.1.3c0 .3 0 .4.2.5l.7.2zm0-4.2l1 .1.6.4.3.7v3.8a14 14 0 01-2 .3l-.8-.1-.6-.3L13 7a2 2 0 01-.1-.8c0-.3 0-.5.2-.7 0-.2.2-.3.4-.5l.7-.2a3.8 3.8 0 011.7 0v-.2-.4l-.3-.3c0-.1-.1-.2-.3-.2l-.5-.1a4.2 4.2 0 00-1.3.2l-.1-1 .6-.1 1-.1zm23.2 4.2h.8V5.6a2.4 2.4 0 00-.7-.1h-.4l-.4.1-.2.2-.1.3c0 .3 0 .5.3.6l.7.1zM38 2.5c.3 0 .7 0 1 .2.2 0 .4.2.6.4l.3.7.1.8v3a14.3 14.3 0 01-2 .2h-.9l-.6-.3-.4-.5a2 2 0 01-.2-.8c0-.3 0-.5.2-.7 0-.2.2-.4.4-.5l.7-.3a3.8 3.8 0 011.7 0v-.1-.4l-.2-.3-.4-.3H38a4.3 4.3 0 00-1.3.2l-.1-1a4.6 4.6 0 011.6-.3zM34.5 2a.7.7 0 000-1.5c-.4 0-.7.4-.7.8s.3.7.7.7zm.6 5.8H34v-5l1.2-.3v5.3zm-2 0c-2 0-2-1.5-2-1.8V.1l1.2-.2v5.9c0 .1 0 1 .8 1v1zm-3.9-2.6c0-.5 0-1-.3-1.2a1 1 0 00-.9-.5 1 1 0 00-1 .5l-.2 1.2c0 .5 0 .9.3 1.2.2.3.5.4.9.4a1 1 0 001-.4l.2-1.2zm1.2 0a2.9 2.9 0 01-.6 2l-.8.4c-.3.2-.8.2-1 .2a3 3 0 01-1-.2 2.2 2.2 0 01-1.3-1.3l-.1-1 .1-1.2.5-.8a2.3 2.3 0 011.8-.8l1 .2.7.6c.3.2.4.5.5.8.2.3.2.7.2 1.1zm-8.8 0c0 .5 0 1 .3 1.3.2.2.5.4.8.4a1.8 1.8 0 001-.3v-3h-.8c-.4 0-.7.1-1 .4-.2.3-.3.8-.3 1.2zm3.3 2.4c0 .8-.3 1.4-.7 1.7-.4.4-1 .6-1.9.6-.3 0-.9 0-1.4-.2l.2-1c.4.2 1 .2 1.3.2.4 0 .8 0 1-.3.2-.2.3-.5.3-.8v-.2l-.5.1-.6.1-1-.1-.6-.5a2 2 0 01-.5-.7 4.4 4.4 0 010-2.4 2.2 2.2 0 011.3-1.3c.3-.2.7-.2 1.1-.2h1l1 .3v4.7z"
      fill="#5468FF"
    />
  </svg>
)

const makeHitsHumanFriendly = ({ hits, setHidden }) => {
  const data = []

  hits.forEach((hit) => {
    const { slug, title, description, search } = hit

    const content = [title, description, search].filter(Boolean)

    hit.headings?.forEach(({ value, slug: hash /* depth, slug */ }, i) => {
      // Because we don't want duplication
      if (value !== title) {
        content.push(
          <Anchor
            element={Link}
            key={slug + hash + i}
            to={`/${slug}#${hash}`}
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              setHidden()
              // emptyData()
              navigate(`/${slug}#${hash}`)
              scrollToAnimation()
            }}
          >
            {value}
          </Anchor>
        )
      }
    })

    data.push({
      hit,
      content,
    })
  })

  return data
}
