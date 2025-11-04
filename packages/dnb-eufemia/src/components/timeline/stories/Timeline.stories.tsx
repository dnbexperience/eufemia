import React from 'react'
import Section from '../../Section'
import Timeline from '../Timeline'
import Input from '../../Input'
import Flex from '../../Flex'

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
              <Flex.Vertical top>
                <Input
                  value={value}
                  on_change={({ value }) => {
                    setValue(value)
                  }}
                  label="Should be able to change next subtitle input value from here"
                />
              </Flex.Vertical>
            }
          />
          <Timeline.Item
            title="Upcoming event"
            state="upcoming"
            subtitle={
              <Flex.Vertical top>
                <Input value={value} label="Should work" />
              </Flex.Vertical>
            }
          />
        </Timeline>
      </Section>

      <Flex.Vertical top left>
        <Input
          value={value}
          on_change={({ value }) => {
            setValue(value)
          }}
          label="Works"
        />
      </Flex.Vertical>
    </>
  )
}
