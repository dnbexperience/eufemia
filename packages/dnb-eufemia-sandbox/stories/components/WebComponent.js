/**
 * @dnb/eufemia Component Story
 *
 */

import React from 'react'
import { Wrapper, Box } from '../helpers'
import '@dnb/eufemia/src/components/date-picker/web-component'
import '@dnb/eufemia/src/components/section/web-component'
import Button from '@dnb/eufemia/src/components/button/web-component'

class Scope {
  render(props) {
    return <>{props.children} + this 1</>
  }
  render2(props) {
    return <>{props.children} + this 2</>
  }
  render3(props) {
    return <>{props.children} + this 3</>
  }
}
window.Scope = new Scope()

export default {
  title: 'Eufemia/Components/WebComponent'
}

export const WebComponent = () => (
  <Wrapper>
    <Box>
      <dnb-section
        spacing
        camelCase="123"
        render_content="Scope.render"
        render_this="Scope.render2"
        render_x="Scope.render3"
      >
        content
      </dnb-section>
      <Buttons />
      <DatePicker />
    </Box>
  </Wrapper>
)

const DatePicker = () => {
  const [show, setShow] = React.useState(true)
  const ref = React.useRef()

  React.useEffect(() => {
    ref.current.addEvent('on_change', function (e) {
      console.log('.date-picker.on_change', e)
      // myDate.innerHTML = e.date; // uses the return_format
    })
    ref.current.addEvent('on_hide', function (e) {
      console.log('.date-picker.on_hide', e)
    })

    ref.current.setProps('start_date', '2019-05-17')

    ref.current.setProps('on_change', function (e) {
      console.log('on_change', e)
    })

    myDatePicker = ref.current
  }, [])

  return (
    <>
      <Button
        top="large"
        bottom="large"
        on_click={() => {
          // ref.current.remove()
          setShow((s) => !s)
        }}
      >
        Hide the DatePicker
      </Button>

      {show && (
        <>
          {/* <dnb-section spacing>content</dnb-section> */}
          <dnb-date-picker
            // opened="true"
            prevent_close="true"
            ref={ref}
            label="Date Picker:"
            label_direction="vertical"
            show_input="true"
            return_format="dd.MM.yyyy"
            class="date-picker"
            top="large"
          />
        </>
      )}
    </>
  )
}

const Buttons = () => {
  // const myButton = React.useRef()
  // React.useEffect(() => {})

  return (
    <div className="dnb-section dnb-section--spacing dnb-section--divider">
      <dnb-button on_click="MyDataManager.setDate">Set date</dnb-button>

      <dnb-button
        variant="secondary"
        on_click="MyDataManager.updateDatePicker"
      >
        Update date
      </dnb-button>

      <dnb-button
        variant="secondary"
        on_click="MyDataManager.resetDatePicker"
      >
        Reset DatePicker
      </dnb-button>

      {/* <span className="dnb-p my-date">dd.mm.yyyy</span> */}
    </div>
  )
}

let myDatePicker
function DataManager() {}
DataManager.prototype.setDate = function () {
  // console.log('setDate', e)
  // myDatePicker.setAttribute('start_date', '2019-05-17')
  myDatePicker.setProps('start_date', '2019-05-17')
}
DataManager.prototype.updateDatePicker = function () {
  // console.log('updateDatePicker', e)
  // myDatePicker.setAttribute('start_date', '2019-05-18')
  myDatePicker.setProps('start_date', '2019-05-18')
}
DataManager.prototype.resetDatePicker = function () {
  // console.log('resetDatePicker', e)
  // myDatePicker.setAttribute('start_date', '')
  myDatePicker.setProps('start_date', null)
  // myDate.innerHTML = "dd.mm.yyyy";

  // const elem = document.querySelector('.dnb-form-label')
  // return elem
  // const elem = <Button>Hello</Button>
  // return elem
}
window.MyDataManager = new DataManager()
