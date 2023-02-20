import * as React from 'react';
export type GlobalErrorStatusContent = string | Record<string, string>;
export type GlobalErrorTitle = string | React.ReactNode;
export type GlobalErrorText = string | React.ReactNode;
export type GlobalErrorBack = string | React.ReactNode;
export type GlobalErrorSpace =
  | string
  | number
  | boolean
  | {
      top?: string | number | boolean;
      right?: string | number | boolean;
      bottom?: string | number | boolean;
      left?: string | number | boolean;
    };
export type GlobalErrorTop = string | number | boolean;
export type GlobalErrorRight = string | number | boolean;
export type GlobalErrorBottom = string | number | boolean;
export type GlobalErrorLeft = string | number | boolean;
export type GlobalErrorChildren =
  | string
  | ((...args: any[]) => any)
  | React.ReactNode;
/**
 * NB: Do not change the docs (comments) in here. The docs are updated during build time by "generateTypes.js" and "fetchPropertiesFromDocs.js".
 */

export interface GlobalErrorProps extends React.HTMLProps<HTMLElement> {
  /**
   * Status code defines the view showing up.
   */
  status?: string;

  /**
   * A JSON object or a JS object providing the status texts. More details below.
   */
  status_content?: GlobalErrorStatusContent;

  /**
   * Defining a `title` will overwrite the default provided by `status_content`.
   */
  title?: GlobalErrorTitle;

  /**
   * Defining a `text` will overwrite the default provided by `status_content`.
   */
  text?: GlobalErrorText;

  /**
   * The text of the back button. Defaults to `Tilbake`. Can also be a React component.
   */
  back?: GlobalErrorBack;

  /**
   * Instead of using the default `window.history.back()` you can provide the back button and text link with a url.
   */
  href?: string;

  /**
   * Defining a `alt` text for the SVG graphic will overwrite the default provided by `status_content`.
   */
  alt?: string;
  space?: GlobalErrorSpace;
  top?: GlobalErrorTop;
  right?: GlobalErrorRight;
  bottom?: GlobalErrorBottom;
  left?: GlobalErrorLeft;
  className?: string;

  /**
   * If needed, add additional content under the main content.
   */
  children?: GlobalErrorChildren;
  class?: string;
}
export default class GlobalError extends React.Component<
  GlobalErrorProps,
  any
> {
  static defaultProps: object;
  render(): JSX.Element;
}
