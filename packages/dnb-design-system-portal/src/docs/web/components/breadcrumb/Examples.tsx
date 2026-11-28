/**
 * UI lib Component Example
 *
 */

import { useState } from 'react'
import Button from '@dnb/eufemia/src/components/Button'
import Flex from '@dnb/eufemia/src/components/Flex'
import ComponentBox from '../../../../shared/tags/ComponentBox'
import Breadcrumb from '@dnb/eufemia/src/components/Breadcrumb'

export const BreadcrumbSingle = () => (
  <ComponentBox data-visual-test="breadcrumb-single">
    <Breadcrumb
      navText="Single breadcrumb example"
      onClick={() => {
        console.log('Going back!')
      }}
    />
  </ComponentBox>
)

export const BreadcrumbAnimated = () => (
  <ComponentBox>
    {() => {
      const InteractiveDemo = () => {
        const [page, setPage] = useState('Overview')
        const isOverview = page === 'Overview'

        return (
          <Flex.Stack>
            <Breadcrumb
              animate
              variant="multiple"
              navText="Animated example"
            >
              <Breadcrumb.Item
                key="overview"
                text="Overview"
                href="#animated-navigation"
                onClick={(event) => {
                  event.preventDefault()
                  setPage('Overview')
                }}
                variant={isOverview ? 'current' : 'home'}
              />
              {!isOverview && (
                <Breadcrumb.Item
                  key={page}
                  text={page}
                  variant="current"
                />
              )}
            </Breadcrumb>
            <Flex.Container>
              {['Overview', 'Accounts', 'Payments'].map((title) => (
                <Button
                  key={title}
                  variant="secondary"
                  onClick={() => setPage(title)}
                >
                  {title}
                </Button>
              ))}
            </Flex.Container>
          </Flex.Stack>
        )
      }

      return <InteractiveDemo />
    }}
  </ComponentBox>
)

export const BreadcrumbDefault = () => (
  <ComponentBox data-visual-test="breadcrumb-default">
    {() => {
      // You can also import pages from a store and only do a remapping
      const pages = [
        {
          text: '',
          href: '/',
        },
        {
          text: 'UI Library',
          href: '/web/get-started/quick-start',
        },
        {
          text: 'Components',
          href: '/web/components/overview',
        },
        {
          text: 'Breadcrumbs',
          href: '/web/components/breadcrumbs',
        },
      ]

      return (
        <Breadcrumb
          navText="Data breadcrumb example"
          data={pages}
          spacing
        />
      )
    }}
  </ComponentBox>
)

export const BreadcrumbChildren = () => (
  <ComponentBox data-visual-test="breadcrumb-children">
    <Breadcrumb navText="Child component breadcrumb example" spacing>
      <Breadcrumb.Item
        onClick={() => {
          console.log('go home!')
        }}
        variant="home"
      />
      <Breadcrumb.Item
        text="Page item"
        onClick={() => {
          console.log('go to page 1')
        }}
      />
      <Breadcrumb.Item
        text="Page item"
        onClick={() => {
          console.log('go to page 2')
        }}
        variant="current"
      />
    </Breadcrumb>
  </ComponentBox>
)

export const BreadcrumbCollapse = () => (
  <ComponentBox data-visual-test="breadcrumb-collapse">
    {() => {
      const pages = [
        {
          text: '',
          href: '/',
        },
        {
          text: 'UI Library',
          href: '/web/get-started/quick-start',
        },
        {
          text: 'Components',
          href: '/web/components/overview',
        },
      ]

      return (
        <Breadcrumb
          navText="Collapsed breadcrumb example"
          variant="collapse"
          data={pages}
          spacing
        />
      )
    }}
  </ComponentBox>
)

export const BreadcrumbMultiple = () => (
  <ComponentBox data-visual-test="breadcrumb-multiple">
    {() => {
      const pages = [
        {
          text: '',
          href: '/',
        },
        {
          text: 'UI Library',
          href: '/web/get-started/quick-start',
        },
        {
          text: 'Components',
          href: '/web/components/overview',
        },
        {
          text: 'Breadcrumbs',
          href: '/web/components/breadcrumbs',
        },
      ]

      return (
        <Breadcrumb
          navText="Expanded breadcrumb example"
          variant="multiple"
          data={pages}
          spacing
        />
      )
    }}
  </ComponentBox>
)
