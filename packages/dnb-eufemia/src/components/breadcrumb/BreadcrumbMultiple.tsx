import { isValidElement } from 'react'
import type { ReactElement } from 'react'
import HeightAnimation from '../height-animation/HeightAnimation'
import type { BreadcrumbItemProps } from './BreadcrumbItem'
import BreadcrumbItem from './BreadcrumbItem'
import BreadcrumbItemContext from './BreadcrumbItemContext'

type BreadcrumbMultipleProps = {
  collapsed: boolean
  noAnimation: boolean
  data: Array<BreadcrumbItemProps>
  openOnFind?: boolean
  onBeforeMatch?: () => void
  items:
    | ReactElement<BreadcrumbItemProps>
    | Array<ReactElement<BreadcrumbItemProps>>
}

export const BreadcrumbMultiple = ({
  collapsed,
  items,
  noAnimation,
  data,
  openOnFind,
  onBeforeMatch,
}: BreadcrumbMultipleProps) => {
  return (
    <HeightAnimation
      open={!collapsed}
      animate={!noAnimation}
      openOnFind={openOnFind}
      onBeforeMatch={onBeforeMatch}
      className="dnb-breadcrumb__multiple"
    >
      <ol className="dnb-breadcrumb__list">
        {data?.map((breadcrumbItem, i) => {
          return (
            <BreadcrumbItemContext key={i} value={{ itemNo: i }}>
              <BreadcrumbItem
                variant={
                  (i === 0 && 'home') ||
                  (i === data.length - 1 && 'current') ||
                  null
                }
                itemNo={i}
                {...breadcrumbItem}
              />
            </BreadcrumbItemContext>
          )
        })}

        {(Array.isArray(items) ? items : [items])
          .filter((item) => isValidElement(item))
          .map((item, i) => (
            <BreadcrumbItemContext key={i} value={{ itemNo: i }}>
              {item}
            </BreadcrumbItemContext>
          ))}
      </ol>
    </HeightAnimation>
  )
}
