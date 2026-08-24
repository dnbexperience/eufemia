import { Input } from '../../../../components'

export type MultiSelectionSearchProps = {
  show: boolean
  label: string
  placeholder: string
  value: string
  disabled?: boolean
  onSearchChange: (value: string) => void
}

export function MultiSelectionSearch({
  show,
  label,
  placeholder,
  value,
  disabled,
  onSearchChange,
}: MultiSelectionSearchProps) {
  if (!show) {
    return null
  }

  return (
    <Input
      type="search"
      label={label}
      labelSrOnly
      icon="loupe"
      iconPosition="left"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onSearchChange(e.value)}
      disabled={disabled}
      stretch
      showClearButton
      onClear={() => onSearchChange('')}
      autoCapitalize="none"
      autoCorrect="off"
      spellCheck={false}
      className="dnb-forms-field-multi-selection__search"
    />
  )
}
