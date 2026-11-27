/**
 * SearchBar
 *
 */

import { useEffect, useRef, useState } from 'react'
import type { KeyboardEvent, MouseEvent, SVGProps } from 'react'
import algoliasearch from 'algoliasearch/lite'
import Search from '@dnb/eufemia/src/components/search/Search'
import Chip from '@dnb/eufemia/src/components/chip/Chip'
import Flex from '@dnb/eufemia/src/components/flex/Flex'
import Hr from '@dnb/eufemia/src/elements/hr/Hr'
import type { SearchProps } from '@dnb/eufemia/src/components/search/Search'
import type {
  AutocompleteOnChangeParams,
  AutocompleteOnTypeParams,
} from '@dnb/eufemia/src/components/autocomplete/Autocomplete'
import { navigate } from 'portal-query'
import { panelClassStyle, drawerClassStyle } from './SearchBar.module.scss'
import { isModifiedClickEvent } from '@dnb/eufemia/src/shared/helpers'
import { formatSearchResultMarkdown } from './SearchBarMarkdown'
import { markNextViewFromSearch } from '../../../vite/client/track-page-view'
import { loadPortalRoutes } from '../../../vite/client/load-portal-routes'
import type { PortalPlatform } from './MdxSidebarNavigation'

const searchInputId = 'portal-search'

type SearchHit = {
  slug: string
  title: string
  hash?: string
  pageTitle?: string
  headings?: (string | { value: string; slug: string })[]
  search?: string | false
  description?: string
  _snippetResult?: { content?: { value: string } }
}

type SearchResponse = { hits: SearchHit[] }

export const SearchBarInput = ({
  id = searchInputId,
  placeholder = 'Search ...',
  variant = 'compact',
  onQuery,
}: {
  id?: string
  placeholder?: string
  variant?: SearchProps['variant']
  onQuery?: (value: string) => boolean | void
} = {}) => {
  const searchIndex = useRef<{
    search: (
      query: string,
      platform: PortalPlatform
    ) => Promise<SearchResponse>
  }>(null)
  const searchRevision = useRef(0)
  const latestQuery = useRef<AutocompleteOnTypeParams>(null)
  const hideTimer = useRef<ReturnType<typeof setTimeout>>(undefined)
  const [status, setStatus] = useState<string>(null)
  const [platform, setPlatform] = useState<PortalPlatform>('web')

  useEffect(() => () => clearTimeout(hideTimer.current), [])

  const searchForQuery = (
    {
      value,
      setHidden,
      setVisible,
      showIndicator,
      showIndicatorItem,
      hideIndicator,
      showNoOptionsItem,
      updateData,
      debounce,
    }: AutocompleteOnTypeParams,
    platform: PortalPlatform,
    queryChanged = true
  ) => {
    const revision = ++searchRevision.current
    clearTimeout(hideTimer.current)
    setStatus(null)
    if (queryChanged && onQuery?.(value)) {
      hideTimer.current = setTimeout(() => {
        if (revision === searchRevision.current) {
          searchRevision.current++
          setHidden()
          hideIndicator()
        }
      }, 1500)
    }
    if (!value.trim()) {
      setHidden()
      hideIndicator()
      updateData([])
      return
    }
    if (!queryChanged) {
      showIndicatorItem()
    }

    debounce(
      (params) => {
        const { value, revision, platform } = params as {
          value: string
          revision: number
          platform: PortalPlatform
        }
        if (revision !== searchRevision.current) {
          return
        }
        searchIndex.current
          ?.search(value, platform)
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
            updateData(makeHitsHumanFriendly(searchableHits))
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
            showNoOptionsItem()
          })
      },
      { value, revision, platform }
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
      const hit =
        data && typeof data === 'object' && 'hit' in data && data.hit
      if (!hit || typeof hit.slug !== 'string') {
        return // stop here
      }

      handleSearchResultNavigation({
        event: event as unknown as SearchResultNavigationArgs['event'],
        slug: hit.slug,
        hash: hit.hash,
        setHidden,
        emptyData,
      })
    } catch (e) {
      setStatus(e instanceof Error ? e.message : String(e))
    }
  }

  const onFocusHandler = () => {
    void loadPortalRoutes().catch(() => undefined)
    if (import.meta.env.DEV && import.meta.env.MODE !== 'test') {
      searchIndex.current = {
        search: async (value, platform) => {
          const response = await fetch(
            `/_search?q=${encodeURIComponent(value)}&platform=${platform}`
          )
          if (!response.ok) {
            throw new Error('Documentation search is unavailable')
          }
          return response.json()
        },
      }
      return
    }
    const searchClient = algoliasearch(
      process.env.ALGOLIA_APP_ID,
      process.env.ALGOLIA_SEARCH_KEY
    )
    const index = searchClient.initIndex(process.env.ALGOLIA_INDEX_NAME)
    searchIndex.current = {
      search: (query, platform) =>
        index.search<SearchHit>(query, {
          filters: `platform:${platform}`,
        }),
    }
  }

  return (
    <Search.Panel
      id={id}
      variant={variant}
      shortcut
      className="portal-search"
      mode="async"
      search={{ filter: false }}
      align={variant === 'compact' ? 'right' : 'left'}
      panelDescription="Documentation results with a platform filter. While the search input is focused, use the arrow keys to browse results and Enter to open a section. Press Tab to reach the platform chips, then use the arrow keys to change platform. Press Shift+Tab to return, or Escape to close the panel."
      popoverProps={{
        fixedPosition: variant === 'compact',
        placement: 'bottom',
        autoAlignMode: 'never',
        className: panelClassStyle,
      }}
      placeholder={placeholder}
      label="Search the Eufemia documentation"
      status={status}
      drawerClass={drawerClassStyle}
      onType={(params) => {
        latestQuery.current = params
        searchForQuery(params, platform)
      }}
      onChange={onChangeHandler}
      onFocus={onFocusHandler}
      onClear={() => {
        clearTimeout(hideTimer.current)
        searchRevision.current++
        latestQuery.current = null
        onQuery?.('')
      }}
      optionsRender={({ Items, data }) => {
        return (
          <>
            <Items />
            {data.length > 1 && !import.meta.env.DEV && (
              <li>
                <SearchLogo />
              </li>
            )}
          </>
        )
      }}
    >
      {({ results }) => (
        <Flex.Stack gap="small">
          <Chip.Group
            aria-label="Search platform"
            value={platform}
            onChange={({ value }) => {
              const nextPlatform = value as PortalPlatform
              setPlatform(nextPlatform)
              if (latestQuery.current) {
                searchForQuery(latestQuery.current, nextPlatform, false)
              }
            }}
          >
            <Chip value="web">Web</Chip>
            <Chip value="ios">iOS</Chip>
            <Chip value="android">Android</Chip>
          </Chip.Group>
          <Hr />
          {results}
        </Flex.Stack>
      )}
    </Search.Panel>
  )
}

// Flatten legacy page records while the hosted index moves to section records.
const makeHitsHumanFriendly = (hits: SearchHit[]) => {
  const destinations = new Set<string>()
  return hits.flatMap((hit) => {
    const sections = [
      hit,
      ...(hit.headings ?? [])
        .filter(
          (heading): heading is { value: string; slug: string } =>
            heading &&
            typeof heading === 'object' &&
            heading.value !== hit.title
        )
        .map(({ value, slug }) => ({
          ...hit,
          title: value,
          pageTitle: hit.title,
          hash: slug,
        })),
    ]
    return sections.flatMap((section) => {
      const destination = section.slug + '#' + (section.hash ?? '')
      if (destinations.has(destination)) {
        return []
      }
      destinations.add(destination)
      const context = [
        ...(section.pageTitle !== section.title
          ? (section.pageTitle?.split(' → ') ?? [])
          : []),
        ...(section.headings ?? []).filter(
          (heading) => typeof heading === 'string'
        ),
      ]
        .filter(Boolean)
        .filter(
          (heading, index, headings) => heading !== headings[index - 1]
        )
        .join(' → ')
      const snippet =
        section._snippetResult?.content?.value ?? section.description
      return [
        {
          hit: section,
          content: [
            formatSearchResultMarkdown(section.title),
            formatSearchResultMarkdown(context),
            formatSearchResultMarkdown(snippet),
          ].filter(Boolean),
        },
      ]
    })
  })
}

type SearchResultNavigationArgs = {
  event?:
    | MouseEvent<HTMLElement>
    | KeyboardEvent<HTMLElement>
    | MouseEvent<HTMLAnchorElement | HTMLLinkElement>
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
  const url = `/${slug}${hash ? `#${hash}` : ''}`.replace('//', '/')
  const modifiedClick = isModifiedClickEvent(event)

  if (modifiedClick) {
    if (typeof window !== 'undefined') {
      window.open(url, '_blank', 'noopener')
    }
    setHidden?.()
    emptyData?.()
    return true
  }

  event?.preventDefault?.()
  setHidden?.()
  emptyData?.()
  markNextViewFromSearch()
  navigate(url)

  return true
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
