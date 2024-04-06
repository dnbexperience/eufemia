import { Field } from '../../..'

export default {
  title: 'Eufemia/Extensions/Forms/Number',
}

export const Number = () => {
  return (
    <>
      <Field.Number label="Label" bottom />
      <Field.Number
        label="Label"
        showStepControls
        value={5}
        maximum={20}
        minimum={10}
        step={5}
      />
      <Field.Number
        label="Label"
        showStepControls
        value={5}
        maximum={20}
        minimum={10}
        step={5}
        required
        validateInitially
      />
      <Field.Number
        label="Label"
        showStepControls
        value={5}
        maximum={20}
        minimum={10}
        step={5}
        required
        // validateInitially
        disabled
      />
    </>
  )
}
