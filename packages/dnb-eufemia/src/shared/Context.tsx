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

import type { NumberFormatCurrency } from '../components/NumberFormat'

import type { FormElementProps } from './helpers/filterValidProps'
import type { ThemeProps } from './Theme'

export type ContextComponents = {
  Button?: Partial<ButtonProps>
  Anchor?: Partial<AnchorProps>
  Avatar?: Partial<AvatarProps>
  AvatarGroup?: Partial<AvatarGroupProps>
  Badge?: Partial<BadgeProps>
  Breadcrumb?: Partial<BreadcrumbProps>
  BreadcrumbItem?: Partial<BreadcrumbItemProps>
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
  locale?: Locale

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
  setLocale?: (locale: Locale) => void

  /**
   * Update the used locale from within the context, but only for the particular scope
   */
  setCurrentLocale?: (locale: Locale) => void

  // -- For internal use --
  locales?: Locales
  __context__?: Record<string, unknown>
  updateTranslation?: (locale: Locale, translation: Translation) => void
  getTranslation?: (props: GetTranslationProps) => Translation
}

export type GetTranslationProps = Partial<{
  lang?: Locale
  locale?: Locale
}>

export type Locale = string | 'nb-NO' | 'en-GB' | 'en-US'
export type ComponentTranslationsName = string | keyof ContextComponents
export type ComponentTranslation = string
export type ComponentTranslations = Record<string, ComponentTranslation>
export type Locales = Record<Locale, Translation | TranslationConsumer>
export type Translation = Record<
  /**
   * Support only "HelpButton"
   */
  ComponentTranslationsName,
  ComponentTranslations
>
export type TranslationConsumer = Record<
  /**
   * Support "HelpButton.title"
   */
  ComponentTranslationsName,
  ComponentTranslation | ComponentTranslations
>

export function prepareContext<Props>(
  props: ContextProps = {}
): Props & ContextProps {
  const locales: Locales = props.locales
    ? extend(defaultLocales, props.locales)
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
    locales[key] = destruct(locales[key], translation)
  }

  const context = {
    // We may use that in future
    updateTranslation: (locale: string, translation: Translation) => {
      context.translation = context.locales[locale] = translation
    },
    getTranslation: (props: GetTranslationProps) => {
      if (props) {
        const lang = props.lang || props.locale
        if (lang && context.locales[lang] && lang !== key) {
          return context.locales[lang]
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

function handleLocaleFallbacks(locale: Locale, locales: Locales) {
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
  source: TranslationConsumer,
  validKeys: Record<string, unknown>
): TranslationConsumer {
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

        // If the root object is frozen, then use this
        // let lastObj = { ...source }
        // list.forEach((k, i) => {
        //   lastObj[k] = i === last ? val : lastObj[k] // we may have to create a new object here instead?
        //   lastObj = lastObj[k]
        // })
      }
    }
  }

  return source
}
