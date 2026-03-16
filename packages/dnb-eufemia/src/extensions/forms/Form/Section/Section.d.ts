import React from 'react';
import type { SectionContextState } from './SectionContext';
import type { Props as DataContextProps } from '../../DataContext/Provider';
import type { ContainerMode } from './containers/SectionContainer';
import type { Path, FieldProps, Schema } from '../../types';
import type { JsonObject } from '../../utils/json-pointer';
import type { SharedFieldBlockProps } from '../../FieldBlock';
export type OverwritePropsDefaults = {
    [key: Path]: (FieldProps & SharedFieldBlockProps) | OverwritePropsDefaults;
};
export type SectionBaseProps<overwriteProps = OverwritePropsDefaults, Data extends JsonObject = JsonObject> = {
    /**
     * Path to the section.
     * When defined, fields inside the section will get this path as a prefix of their own path.
     */
    path?: Path;
    /**
     * Overwrite field props for the section.
     */
    overwriteProps?: overwriteProps | OverwritePropsDefaults;
    /**
     * Makes all fields inside it required.
     */
    required?: boolean;
    /**
     * If set to `true`, the whole section will be validated initially. All fields will then automatically get `validateInitially` and show their error messages. Can be useful in combination with `containerMode="auto"`.
     */
    validateInitially?: boolean;
    /**
     * Defines the container mode. Can be `view`, `edit` or `auto`.
     * When set to `auto`, the mode will initially be "edit" if fields contain errors.
     * Defaults to `auto`.
     */
    containerMode?: ContainerMode;
    /**
     * Disables editing for the section.
     * When set to `true`, the section will stay in view mode even if an EditContainer is provided.
     * Defaults to `false`.
     */
    disableEditing?: boolean;
    /**
     * Only for internal use and undocumented for now.
     * Prioritize error techniques for the section.
     * Can be `fieldSchema`, `sectionSchema` or `contextSchema.
     */
    errorPrioritization?: SectionContextState['errorPrioritization'];
} & Pick<DataContextProps<Data>, 'data' | 'defaultData' | 'onChange' | 'translations'>;
export type SectionProps<overwriteProps = OverwritePropsDefaults, Data extends JsonObject = JsonObject> = SectionBaseProps<overwriteProps, Data> & {
    /**
     * Schema to validate the section data.
     * Accepts AJV or Zod schemas and behaves like the schema passed to Form.Handler.
     */
    schema?: Schema | ((props: SectionBaseProps<overwriteProps, Data>) => Schema);
};
export type LocalProps<overwriteProps = OverwritePropsDefaults> = SectionProps<overwriteProps> & {
    children: React.ReactNode;
};
declare function SectionComponent<overwriteProps = OverwritePropsDefaults>(props: LocalProps<overwriteProps>): import("react/jsx-runtime").JSX.Element;
declare namespace SectionComponent {
    var Toolbar: typeof import("./Toolbar").default;
    var ViewContainer: typeof import("./ViewContainer").default;
    var EditContainer: typeof import("./EditContainer").default;
}
export default SectionComponent;
