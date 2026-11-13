import Input from '../input/Input'
import type { InputProps } from '../input/Input'
import withComponentMarkers from '../../shared/helpers/withComponentMarkers'
import type { SearchProps } from './types'
import useSearchProps from './useSearchProps'

export type SearchInputProps = InputProps & SearchProps

function SearchInput(localProps: SearchInputProps) {
  const props = useSearchProps(localProps, {
    type: 'search',
    icon: 'loupe',
  })

  return <Input {...props} />
}

withComponentMarkers(SearchInput, {
  _formElement: true,
})

export default SearchInput
