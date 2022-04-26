/**
 * Web Accordion Component
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import {
  isTrue,
  validateDOMAttributes,
  extendPropsWithContext,
} from '../../shared/component-helper'
import IconPrimary from '../../components/icon-primary/IconPrimary'
import classnames from 'classnames'
import keycode from 'keycode'
import AccordionContext from './AccordionContext'
import {
  spacingPropTypes,
  createSpacingClasses,
} from '../space/SpacingHelper'
import {
  skeletonDOMAttributes,
  createSkeletonClass,
} from '../skeleton/SkeletonHelper'

function AccordionHeaderTitle({ children, ...rest }) {
  return (
    <span
      className={classnames(
        'dnb-accordion__header__title',
        createSpacingClasses(rest)
      )}
    >
      {children}
    </span>
  )
}
AccordionHeaderTitle.propTypes = {
  ...spacingPropTypes,
  children: PropTypes.node,
}
AccordionHeaderTitle.defaultProps = {
  children: null,
}

function AccordionHeaderDescription({ children, ...rest }) {
  return children ? (
    <span
      className={classnames(
        'dnb-accordion__header__description',
        createSpacingClasses(rest)
      )}
    >
      {children}
    </span>
  ) : null
}
AccordionHeaderDescription.propTypes = {
  ...spacingPropTypes,
  children: PropTypes.node,
}
AccordionHeaderDescription.defaultProps = {
  children: null,
}

function AccordionHeaderContainer({ children, ...rest }) {
  return children ? (
    <span
      className={classnames(
        'dnb-accordion__header__container',
        createSpacingClasses(rest)
      )}
    >
      {children}
    </span>
  ) : null
}
AccordionHeaderContainer.propTypes = {
  ...spacingPropTypes,
  children: PropTypes.node,
}
AccordionHeaderContainer.defaultProps = {
  children: null,
}

function AccordionHeaderIcon({ icon, expanded, ...rest }) {
  return (
    <span className="dnb-accordion__header__icon">
      <IconPrimary
        {...rest}
        icon={
          typeof icon?.expanded !== 'undefined'
            ? icon[expanded ? 'expanded' : 'closed']
            : icon || 'chevron-down'
        }
        aria-hidden
      />
    </span>
  )
}
AccordionHeaderIcon.propTypes = {
  icon: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.func,
    PropTypes.shape({
      closed: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
      expanded: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    }),
  ]),
  size: PropTypes.string,
  expanded: PropTypes.bool,
}
AccordionHeaderIcon.defaultProps = {
  icon: null,
  size: 'medium',
  expanded: null,
}

export default class AccordionHeader extends React.PureComponent {
  static contextType = AccordionContext

  static propTypes = {
    title: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node,
      PropTypes.func,
    ]),
    description: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node,
      PropTypes.func,
    ]),
    left_component: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node,
      PropTypes.func,
    ]),
    element: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node,
      PropTypes.func,
    ]),
    heading: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.string,
      PropTypes.node,
      PropTypes.func,
    ]),
    heading_level: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    icon: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.func,
      PropTypes.shape({
        closed: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
        expanded: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
      }),
    ]),
    icon_position: PropTypes.oneOf(['left', 'right']),
    icon_size: PropTypes.string,
    disabled: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    skeleton: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),

    ...spacingPropTypes,

    className: PropTypes.string,
    children: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node,
      PropTypes.func,
    ]),
  }

  static defaultProps = {
    id: null, // make sure we have id here, so it gets picked up by extendPropsWithContext
    title: null,
    description: null,
    left_component: null,
    element: null,
    heading: null,
    heading_level: null,
    icon: null,
    icon_position: null,
    icon_size: 'medium',
    disabled: null,
    skeleton: null,

    className: null,
    children: null,
  }

  static Container = AccordionHeaderContainer
  static Icon = AccordionHeaderIcon
  static Title = AccordionHeaderTitle
  static Description = AccordionHeaderDescription

  constructor(props) {
    super(props)
    this.state = {}
  }

  onKeyDownHandler = (event) => {
    switch (keycode(event)) {
      case 'enter':
      case 'space':
        event.preventDefault()
        this.onClickHandler(event)
        break
    }
  }

  onClickHandler = (event) => {
    const { id, group } = this.context

    if (this.canClick()) {
      const expanded = !this.context.expanded
      this.context.callOnChange({ id, group, expanded, event })

      this.setState({
        hadClick: true,
      })
    }
  }

  onMouseOverHandler = () => {
    this.setState({
      hover: true,
    })
  }

  onMouseOutHandler = () => {
    this.setState({
      hover: false,
      hadClick: false,
    })
  }

  canClick() {
    const { expanded, allow_close_all, group } = this.context
    return !group || (group && !expanded) || isTrue(allow_close_all)
  }

  render() {
    const props = extendPropsWithContext(
      this.props,
      AccordionHeader.defaultProps,
      this.context
    )

    const {
      id,

      // 1. these props should be the same as ...
      left_component,
      expanded, // eslint-disable-line
      title,
      description,
      element,
      heading,
      heading_level,
      icon,
      icon_size,
      disabled,
      skeleton,
    } = props

    const {
      children,
      className,

      // 2. ... these
      left_component: _left_component, // eslint-disable-line
      expanded: _expanded, // eslint-disable-line
      title: _title, // eslint-disable-line
      description: _description, // eslint-disable-line
      icon: _icon, // eslint-disable-line
      icon_size: _icon_size, // eslint-disable-line
      disabled: _disabled, // eslint-disable-line

      ...rest
    } = this.props

    const { hover, hadClick } = this.state
    let { icon_position } = props

    const defaultParts = [
      <AccordionHeaderIcon
        key="icon"
        icon={icon}
        size={icon_size}
        expanded={this.context.expanded}
      />,
      <AccordionHeaderContainer key="container">
        {left_component}
      </AccordionHeaderContainer>,
      <AccordionHeaderTitle key="title">
        {title ||
          (Array.isArray(children)
            ? children.filter((cur) => !React.isValidElement(cur))
            : children)}
      </AccordionHeaderTitle>,
      <AccordionHeaderDescription key="description">
        {description}
      </AccordionHeaderDescription>,
    ]

    if (Array.isArray(children)) {
      const removeParts = []
      children.forEach((cur) => {
        if (React.isValidElement(cur)) {
          const part = defaultParts.find((c) => c.type === cur.type)
          if (part) {
            removeParts.push(part)
          }

          // if (cur.type === AccordionHeaderTitle) {
          //   defaultParts.unshift(cur)
          // } else {
          //   defaultParts.push(cur)
          // }

          defaultParts.push(cur)
        }
      })
      removeParts.forEach((part) => {
        const index = defaultParts.findIndex((c) => c === part)
        if (index > -1) {
          defaultParts.splice(index, 1)
        }
      })
    }

    const partsToRender = []
    const wrapperParts = []
    const wrapperComp = (
      <span className="dnb-accordion__header__wrapper" key="wrapper">
        {wrapperParts}
      </span>
    )

    defaultParts.forEach((part) => {
      if (
        React.isValidElement(part) &&
        (part.type === AccordionHeaderTitle ||
          part.type === AccordionHeaderDescription)
      ) {
        wrapperParts.push(part)
        if (partsToRender.findIndex((c) => c === wrapperComp) === -1) {
          partsToRender.push(wrapperComp)
        }
      } else {
        partsToRender.push(part)
      }
    })

    // position the icon to the right, if the element is not in the beginning
    if (icon_position === null) {
      const iconIndex = partsToRender.findIndex(
        (c) => c.type === AccordionHeaderIcon
      )
      // because of the container at the beginning, we use 1
      if (iconIndex > 1) {
        icon_position = 'right'
      }

      if (left_component) {
        icon_position = 'right'
      }
    }

    const headerParams = {
      id: `${id}-header`,
      'aria-controls': `${id}-content`,
      'aria-expanded': this.context.expanded,
      role: 'button',
      tabIndex: '0',
      className: classnames(
        'dnb-accordion__header',
        icon_position && `dnb-accordion__header__icon--${icon_position}`,
        hover && hadClick && 'dnb-accordion--hover',
        !this.canClick() && 'dnb-accordion__header--prevent-click',
        description && 'dnb-accordion__header--description',
        createSkeletonClass('font', skeleton, this.context),
        createSpacingClasses(rest),
        className
      ),
      disabled,
      ...rest,
    }

    if (disabled || isTrue(skeleton)) {
      headerParams.tabIndex = '-1'
      headerParams.disabled = true
      headerParams['aria-disabled'] = true
    } else {
      headerParams.onClick = this.onClickHandler
      headerParams.onKeyDown = this.onKeyDownHandler
      headerParams.onMouseOver = this.onMouseOverHandler
      headerParams.onMouseOut = this.onMouseOutHandler
    }

    skeletonDOMAttributes(headerParams, skeleton, this.context)

    validateDOMAttributes(this.props, headerParams)

    let Element = 'div'
    if (isTrue(heading)) {
      headerParams.role = 'heading'
      headerParams['aria-level'] = heading_level
        ? String(heading_level)
        : '2'
    } else if (heading) {
      headerParams.role = null
      Element = heading
    } else if (element) {
      headerParams.role = null
      Element = element
    }

    return <Element {...headerParams}>{partsToRender}</Element>
  }
}
