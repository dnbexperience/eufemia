import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import gridStyle from './GridStyle'
import classnames from 'classnames'

const WrapperDiv = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 1rem;

  overflow: hidden;

  ${gridStyle({ rgb: '220, 220, 220', a: 0.8 })};
`
export const Wrapper = ({ children, className, ...rest }) => (
  <WrapperDiv
    className={classnames('dnb-core-style', className)}
    {...rest}
  >
    {children}
  </WrapperDiv>
)
Wrapper.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
}
Wrapper.defaultProps = {
  className: null
}

export const Box = styled.div`
  position: relative;

  padding: 2rem;
  margin-bottom: 2rem;

  &::after {
    content: '';
    position: absolute;
    left: -50vw;
    right: -50vw;
    bottom: 0;
    width: 200vw;
    border-bottom: dashed 1px rgb(0, 200, 200);
  }

  p {
    background-color: rgba(213, 30, 149, 0.25);
  }
`
