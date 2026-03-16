import React from 'react';
import type { InternalLocale } from '../../shared/Context';
import type { UlAllProps } from '../../elements/Ul';
import type { OlAllProps } from '../../elements/Ol';
export type ListFormatProps = {
    /**
     * Formatting options for the value when variant is `text`.
     * See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/ListFormat/ListFormat
     */
    format?: Intl.ListFormatOptions;
    /**
     * Defines if the value should be displayed in list format (`ol`, `ul`) or regular text format in one line.
     * Default: `text`
     */
    variant?: 'ol' | 'ul' | 'text';
    /**
     * Defines the type of list styling used for list variants. Used together with variant `ol` and `ul`.
     * Variant `ol`: `a`, `A`, `i`, `I` and `1`.
     * Variant `ul`: `circle`, `disc` and `square`.
     * Default: `undefined`
     */
    listType?: 'a' | 'A' | 'i' | 'I' | '1' | 'circle' | 'disc' | 'square' | 'unstyled' | undefined;
    /**
     * The value to format as list.
     * Default: null
     */
    value?: Array<React.ReactNode>;
    /**
     * The children to format as list.
     * Default: null
     */
    children?: React.ReactNode;
};
declare function ListFormat(localProps: Omit<UlAllProps, 'value'> & Omit<OlAllProps, 'value'> & ListFormatProps): string | any[] | import("react/jsx-runtime").JSX.Element;
export declare function listFormat(list: Array<React.ReactNode>, { locale, format, }?: {
    locale?: InternalLocale;
    format?: ListFormatProps['format'];
}): string | any[];
export default ListFormat;
