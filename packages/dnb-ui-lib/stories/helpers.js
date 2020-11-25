import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { gridStyle } from './GridStyle'
import classnames from 'classnames'
import { Space } from '../src/components'

const MainWrapper = styled.main`
  min-height: 100vh;
  margin: 0;

  :not(.show-overflow) {
    overflow: hidden;
    width: 100%;
  }
`
const Grid = styled.div`
  padding: 1rem;
  ${gridStyle({ rgb: '220, 220, 220', a: 0.8 })};
`
export const VisualGrid = ({
  showOverflow,
  children,
  className,
  ...rest
}) => (
  <React.StrictMode>
    <MainWrapper
      role="main"
      className={classnames(
        'dnb-core-style',
        showOverflow && 'show-overflow',
        className
      )}
      {...rest}
    >
      <h1 className="dnb-sr-only">hidden content</h1>
      <Grid>{children}</Grid>
    </MainWrapper>
  </React.StrictMode>
)
VisualGrid.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  showOverflow: PropTypes.bool
}
VisualGrid.defaultProps = {
  className: null,
  showOverflow: null
}

export const Wrapper = ({ children }) => <div>{children}</div>
Wrapper.propTypes = {
  children: PropTypes.node.isRequired
}

export const Box = styled(Space)`
  position: relative;

  margin: 0;
  padding: 1rem;

  @media screen and (min-width: 40em) {
    padding: 1rem;
  }

  &::after {
    content: '';
    position: absolute;
    left: -50vw;
    right: -50vw;
    bottom: -1px;
    width: 200vw;
    border-bottom: dashed 1px rgb(0, 200, 200);
  }

  /* p {
    background-color: rgba(213, 30, 149, 0.25);
  } */
`
