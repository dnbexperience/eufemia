import type { TranslationFlatToObject, TranslationObjectToFlat } from '../../../shared/Context';
import type { AdditionalReturnUtils } from '../../../shared/useTranslation';
import type { DeepPartial } from '../../../shared/types';
import formsLocales from '../constants/locales';
export type FormsTranslationDefaultLocales = typeof formsLocales;
export type FormsTranslationLocale = keyof FormsTranslationDefaultLocales;
export type FormsTranslationKeys = keyof FormsTranslationDefaultLocales[FormsTranslationLocale];
export type FormsTranslationValues = FormsTranslationDefaultLocales[FormsTranslationLocale];
export type FormsTranslation = DeepPartial<FormsTranslationDefaultLocales[FormsTranslationLocale]>;
export type FormsTranslationFlat = TranslationObjectToFlat<FormsTranslation>;
type CustomLocales = Partial<Record<FormsTranslationLocale, FormsTranslation>>;
export type UseTranslationArgs<T = FormsTranslation> = {
    messages?: FormsTranslation | CustomLocales | Record<FormsTranslationLocale, T>;
    fallbackLocale?: FormsTranslationLocale;
};
export default function useTranslation<T = FormsTranslation>(messagesOrArgs?: UseTranslationArgs<T> | FormsTranslation | CustomLocales | Record<FormsTranslationLocale, T>): TranslationFlatToObject<T> & AdditionalReturnUtils;
export {};
