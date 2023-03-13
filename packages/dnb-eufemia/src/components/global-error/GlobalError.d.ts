import * as React from 'react';
import type { SpacingProps } from '../space/types';
type GlobalErrorStatusContent = string | Record<string, unknown>;
type GlobalErrorTitle = string | React.ReactNode;
type GlobalErrorText = string | React.ReactNode;
type GlobalErrorBack = string | React.ReactNode;
type GlobalErrorChildren =
  | string
  | ((...args: any[]) => any)
  | React.ReactNode;

export interface GlobalErrorProps
  extends React.HTMLProps<HTMLElement>,
    SpacingProps {
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
