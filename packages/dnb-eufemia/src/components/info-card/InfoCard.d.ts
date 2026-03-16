import React from 'react';
import type { ButtonProps } from '../button/Button';
import type { IconIcon } from '../icon/Icon';
import type { ImgProps } from '../../elements/img/Img';
import type { SkeletonShow } from '../skeleton/Skeleton';
import type { SpacingProps } from '../../shared/types';
export interface InfoCardProps {
    /**
     * Used in combination with `src` to provide an alt attribute for the `img` element.
     * Default: null
     */
    alt?: React.ReactNode;
    /**
     * Aligns the content to center, rather than left
     * Default: false
     */
    centered?: boolean;
    /**
     * Determines whether to display a drop shadow around the card.
     * Default: true
     */
    dropShadow?: boolean;
    /**
     * Replace the default icon with custom icon.
     * Default: Lightbulb (icon)
     */
    icon?: IconIcon;
    /**
     * Props applied to the `img` element if the component is used to display an image. Replace the 'icon'
     * Default: null
     */
    imgProps?: ImgProps;
    /**
     * Skeleton should be applied when loading content
     * Default: null
     */
    skeleton?: SkeletonShow;
    /**
     * Stretch the card to fill the container
     */
    stretch?: boolean;
    /**
     * Specifies the path to the image
     * Default: null
     */
    src?: string;
    /**
     * The text content of the InfoCard
     * Default: null
     */
    text?: React.ReactNode;
    /**
     * Can be used to add custom content, which is displayed/rendered between the `text` property and buttons.
     * Default: null
     */
    children?: React.ReactNode;
    /**
     * Component title
     * Default: null
     */
    title?: React.ReactNode;
    /**
     * Is called when the close button is clicked
     * Default: null
     */
    onClose?: React.MouseEventHandler<HTMLButtonElement>;
    /**
     * The text of the close button.
     * Default: null
     */
    closeButtonText?: React.ReactNode;
    /**
     * Is called when the accept button is clicked
     * Default: null
     */
    onAccept?: React.MouseEventHandler<HTMLButtonElement>;
    /**
     * The text of the accept button.
     * Default: null
     */
    acceptButtonText?: React.ReactNode;
    /**
     * Additional attributes for the close button.
     * Default: null
     */
    closeButtonAttributes?: ButtonProps;
    /**
     * Additional attributes for the accept button
     * Default: null
     */
    acceptButtonAttributes?: ButtonProps;
}
export type InfoCardAllProps = InfoCardProps & Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> & SpacingProps;
export declare const defaultProps: {
    centered: boolean;
    dropShadow: boolean;
    skeleton: boolean;
    icon: (props: any) => import("react/jsx-runtime").JSX.Element;
};
declare const InfoCard: (localProps: InfoCardAllProps) => import("react/jsx-runtime").JSX.Element;
export default InfoCard;
