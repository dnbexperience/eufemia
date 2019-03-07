/**
 * This is mainly a Wrapper, to bulid more easely HTML Elements
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

// import all main elements
import H1 from './H1'
import H2 from './H2'
import H3 from './H3'
import H4 from './H4'
import H5 from './H5'
import H6 from './H6'
import P from './P'
import Anchor from './Anchor'
import Link from './Link'
import Img from './Img'
import Ul from './Ul'
import Ol from './Ol'
import Dl from './Dl'
import Table from './Table'
import Textarea from './Textarea'
import Blockquote from './Blockquote'

// import other elements
import Hr from './Hr'
import Code from './Code'

export default function E({
  className,
  class: _className,
  useClass,
  css,
  is: Tag,
  ...rest
}) {
  return (
    <Tag
      className={classnames(
        useClass ? useClass : `dnb-${Tag}`,
        className,
        _className,
        css
      )}
      {...rest}
    />
  )
}
E.propTypes = {
  is: PropTypes.string.isRequired,
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  class: PropTypes.string,
  useClass: PropTypes.string,
  css: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  children: PropTypes.node
}
E.defaultProps = {
  className: null,
  class: null,
  useClass: null,
  css: null,
  children: null
}

export {
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
  P,
  Anchor,
  Link,
  Img,
  Ul,
  Ol,
  Dl,
  Table,
  Textarea,
  Blockquote,
  Hr,
  Code
}
