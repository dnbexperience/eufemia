/**
 * @dnb/eufemia Component Story
 *
 */

import { TestElement } from '../../../extensions/forms'
import Flex from '../Flex'

export default {
  title: 'Eufemia/Components/Flex',
}

const Wrapper = Flex.withChildren(({ children }) => {
  return <div className="wrapper">{children}</div>
})

export function FlexWithChildren() {
  return (
    <Flex.Container direction="vertical">
      <TestElement>FlexItem 1</TestElement>
      <Wrapper>
        <TestElement>FlexItem 2</TestElement>
        <TestElement>FlexItem 3</TestElement>
      </Wrapper>
      <TestElement>FlexItem 4</TestElement>
    </Flex.Container>
  )
}
