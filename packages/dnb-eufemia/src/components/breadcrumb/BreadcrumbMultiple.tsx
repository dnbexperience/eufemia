import React from 'react'
import HeightAnimation from '../height-animation/HeightAnimation'
import Section from '../section/Section'
import BreadcrumbItem, { BreadcrumbItemProps } from './BreadcrumbItem'

type BreadcrumbMultipleProps = {
  isCollapsed: boolean
  noAnimation: boolean
  data: Array<BreadcrumbItemProps>
  items:
    | React.ReactElement<BreadcrumbItemProps>
    | Array<React.ReactElement<BreadcrumbItemProps>>
}

export const BreadcrumbMultiple = ({
  isCollapsed,
  items,
  noAnimation,
  data,
}: BreadcrumbMultipleProps) => {
  return (
    <HeightAnimation
      open={!isCollapsed}
      animate={!noAnimation}
      className="dnb-breadcrumb__animation"
    >
      <Section
        className="dnb-breadcrumb__list"
        element="ol"
        style_type="transparent"
      >
        {data?.map((breadcrumbItem, i) => {
          return (
            <BreadcrumbItem
              key={i}
              variant={
                (i == 0 && 'home') ||
                (i == data.length - 1 && 'current') ||
                null
              }
              itemNr={i}
              {...breadcrumbItem}
            />
          )
        })}

        {React.Children.toArray(items)
          .filter((item) => React.isValidElement(item))
          .map((item: React.ReactElement<BreadcrumbItemProps>, i) =>
            React.cloneElement(item, { key: i, itemNr: i })
          )}
      </Section>
    </HeightAnimation>
  )
}
