import Input from '../input/Input'
import type { InputProps } from '../input/Input'
import withComponentMarkers from '../../shared/helpers/withComponentMarkers'
import type { SearchProps } from './types'
import useSearchProps from './useSearchProps'

export type SearchInputProps = InputProps & SearchProps

function SearchInput(localProps: SearchInputProps) {
  const { variant: _variant, ...props } = useSearchProps(localProps, {
    type: 'search',
  })

  return (
    <Input
      {...props}
      icon={props.icon ?? (props.showSubmitButton ? undefined : 'loupe')}
    />
  )
}

withComponentMarkers(SearchInput, {
  _formElement: true,
})

export default SearchInput
