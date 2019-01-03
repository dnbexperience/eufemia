/**
 * UI lib Component Example
 *
 */

import React, { PureComponent, Fragment } from 'react'
import ActionNav from './ActionNav'
import Button from '../../components/button/Button'

class Example extends PureComponent {
  render() {
    return (
      <Fragment>
        <ActionNav prev_href="?prev" next_href="?next" />
        <ActionNav
          render_left_content={() => <h3>Custom left nav content</h3>}
        >
          <div className="dnb-action-nav__item">
            <Button
              text="Lagre"
              title="Lagre"
              icon_position="left"
              variant="secondary"
              icon="save"
            />
          </div>
          <div className="dnb-action-nav__item">
            <Button
              text="Avbryt"
              title="Avbryt"
              icon_position="left"
              variant="secondary"
              icon="close"
            />
          </div>
        </ActionNav>
      </Fragment>
    )
  }
}

export { Example }
export default () => <Example />
