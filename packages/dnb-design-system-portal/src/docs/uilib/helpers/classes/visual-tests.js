import React from 'react'
import {
  CoreStyleExample,
  TabFocusExample,
  UnstyledListExample,
  ScreenReaderOnlyExample,
  SelectionExample,
} from '../Examples'
import { warn } from '@dnb/eufemia/src/shared/component-helper'

export default function VisibleWhenVisualTests() {
  // Selects/marks some of the text in SelectionExample on second render tick
  // For comparing screenshots
  React.useEffect(() => {
    setTimeout(() => {
      try {
        const range = new Range()
        const textNode = document.querySelector(
          '[data-visual-test="helper-selection"] p',
        ).childNodes[0]
        range.setStart(textNode, 0)
        range.setEnd(textNode, Math.floor(textNode.length / 2))

        // apply this range for document selection
        document.getSelection().addRange(range)
      } catch (e) {
        warn(e)
      }
    }, 10)
  }, [])

  return (
    <>
      <CoreStyleExample />
      <TabFocusExample />
      <UnstyledListExample />
      <ScreenReaderOnlyExample />
      <SelectionExample />
    </>
  )
}
