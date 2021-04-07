import React from 'react'
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

export default function SkipLinkExample() {
  const onClick = (e) => {
    try {
      document.querySelector('a.dnb-skip-link').focus()
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
