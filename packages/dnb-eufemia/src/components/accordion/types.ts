import type {
  HTMLProps,
  ReactNode,
  RefObject,
  SyntheticEvent,
} from 'react'
import type { ButtonIconPosition } from '../Button'
import type { HeadingLevel } from '../Heading'
import type { IconIcon, IconSize } from '../Icon'
import type { SkeletonShow } from '../Skeleton'
import type { SpacingProps } from '../../shared/types'

export type AccordionInstance = {
  _id: string
  close: () => void
  setExpandedState: (expanded: boolean) => void
  state: { expanded: boolean; group?: string }
  props: AccordionProps
}

export type AccordionGroupProps = AccordionProps & {
  /**
   * If set to `true`, the group of accordions will allow all to close.
   */
  allowCloseAll?: boolean
  /**
   * Determines how many accordions can be expanded at once. Defaults to `single`.
   */
  expandBehavior?: 'single' | 'multiple'
  /**
   * Define an `id` of a nested accordion that will get expanded.
   */
  expandedId?: string
  /**
   * Ref handle to collapse all expanded accordions. Send in a ref and use `.current()` to collapse all accordions. Defaults to `undefined`.
   */
  collapseAllHandleRef?: RefObject<() => void>
}

export const accordionDefaultProps: Partial<
  AccordionProps & AccordionGroupProps
> = {
  variant: 'outlined',
  iconSize: 'medium',
}

export type AccordionVariant =
  | 'plain'
  | 'default'
  | 'outlined'
  | 'filled'
  | 'tertiary'

export type AccordionHeading = boolean | ReactNode

export type AccordionIcon =
  | IconIcon
  | {
      closed?: IconIcon
      /**
       * Use `true` or `false` to control the expanded/collapsed state of the accordion.
       */
      expanded?: IconIcon
    }

export type AccordionIconPosition = ButtonIconPosition

export type AccordionProps = Omit<
  HTMLProps<HTMLElement>,
  'ref' | 'onChange' | 'title'
> &
  SpacingProps & {
    /**
     * A title as a string or React element. It will be used as the button text.
     */
    title?: ReactNode
    description?: ReactNode
    /**
     * Use `true` or `false` to control the expanded/collapsed state of the accordion.
     */
    expanded?: boolean
    /**
     * If set to `true`, the open and close animation will be omitted.
     */
    noAnimation?: boolean
    /**
     * If set to `true` the accordion will be expanded during SSR. Can be potentially useful for SEO, although it will disturb client hydration, where React expects the same state. But that's mainly a technical aspect to consider.
     */
    expandedSsr?: boolean
    /**
     * If set to `true` the content will be present, even when the accordion is not expanded. Can be useful for assistive technology or SEO.
     */
    keepInDOM?: boolean
    /**
     * If set to `true` the collapsed content stays in the DOM and remains findable by the browser's find-in-page feature, using `hidden="until-found"`. When matching content is found, the accordion expands. Defaults to the value of `keepInDOM`.
     */
    openOnFind?: boolean
    /**
     * If set to `true` the accordion component will not re-render its content – can be useful for components you don't have control of storing the temporary state during an interaction.
     */
    preventRerender?: boolean
    /**
     * Use this property together with `preventRerender` – and if it is set to `true`, the accordion component will re-render if the children are a new React element and do not match the previous one anymore.
     */
    preventRerenderConditional?: boolean
    /**
     * If set to `true`, it will remember a changed state initiated by the user. It requires a unique `id`. It will store the state in the local storage.
     */
    rememberState?: boolean
    /**
     * Send along a custom `React.Ref` for `.dnb-accordion__content`.
     */
    contentRef?: RefObject<HTMLElement | null>
    /**
     * If set to `true`, the saved (remembered) state will be removed and the initial component state will be used and set.
     */
    flushRememberedState?: boolean
    /**
     * If set to `true`, a group of accordions will be wrapped into a sidebar-looking menu for medium and larger screens.
     */
    singleContainer?: boolean
    /**
     * Defines the used styling. `outlined`, `filled`, `plain` (no styling), `default`, or `tertiary` (renders a tertiary button). Defaults to `outlined`.
     */
    variant?: AccordionVariant
    /**
     * Will add a React element on the left side of the `title`, inside `AccordionHeaderContainer`.
     */
    leftComponent?: ReactNode
    /**
     * If set to `true`, the accordion button will be disabled (dimmed).
     */
    disabled?: boolean
    /**
     * If set to `true`, an overlaying skeleton with animation will be shown.
     */
    skeleton?: SkeletonShow
    /**
     * A unique `id` that will be used on the button element. If you use `rememberState`, an id is required.
     */
    id?: string
    group?: string
    /**
     * Gives you the option to replace the used `button` element. Provide a React element, including a string (HTML element). Defaults to a `div` with all the needed accessibility features included.
     */
    element?: ReactNode
    /**
     * If set to `true`, level 2 (h2) will be used. You can provide your own HTML heading (`h3`), or provide a `headingLevel` property.
     */
    heading?: AccordionHeading
    /**
     * If `heading` is set to `true`, you can provide a numeric value to define a different heading level. Defaults to `2`.
     */
    headingLevel?: HeadingLevel
    /**
     * Will replace the `chevron` icon. The icon will still rotate (by CSS). You can use an object to use two different icons, one for the closed state and one for the expanded state `{ closed, expanded }`.
     */
    icon?: AccordionIcon
    /**
     * Will set the placement of the icon. Defaults to `left`.
     */
    iconPosition?: AccordionIconPosition
    /**
     * Define a different icon size. Defaults to `medium` (1.5rem).
     */
    iconSize?: IconSize
    className?: string
    children?: ReactNode
    /**
     * Will be called by user click interaction, or when expanded by a browser's find-in-page when `openOnFind` is set. Returns an object with a boolean state `expanded` inside `{ expanded, event }`.
     */
    onChange?: (event: AccordionChangeEvent) => void
  }

export type AccordionChangeEvent = {
  expanded: boolean
  event: SyntheticEvent | Event
}
