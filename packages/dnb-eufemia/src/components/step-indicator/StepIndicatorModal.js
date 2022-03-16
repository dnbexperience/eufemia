/**
 * Web StepIndicator Component
 *
 */

import React from 'react'
import ReactDOM from 'react-dom'
import Modal from '../modal/Modal'
import StepIndicatorTriggerButton from './StepIndicatorTriggerButton'
import StepIndicatorList from './StepIndicatorList'
import StepIndicatorContext from './StepIndicatorContext'

export default class StepIndicatorModal extends React.PureComponent {
  static contextType = StepIndicatorContext

  constructor(props) {
    super(props)

    this._triggerRef = React.createRef()

    this.state = { container: null }
  }

  closeHandler = (...args) => {
    if (this.context.hasSidebar) {
      this._triggerRef.current?.focus()
    }
    this.context.closeHandler(...args)
  }

  componentDidMount() {
    const container = document.getElementById(
      'sidebar__' + this.context.sidebar_id
    )

    this.setState({
      container,
    })
  }

  renderPortal() {
    if (!this.state.container) {
      return null
    }

    return ReactDOM.createPortal(
      <StepIndicatorList />,
      this.state.container
    )
  }

  render() {
    if (this.context.sidebarIsVisible) {
      return this.renderPortal()
    }

    return (
      <>
        <StepIndicatorTriggerButton
          on_click={this.context.openHandler}
          inner_ref={this._triggerRef}
        />
        <Modal
          id={this.context.sidebar_id}
          title={this.context.overview_title}
          omitTriggerButton
          mode="drawer"
          animation_direction="bottom"
          open_state={this.context.openState}
          on_open={this.context.openHandler}
          on_close={this.closeHandler}
        >
          <Modal.Content style_type="white">
            <div className="dnb-step-indicator-v2">
              <p className="dnb-p dnb-step-indicator__label">
                {this.context.stepsLabelExtended}
              </p>
              <StepIndicatorList />
            </div>
          </Modal.Content>
        </Modal>
      </>
    )
  }
}
