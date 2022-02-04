import React from 'react'
import { Tag } from '@dnb/eufemia/src'

export default function ClickableTag() {
  return (
    <div data-visual-test="tag-clickable" style={{ margin: '2rem' }}>
      <Tag
        text="Some filter"
        onClick={() => {
          console.log('I was sent!')
        }}
      />
    </div>
  )
}
