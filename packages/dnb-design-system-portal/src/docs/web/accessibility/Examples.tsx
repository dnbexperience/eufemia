import type { MouseEvent } from 'react'
import styled from '@emotion/styled'
import ComponentBox from '../../../shared/tags/ComponentBox'
import styles from './Examples.module.scss'

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
    <ComponentBox
      hideCode
      scope={{ styles }}
      data-visual-test="focus-examples"
    >
      <div className={styles['dnb-focus-examples']}>
        <button
          type="button"
          className={styles['dnb-focus-examples__action']}
        >
          Action with gap
        </button>
        <button
          type="button"
          className={styles['dnb-focus-examples__layout']}
        >
          Layout without gap
        </button>
      </div>
    </ComponentBox>
  )
}
