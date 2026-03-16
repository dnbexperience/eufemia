import React from 'react';
import type { IconIcon } from '../icon/Icon';
import type { ImgProps } from '../../elements/img/Img';
import type { SpacingProps } from '../../shared/types';
import type { SkeletonShow } from '../skeleton/Skeleton';
import AvatarGroup from './AvatarGroup';
export type AvatarSizes = 'small' | 'medium' | 'large' | 'x-large';
export type AvatarVariants = 'primary' | 'secondary' | 'tertiary';
export type AvatarImgProps = ImgProps;
export interface AvatarProps extends Omit<React.HTMLProps<HTMLElement>, 'size'> {
    /**
     * Used in combination with `src` to provide an alt attribute for the `img` element.
     * Default: null
     */
    alt?: string;
    /**
     * Custom className on the component root
     * Default: null
     */
    className?: string;
    /**
     * Skeleton should be applied when loading content
     * Default: null
     */
    skeleton?: SkeletonShow;
    /**
     * The content of the component. Can be used instead of prop "data".
     * Default: null
     */
    children?: React.ReactNode;
    /**
     * The size of the component.
     * Default: medium.
     */
    size?: AvatarSizes;
    /**
     * Specifies the path to the image
     * Default: null
     */
    src?: string;
    /**
     * Props applied to the `img` element if the component is used to display an image.
     * Default: null
     */
    imgProps?: ImgProps;
    /**
     * An icon name or component
     */
    icon?: IconIcon;
    /**
     * The variant of the component.
     * Default: primary.
     */
    variant?: AvatarVariants;
    /**
     * If an avatar is hidden from the screen reader (by setting aria-hidden={true}) or if label is given, typical inside a table or dl (definition list), then you can disable Avatar.Group as a dependent of Avatar.
     * Use `true` to omit the `Avatar group required:` warning.
     * Default: null
     */
    hasLabel?: boolean;
    /**
     * Define a custom background color, instead of a variant. Use a Eufemia color.
     * Default: undefined
     */
    backgroundColor?: string;
    /**
     * Define a custom color to compliment the backgroundColor. Use a Eufemia color.
     * Default: undefined
     */
    color?: string;
}
declare const Avatar: {
    (localProps: AvatarProps & SpacingProps): import("react/jsx-runtime").JSX.Element;
    Group: (localProps: import("./AvatarGroup").AvatarGroupProps & SpacingProps) => import("react/jsx-runtime").JSX.Element;
};
export { AvatarGroup };
export default Avatar;
