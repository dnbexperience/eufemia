import { useRef, useState } from 'react'
import { Button, Input, P, Slider, Switch } from '@dnb/eufemia/src'
import { Provider, useMedia, useMediaQuery } from '@dnb/eufemia/src/shared'
import ComponentBox from '../../../shared/tags/ComponentBox'
import styles from './AvailableWidthExamples.module.scss'

function AccountSummary({ label }: { label: string }) {
  const { key } = useMedia()
  const wide = useMediaQuery({ when: { min: 'medium' } })
  return (
    <section className={styles.summary}>
      <P>
        <strong>{label}</strong>
      </P>
      <P data-width-mode>
        {key === 'large' ? 'Side by side' : 'Stacked'} layout
      </P>
      <P data-width-query>Hook: {wide ? 'above 40em' : '40em or less'}</P>
      <div className={styles.accounts} data-width-columns>
        <div>
          Everyday account
          <br />
          <strong>12 400 kr</strong>
        </div>
        <div>
          Savings account
          <br />
          <strong>85 000 kr</strong>
        </div>
      </div>
      <Input label="Account name" defaultValue="My account" />
    </section>
  )
}

export function AvailableWidthComparison() {
  return (
    <ComponentBox hideCode scope={{ useRef, styles, AccountSummary }}>
      {() => {
        function Example() {
          const appRef = useRef<HTMLDivElement>(null)
          const [sidebarWidth, setSidebarWidth] = useState(240)
          const [showSidebar, setShowSidebar] = useState(true)
          return (
            <div className={styles.example} data-available-width-example>
              <P>
                Keep the browser size unchanged. Make the sidebar wider and
                watch the app use fewer columns.
              </P>
              <Switch
                label="Show sidebar"
                checked={showSidebar}
                onChange={({ checked }) => setShowSidebar(checked)}
              />
              <Slider
                label="Sidebar width"
                min={64}
                max={400}
                step={16}
                value={sidebarWidth}
                onChange={({ value }) => {
                  if (typeof value === 'number') {
                    setSidebarWidth(value)
                  }
                }}
              />
              <div
                className={styles.shell}
                style={{
                  gridTemplateColumns:
                    (showSidebar ? sidebarWidth : 0) + 'px minmax(0, 1fr)',
                }}
              >
                <div className={styles.sidebar} aria-hidden={!showSidebar}>
                  {showSidebar && <P>Navigation</P>}
                </div>
                <div
                  ref={appRef}
                  className={styles.application}
                  data-app-container
                >
                  <Provider
                    breakpoints={{ small: '28em', medium: '40em' }}
                    responsive={{
                      target: 'container',
                      containerRef: appRef,
                    }}
                  >
                    <AccountSummary label="Uses the app's available width" />
                  </Provider>
                </div>
              </div>
              <details>
                <summary>Compare with viewport behavior</summary>
                <div className={styles.viewportComparison}>
                  <Provider
                    breakpoints={{ small: '28em', medium: '40em' }}
                    responsive={{ target: 'viewport' }}
                  >
                    <AccountSummary label="Uses the whole browser width" />
                  </Provider>
                </div>
                <P>
                  The browser can be wide while the app is narrow. Existing
                  viewport queries only know about the browser.
                </P>
              </details>
            </div>
          )
        }
        return <Example />
      }}
    </ComponentBox>
  )
}

export function AvailableWidthOffset() {
  return (
    <ComponentBox hideCode scope={{ useMedia }}>
      {() => {
        function Result() {
          const { key } = useMedia()
          return (
            <P role="status">
              Application range: {key ?? 'Not measured yet'}
            </P>
          )
        }
        function Example() {
          const [offset, setOffset] = useState(288)
          return (
            <div data-available-width-offset>
              <P>
                If the shell already knows how much space it reserves, pass
                that width once to Provider. This changes JavaScript width
                queries; existing CSS media queries stay viewport based.
              </P>
              <Slider
                label="Reserved width in pixels"
                min={0}
                max={500}
                step={20}
                value={offset}
                onChange={({ value }) => {
                  if (typeof value === 'number') {
                    setOffset(value)
                  }
                }}
              />
              <Provider responsive={{ target: 'viewport', offset }}>
                <Result />
              </Provider>
              <Button
                text="No reserved space"
                onClick={() => setOffset(0)}
                top="small"
              />
            </div>
          )
        }
        return <Example />
      }}
    </ComponentBox>
  )
}
