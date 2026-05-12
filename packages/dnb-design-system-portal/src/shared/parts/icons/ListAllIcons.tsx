/**
 * List all the Icons available
 */

import { Fragment, useMemo, useState } from 'react'
import {
  Icon,
  CopyOnClick,
  ToggleButton,
} from '@dnb/eufemia/src/components'
import { isSupportedFilled } from '@dnb/eufemia/src/components/icon/filledIconSet'
import { P } from '@dnb/eufemia/src'
import * as PrimaryIcons from '@dnb/eufemia/src/icons/dnb/primary_icons'
import * as SecondaryIcons from '@dnb/eufemia/src/icons/dnb/secondary_icons'
import * as PrimaryIconsMedium from '@dnb/eufemia/src/icons/dnb/primary_icons_medium'
import * as SecondaryIconsMedium from '@dnb/eufemia/src/icons/dnb/secondary_icons_medium'
import iconsMetaData from '@dnb/eufemia/src/icons/dnb/icons-meta.json'
import AutoLinkHeader from '../../tags/AutoLinkHeader'
import {
  listStyle,
  listItemStyle,
  listItemInnerStyle,
} from './ListAllIcons.module.scss'

export const getListOfIcons = (icons) => {
  return Object.entries(icons)
    .map(([iconName, Svg]) => {
      if (typeof Svg !== 'function') {
        return null
      }
      const meta = iconsMetaData?.[iconName]
        ? iconsMetaData[iconName]
        : { tags: [], created: Date.now() }

      return { iconName, Svg, ...meta }
    })
    .filter(Boolean)
    .sort((a, b) => {
      return a.created > b.created ? 1 : -1
    })
}

const groupByCategory = (sourceIcons) => {
  const cache = {}
  const categories = []
  sourceIcons.forEach((item) => {
    cache[item.category] = cache[item.category] || []
    cache[item.category].push(item)
  })
  Object.entries(cache).forEach(([category, icons]) => {
    const categoryName =
      category.charAt(0).toUpperCase() + category.slice(1)
    categories.push([categoryName, icons])
  })
  return categories
}

type Props = {
  groupBy: string
  variant: string
}

export default function ListAllIcons(props: Props) {
  const { groupBy, variant } = props
  const [showFilled, setShowFilled] = useState(false)

  const iconsToRender = useMemo(() => {
    let icons = {}
    switch (variant) {
      case 'primary':
        icons = PrimaryIcons
        break

      case 'secondary':
        icons = SecondaryIcons
        break

      default:
        icons = { ...PrimaryIcons, ...SecondaryIcons }
        break
    }

    const all = getListOfIcons(icons)

    if (showFilled) {
      return all.filter(({ iconName }) => isSupportedFilled(iconName))
    }

    return all
  }, [variant, showFilled])

  const renderListItem = (icons) => {
    return icons.map(({ iconName, Svg, variant, tags }) => {
      const SvgMedium = (
        variant === 'primary' ? PrimaryIconsMedium : SecondaryIconsMedium
      )[`${iconName}_medium`]

      // remove duplications
      tags = tags.filter((item, index) => {
        if (item === iconName) {
          return false
        }
        return tags.indexOf(item) === index
      })

      return (
        <li key={iconName} className={listItemStyle}>
          <div className={listItemInnerStyle}>
            <figure aria-labelledby={`icon-${iconName}`} aria-hidden>
              <Icon icon={Svg} fill={showFilled} right />
              <Icon icon={SvgMedium} size="medium" fill={showFilled} />
            </figure>

            <AutoLinkHeader
              level={3}
              size="medium"
              element="figcaption"
              useSlug={iconName}
            >
              <CopyOnClick>{iconName}</CopyOnClick>
            </AutoLinkHeader>

            <P>{tags.length > 0 ? tags.join(', ') : '(no tags)'}</P>
          </div>
        </li>
      )
    })
  }

  if (iconsToRender.length === 0) {
    return <></>
  }

  const toggle = (
    <ToggleButton
      checked={showFilled}
      onChange={({ checked }) => setShowFilled(checked)}
      bottom="medium"
    >
      Show filled
    </ToggleButton>
  )

  if (groupBy === 'category') {
    return (
      <>
        {toggle}
        {groupByCategory(iconsToRender).map(([categoryName, icons]) => (
          <Fragment key={categoryName}>
            <AutoLinkHeader level={2} size="large" useSlug={categoryName}>
              {categoryName}
            </AutoLinkHeader>
            <ul className={listStyle}>{renderListItem(icons)}</ul>
          </Fragment>
        ))}
      </>
    )
  }

  return (
    <>
      {toggle}
      <ul className={listStyle}>{renderListItem(iconsToRender)}</ul>
    </>
  )
}
