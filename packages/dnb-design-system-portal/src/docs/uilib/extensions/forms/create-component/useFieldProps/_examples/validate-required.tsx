import { useFieldProps, FormError } from '@dnb/eufemia/extensions/forms'

const validateRequired = (
  value: unknown,
  {
    emptyValue,
    required,
    isChanged,
  }: { emptyValue: unknown; required: boolean; isChanged: boolean }
) => {
  if (required && value === emptyValue) {
    return new FormError('Field.errorRequired')
  }
}

function MyComponent() {
  const { error, hasError } = useFieldProps({
    value: undefined,
    required: true,
    validateInitially: true,
    validateRequired,
    errorMessages: {
      'Field.errorRequired': 'Show this when "required" fails.',
    },
  })
}
