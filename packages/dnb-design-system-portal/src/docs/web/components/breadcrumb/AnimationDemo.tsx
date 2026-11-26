import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import Breadcrumb from '@dnb/eufemia/src/components/Breadcrumb'
import Button from '@dnb/eufemia/src/components/Button'
import Card from '@dnb/eufemia/src/components/Card'
import Flex from '@dnb/eufemia/src/components/Flex'
import H1 from '@dnb/eufemia/src/elements/H1'
import H2 from '@dnb/eufemia/src/elements/H2'
import P from '@dnb/eufemia/src/elements/P'
import SidebarMenu from '@dnb/eufemia/src/extensions/sidebar-menu/SidebarMenu'
import './animation-demo.scss'

const pages = [
  { key: 'overview', title: 'Overview' },
  { key: 'chartist', title: 'Chartist' },
  { key: 'recharts', title: 'Recharts' },
  { key: 'chart-js', title: 'Chart.js' },
  { key: 'nivo', title: 'Nivo' },
  { key: 'echarts', title: 'Apache ECharts' },
]
export default function AnimationDemo() {
  const { pathname, search } = useLocation()
  const navigate = useNavigate()
  const pageKey = new URLSearchParams(search).get('page')
  const page = pages.find(({ key }) => key === pageKey) ?? pages[0]
  const [menuOpen, setMenuOpen] = useState(false)
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])
  const isOverview = page.key === 'overview'

  useEffect(() => {
    setMenuOpen(false)
  }, [search])

  useEffect(() => {
    return () => timers.current.forEach(clearTimeout)
  }, [])

  const navigation = (location: string) => (
    <SidebarMenu.Root
      aria-label="Chart libraries"
      selectedItem={location + '-' + page.key}
    >
      {pages.map(({ key, title }) => (
        <SidebarMenu.Item
          key={key}
          id={location + '-' + key}
          text={title}
          href={pathname + '?page=' + key}
        />
      ))}
    </SidebarMenu.Root>
  )

  return (
    <SidebarMenu.ResponsiveProvider
      scopeId="breadcrumb-demo"
      drawerAt="medium"
      compactAt="large"
      open={menuOpen}
      onOpenChange={setMenuOpen}
    >
      <SidebarMenu.ResponsiveShell className="dnb-breadcrumb-demo">
        <SidebarMenu.ResponsiveAside
          expandedWidth="15rem"
          compactWidth="4rem"
        >
          {navigation('inline')}
        </SidebarMenu.ResponsiveAside>
        <div className="dnb-breadcrumb-demo__workspace">
          <Flex.Container
            element="header"
            className="dnb-breadcrumb-demo__header"
            layoutEngine="css"
            align="center"
            innerSpace="small"
          >
            <SidebarMenu.ResponsiveTrigger text="Menu" />
            <P space={0} weight="medium">
              Eufemia Charts
            </P>
          </Flex.Container>
          <main className="dnb-breadcrumb-demo__main">
            <Breadcrumb
              animate
              variant="multiple"
              bottom="medium"
              navText="Chart path"
            >
              <Breadcrumb.Item
                key="charts"
                text="Charts"
                href={pathname + '?page=overview'}
                variant={isOverview ? 'current' : 'home'}
              />
              {!isOverview && (
                <Breadcrumb.Item
                  key={page.key}
                  text={page.title}
                  variant="current"
                />
              )}
            </Breadcrumb>
            <H1 bottom="medium">{page.title}</H1>
            <P bottom="large">
              {isOverview
                ? 'Explore chart libraries with Eufemia. Choose a library to open its preview.'
                : 'A preview of ' +
                  page.title +
                  ' in an Eufemia application.'}
            </P>
            <Flex.Container gap="small" bottom="large">
              <Button variant="secondary" onClick={() => navigate(-1)}>
                Back
              </Button>
              <Button variant="secondary" onClick={() => navigate(1)}>
                Forward
              </Button>
              <Button
                variant="secondary"
                onClick={() => {
                  timers.current.forEach(clearTimeout)
                  const sequence = [
                    'chartist',
                    'nivo',
                    'overview',
                    'echarts',
                    'overview',
                  ]
                  timers.current = sequence.map((key, index) =>
                    setTimeout(() => {
                      navigate('?page=' + key)
                    }, index * 75)
                  )
                }}
              >
                Rapid navigation
              </Button>
            </Flex.Container>
            <div className="dnb-breadcrumb-demo__cards">
              {(isOverview
                ? pages.slice(1)
                : pages.filter(({ key }) => key !== page.key)
              ).map(({ key, title }) => (
                <Card key={key} responsive={false} stack>
                  <H2>{title}</H2>
                  <P>
                    {key === 'overview'
                      ? 'Return to the library overview.'
                      : 'Explore examples, accessible data and theme integration.'}
                  </P>
                  <Button
                    href={pathname + '?page=' + key}
                    variant="tertiary"
                    icon="chevron_right"
                  >
                    {key === 'overview'
                      ? 'All libraries'
                      : 'Open ' + title}
                  </Button>
                </Card>
              ))}
            </div>
          </main>
        </div>
      </SidebarMenu.ResponsiveShell>
      <SidebarMenu.ResponsiveDrawer dialogTitle="Chart libraries">
        {navigation('drawer')}
      </SidebarMenu.ResponsiveDrawer>
    </SidebarMenu.ResponsiveProvider>
  )
}
