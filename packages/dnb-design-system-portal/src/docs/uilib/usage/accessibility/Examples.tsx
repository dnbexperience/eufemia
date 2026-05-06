import type { MouseEvent } from 'react'
import styled from '@emotion/styled'

const ChangeStylesOfSkipLink = styled.div`
  margin: 3rem 0;
  a.dnb-skip-link--active {
    position: relative;
    top: 0;
    left: 0;
    z-index: 1;
    &::after {
      content: none;
    }
  }
`

export function SkipLinkExample() {
  const onClick = (e: MouseEvent) => {
    const element = document.querySelector(
      'a.dnb-skip-link'
    ) as HTMLAnchorElement
    try {
      element.focus()
      e.preventDefault()
    } catch (e) {
      console.log(e)
    }
  }
  return (
    <ChangeStylesOfSkipLink>
      <a
        className="dnb-skip-link--active"
        onClick={onClick}
        href="#dnb-app-content"
      >
        Show Skip-Link
      </a>
    </ChangeStylesOfSkipLink>
  )
}

export function FocusExample() {
  return (
    <button
      type="button"
      style={{
        display: 'inline-block',
        padding: '0.5rem 1.5rem',
        border:
          'var(--focus-ring-width) solid var(--token-color-stroke-action-focus)',
        backgroundColor:
          'var(--token-color-background-action-focus-subtle)',
        color: 'var(--token-color-text-action-focus)',
        borderRadius: 'var(--token-radius-full)',
      }}
    >
      Focus example
    </button>
  )
}
