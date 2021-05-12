import React from 'react'
// import styled from '@emotion/styled'

// import { Button } from '@dnb/eufemia/src/components'
import Button from '@dnb/eufemia/src/components/button/Button'
import NumberFormat from '@dnb/eufemia/src/components/number-format/NumberFormat'
// import { format } from '@dnb/eufemia/src/components/number-format/NumberUtils';
import Tabs from '@dnb/eufemia/src/components/tabs/Tabs'
import Modal from '@dnb/eufemia/src/components/modal/Modal'
// import GlobalError from '@dnb/eufemia/src/components/global-error/GlobalError';
import Input from '@dnb/eufemia/src/components/input/Input'
import { Provider } from '@dnb/eufemia/src/shared'
// import { H1, P } from '@dnb/eufemia/src/elements';
import { bell } from '@dnb/eufemia/src/icons'

export default {
  title: 'Eufemia/Helpers/Types',
}

export const TypesSandbox = () => {
  return (
    <div>
      {/* <H1 size="small">Hello Eufemia</H1>
      <P>Start editing to see some magic happen!</P> */}

      <Provider
        // FormRow={{
        //   Button: { size: 'large' }
        // }}
        // Button={{ size: 'large' }}
        value={{
          Button: { size: 'large' },
        }}
        // locale="en-US"
        // locale="nb-NO"
      >
        <Button
          variant="primary"
          space={{ right: 1 }}
          right="1rem"
          icon={bell}
          on_click={() => {}}
          onKeyDown={() => {}}
        >
          Button
        </Button>
        <NumberFormat currency right>
          12345
        </NumberFormat>
      </Provider>
      <Input size="default">test</Input>

      <Tabs onKeyDown={() => {}}>test</Tabs>

      <Modal.Inner>test</Modal.Inner>

      <Tabs.Content hash={'2'} title={'123'} onClick={() => {}}>
        ...
      </Tabs.Content>
    </div>
  )
}

interface CommonInterface extends React.HTMLProps<HTMLElement> {
  children?: React.ReactNode
  className?: string
}

interface CustomProps extends CommonInterface {
  children?: React.ReactNode
}
const Custom = ({ children }: CustomProps) => {
  return <button onKeyDown={() => {}}>{children}</button>
}

export const TypesTesting = () => {
  return (
    <Custom
      key="unique"
      className="test"
      aria-label="test"
      disabled
      onKeyDown={() => {}}
    />
  )
}
