import * as React from 'react';
import type { SkeletonShow } from './Skeleton';
export type AutoSizeProps = {
  __element?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};
export class AutoSize extends React.Component<AutoSizeProps, any> {
  render(): JSX.Element;
}
export type SkeletonContextProps = ContextProps & {
  translation?: {
    Skeleton?: {
      /**
       * Is used for screen reader text translation, defined in the translation files. You can set a custom text if needed.
       */
      aria_busy: string;
    };
  };
};
export type SkeletonMethods = 'shape' | 'font' | 'code';
export declare const createSkeletonClass: (
  method: SkeletonMethods,
  skeleton: SkeletonShow,
  context?: SkeletonContextProps
) => string;
export type skeletonDOMAttributesContext = {
  translation?: {
    Skeleton: {
      /**
       * Is used for screen reader text translation, defined in the translation files. You can set a custom text if needed.
       */
      aria_busy: string;
    };
  };
};
export declare const skeletonDOMAttributes: (
  params: React.HTMLProps<HTMLElement>,
  skeleton: SkeletonShow,
  context?: SkeletonContextProps
) => void;
