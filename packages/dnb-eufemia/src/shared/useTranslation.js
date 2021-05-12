/**
 * React Hook
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import Context from './Context'

export function getTranslation(id, params) {
  return <Translation id={id} {...params} />
}

export default function useTranslation(id, params) {
  const { translation } = React.useContext(Context)
  return prepareTrans(id, params, translation)
}

export class Translation extends React.PureComponent {
  static contextType = Context
  static propTypes = {
    id: PropTypes.string,
    children: PropTypes.string,
  }
  static defaultProps = {
    id: null,
    children: null,
  }

  render() {
    const { id, children, ...params } = this.props
    return prepareTrans(id || children, params, this.context.translation)
  }
}

function prepareTrans(id, params, trans) {
  let str = null
  if (trans[id]) {
    str = trans[id]
    for (let t in params) {
      str = str.replace(new RegExp(`{${t}}`, 'g'), params[t])
    }
  }

  return str
}
