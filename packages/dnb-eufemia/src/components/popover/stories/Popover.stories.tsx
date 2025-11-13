import React from 'react'
import Popover from '../Popover'
import '../style/dnb-popover.scss'
import Button from '../../button/Button'
import { P } from '../../../elements'
import Flex from '../../Flex'

export default {
  title: 'Eufemia/Components/Popover',
}

export const Default = {
  render: () => (
    <Popover
      trigger={({ ref, ...triggerProps }) => (
        <Button text="Details" innerRef={ref} {...triggerProps} />
      )}
      title="Popover title"
    >
      Popover content
    </Popover>
  ),
}

export const WithoutCloseButton = {
  render: () => (
    <>
      <button>A</button>
      <Popover
        hideCloseButton
        trigger={({ ref, ...triggerProps }) => (
          <Button
            text="More info"
            variant="secondary"
            innerRef={ref}
            {...triggerProps}
          />
        )}
        title="Confirmation needed"
        content={({ close }) => (
          <Flex.Stack>
            <P>Popover without the default close button.</P>
            <Button text="Dismiss" onClick={close} />
          </Flex.Stack>
        )}
      />
      <button>B</button>
    </>
  ),
}
