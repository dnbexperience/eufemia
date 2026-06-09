import {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import { clsx } from 'clsx'
import Input from '../input/Input'
import type { InputProps } from '../input/Input'
import ProgressIndicator from '../progress-indicator/ProgressIndicator'
import { FilterContext } from './FilterContext'
import { loupe as searchIcon } from '../../icons'

export type FilterSearchProps = {
  label: string
  submitBehavior?: 'manual'
  onChange?: (value: string) => void
  className?: string
} & Omit<
  InputProps,
  | 'label'
  | 'labelDirection'
  | 'value'
  | 'onChange'
  | 'icon'
  | 'stretch'
  | 'size'
  | 'iconPosition'
  | 'showClearButton'
  | 'className'
  | 'autoCapitalize'
  | 'autoCorrect'
  | 'spellCheck'
>

function FilterSearch({
  label,
  submitBehavior,
  onChange: onChangeProp,
  className,
  ...rest
}: FilterSearchProps) {
  const context = useContext(FilterContext)

  if (!context) {
    throw new Error('Filter.Search must be used inside a Filter.Root.')
  }

  const isManual = submitBehavior === 'manual'
  const isTypingRef = useRef(false)
  const [localValue, setLocalValue] = useState(context.state.search)

  const { setSearch } = context

  const handleChange = useCallback(
    ({ value }: { value: string }) => {
      isTypingRef.current = true

      if (isManual) {
        setLocalValue(value)

        if (value === '') {
          setSearch(value)
        }
      } else {
        setSearch(value)
      }

      onChangeProp?.(value)
    },
    [isManual, setSearch, onChangeProp]
  )

  const handleSubmit = useCallback(
    ({ value }: { value: string }) => {
      setSearch(value)
    },
    [setSearch]
  )

  const handleClear = useCallback(() => {
    setLocalValue('')
    setSearch('')
  }, [setSearch])

  useEffect(() => {
    if (!context.resultLoading) {
      isTypingRef.current = false
    }
  }, [context.resultLoading])

  useEffect(() => {
    if (!isManual) {
      setLocalValue(context.state.search)
    } else if (context.state.search === '') {
      setLocalValue('')
    }
  }, [isManual, context.state.search])

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
        {...rest}
        type={isManual ? 'search' : rest.type}
        label={label}
        labelDirection="vertical"
        value={isManual ? localValue : context.state.search}
        onChange={handleChange}
        {...(isManual
          ? { onSubmit: handleSubmit, onClear: handleClear }
          : undefined)}
        icon={
          showIndicator ? (
            <ProgressIndicator type="circular" size="small" />
          ) : (
            searchIcon
          )
        }
        stretch
        size="medium"
        iconPosition="left"
        showClearButton
        autoCapitalize="none"
        autoCorrect="off"
        spellCheck={false}
      />
    </div>
  )
}

export default FilterSearch
