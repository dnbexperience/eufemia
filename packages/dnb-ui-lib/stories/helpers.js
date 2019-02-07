import styled from '@emotion/styled'
import gridStyle from './GridStyle'

export const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 1rem;

  ${gridStyle({ rgb: '220, 220, 220', a: 0.8 })}
`

export const Box = styled.div`
  padding: 2rem;
  margin-bottom: 2rem;

  border-bottom: solid 1px #ececec;
`
