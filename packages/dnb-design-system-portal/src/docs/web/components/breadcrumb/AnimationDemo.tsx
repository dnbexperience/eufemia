import { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import Breadcrumb from '@dnb/eufemia/src/components/Breadcrumb'
import Button from '@dnb/eufemia/src/components/Button'
import Flex from '@dnb/eufemia/src/components/Flex'
import H1 from '@dnb/eufemia/src/elements/H1'
import P from '@dnb/eufemia/src/elements/P'

const pages = [
  { key: 'overview', title: 'Overview' },
  { key: 'accounts', title: 'Accounts' },
  { key: 'payments', title: 'Payments' },
  { key: 'settings', title: 'Settings' },
]

export default function AnimationDemo() {
  const { pathname, search } = useLocation()
  const [pageKey, setPageKey] = useState('overview')
  const page = pages.find(({ key }) => key === pageKey) ?? pages[0]
  const isOverview = page.key === 'overview'

  useEffect(() => {
    setPageKey(new URLSearchParams(search).get('page') ?? 'overview')
  }, [search])

  return (
    <main style={{ padding: '2rem' }}>
      <Breadcrumb
        animate
        variant="multiple"
        bottom="medium"
        navText="Example path"
      >
        <Breadcrumb.Item
          key="overview"
          text="Overview"
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
      <H1 bottom="small">{page.title}</H1>
      <P bottom="medium">Choose a page to animate the breadcrumb.</P>
      <Flex.Container gap="small">
        {pages.map(({ key, title }) => (
          <Button
            key={key}
            href={pathname + '?page=' + key}
            variant="tertiary"
            icon="chevron_right"
          >
            {title}
          </Button>
        ))}
      </Flex.Container>
    </main>
  )
}
