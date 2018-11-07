/**
 * Storybook Story
 *
 */

import React from 'react'
import styled from 'react-emotion'

// UI Style
import '../src/style'

// UI Components
import { Button, IconWithAllIcons as Icon } from '../src/components'

// import Body from '../src/components/body/Body'
// import ActionNavExample from '../src/patterns/action-nav/Example'
// import NotificationExamples from '../src/components/notification/Example'
// import BreadcrumbsExample from '../src/components/breadcrumbs/Example'
// import MainNavExample from '../src/components/main-nav/Example'
// import ModalExamples from '../src/components/modal/Example'
// import DescriptionListExamples from '../src/components/description-list/Example'
// import GridExamples from '../src/components/grid/Example'
// import BodyExample from '../src/components/body/Example'
// import ButtonExample from '../src/components/button/Example'
// import IconExample from '../src/components/icon/Example'
// import SwitchExample from '../src/components/switch/Example'
// import InputExample from '../src/components/input/Example'
// import InputMaskedExamples from '../src/components/input-masked/Example'
// import Slider from '../src/components/slider/Example'
// import DropdownExample from '../src/components/dropdown/Example'

export const components = []

// components.push(['ActionNav', () => <ActionNavExample />])
// components.push(['Notification', () => <NotificationExamples />])
// components.push([
//   'MainNav',
//   () => (
//     <>
//       <MainNavExample />
//     </>
//   )
// ])
// components.push(['Breadcrumbs', () => <BreadcrumbsExample />])
// components.push(['DescriptionList', () => <DescriptionListExamples />])
// components.push(['Modal', () => <ModalExamples />])
// components.push(['Grid', () => <GridExamples />])
// components.push(['Button', () => <ButtonExample />])
components.push(['Button with Text only', () => <Button>My Text</Button>])
components.push([
  'Button with Icon only',
  () => (
    <Button>
      <Icon icon="add" />
    </Button>
  )
])
components.push(['Icon', () => <Icon icon="add" />])

const Wrapper = styled.div`
  a {
    position: relative;
    top: 1px;
  }
`
components.push([
  'Button',
  () => (
    <Wrapper className="dnb-style">
      <Button
        text="My Text"
        variant="tertiary"
        icon_position="left"
        icon="add"
      />{' '}
      <a href="http://dnb.no">My Text</a>
      {/* <p>
        <Icon icon="add" className="dnb-icon-inline" />
        <a href="www.tujo.no">My Anker</a>
      </p>
      <h1>
        <Icon icon="add" className="dnb-icon-inline" /> Text
      </h1> */}
    </Wrapper>
  )
])
// components.push(['Icon', () => <IconExample />])
// components.push(['Input', () => <InputExample />])
// components.push(['InputMasked', () => <InputMaskedExamples />])
// components.push(['Slider', () => <Slider />])
// components.push(['Switch', () => <SwitchExample />])
// components.push(['FormLabel', () => <SwitchExample />])
// components.push(['Dropdown', () => <DropdownExample />])

components.sort(([a], [b]) => (a > b ? 1 : -1))

// dnb.enableWebComponents()
// class SwitchWrapper extends Component {
//   state = {
//     checked: false
//   }
//   constructor(props) {
//     super(props)
//     this._ref = React.createRef()
//   }
//   componentDidMount() {
//     this.timeout = setTimeout(() => {
//       this.setState({
//         checked: true
//       })
//     }, 1e3)
//     this._ref.current.addEventListener('on_change', e => {
//       console.log('on_change', e.detail.checked)
//     })
//     this._ref.current.addEventListener('on_state_update', e => {
//       console.log('on_state_update', e.detail.checked)
//     })
//   }
//   componentWillUnmount() {
//     clearTimeout(this.timeout)
//   }
//   render() {
//     return (
//       <Fragment>
//         <dnb-form-label for_id="switch-1">Radio Switch</dnb-form-label>
//         <Switch
//           id="switch-1"
//           title="Some title"
//           on_change={event => {
//             console.log('on_change', event.checked)
//           }}
//         />
//         <dnb-switch
//           ref={this._ref}
//           title="Some title"
//           checked={this.state.checked}
//         />
//       </Fragment>
//     )
//   }
// }
//
// class InputWrapper extends Component {
//   state = {
//     value: 'X',
//     placeholder: 'Write someting',
//     disabled: false
//   }
//   constructor(props) {
//     super(props)
//     this._ref = React.createRef()
//   }
//   componentDidMount() {
//     this.timeout = setTimeout(() => {
//       this.setState({
//         placeholder: 'Write someting New',
//         value: 'Y',
//         disabled: true
//       })
//     }, 1e3)
//     this._ref.current.addEventListener('on_change', e => {
//       console.log('on_change', e.detail.value)
//     })
//     this._ref.current.addEventListener('on_focus', e => {
//       console.log('on_focusr', e.detail.value)
//     })
//     this._ref.current.addEventListener('on_blur', e => {
//       console.log('on_blur', e.value)
//     })
//     this._ref.current.addEventListener('on_submit', e => {
//       console.log('on_submit', e.value)
//     })
//   }
//   changeHandler = event => {
//     console.log('on_change', event)
//   }
//   componentWillUnmount() {
//     clearTimeout(this.timeout)
//   }
//   render() {
//     return (
//       <Fragment>
//         <Input
//           placeholder="Write someting"
//           on_change={event => {
//             console.log('on_change', event.value)
//           }}
//           disabled={this.state.disabled}
//         />
//         <dnb-input
//           ref={this._ref}
//           type="search"
//           value={this.state.value}
//           placeholder={this.state.placeholder}
//         />
//       </Fragment>
//     )
//   }
// }
//
// class DropdownWrapper extends Component {
//   state = {
//     selected_item: 1
//   }
//   constructor(props) {
//     super(props)
//     this._ref = React.createRef()
//   }
//   componentDidMount() {
//     this.timeout = setTimeout(() => {
//       this.setState({
//         selected_item: 3
//       })
//     }, 1e3)
//     this._ref.current.addEventListener('on_select', e => {
//       console.log('on_select', e.detail.data)
//     })
//     this._ref.current.addEventListener('on_change', e => {
//       console.log('on_change', e.detail.data)
//     })
//     this._ref.current.addEventListener('on_show', e => {
//       console.log('on_show', e.detail.data)
//     })
//     this._ref.current.addEventListener('on_state_update', e => {
//       console.log('on_state_update', e.detail.data)
//     })
//   }
//   changeHandler = event => {
//     console.log('on_change', event.data)
//   }
//   componentWillUnmount() {
//     clearTimeout(this.timeout)
//   }
//   render() {
//     return (
//       <Fragment>
//         <Dropdown
//           input_id="dropdown-1"
//           data={data}
//           selected_item={2}
//           on_change={this.changeHandler}
//           // disabled
//         />
//         <dnb-dropdown
//           ref={this._ref}
//           input_id="dropdown-2"
//           icon_position="left"
//           data={data}
//           selected_item={this.state.selected_item}
//         />
//       </Fragment>
//     )
//   }
// }
//
// const data = JSON.stringify([
//   {
//     selected_value: 'Brukskonto - Kari Nordmann',
//     outside_value: '1234.56.78901',
//     content: ['1234.56.78901', 'Brukskonto - Kari Nordmann']
//   },
//   {
//     selected_value: 'Sparekonto - Ole Nordmann',
//     outside_value: '1234.56.78902',
//     content: ['1234.56.78902', 'Sparekonto - Ole Nordmann']
//   },
//   {
//     selected_value:
//       'Feriekonto - Kari Nordmann med et kjempelangt etternavnsen',
//     outside_value: '1134.56.78962',
//     content: [
//       '1134.56.78962',
//       'Feriekonto - Kari Nordmann med et kjempelangt etternavnsen'
//     ]
//   },
//   {
//     selected_value: 'Oppussing - Ole Nordmann',
//     outside_value: '1534.96.48901',
//     content: ['1534.96.48901', 'Oppussing - Ole Nordmann']
//   }
// ])
//
// components.push(['Button', () => <ButtonExample />])
// components.push([
//   'Icon',
//   () => (
//     <Fragment>
//       <Icon icon="question" size="200" />
//       {/* <IconButton
//         icon="question"
//         // variant="secondary"
//         on_click={event => {
//           console.log('onClick', event)
//         }}
//       /> */}
//     </Fragment>
//   )
// ])
// components.push(['Input', () => <InputWrapper />])
// components.push(['Switch', () => <SwitchWrapper />])
// components.push([
//   'FormLabel',
//   () => (
//     <Fragment>
//       <FormLabel for_id="input-1" text="Some text" />
//       <br />
//       <Input
//         placeholder="Write someting"
//         id="input-1"
//         onFocus={event => {
//           console.log('onFocus', event)
//         }}
//       />
//     </Fragment>
//   )
// ])
// components.push(['Dropdown', () => <DropdownWrapper />])
