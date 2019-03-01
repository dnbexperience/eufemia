import styled from '@emotion/styled'
import gridStyle from './GridStyle'

export const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 1rem;

  overflow: hidden;

  ${gridStyle({ rgb: '220, 220, 220', a: 0.8 })};
`

export const Box = styled.div`
  position: relative;

  padding: 2rem;
  margin-bottom: 2rem;

  &::after {
    content: '';
    position: absolute;
    left: -50vw;
    bottom: 0;
    width: 100vw;
    border-bottom: dashed 1px rgb(0, 200, 200);
    box-shadow: 100vw 0 0 0 rgb(0, 200, 200);
  }
`
