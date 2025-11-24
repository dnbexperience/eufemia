import React from 'react'
import { Value, Form } from '../../..'
import { TimeZoneIdentifier } from '../../../constants/timezones'

export default {
  title: 'Eufemia/Extensions/Forms/Value/SelectTimeZone',
}

export function SelectTimeZoneValue() {
  return (
    <Form.Handler data={{ timezone: 'Europe/Oslo' }}>
      <Value.SelectTimeZone path="/timezone" />
    </Form.Handler>
  )
}

export function SelectTimeZoneValueWithLabel() {
  return (
    <Form.Handler data={{ timezone: 'Europe/Stockholm' }}>
      <Value.SelectTimeZone path="/timezone" label="Selected time zone" />
    </Form.Handler>
  )
}

export function SelectTimeZoneValueShowEmpty() {
  return (
    <Form.Handler>
      <Value.SelectTimeZone path="/timezone" showEmpty label="Time zone" />
    </Form.Handler>
  )
}

