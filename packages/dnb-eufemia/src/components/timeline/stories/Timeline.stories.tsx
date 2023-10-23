import React from 'react'
import Section from '../../Section'
import Timeline from '../Timeline'
import FormRow from '../../FormRow'
import Input from '../../Input'

export default {
  title: 'Eufemia/Components/Timeline',
}

export const TimelineTest = () => {
  const [value, setValue] = React.useState('123')
  return (
    <>
      <Section>
        <Timeline space>
          <Timeline.Item
            title="Completed event"
            subtitle="10. september 2021"
            state="completed"
          />
          <Timeline.Item
            title="Current event"
            infoMessage="Additional information about this step if needed."
            state="current"
            subtitle={
              <FormRow top vertical>
                <Input
                  value={value}
                  on_change={({ value }) => {
                    setValue(value)
                  }}
                  label="Should be able to change next subtitle input value from here"
                />
              </FormRow>
            }
          />
          <Timeline.Item
            title="Upcoming event"
            state="upcoming"
            subtitle={
              <FormRow top vertical>
                <Input value={value} label="Should work" />
              </FormRow>
            }
          />
        </Timeline>
      </Section>

      <FormRow top left vertical>
        <Input
          value={value}
          on_change={({ value }) => {
            setValue(value)
          }}
          label="Works"
        />
      </FormRow>
    </>
  )
}
