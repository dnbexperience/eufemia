/**
 * Web Context Context
 *
 */

import { createContext } from 'react'
import { LOCALE, CURRENCY, CURRENCY_DISPLAY } from './defaults'
import defaultLocales from './locales'
import { extendDeep } from './component-helper'
import pointer from '../extensions/forms/utils/json-pointer'

// All TypeScript based Eufemia elements
import type { ScrollViewProps } from '../fragments/scroll-view/ScrollView'

// All TypeScript based Eufemia components
import type { AnchorProps } from '../components/Anchor'
import type { ButtonProps } from '../components/button/Button'
import type { AvatarProps } from '../components/avatar/Avatar'
import type { AvatarGroupProps } from '../components/avatar/AvatarGroup'
import type { BadgeProps } from '../components/badge/Badge'
import type { BreadcrumbProps } from '../components/breadcrumb/Breadcrumb'
import type { BreadcrumbItemProps } from '../components/breadcrumb/BreadcrumbItem'
import type { CheckboxProps } from '../components/Checkbox'
import type { InfoCardProps } from '../components/info-card/InfoCard'
import type { SliderProps } from '../components/slider/Slider'
import type { TagProps } from '../components/tag/Tag'
import type { TagGroupProps } from '../components/tag/TagGroup'
import type { TimelineProps } from '../components/timeline/Timeline'
import type { TimelineItemProps } from '../components/timeline/TimelineItem'
import type { VisuallyHiddenProps } from '../components/visually-hidden/VisuallyHidden'
import type { DrawerProps } from '../components/drawer/types'
import type { DialogProps } from '../components/dialog/types'
import type { TooltipProps } from '../components/tooltip/types'
import type { SectionProps } from '../components/section/Section'
import type { FormRowProps } from '../components/form-row/FormRowHelpers'
import type { UploadProps } from '../components/upload/types'
import type { SkeletonProps, SkeletonShow } from '../components/Skeleton'
import type { HelpButtonProps } from '../components/HelpButton'
import type { TableProps } from '../components/Table'
import type { GlobalErrorProps } from '../components/GlobalError'
import type { ModalProps } from '../components/modal/types'
import type { AccordionProps } from '../components/Accordion'
import type { StepIndicatorProps } from '../components/StepIndicator'
import type { FormLabelProps } from '../components/FormLabel'
import type { InputProps } from '../components/Input'
import type { NumberFormatCurrency } from '../components/NumberFormat'
import type { ProgressIndicatorProps } from '../components/progress-indicator/types'
import type { FormStatusProps } from '../components/FormStatus'
import type { LogoProps } from '../components/Logo'
import type { IconProps } from '../components/Icon'
import type { IconPrimaryProps } from '../components/IconPrimary'
import { SwitchProps } from '../components/Switch'

import type { FormElementProps } from './helpers/filterValidProps'
import type { ThemeProps } from './Theme'
import type { FormsTranslation } from '../extensions/forms/hooks/useTranslation'
import type { DeepPartial } from './types'
import { DatePickerProps } from '../components/DatePicker'

export type ContextComponents = {
  Button?: Partial<ButtonProps>
  Anchor?: Partial<AnchorProps>
  Avatar?: Partial<AvatarProps>
  AvatarGroup?: Partial<AvatarGroupProps>
  Badge?: Partial<BadgeProps>
  Breadcrumb?: Partial<BreadcrumbProps>
  BreadcrumbItem?: Partial<BreadcrumbItemProps>
  Checkbox?: Partial<CheckboxProps>
  InfoCard?: Partial<InfoCardProps>
  Slider?: Partial<SliderProps>
  Tag?: Partial<TagProps>
  TagGroup?: Partial<TagGroupProps>
  Timeline?: Partial<TimelineProps>
  TimelineItem?: Partial<TimelineItemProps>
  VisuallyHidden?: Partial<VisuallyHiddenProps>
  Drawer?: Partial<DrawerProps>
  Dialog?: Partial<DialogProps>
  Tooltip?: Partial<TooltipProps>
  Section?: Partial<SectionProps>
  ScrollView?: Partial<ScrollViewProps>
  Upload?: Partial<UploadProps>
  Skeleton?: Partial<SkeletonProps>
  HelpButton?: Partial<HelpButtonProps>
  Table?: Partial<TableProps>
  GlobalError?: Partial<GlobalErrorProps>
  Modal?: Partial<ModalProps>
  Accordion?: Partial<AccordionProps>
  StepIndicator?: Partial<StepIndicatorProps>
  FormLabel?: Partial<FormLabelProps>
  Input?: Partial<InputProps>
  ProgressIndicator?: Partial<ProgressIndicatorProps>
  FormStatus?: Partial<FormStatusProps>
  Logo?: Partial<LogoProps>
  Icon?: Partial<IconProps>
  IconPrimary?: Partial<IconPrimaryProps>
  DatePicker?: Partial<DatePickerProps>

  Switch?: Partial<SwitchProps>
  // -- TODO: Not converted yet --
  NumberFormat?: Record<string, unknown>
  Pagination?: Record<string, unknown>

  /**
   * @deprecated – can be removed in v11
   */
  FormRow?: FormRowProps

  // Common props
  formElement?: FormElementProps
}

export type ContextProps = ContextComponents & {
  // -- All TypeScript based Eufemia components --

  // -- Global properties --

  /**
   * Contains theme related properties, such as a theme name
   */
  theme?: ThemeProps

  /**
   * Will enable all skeletons inside this provider/context scope
   */
  skeleton?: SkeletonShow

  /**
   * Define what breakpoints should be used by the MediaQuery component and hook
   */
  breakpoints?: Record<string, string>

  /**
   * Defines the locale (internal translation) used by some components
   */
  locale?: InternalLocale

  /**
   * Internal translations used by the components and hooks
   */
  translation?: Translation

  /**
   * Defines the currency used by the NumberFormat component
   */
  currency?: NumberFormatCurrency

  /**
   * Defines the currencyDisplay used by the NumberFormat component
   */
  currency_display?: string

  /**
   * Update any given provider/context properties
   */
  update?: (props: ContextProps) => void

  /**
   * Update any given provider/context properties, but only for the particular scope
   */
  updateCurrent?: (props: ContextProps) => void

  /**
   * Update the used locale from within the context
   */
  setLocale?: (locale: InternalLocale) => void

  /**
   * Update the used locale from within the context, but only for the particular scope
   */
  setCurrentLocale?: (locale: InternalLocale) => void

  /**
   * Overwrite existing internal translation strings or define new strings via the Provider
   */
  translations?: Translations | TranslationCustomLocales

  /**
   * @deprecated Use `translations` instead
   */
  locales?: Translations | TranslationCustomLocales

  // -- For internal use --
  __context__?: Record<string, unknown>
  updateTranslation?: (
    locale: InternalLocale,
    translation: Translation
  ) => void
  getTranslation?: (props: GetTranslationProps) => Translation
}

export type GetTranslationProps = Partial<{
  lang?: InternalLocale | HTMLElement['lang']
  locale?: InternalLocale
}>

export type Locale = TranslationLocale | 'en-US'
export type AnyLocale = string
export type InternalLocale =
  | Locale
  // more strict type definitions than string breaks applications using React Intl.
  | AnyLocale
export type Translations =
  | Partial<Record<InternalLocale, Translation | TranslationFlat>>
  | Partial<Record<InternalLocale, FormsTranslation>>
export type TranslationDefaultLocales = typeof defaultLocales
export type TranslationLocale = keyof TranslationDefaultLocales
export type TranslationValues =
  TranslationDefaultLocales[TranslationLocale]
export type TranslationCustomLocales = Record<
  never,
  string | Record<string, string>
>

/**
 * E.g. "HelpButton: { title: '...' }"
 */
export type Translation = DeepPartial<TranslationValues>

/**
 * E.g. "HelpButton.title"
 */
export type TranslationFlat = Partial<
  Record<TranslationObjectToFlat<TranslationValues>, string>
>

export type TranslationFlatToObject<T> = T extends Record<string, unknown>
  ? {
      // eslint-disable-next-line
      [K in keyof T as K extends `${infer First}.${infer Rest}`
        ? First
        : // eslint-disable-next-line
          K]: K extends `${infer First}.${infer Rest}`
        ? TranslationFlatToObject<Record<Rest, T[K]>>
        : T[K]
    }
  : T

export type TranslationObjectToFlat<T, Prefix extends string = ''> = {
  [K in keyof T]: T[K] extends Record<string, unknown>
    ? TranslationObjectToFlat<T[K], `${Prefix}${K & string}.`>
    : `${Prefix}${K & string}`
}[keyof T]

export function prepareContext<Props>(
  props: ContextProps = {}
): Props & ContextProps {
  if (props?.__context__) {
    props = Object.assign({}, props, props.__context__)
    delete props.__context__
  }

  const translations: Translations =
    props.translations || props.locales
      ? extendDeep({}, defaultLocales, props.translations || props.locales)
      : extendDeep({}, defaultLocales)

  const localeWithFallback = handleLocaleFallbacks(
    props.locale || LOCALE,
    props.translations || props.locales
  )

  /**
   * The code above adds support for strings, defined like:
   * {
   *    "Modal.close_title": "Lukk",
   * }
   */
  for (const locale in translations) {
    translations[locale] = destructFlatTranslation(
      translations[locale] as TranslationFlat
    )
  }

  const translation =
    translations[localeWithFallback] || defaultLocales[LOCALE] || {}

  const context = {
    ...props,
    updateTranslation: (locale, newTranslations) => {
      context.translation =
        newTranslations[locale] || newTranslations[LOCALE]
      context.translations = newTranslations

      if (context.locales) {
        context.locales = context.translations
      }
    },
    getTranslation: (localProps) => {
      if (localProps) {
        const locale = localProps.lang || localProps.locale
        if (
          locale &&
          (context.translations || context.locales)[locale] &&
          locale !== localeWithFallback
        ) {
          const tr = context.translations || context.locales
          return tr[locale]
        }
      }
      return context.translation || defaultLocales[LOCALE]
    },

    /**
     * Make sure we set this after props, since we update this one!
     */
    locales: translations, // @deprecated – can be removed in v11
    translations,
    translation,
  } as Props & ContextProps

  return { ...context }
}

function handleLocaleFallbacks(
  locale: InternalLocale | AnyLocale,
  translations: Translations = {}
) {
  if (locale === 'en' || String(locale).split('-')[0] === 'en') {
    return 'en-GB'
  }
  return translations[locale] ? locale : LOCALE
}

// If no provider is given, we use the default context from here
const Context = createContext<ContextProps>(
  prepareContext({
    locale: LOCALE,
    currency: CURRENCY,
    currency_display: CURRENCY_DISPLAY,
  })
)

export default Context

export function destructFlatTranslation(source: TranslationFlat) {
  let hasFlatTr = false
  const destructed = {}

  for (const k in source) {
    if (String(k).includes('.')) {
      pointer.set(destructed, '/' + k.replace(/\./g, '/'), source[k])
      hasFlatTr = true
    }
  }

  if (hasFlatTr) {
    return extendDeep({}, source, destructed)
  }

  return source
}
