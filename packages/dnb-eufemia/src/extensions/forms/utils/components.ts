import React from 'react';
import { SpacingProps } from '../../../components/space/types'
import * as EufemiaElements from '../../../elements'
import { Field, Value, Layout, FieldBlock, ValueBlock, StepsLayout, Visibility} from '../index';

export const forwardSpaceProps = <Props extends SpacingProps>(
  props: Props
): SpacingProps => {
  return {
    space: props?.space,
    top: props?.top,
    bottom: props?.bottom,
    left: props?.left,
    right: props?.right,
  }
}

export const omitSpaceProps = <Props extends SpacingProps>(
  props: Props
): Omit<Props, keyof SpacingProps> => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { space, top, bottom, left, right, ...restProps } = props
  return restProps
}

export const isFieldComponent = (element): boolean => {
  return Object.values(Field).some(fieldComponent => element?.type === fieldComponent);
}

export const isValueComponent = (element): boolean => {
  return Object.values(Value).some(valueComponent => element?.type === valueComponent);
}

export const isLayoutComponent = (element): boolean => {
  return Object.values(Layout).some(layoutComponent => element?.type === layoutComponent);
}

export const isEufemiaFormComponent = (element): boolean => {
  return isFieldComponent(element) || isValueComponent(element) || isLayoutComponent(element) || 
    [FieldBlock, ValueBlock, StepsLayout, StepsLayout.Step, StepsLayout.NextButton, StepsLayout.PreviousButton, StepsLayout.Buttons, Visibility].some(Component => element?.type === Component);
}

export const isEufemiaElement = (element): boolean => {
  return Object.values(EufemiaElements).some(eufemiaElement => element?.type === eufemiaElement);
}

/**
 * Is the requested element a component that can receive Eufemia space props (space, top, bottom, left and right)?
 */
export const isSpacePropsComponent = (element: React.ReactNode): boolean => {
  return isEufemiaFormComponent(element) || isEufemiaElement(element);
}
