/**
 * Inline Tag
 *
 */

import { useEffect, useRef } from 'react'
import type { ComponentProps, ReactNode } from 'react'
import { Global, css } from '@emotion/react'
import { navigate } from 'portal-query'
import { Anchor, Button, Space } from '@dnb/eufemia/src'
import { wrapperStyle, innerStyle, footerStyle } from './Intro.module.scss'
import { Link } from './Anchor'

type IntroProps = {
  children?: ReactNode
}

const Intro = ({ children }: IntroProps) => {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const onKeyDownHandler = (e: KeyboardEvent) => {
      if (/textarea|input/i.test(document.activeElement.tagName)) {
        return
      }
      try {
        if (e.key === 'ArrowRight' && ref && ref.current) {
          const elem = ref.current.querySelector('a[href*="/intro"]')
          const href = elem.getAttribute('href')
          navigate(href)
        }
        if (e.key === 'ArrowLeft') {
          window.history.back()
        }
      } catch (e) {
        console.error(e)
      }
    }
    try {
      document.addEventListener('keydown', onKeyDownHandler)
    } catch (e) {
      console.error(e)
    }
    return () => {
      document.removeEventListener('keydown', onKeyDownHandler)
    }
  }, [])
  return (
    <div className={wrapperStyle}>
      <div ref={ref} className={innerStyle}>
        {children}
      </div>
    </div>
  )
}

type IntroFooterProps = {
  href: string
  text: string
}

export const IntroFooter = ({ href, text }: IntroFooterProps) => (
  <Space top noCollapse className={footerStyle}>
    <Global
      styles={css`
        .dnb-app-content {
          margin-left: 0;
        }
      `}
    />
    {/* @ts-expect-error -- strictFunctionTypes */}
    <Button href={href} text={text} icon="chevron_right" element={Link} />
    <Button
      href="/uilib/getting-started"
      variant="secondary"
      text="Cancel"
      icon="close"
      iconPosition="left"
      // @ts-expect-error -- strictFunctionTypes
      element={Link}
    />
  </Space>
)

export const Next = (props: ComponentProps<typeof Anchor>) => (
  <>
    <div
      className="dnb-section"
      style={{ padding: 'var(--spacing-large) 0' }}
    >
      <Anchor {...props} />
    </div>
  </>
)

export default Intro
