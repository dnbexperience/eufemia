import { useState } from 'react'
import { Button, Flex, P } from '@dnb/eufemia/src'
import {
  createSharedState,
  useSharedState,
  useWeakSharedState,
} from '@dnb/eufemia/src/shared'
import ComponentBox from '../../../../shared/tags/ComponentBox'

export function SharedCounter() {
  return (
    <ComponentBox scope={{ useSharedState }}>
      {() => {
        function Counter() {
          const { get, extend, set } = useSharedState(
            'shared-state-counter-demo',
            { count: 0 }
          )

          return (
            <Flex.Horizontal>
              <Button onClick={() => extend({ count: get().count + 1 })}>
                Increase
              </Button>
              <Button
                variant="secondary"
                onClick={() => set({ count: 0 })}
              >
                Reset
              </Button>
            </Flex.Horizontal>
          )
        }

        function Summary() {
          const { data } = useSharedState('shared-state-counter-demo', {
            count: 0,
          })

          return <P aria-live="polite">Count: {data.count}</P>
        }

        return (
          <Flex.Stack>
            <Counter />
            <Summary />
          </Flex.Stack>
        )
      }}
    </ComponentBox>
  )
}

export function OutsideReact() {
  return (
    <ComponentBox scope={{ useSharedState, createSharedState }}>
      {() => {
        function selectCurrency(currency: string) {
          const store = createSharedState('shared-state-currency-demo', {
            currency: 'NOK',
          })
          store.extend({ currency })
        }

        function Currency() {
          const { data } = useSharedState('shared-state-currency-demo', {
            currency: 'NOK',
          })

          return (
            <Flex.Stack>
              <Flex.Horizontal>
                <Button onClick={() => selectCurrency('NOK')}>
                  Use NOK
                </Button>
                <Button onClick={() => selectCurrency('EUR')}>
                  Use EUR
                </Button>
              </Flex.Horizontal>
              <P aria-live="polite">Selected currency: {data.currency}</P>
            </Flex.Stack>
          )
        }

        return <Currency />
      }}
    </ComponentBox>
  )
}

export function ClearOnUnmount() {
  return (
    <ComponentBox scope={{ useWeakSharedState }}>
      {() => {
        function Counter() {
          const { data, get, extend } = useWeakSharedState(
            'shared-state-weak-demo',
            { count: 0 }
          )

          return (
            <Flex.Horizontal align="center">
              <Button onClick={() => extend({ count: get().count + 1 })}>
                Add one
              </Button>
              <P aria-live="polite">Temporary count: {data.count}</P>
            </Flex.Horizontal>
          )
        }

        function Example() {
          const [visible, setVisible] = useState(true)

          return (
            <Flex.Stack>
              <Button
                variant="secondary"
                onClick={() => setVisible(!visible)}
              >
                {visible ? 'Unmount counter' : 'Mount counter'}
              </Button>
              {visible && <Counter />}
            </Flex.Stack>
          )
        }

        return <Example />
      }}
    </ComponentBox>
  )
}
