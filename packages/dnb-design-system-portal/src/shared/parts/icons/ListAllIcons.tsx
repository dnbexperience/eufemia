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
import { isSupportedAnimated } from '@dnb/eufemia/src/icons/animated/animatedIconSet'
import { P } from '@dnb/eufemia/src'
import { Hr } from '@dnb/eufemia/src/elements'
import * as PrimaryIcons from '@dnb/eufemia/src/icons/dnb/primary_icons'
import * as SecondaryIcons from '@dnb/eufemia/src/icons/dnb/secondary_icons'
import * as PrimaryIconsMedium from '@dnb/eufemia/src/icons/dnb/primary_icons_medium'
import * as SecondaryIconsMedium from '@dnb/eufemia/src/icons/dnb/secondary_icons_medium'
import AnimatedBell from '@dnb/eufemia/src/icons/animated/bell'
import AnimatedBellMedium from '@dnb/eufemia/src/icons/animated/bell_medium'
import AnimatedArrowRight from '@dnb/eufemia/src/icons/animated/arrow_right'
import AnimatedArrowRightMedium from '@dnb/eufemia/src/icons/animated/arrow_right_medium'
import AnimatedCheck from '@dnb/eufemia/src/icons/animated/check'
import AnimatedCheckMedium from '@dnb/eufemia/src/icons/animated/check_medium'
import iconsMetaData from '@dnb/eufemia/src/icons/dnb/icons-meta.json'
import AutoLinkHeader from '../../tags/AutoLinkHeader'
import {
  listStyle,
  listItemStyle,
  listItemInnerStyle,
} from './ListAllIcons.module.scss'

const animatedIcons = {
  arrow_right: AnimatedArrowRight,
  bell: AnimatedBell,
  check: AnimatedCheck,
}
const animatedIconsMedium = {
  arrow_right_medium: AnimatedArrowRightMedium,
  bell_medium: AnimatedBellMedium,
  check_medium: AnimatedCheckMedium,
}

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

function IconPreviewItem({
  iconName,
  Svg,
  SvgMedium,
  tags,
  showAnimated,
  showFilled,
}) {
  return (
    <li className={listItemStyle}>
      <div className={listItemInnerStyle} data-icon-animation-trigger>
        <figure aria-labelledby={`icon-${iconName}`} aria-hidden>
          <Icon
            icon={Svg}
            fill={showFilled}
            animateWhen={showAnimated ? 'hover' : undefined}
            right
          />
          <Icon
            icon={SvgMedium}
            size="medium"
            fill={showFilled}
            animateWhen={showAnimated ? 'hover' : undefined}
          />
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
}

export default function ListAllIcons(props: Props) {
  const { groupBy, variant } = props
  const [showFilled, setShowFilled] = useState(false)
  const [showAnimated, setShowAnimated] = useState(false)

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

    if (showAnimated) {
      return all.filter(({ iconName }) => isSupportedAnimated(iconName))
    }

    if (showFilled) {
      return all.filter(({ iconName }) => isSupportedFilled(iconName))
    }

    return all
  }, [variant, showAnimated, showFilled])

  const renderListItem = (icons) => {
    return icons.map(({ iconName, Svg, variant, tags }) => {
      let SvgMedium = (
        variant === 'primary' ? PrimaryIconsMedium : SecondaryIconsMedium
      )[`${iconName}_medium`]

      if (showAnimated) {
        Svg = animatedIcons[iconName]
        SvgMedium = animatedIconsMedium[`${iconName}_medium`]
      }

      // remove duplications
      tags = tags.filter((item, index) => {
        if (item === iconName) {
          return false
        }
        return tags.indexOf(item) === index
      })

      return (
        <IconPreviewItem
          key={iconName}
          iconName={iconName}
          Svg={Svg}
          SvgMedium={SvgMedium}
          tags={tags}
          showAnimated={showAnimated}
          showFilled={showFilled}
        />
      )
    })
  }

  if (iconsToRender.length === 0) {
    return <></>
  }

  const toggle = (
    <>
      <Hr bottom="medium" />
      <ToggleButton
        checked={showFilled}
        onChange={({ checked }) => {
          setShowFilled(checked)
          setShowAnimated(false)
        }}
        right="small"
        bottom="medium"
      >
        Show filled
      </ToggleButton>
      <ToggleButton
        checked={showAnimated}
        onChange={({ checked }) => {
          setShowAnimated(checked)
          setShowFilled(false)
        }}
        bottom="medium"
      >
        Show animated
      </ToggleButton>
    </>
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
