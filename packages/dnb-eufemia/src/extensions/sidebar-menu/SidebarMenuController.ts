import { useMemo } from 'react'
import {
  createSharedState,
  useSharedState,
} from '../../shared/helpers/useSharedState'
import type {
  SidebarMenuContent,
  SidebarMenuContentTransform,
  SidebarMenuController,
  SidebarMenuControllerProps,
} from './types'

type ContentRegistration<Value> = {
  key: string
  value: Value
  order?: number
}

type ContentState = {
  replacements: ContentRegistration<SidebarMenuContent>[]
  transforms: ContentRegistration<SidebarMenuContentTransform>[]
  props?: ContentRegistration<SidebarMenuControllerProps>[]
}

const scope = 'sidebar-menu-content/v1'
// Keep prop registrations independent of content cleanup in older bundles.
const propsScope = 'sidebar-menu-props/v1'
const emptyState: ContentState = { replacements: [], transforms: [] }
const getServerSnapshot = () => undefined

/** Returns a controller that can update props and content before or after a menu mounts. */
export function getController(id: string): SidebarMenuController {
  if (!id) {
    throw new Error('SidebarMenu.getController requires a non-empty id')
  }

  function register<Key extends keyof ContentState>(
    collection: Key,
    registration: ContentState[Key][number]
  ) {
    if (!registration.key) {
      throw new Error(
        'SidebarMenu content registrations require a non-empty key'
      )
    }
    if (typeof window === 'undefined') {
      throw new Error(
        'SidebarMenu controllers update browser props and content. Use component props for server rendering.'
      )
    }

    const state = createSharedState<ContentState>(id, undefined, {
      scope: collection === 'props' ? propsScope : scope,
    })
    const current = state.get() ?? emptyState
    state.set({
      ...current,
      [collection]: [
        ...(current[collection] ?? []).filter(
          ({ key }) => key !== registration.key
        ),
        registration,
      ],
    })

    return () => {
      const current = state.get()
      if (
        !current?.[collection]?.some((entry) => entry === registration)
      ) {
        return
      }

      const next = {
        ...current,
        [collection]: current[collection].filter(
          (entry) => entry !== registration
        ),
      }
      state.set(
        next.replacements.length ||
          next.transforms.length ||
          next.props?.length
          ? next
          : undefined
      )
    }
  }

  return {
    setProps: (props, { key }) =>
      register('props', { key, value: { ...props } }),
    setContent: (content, { key }) =>
      register('replacements', { key, value: content }),
    transformContent: (transform, { key, order = 0 }) =>
      register('transforms', { key, value: transform, order }),
  }
}

const responsiveProps = [
  'drawerAt',
  'compactAt',
  'compactOffset',
  'open',
  'defaultOpen',
  'onOpenChange',
  'inlineCollapsed',
  'defaultInlineCollapsed',
  'inlineCollapsedStorageKey',
  'inlineCollapsedStorage',
  'onInlineCollapsedChange',
] as const

const shellProps = [
  'breakpoint',
  'children',
  'controllerId',
  'scopeId',
  'styleNonce',
  'data',
  'sections',
  'dangerouslySetInnerHTML',
]

const menuProps = new Set([
  'openItems',
  'defaultOpenItems',
  'openItemsStorageKey',
  'openItemsStorage',
  'scrollPositionStorageKey',
  'scrollPositionStorage',
  'scrollSelectedItemIntoView',
  'openOnFind',
  'onOpenItemsChange',
  'activeSection',
  'defaultActiveSection',
  'sectionLabel',
  'onActiveSectionChange',
  'selectedItem',
  'defaultSelectedItem',
  'onSelectedItemChange',
  'space',
  'innerSpace',
  'top',
  'right',
  'bottom',
  'left',
  'style',
  'role',
  'autoFocus',
  'suppressContentEditableWarning',
  'suppressHydrationWarning',
])

let navigationElement: HTMLElement | undefined

function isMenuProp(key: string) {
  if (menuProps.has(key) || /^(aria|data)-[a-z][a-z0-9-]*$/.test(key)) {
    return true
  }
  if (typeof document === 'undefined') {
    return false
  }
  navigationElement ??= document.createElement('nav')
  if (/^on[A-Z]/.test(key)) {
    const event = key
      .replace(/Capture$/, '')
      .toLowerCase()
      .replace('doubleclick', 'dblclick')
    return event in navigationElement
  }
  return key in navigationElement
}

export function useSidebarMenuProps<Props>(
  id: string | undefined,
  props: Props,
  target: 'menu' | 'responsive'
): Props {
  const { data: state } = useSharedState<ContentState>(
    typeof window === 'undefined' ? undefined : id,
    undefined,
    undefined,
    { scope: propsScope, getServerSnapshot }
  )

  return useMemo(() => {
    const overrides = Object.fromEntries(
      (state?.props ?? []).flatMap(({ value }) =>
        Object.entries(value).filter(
          ([key]) =>
            !shellProps.includes(key) &&
            (target === 'responsive'
              ? responsiveProps.some((name) => name === key)
              : isMenuProp(key))
        )
      )
    )
    return { ...props, ...overrides }
  }, [props, state, target])
}

export function useSidebarMenuContent(
  id: string | undefined,
  data: SidebarMenuContent['data'],
  sections: SidebarMenuContent['sections']
): SidebarMenuContent {
  const { data: state } = useSharedState<ContentState>(
    typeof window === 'undefined' ? undefined : id,
    undefined,
    undefined,
    { scope, getServerSnapshot }
  )

  return useMemo(() => {
    const fallback: SidebarMenuContent = sections
      ? { sections }
      : { data: data ?? [] }
    const content = state?.replacements.at(-1)?.value ?? fallback
    const transforms = [...(state?.transforms ?? [])].sort(
      (a, b) =>
        a.order - b.order || (a.key < b.key ? -1 : a.key > b.key ? 1 : 0)
    )

    return transforms.reduce(
      (content, { value }) => value(content),
      content
    )
  }, [data, sections, state])
}
