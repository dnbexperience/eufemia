/**
 * ATTENTION: This file is auto generated by using "makeDemosFactory".
 * Do not change the content!
 *
 * "Patterns" Demo setup
 * Ready for imporing in page
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import ItemWrapper from '../../../shared/parts/uilib/ItemWrapper'
import DemoComponent, {
  Example as CodeComponent
} from '@dnb/eufemia/src/patterns/form-summary/Example'
import Description from '@dnb/eufemia/src/patterns/form-summary/description.md'
import Details from '@dnb/eufemia/src/patterns/form-summary/details.md'
import ExampleCode from 'raw-loader!../examples/FormSummary.txt'

export default class FormSummaryDemo extends React.PureComponent {
  static propTypes = {
    title: PropTypes.string,
    id: PropTypes.string,
    Description: PropTypes.func,
    Details: PropTypes.func,
    DemoComponent: PropTypes.func,
    CodeComponent: PropTypes.func,
    hideTabs: PropTypes.bool
  }
  static defaultProps = {
    title: 'FormSummary',
    id: 'form-summary',
    ExampleCode,
    Description,
    Details,
    DemoComponent,
    CodeComponent,
    callback: CodeComponent.AdditionalCallback || null,
    hideTabs: false
  }
  render() {
    return (
      <ItemWrapper {...FormSummaryDemo.defaultProps} {...this.props} />
    )
  }
}
