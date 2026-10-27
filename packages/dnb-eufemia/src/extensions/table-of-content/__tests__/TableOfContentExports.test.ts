import * as Eufemia from '../../..'
import * as Components from '../../../components'
import { TableOfContent } from '../../../extensions'
import { getExtensions } from '../../../extensions/lib'
import Entry, {
  Root,
  Data,
  Item,
} from '../../../extensions/table-of-content'
import Direct from '../../../extensions/table-of-content/TableOfContent'

it('exposes the compound component through extension entry points', () => {
  expect(Direct).toBe(TableOfContent)
  expect(Entry).toBe(TableOfContent)
  expect(TableOfContent.Root).toBe(Root)
  expect(TableOfContent.Data).toBe(Data)
  expect(TableOfContent.Item).toBe(Item)
  expect(getExtensions().TableOfContent).toBe(TableOfContent)
  expect(Eufemia).not.toHaveProperty('TableOfContent')
  expect(Components).not.toHaveProperty('TableOfContent')
})
