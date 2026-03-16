/**
 * Web Context Context
 *
 */
import defaultLocales from './locales';
import type { ScrollViewProps } from '../fragments/scroll-view/ScrollView';
import type { AnchorProps } from '../components/Anchor';
import type { ButtonProps } from '../components/button/Button';
import type { AvatarProps } from '../components/avatar/Avatar';
import type { AvatarGroupProps } from '../components/avatar/AvatarGroup';
import type { BadgeProps } from '../components/badge/Badge';
import type { BreadcrumbProps } from '../components/breadcrumb/Breadcrumb';
import type { BreadcrumbItemProps } from '../components/breadcrumb/BreadcrumbItem';
import type { CheckboxProps } from '../components/Checkbox';
import type { InfoCardProps } from '../components/info-card/InfoCard';
import type { SliderProps } from '../components/slider/Slider';
import type { TagProps } from '../components/tag/Tag';
import type { TagGroupProps } from '../components/tag/TagGroup';
import type { TimelineProps } from '../components/timeline/Timeline';
import type { TimelineItemProps } from '../components/timeline/TimelineItem';
import type { VisuallyHiddenProps } from '../components/visually-hidden/VisuallyHidden';
import type { DrawerProps } from '../components/drawer/types';
import type { DialogProps } from '../components/dialog/types';
import type { TooltipProps } from '../components/tooltip/types';
import type { SectionProps } from '../components/section/Section';
import type { UploadProps } from '../components/upload/types';
import type { SkeletonProps, SkeletonShow } from '../components/Skeleton';
import type { HelpButtonProps } from '../components/HelpButton';
import type { TableProps } from '../components/Table';
import type { GlobalErrorProps } from '../components/GlobalError';
import type { ModalProps } from '../components/modal/types';
import type { AccordionProps } from '../components/Accordion';
import type { StepIndicatorProps } from '../components/StepIndicator';
import type { FormLabelProps } from '../components/FormLabel';
import type { InputProps } from '../components/Input';
import type { InputMaskedProps } from '../components/InputMasked';
import type { NumberFormatCurrency, NumberFormatAllProps } from '../components/NumberFormat';
import type { ProgressIndicatorProps } from '../components/progress-indicator/types';
import type { FormStatusProps } from '../components/FormStatus';
import type { LogoProps } from '../components/Logo';
import type { IconProps } from '../components/Icon';
import type { ListFormatProps } from '../components/list-format/ListFormat';
import type { IconPrimaryProps } from '../components/IconPrimary';
import type { SwitchProps } from '../components/Switch';
import type { TermDefinitionProps } from '../components/term-definition/TermDefinition';
import type { FormElementProps } from './helpers/filterValidProps';
import type { ThemeProps } from './Theme';
import type { FormsTranslation } from '../extensions/forms/hooks/useTranslation';
import type { DeepPartial } from './types';
import type { DatePickerAllProps } from '../components/DatePicker';
export type ContextComponents = {
    Button?: Partial<ButtonProps>;
    Anchor?: Partial<AnchorProps>;
    Avatar?: Partial<AvatarProps>;
    AvatarGroup?: Partial<AvatarGroupProps>;
    Badge?: Partial<BadgeProps>;
    Breadcrumb?: Partial<BreadcrumbProps>;
    BreadcrumbItem?: Partial<BreadcrumbItemProps>;
    Checkbox?: Partial<CheckboxProps>;
    InfoCard?: Partial<InfoCardProps>;
    Slider?: Partial<SliderProps>;
    Tag?: Partial<TagProps>;
    TagGroup?: Partial<TagGroupProps>;
    Timeline?: Partial<TimelineProps>;
    TimelineItem?: Partial<TimelineItemProps>;
    VisuallyHidden?: Partial<VisuallyHiddenProps>;
    Drawer?: Partial<DrawerProps>;
    Dialog?: Partial<DialogProps>;
    Tooltip?: Partial<TooltipProps>;
    Section?: Partial<SectionProps>;
    ScrollView?: Partial<ScrollViewProps>;
    Upload?: Partial<UploadProps>;
    Skeleton?: Partial<SkeletonProps>;
    HelpButton?: Partial<HelpButtonProps>;
    Table?: Partial<TableProps>;
    GlobalError?: Partial<GlobalErrorProps>;
    Modal?: Partial<ModalProps>;
    Accordion?: Partial<AccordionProps>;
    StepIndicator?: Partial<StepIndicatorProps>;
    FormLabel?: Partial<FormLabelProps>;
    Input?: Partial<InputProps>;
    InputMasked?: Partial<InputMaskedProps>;
    ProgressIndicator?: Partial<ProgressIndicatorProps>;
    FormStatus?: Partial<FormStatusProps>;
    Logo?: Partial<LogoProps>;
    Icon?: Partial<IconProps>;
    IconPrimary?: Partial<IconPrimaryProps>;
    DatePicker?: Partial<DatePickerAllProps>;
    ListFormat?: Partial<ListFormatProps>;
    Switch?: Partial<SwitchProps>;
    NumberFormat?: Partial<NumberFormatAllProps>;
    Pagination?: Partial<AccordionProps>;
    TermDefinition?: Partial<TermDefinitionProps>;
    formElement?: FormElementProps;
};
export type ContextProps = ContextComponents & {
    /**
     * Contains theme related properties, such as a theme name
     */
    theme?: ThemeProps;
    /**
     * Will enable all skeletons inside this provider/context scope
     */
    skeleton?: SkeletonShow;
    /**
     * Define what breakpoints should be used by the MediaQuery component and hook
     */
    breakpoints?: Record<string, string>;
    /**
     * Defines the locale (internal translation) used by some components
     */
    locale?: InternalLocale;
    /**
     * Internal translations used by the components and hooks
     */
    translation?: Translation;
    /**
     * Defines the currency used by the NumberFormat component
     */
    currency?: NumberFormatCurrency;
    /**
     * Defines the currencyDisplay used by the NumberFormat component
     */
    currencyDisplay?: string;
    /**
     * Update any given provider/context properties
     */
    update?: (props: ContextProps) => void;
    /**
     * Update any given provider/context properties, but only for the particular scope
     */
    updateCurrent?: (props: ContextProps) => void;
    /**
     * Update the used locale from within the context
     */
    setLocale?: (locale: InternalLocale) => void;
    /**
     * Update the used locale from within the context, but only for the particular scope
     */
    setCurrentLocale?: (locale: InternalLocale) => void;
    /**
     * Overwrite existing internal translation strings or define new strings via the Provider
     */
    translations?: Translations | TranslationCustomLocales;
    __context__?: Record<string, unknown>;
    updateTranslation?: (locale: InternalLocale, translation: Translation) => void;
    getTranslation?: (props: GetTranslationProps) => Translation;
};
export type GetTranslationProps = Partial<{
    lang?: InternalLocale | HTMLElement['lang'];
    locale?: InternalLocale;
}>;
export type Locale = TranslationLocale | 'en-US';
export type AnyLocale = string;
export type InternalLocale = Locale | AnyLocale;
export type Translations = Partial<Record<InternalLocale, Translation | TranslationFlat>> | Partial<Record<InternalLocale, FormsTranslation>>;
export type TranslationDefaultLocales = typeof defaultLocales;
export type TranslationLocale = keyof TranslationDefaultLocales;
export type TranslationValues = TranslationDefaultLocales[TranslationLocale];
export type TranslationCustomLocales = Record<never, string | Record<string, string>>;
/**
 * E.g. "HelpButton: { title: '...' }"
 */
export type Translation = DeepPartial<TranslationValues>;
/**
 * E.g. "HelpButton.title"
 */
export type TranslationFlat = Partial<Record<TranslationObjectToFlat<TranslationValues>, string>>;
export type TranslationFlatToObject<T> = T extends Record<string, unknown> ? {
    [K in keyof T as K extends `${infer First}.${string}` ? First : K]: K extends `${string}.${infer Rest}` ? TranslationFlatToObject<Record<Rest, T[K]>> : T[K];
} : T;
export type TranslationObjectToFlat<T, Prefix extends string = ''> = {
    [K in keyof T]: T[K] extends Record<string, unknown> ? TranslationObjectToFlat<T[K], `${Prefix}${K & string}.`> : `${Prefix}${K & string}`;
}[keyof T];
export declare function prepareContext<Props>(props?: ContextProps): Props & ContextProps;
declare const Context: import("react").Context<ContextProps>;
export default Context;
export declare function destructFlatTranslation<T>(source: TranslationFlat): T;
