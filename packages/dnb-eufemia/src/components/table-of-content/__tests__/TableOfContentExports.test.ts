import { TableOfContent } from '../../..'
import { TableOfContent as Component } from '../..'
import Direct from '../../TableOfContent'
import Entry, { Root, Data, Item } from '..'
import * as Extensions from '../../../extensions'

it('exposes the compound component through public component entry points', () => {
  expect(Component).toBe(TableOfContent)
  expect(Direct).toBe(TableOfContent)
  expect(Entry).toBe(TableOfContent)
  expect(TableOfContent.Root).toBe(Root)
  expect(TableOfContent.Data).toBe(Data)
  expect(TableOfContent.Item).toBe(Item)
  expect(Extensions).not.toHaveProperty('TableOfContent')
})
