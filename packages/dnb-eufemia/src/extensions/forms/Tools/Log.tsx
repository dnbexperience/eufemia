import React, { useContext } from 'react'
import DataContext from '../DataContext/Context'
import Section, { SectionProps } from '../../../components/Section'

function Log(props: SectionProps) {
  const { data } = useContext(DataContext)

  return (
    <Section
      element="output"
      backgroundColor="sand-yellow"
      style={{ maxWidth: '80vw' }}
      innerSpace
      {...props}
    >
      <pre>
        {JSON.stringify(data, null, 2)}
        {' ' /* Ensure one line of spacing */}
      </pre>
    </Section>
  )
}

Log._supportsSpacingProps = true
export default Log
