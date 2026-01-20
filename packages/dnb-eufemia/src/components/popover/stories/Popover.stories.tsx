import React from 'react'
import Popover from '../Popover'
import '../style/dnb-popover.scss'
import Button from '../../button/Button'
import { P } from '../../../elements'
import Flex from '../../Flex'
import { Dialog } from '../../lib'

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

export const InDialog = {
  render: () => (
    <Dialog open>
      <div
        style={
          {
            // width: '60rem',
            // height: '20rem',
          }
        }
      >
        Excepteur in do officia cupidatat. Tempor excepteur nostrud veniam
        proident occaecat amet. Sit aliqua amet reprehenderit qui pariatur
        exercitation. Non incididunt pariatur est exercitation occaecat
        ullamco. Commodo incididunt nisi in eu occaecat nisi laborum amet
        est velit laboris. Anim id do velit irure exercitation minim
        officia sit ad tempor sint reprehenderit laborum aute. In nulla
        proident dolor in pariatur eu eu et mollit veniam. Nisi et eu duis
        consectetur occaecat esse dolore laboris quis proident sunt.
        Exercitation duis amet mollit nisi nulla nisi. Irure fugiat in
        ipsum esse duis voluptate adipisicing ad. Lorem dolor tempor sit et
        ut. Deserunt culpa enim in aliquip eu cupidatat duis excepteur
        adipisicing amet sit non laborum. Sunt esse et esse incididunt non
        id labore. Nulla amet labore sunt cillum aliqua quis. Qui dolore
        culpa nulla adipisicing veniam cupidatat cupidatat laboris proident
        <button>A</button>
        <Popover
          // openInitially
          trigger={({ ref, ...triggerProps }) => (
            <Button
              text="More info"
              variant="secondary"
              innerRef={ref}
              {...triggerProps}
            />
          )}
          title="Confirmation needed"
          content="Popover without the default close button."
        />
        <button>B</button> exercitation cupidatat in. Fugiat et quis amet
        eu quis tempor veniam et sunt aute tempor proident. Enim ea eu in
        enim reprehenderit eiusmod culpa commodo. Aliqua proident sint
        exercitation qui magna tempor in culpa velit duis deserunt sint. Ea
        dolor ullamco culpa commodo enim elit duis do adipisicing aliquip
        ex dolor. Aute incididunt dolor non amet eu non laboris labore
        commodo et excepteur nostrud. Qui veniam aliquip enim aute dolor.{' '}
        <Popover
          // openInitially
          trigger={({ ref, ...triggerProps }) => (
            <Button
              text="More info"
              variant="secondary"
              innerRef={ref}
              {...triggerProps}
            />
          )}
          title="Confirmation needed"
          content="Popover without the default close button."
        />{' '}
        Eu duis id fugiat officia culpa eiusmod ad anim. In nulla proident
        dolor in pariatur eu eu et mollit veniam. Nisi et eu duis
        consectetur occaecat esse dolore laboris quis proident sunt.
        Exercitation duis amet mollit nisi nulla nisi. Irure fugiat in
        ipsum esse duis voluptate adipisicing ad. Lorem dolor tempor sit et
        ut. Deserunt culpa enim in aliquip eu cupidatat duis excepteur
        adipisicing amet sit non laborum. Sunt esse et esse incididunt non
        id labore. Nulla amet labore sunt cillum aliqua quis. Qui dolore
        culpa nulla adipisicing veniam cupidatat cupidatat laboris proident
        exercitation cupidatat in. In nulla proident dolor in pariatur eu
        eu et mollit veniam. Nisi et eu duis consectetur occaecat esse
        dolore laboris quis proident sunt. Exercitation duis amet mollit
        nisi nulla nisi. Irure fugiat in ipsum esse duis voluptate
        adipisicing ad. Lorem dolor tempor sit et ut. Deserunt culpa enim
        in aliquip eu cupidatat duis excepteur adipisicing amet sit non
        laborum. Sunt esse et esse incididunt non id labore. Nulla amet
        labore sunt cillum aliqua quis. Qui dolore culpa nulla adipisicing
        veniam cupidatat cupidatat laboris proident exercitation cupidatat
        in. Nisi et eu duis consectetur occaecat esse dolore laboris quis
        proident sunt. Exercitation duis amet mollit nisi nulla nisi. Irure
        fugiat in ipsum esse duis voluptate adipisicing ad. Lorem dolor
        tempor sit et ut. Deserunt culpa enim in aliquip eu cupidatat duis
        excepteur adipisicing amet sit non laborum. Sunt esse et esse
        incididunt non id labore. Nulla amet labore sunt cillum aliqua
        quis. Qui dolore culpa nulla adipisicing veniam cupidatat cupidatat
        laboris proident exercitation cupidatat in.
      </div>
    </Dialog>
  ),
}
