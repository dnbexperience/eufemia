/**
 * dnb-ui-lib Component Story
 *
 */

import React from 'react'
import { Wrapper, Box } from '../helpers'
import { Global, css } from '@emotion/core'

import {
  Modal,
  Switch,
  Button,
  Input,
  Dropdown,
  Section,
  DatePicker,
  FormSet,
  FormRow,
  Number
} from '../../src/components'
// import { format } from '../../src/components/Number'
import { H2, P, Hr } from '../../src/elements'

export default {
  title: 'Eufemia/Components/Modal'
}

export const ModalSandbox = () => (
  <Wrapper>
    <Global
      styles={css`
        :root {
          --modal-height-offset: 3rem;
        }
      `}
    />

    {/* <Box>
        <h1 tabIndex="0" aria-hidden="true">
          h1
        </h1>
        <h2 tabIndex="-1" aria-hidden="false">
          h2
        </h2>
        <h3>h3</h3>
      </Box> */}

    <Box>
      <Input
        label="Input"
        placeholder="Placeholder ..."
        suffix={<Modal>Help text</Modal>}
      />
    </Box>

    <Box>
      <Button variant="tertiary" text="Button" />
      <Modal
        // no_animation
        // open_state="opened"
        // mode="drawer"
        // fullscreen
        container_placement="left"
        align_content="right"
        // align_content="center"
        // drawer_offset={}
        // title="Tertiary test"
        title={<span className="dnb-sr-only">Test</span>}
        // min_width="20vw"
        // max_width="40vw"
        overlay_class="overlay_class"
        content_class="content_class"
        class="inner_class"
      >
        <Button variant="tertiary" text="Button" />
        <Section>
          <Button variant="tertiary" text="Button" />
        </Section>
        <FillContent />
      </Modal>
    </Box>
    <Box>
      <Modal
        // min_width="90vw"
        // max_width="2rem"
        // open_state="opened"
        fullscreen
        title="Modal Title"
        trigger_variant="tertiary"
        trigger_icon={null}
        trigger_text="Click me"
      >
        <FillContent />
      </Modal>
    </Box>
    <Box>
      <Modal
        min_width="60vw"
        trigger_text="Open Modal"
        title="Modal Title"
        on_close={(e) => {
          console.log('on_close', e)
        }}
      >
        <Hr />
        <Box>
          <H2>Some content</H2>
          <Input>Focus me with Tab key</Input>
        </Box>
        <Box>
          <P>
            <Switch label="Checked:" checked />
          </P>
        </Box>
      </Modal>
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
  </Wrapper>
)

export const DrawerSandbox = () => (
  <Wrapper>
    <Global
      styles={css`
        :root {
          --modal-height-offset: 3rem;
        }
      `}
    />

    <Box>
      <Button variant="tertiary" text="Button" />
      <Modal
        // no_animation
        // open_state="opened"
        mode="drawer"
        // fullscreen
        container_placement="left"
        align_content="right"
        // align_content="center"
        // drawer_offset={}
        // title="Tertiary test"
        title={<span className="dnb-sr-only">Test</span>}
        // min_width="20vw"
        // max_width="40vw"
        overlay_class="overlay_class"
        content_class="content_class"
        class="inner_class"
      >
        <Button variant="tertiary" text="Button" />
        <Section>
          <Button variant="tertiary" text="Button" />
        </Section>
        <FillContent />
      </Modal>
    </Box>
  </Wrapper>
)

class ModalRerenderExample extends React.PureComponent {
  state = {
    title: 'Modal Title',
    trigger_text: 'Open Modal'
  }

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
      <Modal
        // open_state="opened"
        trigger_text={this.state.trigger_text}
        title={this.state.title}
        // trigger_disabled
        // trigger_hidden
      >
        {/* <Hr /> */}
        {/* <Box>
          <H2>Some content</H2>
          <Input>Focus me with Tab key</Input>
        </Box> */}
        <DatePicker label="DatePicker" right />
        <Dropdown
          label="Dropdown"
          data={dropdownData}
          right
          direction="top"
        />
        {/* <Switch label="Checked:" checked right /> */}
      </Modal>
    )
  }
}

let dropdownData = [
  {
    selected_value: 'Brukskonto - Kari Nordmann',
    content: <>Brukskonto - Kari Nordmann</>
  },
  {
    content: [
      <Number key={15349648901} ban>
        44445678902
      </Number>,
      'Sparekonto - Ole Nordmann A'
    ]
  },
  {
    content: [
      <Number key={15349648901} ban>
        12345623902
      </Number>,
      'Sparekonto - Ole Nordmann B'
    ]
  },
  {
    content: [
      <Number key={15349648901} ban>
        55555672302
      </Number>,
      'Sparekonto - Ole Nordmann C'
    ]
  },
  {
    content: [
      <Number key={15349648901} ban>
        77775672302
      </Number>,
      'Sparekonto - Ole Nordmann D'
    ]
  },
  {
    content: [
      <Number key={15349648901} ban>
        99995672302
      </Number>,
      'Sparekonto - Ole Nordmann E'
    ]
  },
  {
    selected_value:
      'Feriekonto - Kari Nordmann med et kjempelangt etternavnsen',
    content: [
      <Number key={15349648901} ban>
        11345678962
      </Number>,
      'Feriekonto - Kari Nordmann med et kjempelangt etternavnsen'
    ]
  },
  {
    selected_value: <>Custom selected {'🔥'}</>,
    content: [
      <Number key={15349648901} ban>
        15349648901
      </Number>,
      <>Custom content {'🔥'}</>
    ]
  }
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
      <Modal
        // trigger_hidden
        trigger_text="Open Modal and auto close"
        title="Modal Title"
        open_state={open_state}
        // open_modal={(open) => {
        //   const timeout = setTimeout(open, 3e3)
        //   return () => clearTimeout(timeout)
        // }}
        // hide_close_button
        close_modal={(close) => {
          let timeout

          if (open_state !== 'opened') {
            console.log('Modal was opened')
            timeout = setTimeout(close, 1e3)
          }

          return () => clearTimeout(timeout)
        }}
        on_open={(e) => {
          console.log('on_open', e)
        }}
        on_close={(e) => {
          console.log('on_close', e)
          // clearTimeout(timeoutId)
          setOpenState('closed')
        }}
      >
        <Hr />
        <Box>
          <H2>Some content {count}</H2>
          <Input>Focus me with Tab key</Input>
        </Box>
        <Box>
          <P>
            <Switch label="Checked:" checked />
          </P>
        </Box>
      </Modal>
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
            console.log('on_click', e)
            return (
              <Modal
                title="Modal Title"
                trigger_hidden="true"
                open_state="opened"
                labelled_by="custom-triggerer"
              >
                <Section spacing style_type="divider">
                  <P>This Modal was opened by a custom trigger button.</P>
                </Section>
              </Modal>
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
