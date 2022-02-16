import React from 'react'
import styled from '@emotion/styled'
import { gridStyle } from './GridStyle'
import classnames from 'classnames'
import { Space } from '@dnb/eufemia/src/components'

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

export const Wrapper = ({
  showOverflow = null,
  skipCoreStyle = null,
  children,
  className = null,
  ...rest
}: IWrapper) => (
  <React.StrictMode>
    <MainWrapper
      role="main"
      className={classnames(
        !skipCoreStyle && 'dnb-core-style',
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

interface IWrapper {
  className?: string;
  skipCoreStyle?: boolean;
  showOverflow?: boolean;
  children: React.ReactNode;
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
