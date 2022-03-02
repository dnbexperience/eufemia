/**
 * @dnb/eufemia Component Story
 *
 */

import React, { useEffect, useState } from 'react'
import { Box, Wrapper } from 'storybook-utils/helpers'

import {
  HelpButton,
  Switch,
  Button,
  Input,
  Dropdown,
  Section,
  DatePicker,
  FormSet,
  FormRow,
  ProgressIndicator,
  NumberFormat,
} from '../..'
import { ScrollView } from '../../../fragments'
import Dialog from '../Dialog'
import { H2, P, Hr } from '../../../elements'
import Provider from '../../../shared/Provider'
import {
  trash_medium as TrashIcon,
  log_out_medium as LogOutIcon,
  edit,
  cookie_medium,
} from '../../../icons'

export default {
  title: 'Eufemia/Components/Dialog',
}

export const DialogConfirmLoggedout = () => {
  const [active, setActive] = useState(false)
  useEffect(() => {
    setTimeout(() => setActive(true), 3000)
  }, [])
  return (
    <Dialog
      variant="confirmation"
      openState={active}
      icon={LogOutIcon}
      title="Du har blitt logget ut"
      description="For å fortsette må du logge inn igjen."
      confirmText="Logg inn"
    />
  )
}

export const DialogConfirm = () => (
  <Wrapper>
    <Box>
      <Dialog
        triggerAttributes={{
          text: 'Show cookie dialog',
        }}
        icon={cookie_medium}
        variant="confirmation"
        title="Informasjonskapsler (cookies)"
      >
        Vi bruker cookies for å gi deg den beste opplevelsen i nettbanken
        vår.
        <br />
        <a
          className="dnb-anchor"
          target="_blank"
          rel="noreferrer"
          href="https://www.dnb.no/cookies"
        >
          Les mer om cookies
        </a>
        <Dialog.Action>
          <Button
            variant="tertiary"
            text="Administrer"
            icon={edit}
            icon_position="left"
            on_click={({ close }) => {
              close()
            }}
          />
          <Button
            text="Jeg godtar"
            on_click={({ close }) => {
              close()
            }}
          />
        </Dialog.Action>
      </Dialog>
    </Box>
    <Box>
      <Provider Button={{ size: 'small' }}>
        <Dialog
          variant="confirmation"
          triggerAttributes={{
            text: 'Delete record',
            variant: 'primary',
          }}
          icon={TrashIcon}
          title="Are you sure you want to delete this?"
          description="This action cannot be undone"
          confirmText="Delete"
          declineText="Cancel"
          confirmType="warning"
        />
      </Provider>
    </Box>
    <Box>
      <Dialog
        triggerAttributes={{
          text: 'Default stuff',
        }}
        icon={TrashIcon}
        variant="confirmation"
        title="Default stuff"
        description="This action cannot be undone"
        confirmType="warning"
      />
    </Box>
    <Box>
      <Dialog
        triggerAttributes={{
          text: 'Trigger logged out',
        }}
        variant="confirmation"
        icon={LogOutIcon}
        title="Du har blitt logget ut"
        description="For å fortsette må du logge inn igjen."
        confirmText="Logg inn"
        hideDecline
      />
    </Box>
    <Box>
      <Dialog
        variant="confirmation"
        triggerAttributes={{
          text: 'Big content',
          variant: 'primary',
        }}
        icon={TrashIcon}
        confirmType="warning"
        title="This dialog has a lot of content to check out how it looks like when the title is above one line and check out the max width of the dialog"
        description="Just some more content inside the dialog content for the same purpose as for the title, the more content the better to visualize how it will look with a lot of content but it should not contain this amount of content anyways but you never know, right?"
        confirmText="Got it!"
        declineText="Didn't get it"
      />
    </Box>
    <Box>
      <Dialog
        variant="confirmation"
        triggerAttributes={{
          text: 'No spacing :(',
          variant: 'tertiary',
          icon: LogOutIcon,
        }}
        icon={LogOutIcon}
        title="This dialog has no spacing"
        description="Just some more content inside the dialog content"
        confirmText="Give me space!"
        declineText="I like it"
        spacing={false}
      />
    </Box>
  </Wrapper>
)

export const DialogSandbox = () => (
  <Wrapper>
    {/* <Global
      styles={css`
        :root {
          --modal-height-offset: 7rem;
        }
 `}
    /> */}

    <Box>
      <Dialog title="Title">
        Posuere hac velit suscipit tempor a fames penatibus curae eget
        placerat iaculis augue tincidunt ligula etiam diam tempus pretium
        fusce primis himenaeos sem quisque facilisi mollis non congue
        rhoncus elit erat ornare litora netus orci mauris morbi mi
        dignissim quam platea id massa conubia amet eros sagittis at nisl
        varius cubilia faucibus euismod molestie torquent lacus tortor
        dictum lectus habitasse ante ultricies eleifend sed vehicula aenean
        fringilla commodo cum nostra in urna nam aptent vel pharetra
        convallis ad neque duis pulvinar vitae phasellus sociosqu ac dui
        egestas ultrices turpis hendrerit senectus sollicitudin consectetur
        odio interdum cras blandit nec est arcu
      </Dialog>
    </Box>

    <Box>
      <ModalWithScrollableBox />
    </Box>

    <Box>
      <Dialog
        title="1s close delay"
        triggerAttributes={{ text: 'Click me' }}
        focusSelector=".dnb-input__input:first-of-type"
        preventClose="true"
        hideCloseButton="true"
        onOpen={(e) => console.log('on_open', e)}
        onClose={(e) => console.log('on_close', e)}
        onClosePrevent={({ close, triggeredBy }) => {
          switch (triggeredBy) {
            case 'keyboard':
            case 'button':
              close()
              break
            case 'overlay': {
              const timeout = setTimeout(close, 1e3)
              return () => clearTimeout(timeout) // clear timeout on unmount
            }
          }
        }}
      >
        <P>This is a Modal Window with no close button.</P>
        <P>Click outside me, and I will be closed within 1 second.</P>
        <Section top spacing style_type="divider">
          <Input label="Focus:">Focus me with Tab key</Input>
        </Section>
      </Dialog>
    </Box>

    <Box>
      <Dialog
        // triggerAttributes={{
        //   'aria-label': 'My Label'
        // }}
        spacing={false}
        fullscreen={false}
        alignContent="centered"
        hideCloseButton
        triggerAttributes={{ text: 'Show' }}
        // prevent_close
        maxWidth="12rem"
      >
        <ProgressIndicator
          show_label
          label_direction="vertical"
          top="large"
          bottom="large"
          size="large"
        />
      </Dialog>
      <Dialog
        // trigger_attributes={{
        //   'aria-label': 'My Label'
        // }}
        spacing={false}
        fullscreen={false}
        alignContent="centered"
        hideCloseButton
        triggerAttributes={{ icon: 'bell' }}
        // prevent_close
        maxWidth="12rem"
      >
        <ProgressIndicator
          show_label
          label_direction="vertical"
          top="large"
          bottom="large"
          size="large"
        />
      </Dialog>
    </Box>

    <Box>
      <Dialog
        title="Dialog Title"
        // fullscreen
        // openState="opened"
        // noAnimation
      >
        <Dialog.Body spacing styleType="mint-green">
          <P>This is the modal text.</P>
        </Dialog.Body>
      </Dialog>
    </Box>

    <Box>
      <Input
        label="Input"
        placeholder="Placeholder ..."
        suffix={<HelpButton>Help text</HelpButton>}
      />
    </Box>

    <Box>
      <Dialog
        title="Title 1"
        triggerAttributes={{ text: 'Modal in modal' }}
        // open_state="opened"
        style={{
          minHeight: '25rem',
        }}
      >
        <Dialog
          title="Title 2 a"
          style={{
            minHeight: '15rem',
          }}
        >
          New content 2 a{' '}
          <Dialog title="Title 3 a">New content 3 a</Dialog>
        </Dialog>
        <Dialog
          title="Title 2 b"
          style={{
            minHeight: '15rem',
          }}
        >
          New content 2 b{' '}
          <Dialog title="Title 3 b">New content 3 b</Dialog>
        </Dialog>
        {/* <FillContent /> */}
      </Dialog>
    </Box>
    <Box>
      <Dialog
        fullscreen
        title="Modal Title"
        triggerAttributes={{
          variant: 'tertiary',
          text: 'Click me',
        }}
      >
        <FillContent />
      </Dialog>
    </Box>
    <Box>
      <Dialog
        maxWidth="40rem"
        triggerAttributes={{
          text: 'Open Modal',
        }}
        title="Modal Title"
        onClose={(e) => {
          console.log('on_close', e)
        }}
      >
        <Dialog.Body spacing>
          <Hr />
          <H2 top>Some content</H2>
          <Input>Focus me with Tab key</Input>
          <Section top spacing>
            <P>
              <Switch label="Checked:" checked />
            </P>
          </Section>
        </Dialog.Body>
      </Dialog>
    </Box>
    <Box>
      <ModalRerenderExample />
    </Box>
    <Box>
      <ModalCloseExample />
    </Box>
    <Box>
      <ModalTriggerExample />
    </Box>
    <Box>
      <CloseWithAnimation />
    </Box>
  </Wrapper>
)

class ModalRerenderExample extends React.PureComponent {
  state = {
    title: 'Modal Title',
    trigger_text: 'Open Modal',
  }
  timeout: NodeJS.Timeout

  componentDidMount() {
    this.timeout = setTimeout(() => {
      this.setState({ title: 'New Title' })
      this.setState({ trigger_text: 'New Open Modal' })
    }, 1e3)
  }

  componentWillUnmount() {
    clearTimeout(this.timeout)
  }

  render() {
    return (
      <Dialog
        triggerAttributes={{
          text: this.state.trigger_text,
        }}
        title={this.state.title}
      >
        <Dialog.Body spacing>
          <DatePicker label="DatePicker" right />
          <Dropdown
            label="Dropdown"
            data={dropdownData}
            right
            direction="top"
          />
          {/* <Switch label="Checked:" checked right /> */}
        </Dialog.Body>
      </Dialog>
    )
  }
}

const dropdownData = [
  {
    selected_value: 'Brukskonto - Kari Nordmann',
    content: <>Brukskonto - Kari Nordmann</>,
  },
  {
    content: [
      <NumberFormat key={15349648901} ban>
        44445678902
      </NumberFormat>,
      'Sparekonto - Ole Nordmann A',
    ],
  },
  {
    content: [
      <NumberFormat key={15349648901} ban>
        12345623902
      </NumberFormat>,
      'Sparekonto - Ole Nordmann B',
    ],
  },
  {
    content: [
      <NumberFormat key={15349648901} ban>
        55555672302
      </NumberFormat>,
      'Sparekonto - Ole Nordmann C',
    ],
  },
  {
    content: [
      <NumberFormat key={15349648901} ban>
        77775672302
      </NumberFormat>,
      'Sparekonto - Ole Nordmann D',
    ],
  },
  {
    content: [
      <NumberFormat key={15349648901} ban>
        99995672302
      </NumberFormat>,
      'Sparekonto - Ole Nordmann E',
    ],
  },
  {
    selected_value:
      'Feriekonto - Kari Nordmann med et kjempelangt etternavnsen',
    content: [
      <NumberFormat key={15349648901} ban>
        11345678962
      </NumberFormat>,
      'Feriekonto - Kari Nordmann med et kjempelangt etternavnsen',
    ],
  },
  {
    selected_value: <>Custom selected {'🔥'}</>,
    content: [
      <NumberFormat key={15349648901} ban>
        15349648901
      </NumberFormat>,
      <>Custom content {'🔥'}</>,
    ],
  },
]

const ModalCloseExample = () => {
  const [open_state, setOpenState] = React.useState(null)
  const [count, setCount] = React.useState(0)

  React.useEffect(() => {
    let timeout

    if (open_state === 'opened') {
      timeout = setTimeout(() => {
        console.log('count:', count)
        setCount(count + 1)
      }, 1e3)
    }

    return () => clearTimeout(timeout)
  })

  return (
    <>
      <Button
        text="Set opened state"
        on_click={() => setOpenState('opened')}
      />
      <Dialog
        triggerAttributes={{
          text: 'Open Modal and auto close',
        }}
        title="Modal Title"
        openState={open_state}
        openModal={(open) => {
          const timeout = setTimeout(open, 3e3)
          return () => clearTimeout(timeout)
        }}
        // hide_close_button
        closeModal={(close) => {
          let timeout

          if (open_state !== 'opened') {
            console.log('Modal was opened')
            timeout = setTimeout(close, 3e3)
          }

          return () => clearTimeout(timeout)
        }}
        onOpen={(e) => {
          console.log('on_open', e)
        }}
        onClose={(e) => {
          console.log('on_close', e)
          // clearTimeout(timeoutId)
          setOpenState('closed')
        }}
      >
        <Hr />
        <Section spacing>
          <H2>Some content {count}</H2>
          <Input>Focus me with Tab key</Input>
        </Section>
        <Section spacing>
          <P>
            <Switch label="Checked:" checked />
          </P>
        </Section>
      </Dialog>
    </>
  )
}

const ModalTriggerExample = () => {
  const [count, setCount] = React.useState(0)

  return (
    <FormSet>
      <FormRow>
        <Button
          variant="secondary"
          text="Count"
          on_click={() => setCount(count + 1)}
        />

        <Button
          id="custom-triggerer"
          text="Custom trigger Button"
          on_click={(e) => {
            // console.log('on_click', e)
            return (
              <Dialog
                title="Modal Title"
                triggerAttributes={{
                  hidden: true,
                }}
                openState="opened"
                labelledBy="custom-triggerer"
              >
                <Section spacing style_type="divider">
                  <P>This Modal was opened by a custom trigger button.</P>
                </Section>
              </Dialog>
            )
          }}
        />
        {count}
      </FormRow>
    </FormSet>
  )
}

function FillContent() {
  return (
    <>
      This is the modal text. Triggered by a tertiary button. Hac eleifend
      consectetur massa lobortis diam netus congue a nibh dolor faucibus
      vivamus taciti neque accumsan urna varius dis egestas
      <Dropdown
        label="Dropdown"
        data={dropdownData}
        right
        skip_portal
        // direction="top"
      />
      montes tempus tortor mi aptent enim cursus venenatis cras ornare nisl
      pretium tincidunt et imperdiet sapien luctus vel volutpat risus dui
      himenaeos nec est turpis ridiculus posuere sollicitudin nostra
      habitant torquent class laoreet rhoncus hendrerit primis curae
      malesuada dictumst cum penatibus libero viverra lorem aenean integer
      amet interdum tristique auctor vulputate quam scelerisque lacus erat
      adipiscing mus felis lacinia elementum per sed habitasse inceptos
      conubia eget mattis ultricies sodales fringilla fermentum eu sociis
      sem litora proin vestibulum ante potenti molestie phasellus praesent
      justo elit cubilia vitae rutrum suspendisse nam aliquam ipsum
      facilisi id orci nascetur eros at porttitor leo porta sagittis
      ullamcorper iaculis dapibus duis natoque pharetra tellus pellentesque
      pulvinar magnis gravida fames convallis aliquet consequat quis tempor
      dignissim suscipit commodo ut metus nunc vehicula platea mollis
      parturient blandit semper euismod non ac facilisis augue ligula magna
      placerat morbi sociosqu nullam quisque maecenas senectus ad fusce
      curabitur nulla nisi velit etiam arcu feugiat lectus ultrices dictum
      donec bibendum mauris in sit purus odio condimentum donec gravida
      sollicitudin pretium vel porttitor ut purus praesent posuere dis
      luctus tempus eget parturient mi primis massa lectus iaculis faucibus
      dictum placerat cum nisi neque ipsum risus duis adipiscing amet
      viverra blandit litora sed nulla proin ridiculus mattis dictumst
      auctor vestibulum convallis molestie tortor conubia quam semper
      ultrices commodo justo enim cursus magna aliquam erat fermentum
      inceptos felis torquent fringilla pellentesque rutrum dignissim nisl
      sociosqu varius vulputate vivamus consectetur penatibus venenatis
      potenti mauris ante ultricies hendrerit curae nunc odio aenean
      accumsan nam id natoque tincidunt aliquet malesuada tellus integer
      augue nostra turpis senectus bibendum cras magnis rhoncus aptent
      sociis class suspendisse metus eu et nec phasellus lacus condimentum
      mus fames himenaeos orci feugiat tristique nascetur arcu porta etiam
      taciti scelerisque volutpat dui imperdiet diam lorem at est quis
      habitasse vehicula ullamcorper sit sapien pharetra platea habitant
      ornare dolor quisque urna elementum ac eros curabitur nullam interdum
      velit sem lobortis hac egestas leo ad netus in per montes lacinia
      ligula maecenas elit vitae cubilia sodales laoreet facilisi dapibus
      pulvinar mollis libero morbi nibh suscipit congue euismod tempor
      consequat facilisis eleifend a fusce sagittis non aptent hendrerit
      quisque tellus consectetur fringilla curae praesent nullam vulputate
      nostra leo cum consequat sit ridiculus ad inceptos cras facilisis
      pretium natoque libero nulla interdum pellentesque viverra turpis
      <Dropdown
        label="Dropdown"
        data={dropdownData}
        right
        // direction="top"
      />
      vestibulum maecenas molestie dolor morbi vehicula ultrices diam quis
      velit etiam dictum feugiat sed lacinia placerat euismod magna sapien
      luctus eget tempus rutrum faucibus et suspendisse aliquam felis
      elementum netus condimentum proin habitant habitasse aenean augue per
      potenti aliquet lobortis quam commodo magnis dictumst dapibus gravida
      pharetra dis facilisi ut suscipit nam nibh odio metus varius volutpat
      fermentum massa posuere fames ipsum penatibus porta purus torquent
      nascetur mollis in cursus venenatis sociis primis arcu blandit vitae
      elit dui tincidunt urna class ante mauris integer erat phasellus nunc
      non egestas tristique vel platea risus ac eu vivamus id congue hac
      rhoncus sodales amet auctor justo neque enim laoreet malesuada lacus
      montes nec nisl ullamcorper a mi orci scelerisque sociosqu bibendum
      tempor eros iaculis nisi senectus lorem est pulvinar sagittis
      dignissim conubia donec litora curabitur ornare mattis duis ultricies
      mus cubilia sollicitudin at ligula sem imperdiet adipiscing porttitor
      convallis eleifend taciti fusce accumsan himenaeos lectus semper
      parturient tortor facilisis montes diam placerat at est hendrerit
      nunc platea mollis viverra fames luctus nam venenatis cubilia orci
      maecenas faucibus nibh pulvinar bibendum tortor nulla mauris cum
      laoreet feugiat iaculis class leo ipsum egestas nullam ridiculus
      vulputate duis sapien pretium vitae non tincidunt vel adipiscing
      blandit ligula sociosqu malesuada accumsan etiam rhoncus taciti neque
      nec mi praesent fusce pharetra cras molestie varius senectus sociis
      augue eget ante elit a sit massa tempus lorem convallis consectetur
      felis sed lacus hac tempor dignissim ultricies posuere quis
      scelerisque torquent magna amet aliquet facilisi euismod eros lacinia
      pellentesque fringilla nisi aenean ornare suspendisse parturient
      imperdiet vehicula quisque suscipit vestibulum ad metus nisl ultrices
      inceptos conubia lobortis potenti lectus phasellus habitasse
      sollicitudin habitant tristique dui ac proin odio per consequat purus
      auctor tellus erat libero in urna condimentum sem donec litora semper
      congue penatibus gravida eleifend porta porttitor dictum elementum
      nostra aliquam justo quam fermentum id primis enim dis volutpat dolor
      himenaeos dictumst sodales curae ut magnis sagittis curabitur netus
      vivamus rutrum morbi mus velit eu commodo aptent interdum et natoque
      dapibus cursus arcu mattis turpis ullamcorper risus integer nascetur
      leo rutrum iaculis neque consectetur vitae auctor sociosqu tempus
      conubia commodo semper fusce at metus morbi dolor ultrices eu rhoncus
      ridiculus facilisi platea dictumst elementum class facilisis
      consequat purus suscipit quisque cum per orci mi tincidunt mus
      himenaeos aliquet posuere eros placerat et integer venenatis lacinia
      scelerisque a aptent varius phasellus nam dapibus justo litora non
      massa laoreet fringilla porttitor condimentum enim penatibus cras
      mauris convallis donec quis ad montes pharetra nisi ac sodales
      natoque habitant hendrerit sem feugiat sapien parturient nullam
      accumsan imperdiet amet molestie egestas ultricies tortor curae dis
      vehicula nec cubilia hac porta ante velit sollicitudin pellentesque
      vivamus cursus vestibulum felis tempor diam nibh tellus torquent
      fames urna interdum vel curabitur etiam lobortis aliquam in eleifend
      libero eget congue ornare fermentum aenean arcu nostra duis inceptos
      pretium turpis ut netus bibendum dui ligula id taciti proin quam
      viverra gravida erat senectus nisl dignissim vulputate est sed ipsum
      sagittis suspendisse primis risus nunc mattis tristique dictum lorem
      magnis maecenas habitasse malesuada ullamcorper nulla sit adipiscing
      lacus luctus odio augue faucibus praesent sociis nascetur magna
      blandit euismod mollis volutpat lectus pulvinar elit potenti dapibus
      consequat fermentum consectetur viverra lacus etiam ut mollis purus
      auctor sodales vitae urna enim sollicitudin ad lorem habitant
      pulvinar magnis justo facilisis vulputate semper nam duis conubia
      nunc ridiculus nibh felis porta malesuada non quisque mattis ultrices
      integer blandit molestie elit eget elementum cum sociosqu eros
      suspendisse est mauris massa sed metus lectus rhoncus amet platea
      dolor fusce nostra orci turpis velit fames a porttitor quis mi rutrum
      inceptos volutpat phasellus ornare nisi tortor lobortis ligula
      ultricies ante proin
      <Dropdown
        label="Dropdown"
        data={dropdownData}
        right
        // direction="top"
      />
    </>
  )
}

function ModalWithScrollableBox() {
  return (
    <>
      {/* <ScrollView /> */}
      <Dialog
      // fullscreen={true}
      // open_state="opened"
      >
        <SimScrollView />
      </Dialog>
    </>
  )
}

function SimScrollView() {
  return (
    <div
      style={{
        width: '100%',
        // height: '100vh',
        height: '20rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'yellow',
      }}
    >
      <ScrollView
        style={{
          width: '50%',
          height: '50%',
          // overflowY: 'auto',
          maxHeight: '12rem',
        }}
      >
        <div
          style={{
            height: '62rem',
            width: '40rem',
            background: 'linear-gradient(#e66465, #9198e5)',
          }}
        />
      </ScrollView>
    </div>
  )
}

function CloseWithAnimation() {
  const [modalOpen, setModalOpen] = React.useState(false)
  return (
    <Dialog
      triggerAttributes={{
        text: 'CloseWithAnimation',
      }}
      hideCloseButton
      openState={modalOpen}
      onOpen={() => setModalOpen(true)}
      onClose={() => setModalOpen(false)}
    >
      <Button
        text="Close from inside modal"
        on_click={() => setModalOpen(false)}
      />
    </Dialog>
  )
}
