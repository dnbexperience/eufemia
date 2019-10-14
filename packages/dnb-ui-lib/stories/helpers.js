import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { gridStyle } from './GridStyle'
import classnames from 'classnames'

const WrapperDiv = styled.div`
  width: 100%;
  min-height: 100vh;
  margin: 0;

  :not(.show-overflow) {
    overflow: hidden;
  }
`
const Grid = styled.div`
  padding: 1rem;
  ${gridStyle({ rgb: '220, 220, 220', a: 0.8 })};
`
export const Wrapper = ({
  showOverflow,
  children,
  className,
  ...rest
}) => (
  <WrapperDiv
    className={classnames(
      'dnb-core-style',
      showOverflow && 'show-overflow',
      className
    )}
    {...rest}
  >
    <Grid>{children}</Grid>
  </WrapperDiv>
)
Wrapper.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  showOverflow: PropTypes.bool
}
Wrapper.defaultProps = {
  className: null,
  showOverflow: null
}

export const Box = styled.div`
  position: relative;

  margin: 0;
  padding: 2rem;
  ${'' /* margin-bottom: 2rem; */}

  &::after {
    content: '';
    position: absolute;
    left: -50vw;
    right: -50vw;
    bottom: -1px;
    width: 200vw;
    border-bottom: dashed 1px rgb(0, 200, 200);
  }

  p {
    background-color: rgba(213, 30, 149, 0.25);
  }
`
