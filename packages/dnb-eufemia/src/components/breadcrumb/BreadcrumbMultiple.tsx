import React from 'react'
import HeightAnimation from '../height-animation/HeightAnimation'
import Section from '../section/Section'
import BreadcrumbItem from './BreadcrumbItem'

// Types
import type { BreadcrumbItemProps } from './types'

type BreadcrumbMultipleProps = {
  isCollapsed: boolean
  noAnimation: boolean
  data: Array<BreadcrumbItemProps>
  items: React.ReactNode
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
      data-testid="breadcrumb-collapse"
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
              key={`${breadcrumbItem.text}`}
              variant={
                (i == 0 && 'home') ||
                (i == data.length - 1 && 'current') ||
                null
              }
              {...breadcrumbItem}
            />
          )
        })}

        {items}
      </Section>
    </HeightAnimation>
  )
}
