/**
 * SearchBar
 *
 */

import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import type { KeyboardEvent, MouseEvent, ReactNode, SVGProps } from 'react'
import { clsx } from 'clsx'
import algoliasearch from 'algoliasearch/lite'
import { Autocomplete } from '@dnb/eufemia/src/components'
import type { AutocompleteOnChangeParams } from '@dnb/eufemia/src/components/autocomplete/Autocomplete'
import { navigate } from 'portal-query'
import {
  autocompleteStyle,
  shortcutHintStyle,
  portalClassStyle,
  drawerClassStyle,
} from './SearchBar.module.scss'
import { scrollToAnimation } from '../parts/layout-utils'
import {
  applyPageFocus,
  isMac,
  isModifiedClickEvent,
} from '@dnb/eufemia/src/shared/helpers'
import { formatSearchResultMarkdown } from './SearchBarMarkdown'
import { markNextViewFromSearch } from '../../../vite/client/track-page-view'
import { loadPortalRoutes } from '../../../vite/client/load-portal-routes'
import { withTrailingSlash } from '../../../vite/client/with-trailing-slash'

const searchInputId = 'portal-search'
const subscribeToPlatform = () => () => undefined
const getShortcutHint = (): string | null => (isMac() ? '⌘ K' : 'Ctrl K')
const getServerShortcutHint = (): string | null => null

// Rendered as a component so Autocomplete's injected trigger props don't reach the <kbd>.
const ShortcutHint = ({ hint }: { hint: string }) => (
  <kbd className={shortcutHintStyle} aria-hidden="true">
    {hint}
  </kbd>
)

export const SearchBarInput = ({
  id = searchInputId,
  placeholder = 'Search ...',
  stretch = false,
  onQuery,
}: {
  id?: string
  placeholder?: string
  stretch?: boolean
  onQuery?: (value: string) => boolean | void
} = {}) => {
  const searchIndex = useRef(null)
  const searchResults = useRef<SearchResult[]>([])
  const searchRevision = useRef(0)
  const hideTimer = useRef<ReturnType<typeof setTimeout>>(undefined)
  const [status, setStatus] = useState(null)
  const [hasValue, setHasValue] = useState(false)
  const shortcutHint = useSyncExternalStore(
    subscribeToPlatform,
    getShortcutHint,
    getServerShortcutHint
  )

  useEffect(() => {
    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (
        (event.metaKey || event.ctrlKey) &&
        (event.key === 'k' || event.key === 'K')
      ) {
        const search =
          document.getElementById('portal-home-search') ||
          document.getElementById(searchInputId)
        if (search?.id !== id) {
          return
        }
        event.preventDefault()
        search?.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)

    return () => {
      clearTimeout(hideTimer.current)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [id])

  useEffect(() => {
    // Results are options, not links, so open one in a new tab on a modified or middle click here.
    const onClick = (event: globalThis.MouseEvent) => {
      const opensNewTab =
        event.button === 1 ||
        (event.button === 0 &&
          (event.metaKey || event.ctrlKey || event.shiftKey))
      if (!opensNewTab || !(event.target instanceof Element)) {
        return
      }

      const option = event.target.closest('li[data-item]')
      const listId = document
        .getElementById(id)
        ?.getAttribute('aria-controls')
      if (!option || !document.getElementById(listId)?.contains(option)) {
        return
      }

      const result =
        searchResults.current[Number(option.getAttribute('data-item'))]
      if (!result) {
        return
      }

      event.preventDefault()
      event.stopPropagation()
      window.open(
        getSearchResultUrl(result.hit.slug, result.hash),
        '_blank',
        'noopener'
      )
    }

    document.addEventListener('click', onClick, true)
    document.addEventListener('auxclick', onClick, true)

    return () => {
      document.removeEventListener('click', onClick, true)
      document.removeEventListener('auxclick', onClick, true)
    }
  }, [id])

  const onTypeHandler = ({
    value,
    setHidden,
    setVisible,
    showIndicator,
    hideIndicator,
    showNoOptionsItem,
    updateData,
    debounce,
  }) => {
    const revision = ++searchRevision.current
    clearTimeout(hideTimer.current)
    setHasValue(Boolean(value))
    setStatus(null)
    if (onQuery?.(value)) {
      hideTimer.current = setTimeout(() => {
        if (revision === searchRevision.current) {
          searchRevision.current++
          setHidden(true)
          hideIndicator()
        }
      }, 1500)
    }
    if (!value.trim()) {
      setHidden(true)
      hideIndicator()
      updateData([])
      return
    }

    debounce(
      ({ value, revision }) => {
        if (revision !== searchRevision.current) {
          return
        }
        searchIndex.current
          ?.search(value)
          .then(({ hits }) => {
            if (revision !== searchRevision.current) {
              return
            }
            const searchableHits = hits.filter(
              ({ search }) => search !== false
            )
            if (document.activeElement?.id === id) {
              setVisible()
            }
            searchResults.current = makeSearchResults({
              hits: searchableHits,
              query: value,
            })
            updateData(searchResults.current)
            hideIndicator()
            if (searchableHits.length === 0) {
              showNoOptionsItem()
            }
          })
          .catch((err) => {
            if (revision !== searchRevision.current) {
              return
            }
            setStatus(err.message || err)
            hideIndicator()
          })
      },
      { value, revision }
    )
    showIndicator()
  }

  const onChangeHandler = ({
    data,
    emptyData,
    setHidden,
    event,
  }: AutocompleteOnChangeParams) => {
    try {
      const { hit, hash } = (data ?? {}) as Partial<SearchResult>
      if (!hit?.slug) {
        return // stop here
      }

      handleSearchResultNavigation({
        event: event as unknown as SearchResultNavigationArgs['event'],
        slug: hit.slug,
        hash,
        setHidden,
        emptyData,
      })
    } catch (e) {
      setStatus(e instanceof Error ? e.message : String(e))
    }
  }

  const onFocusHandler = () => {
    void loadPortalRoutes().catch(() => undefined)
    const searchClient = algoliasearch(
      process.env.ALGOLIA_APP_ID,
      process.env.ALGOLIA_SEARCH_KEY
    )
    searchIndex.current = searchClient.initIndex(
      process.env.ALGOLIA_INDEX_NAME
    )
  }

  return (
    <Autocomplete
      id={id}
      stretch={stretch}
      className={clsx(autocompleteStyle, 'portal-search')}
      mode="async"
      showClearButton
      noScrollAnimation
      preventSelection
      search={{ filter: false }}
      fixedPosition
      size="medium"
      align="right"
      placeholder={placeholder}
      label="Search the Eufemia documentation"
      labelSrOnly
      aria-keyshortcuts="Meta+K Control+K"
      status={status}
      portalClass={portalClassStyle}
      drawerClass={drawerClassStyle}
      onType={onTypeHandler}
      onChange={onChangeHandler}
      onFocus={onFocusHandler}
      onClear={() => {
        clearTimeout(hideTimer.current)
        searchRevision.current++
        setHasValue(false)
        onQuery?.('')
      }}
      submitElement={
        !hasValue && shortcutHint ? (
          <ShortcutHint hint={shortcutHint} />
        ) : undefined
      }
      pageOffset={0} // drawer-list property
      optionsRender={({ Items, data }) => {
        return (
          <>
            <Items />
            {data.length > 1 && (
              <li>
                <SearchLogo />
              </li>
            )}
          </>
        )
      }}
    />
  )
}

const maxHeadingsPerPage = 5

type SearchHit = {
  slug: string
  title?: string
  description?: string
  search?: string | false
  headings?: Array<{ value: string; slug: string }>
}

type SearchResult = {
  hit: SearchHit
  hash?: string
  content: ReactNode[]
}

// Each page and each heading that matches the query is its own option, so the arrow keys reach every result.
const makeSearchResults = ({
  hits,
  query,
}: {
  hits: SearchHit[]
  query: string
}): SearchResult[] => {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean)

  return hits.flatMap((hit) => {
    const { title, description, search } = hit
    const pageTitle = formatSearchResultMarkdown(title)

    const headings = (hit.headings ?? [])
      .filter(
        ({ value }) =>
          value !== title &&
          words.every((word) => value.toLowerCase().includes(word))
      )
      .slice(0, maxHeadingsPerPage)
      .map(({ value, slug: hash }) => ({
        hit,
        hash,
        content: [formatSearchResultMarkdown(value), pageTitle].filter(
          Boolean
        ),
      }))

    return [
      {
        hit,
        content: [
          pageTitle,
          formatSearchResultMarkdown(description),
          formatSearchResultMarkdown(search),
        ].filter(Boolean),
      },
      ...headings,
    ]
  })
}

const getSearchResultUrl = (slug: string, hash?: string) =>
  withTrailingSlash(`/${slug}${hash ? `#${hash}` : ''}`.replace('//', '/'))

type SearchResultNavigationArgs = {
  event?: MouseEvent<HTMLElement> | KeyboardEvent<HTMLElement>
  slug: string
  hash?: string
  setHidden?: () => void
  emptyData?: () => void
}

const handleSearchResultNavigation = ({
  event,
  slug,
  hash,
  setHidden,
  emptyData,
}: SearchResultNavigationArgs) => {
  const url = getSearchResultUrl(slug, hash)

  if (isModifiedClickEvent(event)) {
    if (typeof window !== 'undefined') {
      window.open(url, '_blank', 'noopener')
    }
    setHidden?.()
    emptyData?.()
    return // stop here
  }

  event?.preventDefault?.()
  setHidden?.()
  emptyData?.()
  markNextViewFromSearch()
  navigate(url)
  scrollToAnimation()
  applyPageFocus('content')
}

const SearchLogo = (props: Omit<SVGProps<SVGElement>, 'ref'>) => (
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
