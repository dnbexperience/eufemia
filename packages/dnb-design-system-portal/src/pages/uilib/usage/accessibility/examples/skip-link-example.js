import React from 'react'
import styled from '@emotion/styled'

const ChangeStylesOfSkipLink = styled.span`
  a.dnb-show-skip-link {
    position: relative;
    top: 0;
    left: 0;
    z-index: 1;
    &::after {
      content: none;
    }
  }
`

export default () => {
  const onClick = e => {
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
        className="dnb-show-skip-link"
        onClick={onClick}
        href="#dnb-app-content"
      >
        Show Skip-Link
      </a>
    </ChangeStylesOfSkipLink>
  )
}
