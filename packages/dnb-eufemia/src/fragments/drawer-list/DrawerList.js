/**
 * Web List Component
 *
 * This is a legacy component.
 * For refferencing while developing new features, please use a Functional component.
 */

import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import keycode from 'keycode'
import {
  isTrue,
  makeUniqueId,
  extendPropsWithContextInClassComponent,
  validateDOMAttributes,
  dispatchCustomElementEvent,
} from '../../shared/component-helper'
import { getThemeClasses } from '../../shared/Theme'
import { createSpacingClasses } from '../../components/space/SpacingHelper'

import DrawerListContext from './DrawerListContext'
import DrawerListProvider from './DrawerListProvider'
import DrawerListPortal from './DrawerListPortal'
import {
  drawerListPropTypes,
  drawerListDefaultProps,
} from './DrawerListHelpers'

const propsToFilterOut = {
  on_show: null,
  on_hide: null,
  handle_dismiss_focus: null,
  on_change: null,
  on_pre_change: null,
  on_resize: null,
  on_select: null,
  on_state_update: null,
  on_key_down: null,
  options_render: null,
  wrapper_element: null,
}

export default class DrawerList extends React.PureComponent {
  static contextType = DrawerListContext // only used for the hasProvide check

  static blurDelay = DrawerListProvider.blurDelay // some ms more than "DrawerListSlideDown 200ms" = 201 // some ms more than "DrawerListSlideDown 200ms"

  static propTypes = {
    ...drawerListPropTypes,
  }

  static defaultProps = {
    ...drawerListDefaultProps,
  }

  constructor(props) {
    super(props)

    this._id = props.id || makeUniqueId()
  }

  render() {
    const hasProvider = this.context?.drawerList

    if (hasProvider) {
      return <DrawerListInstance {...this.props} />
    }

    return (
      <DrawerListProvider
        id={this._id}
        {...this.props}
        data={this.props.data || this.props.children}
      >
        <DrawerListInstance id={this._id} {...this.props} />
      </DrawerListProvider>
    )
  }
}

class DrawerListInstance extends React.PureComponent {
  static propTypes = DrawerList.propTypes
  static defaultProps = DrawerList.defaultProps
  static contextType = DrawerListContext

  constructor(props, context) {
    super(props)

    this._id = props.id || makeUniqueId()
    this.state = this.state || {}

    // send along the event handlers to the provider state
    context.drawerList.setState(
      Object.entries(propsToFilterOut).reduce((acc, [key]) => {
        if (props[key]) {
          acc[key] = props[key]
        }
        return acc
      }, {})
    )

    context.drawerList.setState({
      triangle_position: props.triangle_position,
    })
  }

  preventTab = (e) => {
    switch (keycode(e)) {
      case 'tab':
        if (!this.context.drawerList.hasFocusOnElement) {
          e.preventDefault()
          this.context.drawerList.setHidden()
        }
        break

      case 'page down':
      case 'page up':
        e.preventDefault()
        break
    }
  }

  selectItemHandler = (event) => {
    // In case we want to stop if the users makes a number selection.
    // Should optional
    // if (getPreviousSibling('dnb-number-format', event.target)) {
    //   return // stop
    // }
    const selected_item = parseFloat(
      event.currentTarget.getAttribute('data-item')
    )
    if (selected_item > -1) {
      this.context.drawerList.selectItemAndClose(selected_item, {
        fireSelectEvent: true,
        event,
      })
    }
  }

  render() {
    // use only the props from context, who are available here anyway
    const props = extendPropsWithContextInClassComponent(
      this.props,
      DrawerList.defaultProps,
      this.context.getTranslation(this.props).DrawerList
    )

    const {
      role,
      align_drawer,
      fixed_position,
      independent_width,
      scrollable,
      focusable,
      size,
      no_animation,
      no_scroll_animation,
      prevent_selection,
      action_menu,
      is_popup,
      portal_class,
      list_class,
      ignore_events,
      options_render,
      className,
      cache_hash: _cache_hash, // eslint-disable-line
      wrapper_element: _wrapper_element, // eslint-disable-line
      triangle_position: _triangle_position, // eslint-disable-line
      direction: _direction, // eslint-disable-line
      max_height: _max_height, // eslint-disable-line
      id: _id, // eslint-disable-line
      data: _data, // eslint-disable-line
      prepared_data: _prepared_data, // eslint-disable-line
      raw_data: _raw_data, // eslint-disable-line
      opened: _opened, // eslint-disable-line
      value: _value, // eslint-disable-line
      children,

      ...attributes
    } = props

    const id = this._id

    const {
      data,
      opened,
      hidden,
      triangle_position,
      direction,
      max_height,
      cache_hash,
      selected_item,
      active_item,
      showFocusRing,
      closestToTop,
      closestToBottom,
      usePortal,
      addObservers,
      removeObservers,
      _refShell,
      _refTriangle,
      _refUl,
      _refRoot,
    } = this.context.drawerList

    const mainParams = {
      id: `${id}-drawer-list`,
      className: classnames(
        'dnb-drawer-list',
        opened && 'dnb-drawer-list--opened',
        hidden && 'dnb-drawer-list--hidden',
        `dnb-drawer-list--${direction}`,
        triangle_position &&
          `dnb-drawer-list--triangle-position-${triangle_position}`,
        align_drawer && `dnb-drawer-list--${align_drawer}`,
        size && `dnb-drawer-list--${size}`,
        isTrue(action_menu) && `dnb-drawer-list--action-menu`,
        isTrue(is_popup) && 'dnb-drawer-list--is-popup',
        (isTrue(independent_width) || isTrue(action_menu)) &&
          'dnb-drawer-list--independent-width',
        isTrue(scrollable) && 'dnb-drawer-list--scroll',
        isTrue(no_scroll_animation) &&
          'dnb-drawer-list--no-scroll-animation',
        createSpacingClasses(props),
        className
      ),
      ...attributes,
    }

    const listParams = {
      id: `${id}-listbox`,
      /**
       * We may consider to use the hidden attribute in future
       * Or we may add an prop to put the HTML in the DOM, if needed
       */
      // hidden: hidden !== false,
      className: classnames(
        'dnb-drawer-list__list',
        isTrue(no_animation) && 'dnb-drawer-list__list--no-animation',
        list_class
      ),
    }

    const ulParams = {
      role,
      id: `${id}-ul`,
      'aria-expanded': opened,
      'aria-labelledby': `${id}-label`,
      tabIndex: '-1',
      style: {
        maxHeight: max_height > 0 ? `${max_height}rem` : null,
      },
      ref: _refUl,
    }

    if (
      !hidden &&
      (parseFloat(active_item) > -1 ||
        (!(parseFloat(active_item) > -1) &&
          !(parseFloat(selected_item) > -1)))
    ) {
      ulParams['aria-activedescendant'] = `option-${id}-${
        active_item || 0
      }`
    } else if (
      !isTrue(prevent_selection) &&
      !hidden &&
      parseFloat(selected_item) > -1
    ) {
      ulParams['aria-activedescendant'] = `option-${id}-${selected_item}`
    }

    if (isTrue(focusable)) {
      ulParams.tabIndex = '0'
    }

    // also used for code markup simulation
    validateDOMAttributes(this.props, mainParams)
    validateDOMAttributes(null, listParams)
    validateDOMAttributes(null, ulParams)

    // make it possible to grab the rest attributes and return it with all events
    Object.assign(
      this.context.drawerList.attributes,
      validateDOMAttributes(null, attributes)
    )

    const ignoreEvents = isTrue(ignore_events)

    const Items = () =>
      data.map((dataItem, i) => {
        const _id = dataItem.__id
        const hash = `option-${id}-${_id}-${i}`
        const liParams = {
          role: role === 'menu' ? 'menuitem' : 'option',
          'data-item': _id,
          id: `option-${id}-${_id}`,
          hash,
          className: classnames(
            // helper classes
            i === closestToTop && 'closest-to-top',
            i === closestToBottom && 'closest-to-bottom',
            i === 0 && 'first-of-type', // because of the triangle element
            i === data.length - 1 && 'last-of-type', // because of the triangle element
            ignoreEvents || (dataItem.ignore_events && 'ignore-events'),
            dataItem.class_name
          ),
          active: _id == active_item,
          selected: !dataItem.ignore_events && _id == selected_item,
          onClick: this.selectItemHandler,
          onKeyDown: this.preventTab,
        }

        if (ignoreEvents) {
          liParams.active = null
          liParams.selected = null
          liParams.onClick = null
          liParams.onKeyDown = null
          liParams.className = classnames(
            liParams.className,
            'dnb-drawer-list__option--ignore'
          )
        }

        return (
          <DrawerList.Item key={hash} {...liParams}>
            {dataItem}
          </DrawerList.Item>
        )
      })

    const mainList = (
      <span {...mainParams} ref={_refShell}>
        <span {...listParams}>
          {hidden === false && data && data.length > 0 ? (
            <>
              <DrawerList.Options
                cache_hash={
                  cache_hash +
                  active_item +
                  selected_item +
                  closestToTop +
                  closestToBottom +
                  direction +
                  max_height
                }
                {...ulParams}
                showFocusRing={showFocusRing}
                triangleRef={_refTriangle}
              >
                {typeof options_render === 'function' ? (
                  options_render({ data, Items, Item: DrawerList.Item })
                ) : (
                  <Items />
                )}
              </DrawerList.Options>
              <OnMounted
                addObservers={addObservers}
                removeObservers={removeObservers}
              />
            </>
          ) : (
            children && (
              <span className="dnb-drawer-list__content">
                {children}
                <span
                  className="dnb-drawer-list__triangle"
                  ref={_refTriangle}
                />
              </span>
            )
          )}
        </span>
      </span>
    )

    return (
      <span
        className={classnames(
          'dnb-drawer-list__root',
          usePortal && 'dnb-drawer-list__root--portal'
        )}
        ref={_refRoot}
      >
        {usePortal ? (
          <DrawerListPortal
            id={this._id}
            rootRef={_refRoot}
            opened={hidden === false}
            include_owner_width={align_drawer === 'right'}
            independent_width={isTrue(independent_width)}
            fixed_position={isTrue(fixed_position)}
            className={getThemeClasses(this.context?.theme, portal_class)}
          >
            {mainList}
          </DrawerListPortal>
        ) : (
          mainList
        )}
      </span>
    )
  }
}

// DrawerList List
DrawerList.Options = React.memo(
  React.forwardRef((props, ref) => {
    const {
      children,
      className,
      triangleRef = null,
      cache_hash, // eslint-disable-line
      showFocusRing,
      ...rest
    } = props

    return (
      <ul
        className={classnames(
          'dnb-drawer-list__options',
          showFocusRing && 'dnb-drawer-list__options--focusring',
          className
        )}
        {...rest}
        ref={ref}
      >
        {children}
        <li
          className="dnb-drawer-list__triangle"
          aria-hidden
          ref={triangleRef}
        />
      </ul>
    )
  }),
  (prevProps, nextProps) => {
    if (!prevProps.cache_hash) {
      return null
    }
    return prevProps.cache_hash === nextProps.cache_hash
  }
)
DrawerList.Options.displayName = 'DrawerList.Options'
DrawerList.Options.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func])
    .isRequired,
  cache_hash: PropTypes.string,
  showFocusRing: PropTypes.bool,
  className: PropTypes.string,
  triangleRef: PropTypes.object,
}
DrawerList.Options.defaultProps = {
  cache_hash: null,
  showFocusRing: false,
  className: null,
  triangleRef: null,
}

// DrawerList Item
DrawerList.Item = React.forwardRef((props, ref) => {
  const {
    role, // eslint-disable-line
    hash, // eslint-disable-line
    children, // eslint-disable-line
    className, // eslint-disable-line
    on_click, // eslint-disable-line
    selected, // eslint-disable-line
    active, // eslint-disable-line
    value, // eslint-disable-line
    ...rest
  } = props

  const params = {
    className: classnames(
      className,
      'dnb-drawer-list__option',
      selected && 'dnb-drawer-list__option--selected',
      active && 'dnb-drawer-list__option--focus'
    ),
    role,
    tabIndex: selected ? '0' : '-1',
    'aria-selected': active,
  }
  if (selected) {
    params['aria-current'] = true // has best support on NVDA
  }

  if (on_click) {
    params.onClick = () =>
      dispatchCustomElementEvent(
        {
          props: { ...props, displayName: DrawerList.Item.displayName },
        },
        'on_click',
        {
          selected,
          value,
          ...rest,
        }
      )
  }

  return (
    <li {...params} {...rest} ref={ref} key={'li' + hash}>
      <span className="dnb-drawer-list__option__inner">
        <ItemContent hash={hash}>{children}</ItemContent>
      </span>
    </li>
  )
})
DrawerList.Item.displayName = 'DrawerList.Item'
DrawerList.Item.propTypes = {
  role: PropTypes.string,
  hash: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.func,
    PropTypes.object,
  ]).isRequired,
  className: PropTypes.string,
  on_click: PropTypes.func,
  selected: PropTypes.bool,
  active: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}
DrawerList.Item.defaultProps = {
  role: 'option',
  hash: '',
  className: null,
  on_click: null,
  selected: null,
  active: null,
  value: null,
}

export function ItemContent({ hash = '', children }) {
  let content = null

  if (Array.isArray(children.content || children)) {
    content = (children.content || children).map((item, n) => (
      <span
        key={hash + n}
        className={`dnb-drawer-list__option__item item-nr-${n + 1}`} // "item-nr" is used by CSS
      >
        {children.render ? children.render(item, hash + n) : item}
      </span>
    ))
  } else if (Object.prototype.hasOwnProperty.call(children, 'content')) {
    content = children.render
      ? children.render(children.content, hash, children)
      : children.content
    if (content) {
      content = (
        <span className="dnb-drawer-list__option__item">{content}</span>
      )
    }
  } else {
    content = children && (
      <span className="dnb-drawer-list__option__item">{children}</span>
    )
  }

  return Object.prototype.hasOwnProperty.call(children, 'suffix_value') ? (
    <>
      {content}

      <span className="dnb-drawer-list__option__item dnb-drawer-list__option__suffix">
        {children.suffix_value}
      </span>
    </>
  ) : (
    content
  )
}
ItemContent.propTypes = {
  hash: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.object]),
}

DrawerList.HorizontalItem = ({ className, ...props }) => (
  <span
    className={classnames([
      'dnb-drawer-list__option__item dnb-drawer-list__option__item--horizontal',
      className,
    ])}
    {...props}
  />
)
DrawerList.HorizontalItem.propTypes = {
  className: PropTypes.string,
}
DrawerList.HorizontalItem.defaultProps = {
  className: null,
}

class OnMounted extends React.PureComponent {
  static propTypes = {
    addObservers: PropTypes.func.isRequired,
    removeObservers: PropTypes.func.isRequired,
  }
  componentDidMount() {
    this.props.addObservers()
  }
  componentWillUnmount() {
    this.props.removeObservers()
  }
  render() {
    return null
  }
}
