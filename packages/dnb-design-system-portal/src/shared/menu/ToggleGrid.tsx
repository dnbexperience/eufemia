/**
 * ToggleGrid
 *
 */

import React from 'react'
import { Switch } from '@dnb/eufemia/src'
import GridActivator, {
  isGridVisible,
  makeGridVisible,
} from './GridActivator'

export default function ToggleGrid(
  attributes: React.HTMLAttributes<HTMLSpanElement>
) {
  return (
    <span {...attributes}>
      <Switch
        id="switch-grid"
        label="Grid"
        checked={isGridVisible()}
        on_change={onChangeHandler}
      />
      <GridActivator />
    </span>
  )

  function onChangeHandler() {
    makeGridVisible(!isGridVisible())
  }
}
