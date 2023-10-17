import React from 'react'
import * as Examples from '../Examples'

export default function VisibleWhenVisualTests() {
  useSelection('[data-visual-test="helper-selection"] p')

  return Object.values(Examples).map((Component, i) => {
    return <Component key={i} />
  })
}

function useSelection(className: string) {
  // Selects/marks some of the text in SelectionExample on second render tick
  // For comparing screenshots
  React.useEffect(() => {
    const textNode = document.querySelector(className).childNodes[0]

    const range = new Range()
    range.setStart(textNode, 0)
    range.setEnd(textNode, Math.floor(textNode.textContent.length / 2))

    // apply this range for document selection
    document.getSelection().addRange(range)
  }, [])
}
