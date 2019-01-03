/**
 * UI lib Component Example
 *
 */

import React, { PureComponent, Fragment } from 'react'
import SummaryTable from './SummaryTable'
import Button from '../../components/button/Button'

class Example extends PureComponent {
  render() {
    return (
      <Fragment>
        <SummaryTable prev_href="?prev" next_href="?next" />
        <SummaryTable
          render_left_content={() => <h3>Custom left nav content</h3>}
        >
          <div className="dnb-summary-table__item">
            <Button
              text="Lagre"
              title="Lagre"
              icon_position="left"
              variant="secondary"
              icon="save"
            />
          </div>
          <div className="dnb-summary-table__item">
            <Button
              text="Avbryt"
              title="Avbryt"
              icon_position="left"
              variant="secondary"
              icon="close"
            />
          </div>
        </SummaryTable>
      </Fragment>
    )
  }
}

export { Example }
export default () => <Example />
