import React from 'react'
import HeightAnimation from '../height-animation/HeightAnimation'
import BreadcrumbItem, { BreadcrumbItemProps } from './BreadcrumbItem'

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
      <ol className="dnb-breadcrumb__list">
        {data?.map((breadcrumbItem, i) => {
          const style = { '--delay': String(i) } as React.CSSProperties
          return (
            <BreadcrumbItem
              key={`${breadcrumbItem.text}`}
              variant={
                (i == 0 && 'home') ||
                (i == data.length - 1 && 'current') ||
                null
              }
              style={style}
              {...breadcrumbItem}
            />
          )
        })}

        {items}
      </ol>
    </HeightAnimation>
  )
}
