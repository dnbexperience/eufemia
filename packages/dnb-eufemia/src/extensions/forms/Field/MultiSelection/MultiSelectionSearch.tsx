import { Input } from '../../../../components'
import { Hr } from '../../../../elements'

export type MultiSelectionSearchProps = {
  show: boolean
  placeholder: string
  value: string
  disabled?: boolean
  onSearchChange: (value: string) => void
}

export function MultiSelectionSearch({
  show,
  placeholder,
  value,
  disabled,
  onSearchChange,
}: MultiSelectionSearchProps) {
  if (!show) {
    return null
  }

  return (
    <>
      <Input
        label={false}
        icon="loupe"
        iconPosition="left"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onSearchChange(e.value)}
        disabled={disabled}
        stretch
        showClearButton={value.length > 0}
        onClear={() => onSearchChange('')}
        className="dnb-forms-field-multi-selection__search"
      />
      <Hr
        space={0}
        className="dnb-forms-field-multi-selection__separator"
      />
    </>
  )
}
