/**
 * Web StepIndicator Component
 *
 */

import React from 'react'
import Modal from '../modal/Modal'
import StepIndicatorTriggerButton from './StepIndicatorTriggerButton'
import StepIndicatorList from './StepIndicatorList'
import StepIndicatorContext, {
  StepIndicatorProvider,
} from './StepIndicatorContext'

export default class StepIndicatorModal extends React.PureComponent {
  static contextType = StepIndicatorContext

  state = { open_state: false }

  constructor(props) {
    super(props)
    this._triggerRef = React.createRef()
  }

  onChangeState = () => {
    this.setState({ open_state: false })
  }

  openHandler = () => {
    this.setState({ open_state: true })
  }

  closeHandler = () => {
    this.setState({ open_state: false })
    if (this.context.hasSidebar) {
      this._triggerRef.current?.focus()
    }
  }

  render() {
    if (this.context.hasSidebar && !this.context.hideSidebar) {
      return null
    }
    return (
      <>
        <StepIndicatorTriggerButton
          on_click={this.openHandler}
          inner_ref={this._triggerRef}
        />
        <Modal
          id={this.context.sidebar_id}
          title={this.context.overview_title}
          trigger_hidden
          mode="drawer"
          animation_direction="bottom"
          open_state={this.state.open_state}
          on_open={this.openHandler}
          on_close={this.closeHandler}
        >
          <StepIndicatorProvider
            {...this.context}
            sidebar_id={this.context.sidebar_id}
            onChangeState={this.onChangeState}
          >
            <Modal.Content style_type="white">
              <div className="dnb-step-indicator-v2">
                <p className="dnb-p dnb-step-indicator__label">
                  {this.context.stepsLabelExtended}
                </p>
                <StepIndicatorList />
              </div>
            </Modal.Content>
          </StepIndicatorProvider>
        </Modal>
      </>
    )
  }
}
