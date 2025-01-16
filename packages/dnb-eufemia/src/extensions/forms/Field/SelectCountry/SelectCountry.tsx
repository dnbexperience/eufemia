import React, { useCallback, useContext, useMemo, useRef } from 'react'
import classnames from 'classnames'
import SharedContext from '../../../../shared/Context'
import FieldBlockContext from '../../FieldBlock/FieldBlockContext'
import { LOCALE } from '../../../../shared/defaults'
import { Autocomplete } from '../../../../components'
import { pickSpacingProps } from '../../../../components/flex/utils'
import countries, {
  prioritizedCountries,
  type CountryType,
  type CountryLang,
} from '../../constants/countries'
import { useFieldProps } from '../../hooks'
import { FieldPropsWithExtraValue } from '../../types'
import FieldBlock, {
  Props as FieldBlockProps,
  FieldBlockWidth,
} from '../../FieldBlock'
import useTranslation from '../../hooks/useTranslation'

export type CountryFilterSet =
  | 'Scandinavia'
  | 'Nordic'
  | 'Europe'
  | 'Prioritized'
export type { CountryType }

export type Props = FieldPropsWithExtraValue<
  string,
  CountryType,
  undefined | string
> & {
  /**
   * Lists only the countries you want to show. Can be `Scandinavia`, `Nordic`, `Europe` or `Prioritized`.
   * Defaults to `Prioritized`.
   */
  countries?: CountryFilterSet

  /**
   * Use this prop to filter out certain countries. The function receives the country object and should return a boolean. Returning `false` will omit the country.
   */
  filterCountries?: (country: CountryType) => boolean

  /**
   * For internal testing purposes
   */
  noAnimation?: boolean

  /**
   * The width of the component.
   */
  width?: FieldBlockWidth
}

function SelectCountry(props: Props) {
  const sharedContext = useContext(SharedContext)
  const fieldBlockContext = useContext(FieldBlockContext)
  const {
    label: defaultLabel,
    placeholder: defaultPlaceholder,
    errorRequired,
  } = useTranslation().SelectCountry
  const lang = (sharedContext.locale || LOCALE).split(
    '-'
  )[0] as CountryLang

  const getCountryObjectByIso = useCallback(
    (value: CountryType['iso']) => {
      const country = countries.find(({ iso }) => value === iso)
      if (country?.i18n) {
        country['name'] = country.i18n[lang]
      }
      return country
    },
    [lang]
  )

  const provideAdditionalArgs = useCallback(
    (value: CountryType['iso']) => {
      const country = getCountryObjectByIso(value)

      if (country?.iso) {
        return country
      }
    },
    [getCountryObjectByIso]
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
    className,
    placeholder = defaultPlaceholder,
    label = defaultLabel,
    countries: ccFilter = 'Prioritized',
    hasError,
    disabled,
    value,
    width,
    htmlAttributes,
    handleFocus,
    handleBlur,
    handleChange,
    updateValue,
    setDisplayValue,
    forceUpdate,
    filterCountries,
  } = useFieldProps(preparedProps)

  const dataRef = useRef(null)
  const langRef = useRef(lang)
  const wasFilled = useRef(false)

  const filter = useCallback(
    (country: CountryType) => {
      return countryFilter(country, filterCountries, ccFilter)
    },
    [ccFilter, filterCountries]
  )

  /**
   * We do not process the whole country list at the first render.
   * Only when the Autocomplete opens (focus).
   * To achieve this, we use memo instead of effect to update refs in sync.
   *
   * We set or update the data list depending on if the countrycode changes or lang changes.
   * We then update data set when value changes.
   */
  useMemo(() => {
    const isLangChange = lang !== langRef.current

    if (isLangChange || !wasFilled.current) {
      langRef.current = lang
      dataRef.current = getCountryData({
        lang,
        filter: !wasFilled.current
          ? (country) => country.iso === value
          : filter,
        sort: ccFilter as Extract<CountryFilterSet, 'Prioritized'>,
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

  const handleCountryChange = useCallback(
    ({ data }: { data: { selectedKey: string } }) => {
      const newValue = data?.selectedKey
      const country = getCountryObjectByIso(newValue)
      if (country?.iso) {
        handleChange(country.iso, country)
      }
    },
    [getCountryObjectByIso, handleChange]
  )

  const fillData = useCallback(() => {
    if (!wasFilled.current) {
      wasFilled.current = true
      dataRef.current = getCountryData({
        lang: langRef.current,
        filter,
        sort: ccFilter as Extract<CountryFilterSet, 'Prioritized'>,
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
        const country = countries.find(({ i18n }) =>
          Object.values(i18n).some((s) => s.toLowerCase().includes(search))
        )
        if (country?.iso) {
          setHidden()
          handleChange(country.iso)
        }
      }
    },
    [handleChange]
  )

  useMemo(() => {
    setDisplayValue(
      props.path,
      getCountryObjectByIso(value)?.i18n?.[langRef.current]
    )
  }, [getCountryObjectByIso, props.path, setDisplayValue, value])

  const fieldBlockProps: FieldBlockProps = {
    forId: id,
    className: classnames('dnb-forms-field-select-country', className),
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
        mode="async"
        placeholder={placeholder}
        input_icon={false}
        data={dataRef.current}
        value={typeof value === 'string' ? value : null}
        disabled={disabled}
        on_show={fillData}
        on_focus={onFocusHandler}
        on_blur={handleBlur}
        on_change={handleCountryChange}
        on_type={onTypeHandler}
        stretch
        status={hasError ? 'error' : undefined}
        show_submit_button
        keep_selection
        autoComplete="country-name"
        no_animation={props.noAnimation}
        {...htmlAttributes}
      />
    </FieldBlock>
  )
}

type GetCountryData = {
  lang?: CountryLang
  filter?: Props['filterCountries']
  sort?: Extract<CountryFilterSet, 'Prioritized'>
  makeObject?: (
    country: CountryType,
    lang: string
  ) => {
    selectedKey: string
    selected_value?: string
    content: string
  }
}

export function getCountryData({
  lang = 'nb',
  filter = null,
  sort = null,
  makeObject = (country: CountryType, lang: string) => {
    const content = country.i18n[lang] ?? country.i18n.en
    return {
      selectedKey: country.iso,
      content,
    }
  },
}: GetCountryData = {}) {
  return countries
    .filter((country) => {
      if (typeof filter === 'function') {
        return filter(country)
      }

      return !filter
    })
    .sort(({ i18n: a }, { i18n: b }) => {
      if (sort === 'Prioritized') {
        const indexA = prioritizedCountries.indexOf(a['en'])
        const indexB = prioritizedCountries.indexOf(b['en'])

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

      return String(a[lang])?.localeCompare?.(b[lang], 'nb') // Always sort by nb, because åøæ (for Åland) is not in the en alphabet
    })
    .map((country) => makeObject(country, lang))
}

export function countryFilter(
  country: CountryType,
  filterCountries: (country: CountryType) => boolean,
  ccFilter: CountryFilterSet
) {
  let result = true

  if (ccFilter !== 'Prioritized') {
    switch (ccFilter) {
      case 'Scandinavia':
      case 'Nordic': {
        result = country.regions?.includes(ccFilter)
        break
      }
      case 'Europe': {
        result = country.continent.includes(ccFilter)
        break
      }
    }
  }

  if (result && filterCountries) {
    result = filterCountries(country)
  }

  return result
}

export function makeCountryFilterSet(ccFilter: CountryFilterSet) {
  return (country: CountryType) => {
    switch (ccFilter) {
      case 'Scandinavia':
      case 'Nordic':
        return country.regions?.includes(ccFilter)
      case 'Europe':
        return country.continent.includes(ccFilter)
    }
    return true
  }
}

SelectCountry._supportsSpacingProps = true
export default SelectCountry
