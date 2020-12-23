import React from 'react'
// import styled from '@emotion/styled'

// import { Button } from '../../src/components'
import Button from '../../src/components/button/Button'
import Input from '../../src/components/input/Input'
import { H1, P } from '../../src/elements'
import { bell } from '../../src/icons'

export default {
  title: 'Eufemia/Helpers/Types'
}

export const TypesSandbox = () => {
  return (
    <div>
      {/* <H1 size="small">Hello Eufemia</H1>
      <P>Start editing to see some magic happen!</P> */}
      <Button
        variant="primary"
        space={{ right: 1 }}
        right="1rem"
        icon={bell}
      >
        Button
      </Button>
      <Input size="default">test</Input>
    </div>
  )
}
