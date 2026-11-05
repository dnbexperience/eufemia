import * as SidebarMenu from '@dnb/eufemia/src/extensions/sidebar-menu'
import { home, person } from '@dnb/eufemia/src/icons'
import '@dnb/eufemia/src/extensions/sidebar-menu/style'

export default function Page() {
  return (
    <>
      <Example id="first-paint-ltr" />
      <Example id="first-paint-rtl" dir="rtl" />
      <Example id="first-paint-wide" compactAt="90em" />
    </>
  )
}

function Example({
  id,
  dir = 'ltr',
  compactAt = '70em',
}: {
  id: string
  dir?: 'ltr' | 'rtl'
  compactAt?: '70em' | '90em'
}) {
  return (
    <div
      data-visual-test={id}
      dir={dir}
      lang={dir === 'rtl' ? 'ar' : 'en'}
    >
      <SidebarMenu.ResponsiveProvider
        scopeId={id}
        drawerAt="40em"
        compactAt={compactAt}
      >
        <SidebarMenu.ResponsiveTrigger text="Open navigation" />
        <SidebarMenu.ResponsiveInline
          compactWidth="4rem"
          expandedWidth="19rem"
        >
          <SidebarMenu.Root aria-label={id}>
            <SidebarMenu.Section
              id={id + '-personal'}
              text="Personal"
              icon={person}
            >
              <SidebarMenu.Item
                id={id + '-home'}
                text="Home"
                icon={home}
              />
              <SidebarMenu.Item id={id + '-plain'} text="Text only" />
              <SidebarMenu.Item
                id={id + '-notifications'}
                text="Notifications"
                icon={home}
                badge={2}
                badgeProps={{ variant: 'notification' }}
              />
            </SidebarMenu.Section>
            <SidebarMenu.Section id={id + '-business'} text="Business">
              <SidebarMenu.Item
                id={id + '-business-home'}
                text="Business home"
                icon={home}
              />
            </SidebarMenu.Section>
          </SidebarMenu.Root>
        </SidebarMenu.ResponsiveInline>
      </SidebarMenu.ResponsiveProvider>
    </div>
  )
}
