import { useCallback, useContext, useEffect, useRef } from 'react'
import { clsx } from 'clsx'
import Input from '../input/Input'
import ProgressIndicator from '../progress-indicator/ProgressIndicator'
import { FilterContext } from './FilterContext'
import { loupe as searchIcon } from '../../icons'

export type FilterSearchProps = {
  label: string
  placeholder?: string
  className?: string
}

function FilterSearch({
  label,
  placeholder,
  className,
}: FilterSearchProps) {
  const context = useContext(FilterContext)

  if (!context) {
    throw new Error(
      'Filter.Search must be used inside a Filter.Container.'
    )
  }

  const isTypingRef = useRef(false)

  const handleChange = useCallback(
    ({ value }: { value: string }) => {
      isTypingRef.current = true
      context.setSearch(value)
    },
    [context]
  )

  useEffect(() => {
    if (!context.resultLoading) {
      isTypingRef.current = false
    }
  }, [context.resultLoading])

  const showIndicator = context.resultLoading && isTypingRef.current

  return (
    <div
      className={clsx(
        'dnb-filter__search',
        showIndicator && 'dnb-filter__search--show-indicator',
        className
      )}
    >
      <Input
        label={label}
        labelDirection="vertical"
        placeholder={placeholder}
        value={context.state.search}
        onChange={handleChange}
        icon={
          showIndicator ? (
            <ProgressIndicator type="circular" size="small" />
          ) : (
            searchIcon
          )
        }
        stretch
        iconPosition="left"
        showClearButton
      />
    </div>
  )
}

export default FilterSearch
