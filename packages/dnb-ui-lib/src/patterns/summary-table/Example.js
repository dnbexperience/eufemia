/**
 * UI lib Component Example
 *
 */

import React from 'react'
import SummaryTable from './SummaryTable'
import Button from '../../components/button/Button'

class Example extends React.PureComponent {
  render() {
    return (
      <React.Fragment>
        <div className="example-box">
          <SummaryTable prev_href="?prev" next_href="?next" />
        </div>
        <div className="example-box">
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
        </div>
      </React.Fragment>
    )
  }
}

export { Example }
export default Example
