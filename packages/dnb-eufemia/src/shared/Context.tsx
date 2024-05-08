/**
 * Web Context Context
 *
 */

import React from 'react'
import { LOCALE, CURRENCY, CURRENCY_DISPLAY } from './defaults'
import defaultLocales from './locales'
import { extend } from './component-helper'

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

import type { FormElementProps } from './helpers/filterValidProps'
import type { ThemeProps } from './Theme'
import type { FormsTranslation } from '../extensions/forms/hooks/useTranslation'
import type { DeepPartial } from './types'

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
   * Provide your own translations. Use the same format as defined in the translation files
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
  translations?: Locales | TranslationCustomLocales

  /**
   * @deprecated Use `translations` instead
   */
  locales?: Locales | TranslationCustomLocales

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
export type ComponentTranslationsName = keyof ContextComponents | string
export type ComponentTranslation = string
export type Locales =
  | Partial<Record<InternalLocale, Translation | TranslationFlat>>
  | Partial<Record<InternalLocale, FormsTranslation>>
export type TranslationDefaultLocales = typeof defaultLocales
export type TranslationLocale = keyof TranslationDefaultLocales
export type TranslationKeys =
  keyof TranslationDefaultLocales[TranslationLocale]
export type TranslationValues =
  TranslationDefaultLocales[TranslationLocale] & {
    Forms?: Record<string, unknown>
  }
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
export type TranslationFlat = Record<
  ComponentTranslationsName,
  TranslationKeys | ComponentTranslation
>

export function prepareContext<Props>(
  props: ContextProps = {}
): Props & ContextProps {
  const locales: Locales =
    props.translations || props.locales
      ? extend(defaultLocales, props.translations || props.locales)
      : defaultLocales

  if (props.__context__) {
    Object.assign(props, props.__context__)
    delete props.__context__
  }

  const key = handleLocaleFallbacks(props.locale || LOCALE, locales)
  const translation = locales[key] || defaultLocales[LOCALE] || {} // here we could use Object.freeze

  /**
   * The code above adds support for strings, defined like:
   * {
   *    "Modal.close_title": "Lukk",
   * }
   */
  if (locales[key]) {
    locales[key] = destruct(locales[key] as TranslationFlat, translation)
  }

  const context = {
    // We may use that in future
    updateTranslation: (locale, translation) => {
      context.translation = (context.translations || context.locales)[
        locale
      ] = translation
    },
    getTranslation: (props) => {
      if (props) {
        const lang = props.lang || props.locale
        if (
          lang &&
          (context.translations || context.locales)[lang] &&
          lang !== key
        ) {
          return (context.translations || context.locales)[lang]
        }
      }
      return context.translation
    },

    locales,
    locale: null,
    breakpoints: null,
    skeleton: null,

    ...props,

    /**
     * Make sure we set this after props, since we update this one!
     */
    translation,
  } as Props & ContextProps

  return context
}

function handleLocaleFallbacks(
  locale: InternalLocale | AnyLocale,
  locales: Locales
) {
  if (!locales[locale]) {
    if (locale === 'en' || locale.split('-')[0] === 'en') {
      return 'en-GB'
    }
  }
  return locale
}

// If no provider is given, we use the default context from here
const Context = React.createContext<ContextProps>(
  prepareContext({
    locale: LOCALE,
    currency: CURRENCY,
    currency_display: CURRENCY_DISPLAY,
  })
)

export default Context

function destruct(
  source: TranslationFlat,
  validKeys: Record<string, unknown>
): TranslationFlat {
  for (const k in source) {
    if (String(k).includes('.')) {
      const list = k.split('.')

      if (validKeys[list[0]]) {
        const val = source[k]
        const last = list.length - 1

        list.forEach((k, i) => {
          source[k] = i === last ? val : source[k]

          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          source = source[k] || {}
        })
      }
    }
  }

  return source
}
