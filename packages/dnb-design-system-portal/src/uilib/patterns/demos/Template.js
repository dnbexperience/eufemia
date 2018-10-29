/**
 * Element Demo setup
 * Ready for imporing in page
 *
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ItemWrapper from '../../../shared/parts/uilib/ItemWrapper'
import DemoComponent, {
  Example as CodeComponent
} from 'dnb-ui-lib/src/patterns/template/Example'
import InfoComponent from 'dnb-ui-lib/src/patterns/template/info.md'
import ExampleCode from 'raw-loader!../examples/Template.txt'

export default class TemplateDemo extends Component {
  static propTypes = {
    title: PropTypes.string,
    id: PropTypes.string,
    InfoComponent: PropTypes.func,
    DemoComponent: PropTypes.func,
    CodeComponent: PropTypes.func,
    hideTabs: PropTypes.bool
  }
  static defaultProps = {
    title: 'Template',
    id: 'template',
    ExampleCode,
    InfoComponent,
    DemoComponent,
    CodeComponent,
    callback: CodeComponent.AdditionalCallback || null,
    hideTabs: false
  }
  render() {
    return <ItemWrapper {...TemplateDemo.defaultProps} {...this.props} />
  }
}
