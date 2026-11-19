import { useEffect, useState } from 'react'
import { Button, Flex, H1, Li, Ol, P, Tabs } from '@dnb/eufemia'
import { TITLE, VERSION_LABEL, STEPS, EXPECTED } from './version.js'

const getTab = (position) =>
  document.querySelector(
    `.dnb-tabs__button__snap:${position}-of-type .dnb-tabs__button`
  )

export default function App() {
  const [selectedKey, setSelectedKey] = useState('first')
  const [status, setStatus] = useState(null)

  useEffect(() => {
    const id = setInterval(() => {
      const active = document.activeElement
      const tab = active?.closest('.dnb-tabs__button')
      setStatus({
        focused: tab
          ? `tab "${tab.dataset.tabKey}"`
          : active?.textContent?.trim().slice(0, 30) || 'none',
        focusVisible: Boolean(tab?.matches(':focus-visible')),
        selected: selectedKey,
      })
    }, 200)
    return () => clearInterval(id)
  }, [selectedKey])

  return (
    <div style={{ maxWidth: '40rem', padding: '2rem' }}>
      <H1 size="large">
        {TITLE}: {VERSION_LABEL}
      </H1>
      <Ol>
        {STEPS.map((step) => (
          <Li key={step}>{step}</Li>
        ))}
      </Ol>
      <P>
        <strong>Expected here:</strong> {EXPECTED}
      </P>

      <Flex.Horizontal top="medium" bottom="large">
        <Button variant="secondary" onClick={() => setSelectedKey('fourth')}>
          Select the last tab
        </Button>
        <Button
          variant="tertiary"
          onClick={() => {
            setSelectedKey('fourth')
            requestAnimationFrame(() => getTab('last').focus())
          }}
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

      <pre style={{ marginTop: '2rem' }}>
        {status &&
          [
            `selectedKey:     ${status.selected}`,
            `focused:         ${status.focused}`,
            `:focus-visible:  ${status.focusVisible}`,
          ].join('\n')}
      </pre>
    </div>
  )
}
