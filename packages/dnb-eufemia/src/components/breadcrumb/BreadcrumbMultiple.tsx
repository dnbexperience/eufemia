import React from 'react'
import HeightAnimation from '../height-animation/HeightAnimation'
import Section from '../section/Section'
import type { BreadcrumbItemProps } from './BreadcrumbItem'
import BreadcrumbItem from './BreadcrumbItem'
import BreadcrumbItemContext from './BreadcrumbItemContext'

type BreadcrumbMultipleProps = {
  collapsed: boolean
  noAnimation: boolean
  data: Array<BreadcrumbItemProps>
  items:
    | React.ReactElement<BreadcrumbItemProps>
    | Array<React.ReactElement<BreadcrumbItemProps>>
}

export const BreadcrumbMultiple = ({
  collapsed,
  items,
  noAnimation,
  data,
}: BreadcrumbMultipleProps) => {
  return (
    <HeightAnimation
      open={!collapsed}
      noAnimation={noAnimation}
      className="dnb-breadcrumb__multiple"
    >
      <Section
        className="dnb-breadcrumb__list"
        element="ol"
        backgroundColor="transparent"
      >
        {data?.map((breadcrumbItem, i) => {
          return (
            <BreadcrumbItem
              key={i}
              variant={
                (i === 0 && 'home') ||
                (i === data.length - 1 && 'current') ||
                null
              }
              itemNo={i}
              {...breadcrumbItem}
            />
          )
        })}

        {React.Children.toArray(items)
          .filter((item) => React.isValidElement(item))
          .map((item, i) => (
            <BreadcrumbItemContext key={i} value={{ itemNo: i }}>
              {item}
            </BreadcrumbItemContext>
          ))}
      </Section>
    </HeightAnimation>
  )
}
