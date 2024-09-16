import React, { useCallback, useContext, useMemo } from 'react'
import classnames from 'classnames'
import SharedContext from '../../../../shared/Context'
import { Autocomplete, HelpButton } from '../../../../components'
import { pickSpacingProps } from '../../../../components/flex/utils'
import countries, {
  prioritizedCountries,
  type CountryType,
  type CountryLang,
} from '../../constants/countries'
import { useFieldProps } from '../../hooks'
import {
  FieldBlockWidth,
  FieldHelpProps,
  FieldPropsWithExtraValue,
} from '../../types'
import FieldBlock from '../../FieldBlock'
import useErrorMessage from '../../hooks/useErrorMessage'
import useTranslation from '../../hooks/useTranslation'

export type CountryFilterSet =
  | 'Scandinavia'
  | 'Nordic'
  | 'Europe'
  | 'Prioritized'

export type Props = FieldHelpProps &
  FieldPropsWithExtraValue<string, CountryType, undefined | string> & {
    countries?: CountryFilterSet

    // Styling
    width?: FieldBlockWidth

    /**
     * For internal use only.
     *
     * @param country
     * @returns boolean
     */
    filterCountries?: (country: CountryType) => boolean

    /**
     * For internal testing purposes
     */
    noAnimation?: boolean
  }

function SelectCountry(props: Props) {
  const sharedContext = useContext(SharedContext)
  const translations = useTranslation().SelectCountry
  const lang = sharedContext.locale?.split('-')[0] as CountryLang

  const transformAdditionalArgs = (additionalArgs: CountryType, value) => {
    const country = countries.find(({ iso }) => value === iso)
    if (country?.iso) {
      return country
    } else {
      return additionalArgs
    }
  }

  const errorMessages = useErrorMessage(props.path, props.errorMessages, {
    required: translations.errorRequired,
  })

  const defaultProps: Partial<Props> = {
    errorMessages,
  }
  const preparedProps: Props = {
    ...defaultProps,
    ...props,
    transformAdditionalArgs,
  }

  const {
    className,
    placeholder = translations.placeholder,
    label = translations.label,
    countries: ccFilter = 'Prioritized',
    info,
    warning,
    error,
    hasError,
    disabled,
    value,
    width = 'large',
    help,
    htmlAttributes,
    handleFocus,
    handleBlur,
    handleChange,
    updateValue,
    forceUpdate,
    filterCountries = ccFilter !== 'Prioritized'
      ? makeCountryFilterSet(ccFilter)
      : undefined,
  } = useFieldProps(preparedProps)

  const dataRef = React.useRef(null)
  const langRef = React.useRef(lang)
  const wasFilled = React.useRef(false)

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
          : filterCountries,
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
  }, [lang, filterCountries, ccFilter, updateValue, value])

  const handleCountryChange = useCallback(
    ({ data }: { data: { selectedKey: string } }) => {
      const newValue = data?.selectedKey
      const country = countries.find(({ iso }) => newValue === iso)
      if (country?.iso) {
        handleChange(country.iso)
      }
    },
    [handleChange]
  )

  const fillData = useCallback(() => {
    if (!wasFilled.current) {
      wasFilled.current = true
      dataRef.current = getCountryData({
        lang: langRef.current,
        filter: filterCountries,
        sort: ccFilter as Extract<CountryFilterSet, 'Prioritized'>,
      })
      forceUpdate()
    }
  }, [ccFilter, filterCountries, forceUpdate])

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

  return (
    <FieldBlock
      className={classnames('dnb-forms-field-select-country', className)}
      width={width}
      info={info}
      warning={warning}
      error={error}
      {...pickSpacingProps(props)}
    >
      <Autocomplete
        placeholder={placeholder}
        label_direction="vertical"
        label={label}
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
        suffix={
          help ? (
            <HelpButton title={help.title}>{help.content}</HelpButton>
          ) : undefined
        }
        autoComplete="country-name"
        no_animation={props.noAnimation}
        keepSelectIndexOnDataChange
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

      return a[lang].localeCompare(b[lang])
    })
    .map((country) => makeObject(country, lang))
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
