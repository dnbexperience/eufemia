/**
 * Web List Component
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import keycode from 'keycode'
import {
  isTrue,
  makeUniqueId,
  extendPropsWithContext,
  registerElement,
  validateDOMAttributes,
  dispatchCustomElementEvent
} from '../../shared/component-helper'
import { createSpacingClasses } from '../../components/space/SpacingHelper'

import DrawerListContext from './DrawerListContext'
import DrawerListProvider from './DrawerListProvider'

const renderProps = {
  on_show: null,
  on_hide: null,
  on_change: null,
  on_resize: null,
  on_select: null,
  on_state_update: null,
  options_render: null,
  wrapper_element: null
}

export const propTypes = {
  id: PropTypes.string,
  cache_hash: PropTypes.string,
  triangle_position: PropTypes.string,
  scrollable: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  focusable: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  direction: PropTypes.oneOf(['auto', 'top', 'bottom']),
  size: PropTypes.oneOf(['default', 'small', 'medium', 'large']),
  max_height: PropTypes.number,
  no_animation: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  no_scroll_animation: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool
  ]),
  prevent_selection: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool
  ]),
  align_drawer: PropTypes.oneOf(['left', 'right']),
  options_render: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.func,
    PropTypes.node
  ]),
  wrapper_element: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.func,
    PropTypes.node
  ]),
  default_value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  prevent_close: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  button_only: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  keep_open: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  prevent_focus: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  skip_keysearch: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  opened: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  class: PropTypes.string,
  data: PropTypes.oneOfType([
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
      PropTypes.node,
      PropTypes.object
    ]),
    PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
        PropTypes.shape({
          selected_value: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.node
          ]),
          content: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.node,
            PropTypes.arrayOf(PropTypes.string)
          ])
        })
      ])
    )
  ]),
  prepared_data: PropTypes.array,
  raw_data: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.func
  ]),
  ignore_events: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),

  // React
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.node,
    PropTypes.object,
    PropTypes.array
  ]),

  // Web Component props
  custom_element: PropTypes.object,
  custom_method: PropTypes.func,

  // Events
  on_show: PropTypes.func,
  on_hide: PropTypes.func,
  on_change: PropTypes.func,
  on_resize: PropTypes.func,
  on_select: PropTypes.func,
  on_state_update: PropTypes.func
}

export const defaultProps = {
  id: null,
  cache_hash: null,
  triangle_position: 'left',
  scrollable: true,
  focusable: false,
  max_height: null,
  direction: 'auto',
  size: 'default',
  no_animation: false,
  no_scroll_animation: false,
  prevent_selection: false,
  align_drawer: null,
  wrapper_element: null,
  default_value: null,
  value: 'initval',
  prevent_close: false,
  keep_open: false,
  prevent_focus: false,
  button_only: false,
  skip_keysearch: false,
  opened: null,
  class: null,
  data: null,
  prepared_data: null,
  raw_data: null,
  ignore_events: null,

  // React props
  className: null,
  children: null,

  // Web Component props
  custom_element: null,
  custom_method: null,
  ...renderProps
}

export default class DrawerList extends React.PureComponent {
  static tagName = 'dnb-drawer-list'
  static propTypes = propTypes
  static defaultProps = defaultProps
  static renderProps = renderProps
  static contextType = DrawerListContext // only used for the hasProvide check

  static enableWebComponent() {
    registerElement(DrawerList.tagName, DrawerList, defaultProps)
  }

  render() {
    const hasProvider = this.context?.drawerList

    if (hasProvider) {
      return <DrawerListInstance {...this.props} />
    }

    return (
      <DrawerListProvider
        {...this.props}
        data={this.props.data || this.props.children}
      >
        <DrawerListInstance {...this.props} />
      </DrawerListProvider>
    )
  }
}

class DrawerListInstance extends React.PureComponent {
  static propTypes = propTypes
  static defaultProps = defaultProps
  static contextType = DrawerListContext

  constructor(props, context) {
    super(props)

    this._id = props.id || makeUniqueId()
    this.state = this.state || {}

    // send along the event handlers to the provider state
    context.drawerList.setState(
      Object.entries(renderProps).reduce((acc, [key]) => {
        if (props[key]) {
          acc[key] = props[key]
        }
        return acc
      }, {})
    )

    context.drawerList.setState({
      triangle_position: props.triangle_position
    })
  }

  preventTab = (e) => {
    switch (keycode(e)) {
      case 'tab':
        this.setHidden()
        break
    }
  }

  selectItemHandler = (event) => {
    const selected_item = parseFloat(
      event.currentTarget.getAttribute('data-item')
    )
    if (selected_item > -1) {
      this.context.drawerList.selectItem(selected_item, {
        fireSelectEvent: true,
        event
      })
    }
  }

  render() {
    // use only the props from context, who are available here anyway
    const props = extendPropsWithContext(
      this.props,
      defaultProps,
      this.context.formRow,
      this.context.translation.DrawerList
    )

    const {
      align_drawer,
      button_only,
      scrollable,
      focusable,
      size,
      no_animation,
      no_scroll_animation,
      prevent_selection,
      inner_class,
      ignore_events,
      options_render,
      className,
      class: _className,
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
      closestToTop,
      closestToBottom
    } = this.context.drawerList

    const mainParams = {
      id: `${id}-drawer-list`,
      className: classnames(
        'dnb-drawer-list',
        opened && 'dnb-drawer-list--opened',
        hidden && 'dnb-drawer-list--hidden',
        `dnb-drawer-list--${direction}`,
        triangle_position &&
          `dnb-drawer-list--icon-position-${triangle_position}`,
        align_drawer && `dnb-drawer-list--${align_drawer}`,
        size && `dnb-drawer-list--${size}`,
        button_only && 'dnb-drawer-list--is-popup',
        isTrue(scrollable) && 'dnb-drawer-list--scroll',
        isTrue(no_scroll_animation) &&
          'dnb-drawer-list--no-scroll-animation',
        createSpacingClasses(props),
        _className,
        className
      ),
      ...attributes
    }

    const listParams = {
      id: `${id}-listbox`,
      className: classnames(
        'dnb-drawer-list__list',
        isTrue(no_animation) && 'dnb-drawer-list__list--no-animation',
        inner_class
      )
    }

    const ulParams = {
      id: `${id}-ul`,
      role: 'listbox',
      ['aria-labelledby']: `${id}-label`,
      tabIndex: '-1',
      style: {
        maxHeight: max_height > 0 ? `${max_height}rem` : null
      }
    }
    if (
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

    // make it pissible to grab the rest attributes and return it with all events
    Object.assign(
      this.context.drawerList.attributes,
      validateDOMAttributes(null, attributes)
    )

    const ignoreEvents = isTrue(ignore_events)

    const Items = () =>
      data.map((dataItem) => {
        const _id = dataItem.__id
        const liParams = {
          id: `option-${id}-${_id}`, // we could use _id here
          className: classnames(
            // helper classes
            _id == closestToTop && 'closest-to-top',
            _id == closestToBottom && 'closest-to-bottom',
            _id == data.length - 1 && 'last-of-type' // because of the triangle element
          ),
          onClick: this.selectItemHandler,
          onKeyDown: this.preventTab,
          'data-item': _id
        }

        if (ignoreEvents) {
          liParams.selected = null
          liParams.onClick = null
          liParams.onClick = null
          liParams.className = classnames(
            liParams.className,
            'dnb-drawer-list__option--ignore'
          )
        }

        return (
          <DrawerList.Item
            key={_id}
            cache_hash={cache_hash}
            selected={_id == selected_item}
            active={!ignoreEvents && _id == active_item}
            {...liParams}
          >
            {dataItem}
          </DrawerList.Item>
        )
      })

    return (
      <span {...mainParams} ref={this.context.drawerList._refShell}>
        <span {...listParams}>
          {hidden === false && data && data.length > 0 ? (
            <DrawerList.Options
              {...ulParams}
              ref={this.context.drawerList._refUl}
              cache_hash={
                cache_hash +
                active_item +
                selected_item +
                closestToTop +
                closestToBottom +
                direction +
                max_height
              }
              triangleRef={this.context.drawerList._refTriangle}
            >
              {typeof options_render === 'function' ? (
                options_render({ data, Items, Item: DrawerList.Item })
              ) : (
                <Items />
              )}
            </DrawerList.Options>
          ) : (
            (children && (
              <span className="dnb-drawer-list__content">
                {children}
                <span className="dnb-drawer-list__triangle"></span>
              </span>
            )) || (
              <ul {...ulParams} hidden>
                <li
                  role="option"
                  id={`option-${id}-${selected_item}`}
                  aria-selected="true"
                ></li>
              </ul>
            )
          )}
        </span>
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
      cache_hash: _cache_hash, // eslint-disable-line
      ...rest
    } = props
    return (
      <ul
        className={classnames('dnb-drawer-list__options', className)}
        {...rest}
        ref={ref}
      >
        {children}
        <li
          className="dnb-drawer-list__triangle"
          aria-hidden
          ref={triangleRef}
        ></li>
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
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  className: PropTypes.string,
  triangleRef: PropTypes.object
}
DrawerList.Options.defaultProps = {
  children: null,
  className: null,
  triangleRef: null
}

// DrawerList Item
DrawerList.Item = React.memo(
  React.forwardRef((props, ref) => {
    const {
      cache_hash: _cache_hash, // eslint-disable-line
      children,
      className,
      on_click,
      selected,
      active,
      value,
      ...rest
    } = props

    const params = {}
    if (selected) {
      params['aria-current'] = true // has best support on NVDA
      params['aria-selected'] = true // has best support on VO
    }

    if (on_click) {
      params.onClick = () =>
        dispatchCustomElementEvent(
          {
            props: { ...props, displayName: DrawerList.Item.displayName }
          },
          'on_click',
          {
            selected,
            value,
            ...rest
          }
        )
    }

    return (
      <li
        className={classnames(
          className,
          'dnb-drawer-list__option',
          selected && 'dnb-drawer-list__option--selected',
          active && 'dnb-drawer-list__option--focus'
        )}
        role="option" // presentation / option / menuitem
        aria-selected="false"
        tabIndex="-1"
        {...rest}
        {...params}
        ref={ref}
      >
        <span className="dnb-drawer-list__option__inner">
          <ItemContent>{children}</ItemContent>
        </span>
      </li>
    )
  }),
  (prevProps, nextProps) => {
    if (!prevProps.cache_hash) {
      return null
    }
    if (
      prevProps.cache_hash === nextProps.cache_hash &&
      prevProps.className === nextProps.className &&
      prevProps.content === nextProps.content &&
      prevProps.selected === nextProps.selected &&
      prevProps.active === nextProps.active
    ) {
      return true
    }
    return false
  }
)
DrawerList.Item.displayName = 'DrawerList.Item'
DrawerList.Item.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.func,
    PropTypes.object
  ]),
  className: PropTypes.string,
  on_click: PropTypes.func,
  selected: PropTypes.bool,
  active: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}
DrawerList.Item.defaultProps = {
  children: null,
  className: null,
  on_click: null,
  selected: null,
  active: null,
  value: null
}

const ItemContent = ({ children }) => {
  if (Array.isArray(children.content || children)) {
    return (children.content || children).map((item, n) => (
      <span key={n} className="dnb-drawer-list__option__item">
        {children.render ? children.render(item) : item}
      </span>
    ))
  } else if (children.content) {
    return children.render
      ? children.render(children.content)
      : children.content
  }

  return children
}
ItemContent.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.func,
    PropTypes.object
  ]).isRequired
}
