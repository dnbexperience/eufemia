/**
 * UI lib Component Example
 *
 */

import React, { PureComponent, Fragment } from 'react'
import FormLabel from './FormLabel'
import Switch from '../../components/switch/Switch'

class Example extends PureComponent {
  render() {
    return (
      <Fragment>
        <div className="example-box">
          <form className="dnb-form">
            <div className="dnb-form__item">
              <div className="dnb-form__cell">
                <FormLabel
                  for_id="switch-1"
                  text="Form Label Text (click me)"
                />
              </div>
              <div className="dnb-form__cell">
                <Switch
                  id="switch-1"
                  title="Ths is the title"
                  value="Value of switch"
                />
              </div>
            </div>
          </form>
          <p className="example-caption">A form label</p>
        </div>
      </Fragment>
    )
  }
}

export { Example }
export default () => <Example />
