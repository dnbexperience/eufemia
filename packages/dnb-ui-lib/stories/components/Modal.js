/**
 * dnb-ui-lib Component Story
 *
 */

import React /* , { useState, useEffect } */ from 'react'
import { Wrapper, Box } from '../helpers'
// import styled from '@emotion/styled'

import { Modal, Switch, Button, Input } from '../../src/components'
import { H2, P, Hr } from '../../src/elements'

export default [
  'Modal',
  () => (
    <Wrapper>
      <Box>
        <Modal trigger_text="Open Modal" title="Modal Title">
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
        <Button
          id="custom-triggerer"
          text="Custom trigger Button"
          on_click={() => (
            <Modal
              title="Modal Title"
              trigger_hidden="true"
              open_state="opened"
              labelled_by="custom-triggerer"
            >
              <div className="dnb-core-style">
                <p className="dnb-p">
                  This Modal was opened by a custom trigger button.
                </p>
              </div>
            </Modal>
          )}
        />
      </Box>
    </Wrapper>
  )
]

class ModalRerenderExample extends React.PureComponent {
  state = {
    title: 'Modal Title',
    trigger_text: 'Open Modal'
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ title: 'New Title' })
      this.setState({ trigger_text: 'New Open Modal' })
    }, 1e3)
  }

  render() {
    return (
      <Modal
        trigger_text={this.state.trigger_text}
        title={this.state.title}
        // trigger_disabled
        // trigger_hidden
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
    )
  }
}

class ModalCloseExample extends React.PureComponent {
  state = {
    open_state: null
  }

  // constructor(props) {
  //   super(props)
  //
  //   setTimeout(() => {
  //     this.setState({
  //       open_state: 'opened'
  //     })
  //     setTimeout(() => {
  //       this.setState({
  //         open_state: 'closed'
  //       })
  //     }, 3e3)
  //   }, 1e3)
  // }

  render() {
    return (
      <Modal
        trigger_text="Open Modal and auto close"
        title="Modal Title"
        // open_state={this.state.open_state}
        // open_modal={open => {
        //   setTimeout(open, 3e3)
        // }}
        hide_close_button
        close_modal={close => {
          console.log('Modal was opened')
          setTimeout(close, 3e3)
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
    )
  }
}
