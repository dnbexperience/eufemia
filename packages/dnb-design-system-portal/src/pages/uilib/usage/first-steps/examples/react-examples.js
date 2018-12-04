import React from 'react'
import { Button, Icon } from 'dnb-ui-lib/src'
import { hamburger_medium as hamburgerIcon } from 'dnb-ui-lib/src/icons/secondary_icons_medium'

const onClickHandler = event => {
  console.log('onClickHandler', event)
}

// only to satisfy the build process
export default () => <></>

export const ButtonEventExample = () => {
  return (
    <Button on_click={onClickHandler}>
      <Icon icon={hamburgerIcon} />
    </Button>
  )
}
