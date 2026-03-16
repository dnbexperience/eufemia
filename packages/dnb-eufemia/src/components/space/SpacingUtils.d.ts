/**
 * Space helper
 *
 */
import type { SpaceType, SpacingUnknownProps, SpacingProps, SpaceTypesPositiveValuesType, SpaceTypesPositiveRemValuesType, InnerSpaceType } from './types';
type SpaceNumber = number;
type InnerSpacingProps = Omit<SpacingProps, 'innerSpace'> & {
    innerSpace?: InnerSpaceType;
};
export declare const spacingDefaultProps: SpacingProps;
export declare const spacePatterns: Record<SpaceTypesPositiveValuesType, SpaceTypesPositiveRemValuesType>;
export declare const calc: (...types: Array<SpaceType>) => any;
/**
 * Creates a valid space CSS style out from given space types
 *
 * @param props
 * @returns { '--space-b-l': '2rem', '--space-t-l': '1rem' }
 */
export declare const createSpacingProperties: (props: InnerSpacingProps) => React.CSSProperties;
/**
 * Creates a valid space CSS class out from given space types
 *
 * @param props
 * @param Element to check if it should be handled as inline
 * @returns "dnb-space__large dnb-space__small"
 */
export declare const createSpacingClasses: (props: SpacingProps
/**
 * To support typical not defined props form components
 */
 | SpacingUnknownProps, elementName?: string | null) => string[];
export declare const translateSpace: (type: SpaceType) => any;
export declare const splitTypes: (types: SpaceType | Array<SpaceType>) => SpaceType[] | (number | SpaceTypesPositiveValuesType)[];
export declare const sumTypes: (types: SpaceType | Array<SpaceType>) => any;
export declare const createTypeModifiers: (types: SpaceType) => Array<SpaceType>;
export declare const findType: (num: SpaceNumber) => SpaceType;
export declare const findTypeAll: (num: SpaceNumber) => Array<SpaceTypesPositiveValuesType | SpaceTypesPositiveRemValuesType>;
export declare const findNearestTypes: (num: SpaceNumber, multiply?: boolean) => any[];
export declare const isValidSpaceProp: (propName: string) => boolean;
export declare const removeSpaceProps: <Props extends SpacingProps>(props: Props) => Omit<Props, keyof SpacingProps>;
export declare const isInline: (elementName: string) => boolean;
export {};
