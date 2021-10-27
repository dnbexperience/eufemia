import * as React from 'react';
export interface AutoSizeProps {
  __element?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  style?: Object;
}
export class AutoSize extends React.Component<AutoSizeProps, any> {
  render(): JSX.Element;
}
export interface SkeletonContextProps {
  translation?: {
    Skeleton: {
      /**
       * Is used for screen reader text translation, defined in the translation files. You can set a custom text if needed.
       */
      aria_busy: string;
    };
  };
}
export const createSkeletonClass: (
  method: 'shape' | 'font',
  skeleton: boolean,
  context?: SkeletonContextProps
) => React.HTMLProps<HTMLElement>;
export interface skeletonDOMAttributesContext {
  translation?: {
    Skeleton: {
      /**
       * Is used for screen reader text translation, defined in the translation files. You can set a custom text if needed.
       */
      aria_busy: string;
    };
  };
}
export const skeletonDOMAttributes: (
  params: React.HTMLProps<HTMLElement>,
  skeleton: boolean,
  context?: SkeletonContextProps
) => React.HTMLProps<HTMLElement>;
