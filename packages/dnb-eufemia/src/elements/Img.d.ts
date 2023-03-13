import * as React from 'react';
import type { SpacingProps } from '../shared/types';
import type { SkeletonShow } from '../components/skeleton/Skeleton';
type ImgClassName = string | any | any[];

export interface ImgProps
  extends React.HTMLProps<HTMLElement>,
    SpacingProps {
  src: string;
  alt: string;
  skeleton?: SkeletonShow;
  className?: ImgClassName;
  class?: string;
  img_class?: string;
  element?: React.ReactNode;
  caption?: string;
  children?: React.ReactNode;
}
declare const Img: React.FC<ImgProps>;
export default Img;
