import { useEffect, useState } from 'react'
import { Button, Code, Flex, H1, P, Tabs } from '@dnb/eufemia'
import { VERSION_LABEL, EXPECTED } from './version.js'

const getTab = (position) =>
  document.querySelector(
    `.dnb-tabs__button__snap:${position}-of-type .dnb-tabs__button`
  )

// Keep focus where it is on mousedown, the way Safari treats every button.
// The tab is then focused from script without a preceding key press.
const keepFocus = (event) => event.preventDefault()

export default function App() {
  const [selectedKey, setSelectedKey] = useState('first')
  const [status, setStatus] = useState(null)

  const focusTab = (key, position) => {
    setSelectedKey(key)
    requestAnimationFrame(() => getTab(position).focus())
  }

  useEffect(() => {
    const id = setInterval(() => {
      const tab = document.activeElement?.closest('.dnb-tabs__button')
      setStatus({
        whatinput: document.documentElement.dataset.whatinput,
        tab: tab?.dataset.tabKey || 'none',
        focusVisible: Boolean(tab?.matches(':focus-visible')),
        margin: tab
          ? `${getComputedStyle(tab).marginLeft} / ${getComputedStyle(tab).marginRight}`
          : '-',
      })
    }, 200)
    return () => clearInterval(id)
  }, [])

  return (
    <div style={{ maxWidth: '40rem', padding: '2rem' }}>
      <H1 size="large">Tabs focus outline: {VERSION_LABEL}</H1>
      <P>
        Click a button with the mouse. It moves focus to a tab without a key
        press, so <Code>data-whatinput</Code> stays <Code>mouse</Code>.
      </P>
      <P>
        <strong>Expected here:</strong> {EXPECTED}
      </P>

      <Flex.Horizontal top="medium" bottom="large">
        <Button onMouseDown={keepFocus} onClick={() => focusTab('first', 'first')}>
          Focus the first tab
        </Button>
        <Button
          variant="secondary"
          onMouseDown={keepFocus}
          onClick={() => focusTab('fourth', 'last')}
        >
          Select and focus the last tab
        </Button>
      </Flex.Horizontal>

      <Tabs
        selectedKey={selectedKey}
        onChange={({ key }) => setSelectedKey(key)}
        data={[
          { title: 'First', key: 'first', content: <P>First content</P> },
          { title: 'Second', key: 'second', content: <P>Second content</P> },
          { title: 'Third', key: 'third', content: <P>Third content</P> },
          { title: 'Fourth', key: 'fourth', content: <P>Fourth content</P> },
        ]}
      />

      <pre id="status" style={{ marginTop: '2rem' }}>
        {status &&
          [
            `data-whatinput:  ${status.whatinput}`,
            `focused tab:     ${status.tab}`,
            `:focus-visible:  ${status.focusVisible}`,
            `margin (l / r):  ${status.margin}`,
          ].join('\n')}
      </pre>
    </div>
  )
}
