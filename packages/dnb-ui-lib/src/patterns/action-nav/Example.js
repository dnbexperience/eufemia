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
        <div className="example-box">
          {/* <ActionNav prev_href="?prev" next_href="?next" /> */}
          <ActionNav prev_href="?prev" next_href="?next">
            <p>Custom right nav content</p>
          </ActionNav>
        </div>
        <div className="example-box">
          <ActionNav>
            <div className="dnb-action-nav__left">
              Custom left nav content
            </div>
            <div className="dnb-action-nav__right">
              <div className="dnb-action-nav__item">
                <Button
                  text="Cancel"
                  icon_position="left"
                  variant="tertiary"
                  icon="close"
                />
              </div>
              <div className="dnb-action-nav__item">
                <Button text="Save" icon_position="left" icon="save" />
              </div>
            </div>
          </ActionNav>
        </div>
      </Fragment>
    )
  }
}

export { Example }
export default () => <Example />
