import { useState } from 'react'
import { Button, Flex } from '@dnb/eufemia/src'
import { AnimatedDigits } from '@dnb/eufemia/src/fragments'
import ComponentBox from '../../../../../shared/tags/ComponentBox'

export function AnimatedUpdates() {
  return (
    <ComponentBox hideCode scope={{ AnimatedDigits }}>
      {() => {
        function Example() {
          const [change, setChange] = useState({
            value: 128,
            previousValue: 128,
          })

          return (
            <Flex.Stack layoutEngine="css">
              <span>
                Orders:{' '}
                <AnimatedDigits
                  value={String(change.value)}
                  previousValue={String(change.previousValue)}
                  direction={
                    change.value < change.previousValue ? 'down' : 'up'
                  }
                />
              </span>
              <Button
                text="Change value"
                onClick={() =>
                  setChange(({ value }) => ({
                    value: value === 128 ? 238 : 128,
                    previousValue: value,
                  }))
                }
              />
            </Flex.Stack>
          )
        }

        return <Example />
      }}
    </ComponentBox>
  )
}
