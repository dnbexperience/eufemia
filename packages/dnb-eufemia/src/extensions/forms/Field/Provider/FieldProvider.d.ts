import React from 'react';
import type { Props as DataContextProps } from '../../DataContext/Provider';
import type { FormStatusProps } from '../../../../components/FormStatus';
import type { ContextProps } from '../../../../shared/Context';
import type { FieldProps, Path } from '../../types';
import type { JsonObject } from '../../utils';
export type FieldProviderProps = FieldProps & {
    children: React.ReactNode;
    /**
     * Locale to use for all nested Eufemia components
     */
    locale?: DataContextProps<JsonObject>['locale'];
    /**
     * Provide your own translations. Use the same format as defined in the translation files
     */
    translations?: DataContextProps<JsonObject>['translations'];
    /** For internal use only */
    overwriteProps?: {
        [key: Path]: FieldProps;
    };
    /** For internal use only */
    formElement?: ContextProps['formElement'];
    /** For internal use only */
    FormStatus?: {
        globalStatus: FormStatusProps;
    };
};
declare function FieldProviderProvider(props: FieldProviderProps): import("react/jsx-runtime").JSX.Element;
export default FieldProviderProvider;
