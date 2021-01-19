import React from 'react'
// import styled from '@emotion/styled'

// import { Button } from '../../src/components'
import Button from '../../src/components/button/Button'
import GlobalError from '../../src/components/global-error/GlobalError'
import Input from '../../src/components/input/Input'
import { H1, P } from '../../src/elements'
import { bell } from '../../src/icons'

export default {
  title: 'Eufemia/Helpers/Types'
}

export const TypesSandbox = () => {
  return (
    <div>
      <H1 size="small">Hello Eufemia</H1>
      <P>Start editing to see some magic happen!</P>
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
      <Input size="default">test</Input>
    </div>
  )
}

interface CustomProps extends React.DOMAttributes<React.SyntheticEvent> {
  children?: React.ReactNode
}
const Custom = ({ children }: CustomProps) => {
  return <button onKeyDown={() => {}}>{children}</button>
}

export const TypesTesting = () => {
  const myProps = GlobalError.defaultProps
  return <Custom onKeyDown={() => {}} {...myProps} />
}
