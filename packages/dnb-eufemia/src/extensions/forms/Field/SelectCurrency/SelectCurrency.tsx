import React, { useCallback, useContext, useMemo, useRef } from 'react'
import classnames from 'classnames'
import SharedContext from '../../../../shared/Context'
import FieldBlockContext from '../../FieldBlock/FieldBlockContext'
import { LOCALE } from '../../../../shared/defaults'
import { Autocomplete } from '../../../../components'
import { pickSpacingProps } from '../../../../components/flex/utils'
import currencies, {
  prioritizedCurrencies,
  type CurrencyType,
  type CurrencyLang,
  type CurrencyISO,
} from '../../constants/currencies'
import { useFieldProps } from '../../hooks'
import type { FieldPropsWithExtraValue } from '../../types'
import type {
  Props as FieldBlockProps,
  FieldBlockWidth,
} from '../../FieldBlock'
import FieldBlock from '../../FieldBlock'
import useTranslation from '../../hooks/useTranslation'
import type { AutocompleteAllProps } from '../../../../components/autocomplete/Autocomplete'

export type CurrencyFilterSet =
  | 'Scandinavia'
  | 'Nordic'
  | 'Europe'
  | 'Prioritized'
export type { CurrencyType }

export type Props = FieldPropsWithExtraValue<
  CurrencyISO,
  CurrencyType,
  undefined | string
> & {
  /**
   * Lists only the currencies you want to show. Can be `Scandinavia`, `Nordic`, `Europe` or `Prioritized`.
   * Defaults to `Prioritized`.
   */
  currencies?: CurrencyFilterSet

  /**
   * Use this prop to filter out certain currencies. The function receives the currency object and should return a boolean. Returning `false` will omit the currency.
   */
  filterCurrencies?: (currency: CurrencyType) => boolean

  /**
   * For internal testing purposes
   */
  noAnimation?: boolean

  /**
   * The width of the component.
   */
  width?: FieldBlockWidth

  /**
   * The size of the component.
   */
  size?: AutocompleteAllProps['size']
}

function SelectCurrency(props: Props) {
  const sharedContext = useContext(SharedContext)
  const fieldBlockContext = useContext(FieldBlockContext)
  const {
    label: defaultLabel,
    placeholder: defaultPlaceholder,
    errorRequired,
  } = useTranslation().SelectCurrency
  const lang = (sharedContext.locale || LOCALE).split(
    '-'
  )[0] as CurrencyLang

  const getCurrencyObjectByIso = useCallback(
    (value: CurrencyType['iso']) => {
      const currency = currencies.find(({ iso }) => value === iso)
      if (currency?.i18n) {
        currency['name'] = currency.i18n[lang]
      }
      return currency
    },
    [lang]
  )

  const provideAdditionalArgs = useCallback(
    (value: CurrencyType['iso']) => {
      const currency = getCurrencyObjectByIso(value)

      if (currency?.iso) {
        return currency
      }
    },
    [getCurrencyObjectByIso]
  )

  const errorMessages = useMemo(
    () => ({
      required: errorRequired,
    }),
    [errorRequired]
  )

  const preparedProps: Props = {
    errorMessages,
    ...props,
    width:
      props.width ??
      (fieldBlockContext?.composition ? 'stretch' : 'large'),
    provideAdditionalArgs,
  }

  const {
    id,
    path,
    itemPath,
    className,
    placeholder = defaultPlaceholder,
    label = defaultLabel,
    currencies: ccFilter = 'Prioritized',
    hasError,
    disabled,
    size,
    value,
    width,
    noAnimation,
    autoComplete,
    htmlAttributes,
    handleFocus,
    handleBlur,
    handleChange,
    updateValue,
    setDisplayValue,
    forceUpdate,
    filterCurrencies,
  } = useFieldProps(preparedProps)

  const dataRef = useRef(null)
  const langRef = useRef(lang)
  const wasFilled = useRef(false)

  const filter = useCallback(
    (currency: CurrencyType) => {
      return currencyFilter(currency, filterCurrencies, ccFilter)
    },
    [ccFilter, filterCurrencies]
  )

  /**
   * We do not process the whole currency list at the first render.
   * Only when the Autocomplete opens (focus).
   * To achieve this, we use memo instead of effect to update refs in sync.
   *
   * We set or update the data list depending on if the currency code changes or lang changes.
   * We then update data set when value changes.
   */
  useMemo(() => {
    const isLangChange = lang !== langRef.current

    if (isLangChange || !wasFilled.current) {
      langRef.current = lang
      dataRef.current = getCurrencyData({
        lang,
        filter: !wasFilled.current
          ? (currency) => currency.iso === value
          : filter,
        enableSort: ccFilter as Extract<CurrencyFilterSet, 'Prioritized'>,
        enableSearch: true,
      })

      // To force Autocomplete to re-evaluate the internal data
      if (isLangChange && value && typeof window !== 'undefined') {
        updateValue(null)
        window.requestAnimationFrame(() => {
          updateValue(value)
        })
      }
    }
  }, [lang, filter, ccFilter, updateValue, value])

  const handleCurrencyChange = useCallback(
    ({ data }: { data: { selectedKey: string } }) => {
      const newValue = data?.selectedKey
      const currency = getCurrencyObjectByIso(newValue)
      if (currency?.iso) {
        handleChange(currency.iso, currency)
      }
    },
    [getCurrencyObjectByIso, handleChange]
  )

  const fillData = useCallback(() => {
    if (!wasFilled.current) {
      wasFilled.current = true
      dataRef.current = getCurrencyData({
        lang: langRef.current,
        filter,
        enableSort: ccFilter as Extract<CurrencyFilterSet, 'Prioritized'>,
        enableSearch: true,
      })
      forceUpdate()
    }
  }, [ccFilter, filter, forceUpdate])

  const onFocusHandler = useCallback(
    ({ updateData }) => {
      fillData()
      updateData(dataRef.current)
      handleFocus()
    },
    [fillData, handleFocus]
  )

  const onTypeHandler = useCallback(
    ({ value: currentValue, setHidden, event }) => {
      // Handle browser autofill/autocomplete
      if (typeof event?.nativeEvent?.data === 'undefined') {
        const search = currentValue.toLowerCase()
        const currency = currencies.find(({ i18n }) =>
          Object.values(i18n).some((s) => s.toLowerCase().includes(search))
        )
        if (currency?.iso) {
          setHidden()
          handleChange(currency.iso)
        }
      }
    },
    [handleChange]
  )

  useMemo(() => {
    if (path || itemPath) {
      setDisplayValue(
        getCurrencyObjectByIso(value)?.i18n?.[langRef.current]
      )
    }
  }, [getCurrencyObjectByIso, itemPath, path, setDisplayValue, value])

  const fieldBlockProps: FieldBlockProps = {
    forId: id,
    className: classnames('dnb-forms-field-select-currency', className),
    label,
    width:
      width === 'stretch' || fieldBlockContext?.composition
        ? width
        : undefined,
    contentWidth: width !== false ? width : undefined,
    ...pickSpacingProps(props),
  }

  return (
    <FieldBlock {...fieldBlockProps}>
      <Autocomplete
        id={id}
        placeholder={placeholder}
        input_icon={false}
        data={dataRef.current}
        value={typeof value === 'string' ? value : null}
        disabled={disabled}
        size={size}
        on_show={fillData}
        on_focus={onFocusHandler}
        on_blur={handleBlur}
        on_change={handleCurrencyChange}
        on_type={onTypeHandler}
        stretch
        selectall
        status={hasError ? 'error' : undefined}
        show_submit_button
        keep_selection
        autoComplete={autoComplete}
        no_animation={noAnimation}
        {...htmlAttributes}
      />
    </FieldBlock>
  )
}

type GetCurrencyData = {
  lang?: CurrencyLang
  filter?: Props['filterCurrencies']
  enableSort?: Extract<CurrencyFilterSet, 'Prioritized'>
  enableSearch?: boolean
  makeObject?: (
    currency: CurrencyType,
    lang: string
  ) => {
    selectedKey: string
    selected_value: string
    content: string[]
  }
}

export function getCurrencyData({
  lang = 'nb',
  filter = null,
  enableSort = null,
  enableSearch = null,
  makeObject = (currency: CurrencyType, lang: string) => {
    const translation = currency.i18n[lang] ?? currency.i18n.en
    const content = [translation, currency.iso]
    const search_content = enableSearch
      ? [translation, currency.iso, ...(currency.search?.[lang] || [])]
      : undefined
    return {
      selectedKey: currency.iso,
      selected_value: `${translation} (${currency.iso})`,
      search_content, // will be used for searching
      content,
    }
  },
}: GetCurrencyData = {}) {
  const sortedCurrencies = currencies
    .filter((currency) => {
      if (typeof filter === 'function') {
        return filter(currency)
      }

      return !filter
    })
    .sort(({ i18n: a, iso: a1 }, { i18n: b, iso: b1 }) => {
      if (enableSort === 'Prioritized') {
        const indexA = prioritizedCurrencies.indexOf(a1)
        const indexB = prioritizedCurrencies.indexOf(b1)

        const priorityA = indexA !== -1
        const priorityB = indexB !== -1

        if (priorityA && priorityB) {
          return indexA - indexB
        } else if (priorityA) {
          return -1
        } else if (priorityB) {
          return 1
        }
      }

      return String(a[lang])?.localeCompare?.(b[lang], 'nb') // Always sort by nb, because åøæ (for Østkaribisk dollar) is not in the en alphabet
    })
    .map((currency) => makeObject(currency, lang))

  if (sortedCurrencies.length === 0) {
    return undefined
  }

  return sortedCurrencies
}

export function currencyFilter(
  currency: CurrencyType,
  filterCurrencies: (currency: CurrencyType) => boolean,
  ccFilter: CurrencyFilterSet
) {
  let result = true

  if (ccFilter !== 'Prioritized') {
    switch (ccFilter) {
      case 'Scandinavia':
      case 'Nordic': {
        result = currency.regions?.includes(ccFilter)
        break
      }
      case 'Europe': {
        result = currency.continent.includes(ccFilter)
        break
      }
    }
  }

  if (result && filterCurrencies) {
    result = filterCurrencies(currency)
  }

  return result
}

export function makeCurrencyFilterSet(ccFilter: CurrencyFilterSet) {
  return (currency: CurrencyType) => {
    switch (ccFilter) {
      case 'Scandinavia':
      case 'Nordic':
        return currency.regions?.includes(ccFilter)
      case 'Europe':
        return currency.continent.includes(ccFilter)
    }
    return true
  }
}

SelectCurrency._supportsSpacingProps = true
export default SelectCurrency
