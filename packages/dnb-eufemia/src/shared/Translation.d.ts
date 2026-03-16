import React from 'react';
import type { TranslationArguments, TranslationId, TranslationIdAsFunction } from './useTranslation';
import type { TranslationCustomLocales, TranslationFlatToObject } from './Context';
export type TranslationProps<T = TranslationCustomLocales> = {
    id?: TranslationId | TranslationIdAsFunction<TranslationFlatToObject<T>>;
    children?: TranslationId;
} & TranslationArguments;
type TranslationFn = <T = TranslationCustomLocales>(props: TranslationProps<T>) => React.JSX.Element;
export type TranslationComponent = TranslationFn & {
    withTypes: <T = TranslationCustomLocales>() => (props: TranslationProps<T>) => React.JSX.Element;
};
declare const Translation: TranslationComponent;
export default Translation;
export declare function mergeTranslations(...translations: Array<Record<string, any>>): Record<string, any>;
