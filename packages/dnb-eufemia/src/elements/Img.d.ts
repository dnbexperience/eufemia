import * as React from 'react';
export type ImgSpace =
  | string
  | number
  | boolean
  | {
      top?: string | number | boolean;
      right?: string | number | boolean;
      bottom?: string | number | boolean;
      left?: string | number | boolean;
    };
export type ImgTop = string | number | boolean;
export type ImgRight = string | number | boolean;
export type ImgBottom = string | number | boolean;
export type ImgLeft = string | number | boolean;
export type ImgSkeleton = string | boolean;
export type ImgClassName = string | any | any[];

/**
 * NB: Do not change the docs (comments) in here. The docs are updated during build time by "generateTypes.js" and "fetchPropertiesFromDocs.js".
 */
export interface ImgProps extends React.HTMLProps<HTMLElement> {
  space?: ImgSpace;
  top?: ImgTop;
  right?: ImgRight;
  bottom?: ImgBottom;
  left?: ImgLeft;
  src: string;
  alt: string;
  skeleton?: ImgSkeleton;
  className?: ImgClassName;
  class?: string;
  img_class?: string;
  element?: React.ReactNode;
  caption?: string;
  children?: React.ReactNode;
}
declare const Img: React.FC<ImgProps>;
export default Img;
