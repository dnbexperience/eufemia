import Autocomplete from '../autocomplete/Autocomplete'
import type { AutocompleteAllProps } from '../autocomplete/Autocomplete'
import withComponentMarkers from '../../shared/helpers/withComponentMarkers'
import type { SearchProps } from './types'
import useSearchProps, { getSearchOptions } from './useSearchProps'

export type SearchAutocompleteProps = AutocompleteAllProps & SearchProps

function SearchAutocomplete(localProps: SearchAutocompleteProps) {
  const props = useSearchProps(localProps, {
    preventSelection: true,
    keepValue: true,
    noScrollAnimation: true,
    showAll: false,
  })

  return <Autocomplete {...props} search={getSearchOptions(props)} />
}

withComponentMarkers(SearchAutocomplete, {
  _formElement: true,
})

export default SearchAutocomplete
