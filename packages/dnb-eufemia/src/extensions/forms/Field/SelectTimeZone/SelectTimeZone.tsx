import React, { useCallback, useContext, useMemo, useRef } from 'react'
import classnames from 'classnames'
import SharedContext from '../../../../shared/Context'
import FieldBlockContext from '../../FieldBlock/FieldBlockContext'
import { LOCALE } from '../../../../shared/defaults'
import { Autocomplete } from '../../../../components'
import { pickSpacingProps } from '../../../../components/flex/utils'
import listOfTimeZones, {
  prioritizedTimeZones,
  type TimeZoneType,
  type TimeZoneLang,
  type TimeZoneIdentifier,
} from '../../constants/timezones'
import useTimeZones from './useTimeZones'
import { useFieldProps } from '../../hooks'
import { FieldPropsWithExtraValue } from '../../types'
import FieldBlock, {
  Props as FieldBlockProps,
  FieldBlockWidth,
} from '../../FieldBlock'
import useTranslation from '../../hooks/useTranslation'
import { AutocompleteAllProps } from '../../../../components/autocomplete/Autocomplete'

export type { TimeZoneType }

export type Props = FieldPropsWithExtraValue<
  TimeZoneIdentifier,
  TimeZoneType,
  undefined | string
> & {
  /**
   * Use this prop to filter out certain timezones. The function receives the timezone object and should return a boolean. Returning `false` will omit the timezone.
   */
  filterTimeZones?: (timezone: TimeZoneType) => boolean

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

function SelectTimeZone(props: Props) {
  const sharedContext = useContext(SharedContext)
  const fieldBlockContext = useContext(FieldBlockContext)
  const {
    label: defaultLabel,
    placeholder: defaultPlaceholder,
    errorRequired,
  } = useTranslation().SelectTimeZone
  const lang = (sharedContext.locale || LOCALE).split(
    '-'
  )[0] as TimeZoneLang
  const { timezones } = useTimeZones()

  const getTimeZoneObjectByIdentifier = useCallback(
    (value: TimeZoneType['timezone']) => {
      const timezone = timezones.find(({ timezone: tz }) => value === tz)
      if (timezone?.i18n) {
        timezone['name'] = timezone.i18n[lang]
      }
      return timezone
    },
    [timezones, lang]
  )

  const provideAdditionalArgs = useCallback(
    (value: TimeZoneIdentifier) => {
      const timezone = getTimeZoneObjectByIdentifier(value)

      if (timezone?.timezone) {
        return timezone
      }
    },
    [getTimeZoneObjectByIdentifier]
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
    filterTimeZones,
  } = useFieldProps(preparedProps)

  const dataRef = useRef(null)
  const langRef = useRef(lang)
  const wasFilled = useRef(false)

  const filter = useCallback(
    (timezone: TimeZoneType) => {
      if (filterTimeZones) {
        return filterTimeZones(timezone)
      }
      return true
    },
    [filterTimeZones]
  )

  /**
   * We do not process the whole timezone list at the first render.
   * Only when the Autocomplete opens (focus).
   * To achieve this, we use memo instead of effect to update refs in sync.
   *
   * We set or update the data list depending on if the timezone identifier changes or lang changes.
   * We then update data set when value changes.
   */
  useMemo(() => {
    const isLangChange = lang !== langRef.current

    if (isLangChange || !wasFilled.current) {
      langRef.current = lang
      dataRef.current = getTimeZoneData({
        timezones,
        lang,
        filter: !wasFilled.current
          ? (tz) => tz.timezone === value
          : filter,
        sort: 'Prioritized',
      })

      // To force Autocomplete to re-evaluate the internal data
      if (isLangChange && value && typeof window !== 'undefined') {
        updateValue(null)
        window.requestAnimationFrame(() => {
          updateValue(value)
        })
      }
    }
  }, [lang, timezones, filter, value, updateValue])

  const handleTimeZoneChange = useCallback(
    ({
      data,
    }: {
      data: { selectedKey: string; timezone?: TimeZoneType }
    }) => {
      const newValue = data?.selectedKey
      const timezone =
        data?.timezone || getTimeZoneObjectByIdentifier(newValue)
      if (timezone?.timezone) {
        handleChange(timezone.timezone, timezone)
      }
    },
    [getTimeZoneObjectByIdentifier, handleChange]
  )

  const fillData = useCallback(() => {
    if (!wasFilled.current) {
      wasFilled.current = true
      dataRef.current = getTimeZoneData({
        timezones,
        lang: langRef.current,
        filter,
        sort: 'Prioritized',
      })
      forceUpdate()
    }
  }, [timezones, filter, forceUpdate])

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
        const timezone = timezones.find(({ i18n }) =>
          Object.values(i18n).some((s) => s.toLowerCase().includes(search))
        )
        if (timezone?.timezone) {
          setHidden()
          handleChange(timezone.timezone)
        }
      }
    },
    [timezones, handleChange]
  )

  useMemo(() => {
    if (path || itemPath) {
      setDisplayValue(
        getTimeZoneObjectByIdentifier(value)?.i18n?.[langRef.current]
      )
    }
  }, [
    getTimeZoneObjectByIdentifier,
    itemPath,
    path,
    setDisplayValue,
    value,
  ])

  const fieldBlockProps: FieldBlockProps = {
    forId: id,
    className: classnames('dnb-forms-field-select-timezone', className),
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
        on_change={handleTimeZoneChange}
        on_type={onTypeHandler}
        stretch
        selectall
        status={hasError ? 'error' : undefined}
        show_submit_button
        keep_selection
        autoComplete={autoComplete ?? 'off'}
        no_animation={noAnimation}
        {...htmlAttributes}
      />
    </FieldBlock>
  )
}

type GetTimeZoneData = {
  timezones: typeof listOfTimeZones
  lang?: TimeZoneLang
  filter?: Props['filterTimeZones']
  sort?: 'Prioritized'
  makeObject?: (
    timezone: TimeZoneType,
    lang: string
  ) => {
    selectedKey: string
    selected_value?: string
    search_content?: string | Array<string>
    content: string | Array<string>
    timezone?: TimeZoneType
  }
}

function formatTimeZoneOffset(timezone: string): string {
  try {
    const now = new Date()

    // Use Intl API to get offset
    try {
      const formatter = new Intl.DateTimeFormat('en', {
        timeZone: timezone,
        timeZoneName: 'shortOffset',
      })
      const parts = formatter.formatToParts(now)
      const offsetPart = parts.find((part) => part.type === 'timeZoneName')

      if (offsetPart?.value) {
        // Format like "GMT+1" or "GMT-5" -> "+1" or "-5"
        const match = offsetPart.value.match(/GMT([+-]\d+)/)
        if (match) {
          return match[1]
        }
      }
    } catch {
      // Fall through to manual calculation
    }

    // Manual calculation: compare UTC time with timezone time
    const utcDate = new Date(
      now.toLocaleString('en-US', { timeZone: 'UTC' })
    )
    const tzDate = new Date(
      now.toLocaleString('en-US', { timeZone: timezone })
    )
    const offset = Math.round(
      (tzDate.getTime() - utcDate.getTime()) / (1000 * 60 * 60)
    )

    return offset >= 0 ? `+${offset}` : `${offset}`
  } catch {
    return ''
  }
}

export function getTimeZoneData({
  timezones,
  lang = 'nb',
  filter = null,
  sort = null,
  makeObject = (timezone: TimeZoneType, lang: string) => {
    const name = timezone.i18n[lang] ?? timezone.i18n.en
    const offset = formatTimeZoneOffset(timezone.timezone)
    return {
      selectedKey: timezone.timezone,
      selected_value: `${timezone.timezone} (${offset})`,
      search_content: offset
        ? [offset, offset.replace('+', ''), name]
        : [name],
      content: offset ? [name, offset] : [name],
      timezone,
    }
  },
}: GetTimeZoneData) {
  const sortedTimeZones = timezones
    .filter((timezone) => {
      if (typeof filter === 'function') {
        return filter(timezone)
      }

      return !filter
    })
    .sort((timezoneA, timezoneB) => {
      if (sort === 'Prioritized') {
        const indexA = prioritizedTimeZones.indexOf(timezoneA.timezone)
        const indexB = prioritizedTimeZones.indexOf(timezoneB.timezone)

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

      return String(timezoneA.i18n[lang])?.localeCompare?.(
        timezoneB.i18n[lang],
        'nb'
      )
    })
    .map((timezone) => makeObject(timezone, lang))

  if (sortedTimeZones.length === 0) {
    return undefined
  }

  return sortedTimeZones
}

SelectTimeZone._supportsSpacingProps = true
export default SelectTimeZone
