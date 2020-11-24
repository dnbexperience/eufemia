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
import DrawerListPortal from './DrawerListPortal'

const propsToFilterOut = {
  on_show: null,
  on_hide: null,
  on_change: null,
  on_pre_change: null,
  on_resize: null,
  on_select: null,
  on_state_update: null,
  options_render: null,
  wrapper_element: null
}

export default class DrawerList extends React.PureComponent {
  static tagName = 'dnb-drawer-list'
  static contextType = DrawerListContext // only used for the hasProvide check

  static propTypes = {
    id: PropTypes.string,
    role: PropTypes.string,
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
    use_drawer_on_mobile: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool
    ]),
    prevent_selection: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool
    ]),
    action_menu: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    is_popup: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
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
    default_value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    skip_portal: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    prevent_close: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    independent_width: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool
    ]),
    fixed_position: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool
    ]),
    keep_open: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    prevent_focus: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    skip_keysearch: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool
    ]),
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

    className: PropTypes.string,
    children: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
      PropTypes.node,
      PropTypes.object,
      PropTypes.array
    ]),

    custom_element: PropTypes.object,
    custom_method: PropTypes.func,

    on_show: PropTypes.func,
    on_hide: PropTypes.func,
    on_change: PropTypes.func,
    on_pre_change: PropTypes.func,
    on_resize: PropTypes.func,
    on_select: PropTypes.func,
    on_state_update: PropTypes.func
  }

  static defaultProps = {
    id: null,
    role: 'listbox',
    cache_hash: null,
    triangle_position: 'left',
    scrollable: true,
    focusable: false,
    max_height: null,
    direction: 'auto',
    size: 'default',
    no_animation: false,
    no_scroll_animation: false,
    use_drawer_on_mobile: false,
    prevent_selection: false,
    action_menu: false,
    is_popup: false,
    align_drawer: 'left',
    wrapper_element: null,
    default_value: null,
    value: 'initval',
    skip_portal: null,
    prevent_close: false,
    keep_open: false,
    prevent_focus: false,
    fixed_position: false,
    independent_width: false,
    skip_keysearch: false,
    opened: null,
    class: null,
    data: null,
    prepared_data: null,
    raw_data: null,
    ignore_events: null,

    className: null,
    children: null,

    custom_element: null,
    custom_method: null,

    on_show: null,
    on_hide: null,
    on_change: null,
    on_pre_change: null,
    on_resize: null,
    on_select: null,
    on_state_update: null,
    options_render: null
  }

  static enableWebComponent() {
    registerElement(
      DrawerList.tagName,
      DrawerList,
      DrawerList.defaultProps
    )
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
      triangle_position: props.triangle_position
    })
  }

  preventTab = (e) => {
    switch (keycode(e)) {
      case 'tab':
        this.context.drawerList.setHidden()
        break

      case 'page down':
      case 'page up':
        e.preventDefault()
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
      DrawerList.defaultProps,
      this.context.formRow,
      this.context.translation.DrawerList
    )

    const {
      role,
      align_drawer,
      fixed_position,
      use_drawer_on_mobile,
      independent_width,
      scrollable,
      focusable,
      size,
      no_animation,
      no_scroll_animation,
      prevent_selection,
      action_menu,
      is_popup,
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
      closestToBottom,
      assignObservers,
      _refShell,
      _refTriangle,
      _refUl,
      usePortal,
      _refRoot
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
        isTrue(independent_width) ||
          (isTrue(action_menu) && 'dnb-drawer-list--independent-width'),
        isTrue(scrollable) && 'dnb-drawer-list--scroll',
        isTrue(no_scroll_animation) &&
          'dnb-drawer-list--no-scroll-animation',
        isTrue(use_drawer_on_mobile) && 'dnb-drawer-list--mobile-view',
        createSpacingClasses(props),
        _className,
        className
      ),
      ...attributes
    }

    const listParams = {
      id: `${id}-listbox`,
      /**
       * We may considder to use the hidden attribute in future
       * Or we may add an prop to put the HTML in the DOM, if needed
       */
      // hidden: hidden !== false,
      className: classnames(
        'dnb-drawer-list__list',
        isTrue(no_animation) && 'dnb-drawer-list__list--no-animation',
        inner_class
      )
    }

    const ulParams = {
      role,
      id: `${id}-ul`,
      'aria-expanded': opened,
      'aria-labelledby': `${id}-label`,
      tabIndex: '-1',
      style: {
        maxHeight: max_height > 0 ? `${max_height}rem` : null
      },
      ref: _refUl
    }

    if (!hidden && parseFloat(active_item) > -1) {
      ulParams['aria-activedescendant'] = `option-${id}-${active_item}`
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
          onKeyDown: this.preventTab
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
                triangleRef={_refTriangle}
              >
                {typeof options_render === 'function' ? (
                  options_render({ data, Items, Item: DrawerList.Item })
                ) : (
                  <Items />
                )}
              </DrawerList.Options>
              <OnMounted assignObservers={assignObservers} />
            </>
          ) : (
            children && (
              <span className="dnb-drawer-list__content">
                {children}
                {/* <Triangle /> */}
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

    // Gets set as "skip_portal"
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
            use_drawer_on_mobile={isTrue(use_drawer_on_mobile)}
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
      class: _className,
      triangleRef = null,
      cache_hash, // eslint-disable-line
      ...rest
    } = props
    return (
      <ul
        className={classnames(
          'dnb-drawer-list__options',
          className,
          _className
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
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  className: PropTypes.string,
  class: PropTypes.string,
  triangleRef: PropTypes.object
}
DrawerList.Options.defaultProps = {
  children: null,
  className: null,
  class: null,
  triangleRef: null
}

// DrawerList Item
DrawerList.Item = React.forwardRef((props, ref) => {
  const {
    role, // eslint-disable-line
    hash, // eslint-disable-line
    children, // eslint-disable-line
    className, // eslint-disable-line
    class: _className, // eslint-disable-line
    on_click, // eslint-disable-line
    selected, // eslint-disable-line
    active, // eslint-disable-line
    value, // eslint-disable-line
    ...rest
  } = props

  const params = {
    className: classnames(
      className,
      _className,
      'dnb-drawer-list__option',
      selected && 'dnb-drawer-list__option--selected',
      active && 'dnb-drawer-list__option--focus'
    ),
    role,
    tabIndex: selected ? '0' : '-1',
    'aria-selected': active
  }
  if (selected) {
    params['aria-current'] = true // has best support on NVDA
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
    PropTypes.object
  ]).isRequired,
  className: PropTypes.string,
  class: PropTypes.string,
  on_click: PropTypes.func,
  selected: PropTypes.bool,
  active: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}
DrawerList.Item.defaultProps = {
  role: 'option',
  hash: '',
  className: null,
  class: null,
  on_click: null,
  selected: null,
  active: null,
  value: null
}

const ItemContent = ({ hash, children }) => {
  if (Array.isArray(children.content || children)) {
    return (children.content || children).map((item, n) => (
      <span key={hash + n} className="dnb-drawer-list__option__item">
        {children.render ? children.render(item, hash + n) : item}
      </span>
    ))
  } else if (children.content) {
    return children.render
      ? children.render(children.content, hash)
      : children.content
  }

  return children
}
ItemContent.propTypes = {
  hash: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.func,
    PropTypes.object
  ]).isRequired
}

DrawerList.HorizontalItem = ({ className, ...props }) => (
  <span
    className={classnames([
      'dnb-drawer-list__option__inner__item',
      className
    ])}
    {...props}
  />
)
DrawerList.HorizontalItem.propTypes = {
  className: PropTypes.string
}
DrawerList.HorizontalItem.defaultProps = {
  className: null
}

class OnMounted extends React.PureComponent {
  static propTypes = {
    assignObservers: PropTypes.func.isRequired
  }
  componentDidMount() {
    this.props.assignObservers()
  }
  render() {
    return null
  }
}
