import React from 'react';
import type { Translation, TranslationLocale, TranslationCustomLocales, InternalLocale, TranslationFlatToObject } from './Context';
export type TranslationId = string;
export type TranslationIdAsFunction<T = TranslationCustomLocales> = (messages: T & Translation) => string;
export type TranslationArguments = Record<TranslationId, unknown>;
export type UseTranslationMessages<T = Translation> = TranslationId | Translation | TranslationCustomLocales | Record<TranslationLocale, T>;
export type UseTranslationArgs<T = Translation> = {
    messages?: UseTranslationMessages<T>;
    fallbackLocale?: TranslationLocale;
    base?: Translation;
    warnLabel?: string;
};
export default function useTranslation<T extends Record<string, unknown> = Translation>(messages?: UseTranslationMessages<T> | UseTranslationArgs<T>, args?: TranslationArguments): TranslationFlatToObject<T> & AdditionalReturnUtils;
export type CombineWithExternalTranslationsArgs = {
    translation: Translation;
    messages?: TranslationCustomLocales;
    locale?: InternalLocale;
};
export type AdditionalReturnUtils = {
    formatMessage: typeof formatMessage;
    renderMessage: typeof renderMessage;
    countries: Array<string>;
};
export type CombineWithExternalTranslationsReturn = Translation & TranslationCustomLocales & AdditionalReturnUtils;
export declare function useAdditionalUtils(): {
    assignUtils: (translations: CombineWithExternalTranslationsReturn) => CombineWithExternalTranslationsReturn;
};
export declare function combineWithExternalTranslations({ translation, messages, locale, }: CombineWithExternalTranslationsArgs): CombineWithExternalTranslationsReturn;
export declare function formatMessage(id: TranslationId | TranslationIdAsFunction, args?: TranslationArguments, messages?: TranslationCustomLocales): any;
export declare function renderMessage(text: string | Array<React.ReactNode>): string | React.ReactNode;
