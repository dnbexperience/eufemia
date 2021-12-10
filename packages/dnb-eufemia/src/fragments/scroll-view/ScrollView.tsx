/**
 * Web ScrollView Component
 *
 */

import React from 'react'
import classnames from 'classnames'
import {
  validateDOMAttributes,
  processChildren,
  extendPropsWithContext,
} from '../../shared/component-helper'
import Context from '../../shared/Context'
import { createSpacingClasses } from '../../components/space/SpacingHelper'
import { ISpacingProps } from '../../shared/interfaces'

interface ScrollViewProps extends ISpacingProps {
  className: string
  children: string | React.ReactNode | ((...args: any[]) => any)
  innerRef: any
  class: string
  // All other props
  [x: string]: any
}

class ScrollView extends React.PureComponent<ScrollViewProps> {
  static tagName = 'dnb-scroll-view'
  static contextType = Context
  ref: any

  static getContent(props) {
    if (props.text) return props.text
    return processChildren(props)
  }

  static defaultProps = {
    className: null,
    children: null,
    innerRef: null,

    class: null,
  }

  constructor(props) {
    super(props)
    this.ref = props.innerRef || React.createRef()
  }

  render() {
    // use only the props from context, who are available here anyway
    const props = extendPropsWithContext(
      this.props,
      ScrollView.defaultProps,
      this.context.FormRow,
      this.context.ScrollView
    )

    const {
      className = null,
      class: _className,
      innerRef = null, // eslint-disable-line
      ...attributes
    } = props

    const contentToRender = ScrollView.getContent(props)

    const mainParams = {
      className: classnames(
        'dnb-scroll-view',
        createSpacingClasses(props),
        _className,
        className
      ),
      ...attributes,
    }

    validateDOMAttributes(this.props, mainParams)

    return (
      <div {...mainParams} ref={this.ref}>
        {contentToRender}
      </div>
    )
  }
}

export default React.forwardRef(function ScrollViewRef(props, ref) {
  return <ScrollView innerRef={ref} {...props} />
})
