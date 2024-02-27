/**
 * UI lib Component Example
 *
 */

import ComponentBox from '../../../../shared/tags/ComponentBox'
import Breadcrumb from '@dnb/eufemia/src/components/Breadcrumb'

export const BreadcrumbSingle = () => (
  <ComponentBox data-visual-test="breadcrumb-single">
    <Breadcrumb
      onClick={() => {
        console.log('Going back!')
      }}
    />
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
          href: '/uilib',
        },
        {
          text: 'Components',
          href: '/uilib/components',
        },
        {
          text: 'Breadcrumbs',
          href: '/uilib/components/breadcrumbs',
        },
      ]

      return <Breadcrumb data={pages} spacing />
    }}
  </ComponentBox>
)

export const BreadcrumbChildren = () => (
  <ComponentBox data-visual-test="breadcrumb-children">
    <Breadcrumb spacing>
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
          href: '/uilib',
        },
        {
          text: 'Components',
          href: '/uilib/components',
        },
      ]

      return <Breadcrumb variant="collapse" data={pages} spacing />
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
          href: '/uilib',
        },
        {
          text: 'Components',
          href: '/uilib/components',
        },
        {
          text: 'Breadcrumbs',
          href: '/uilib/components/breadcrumbs',
        },
      ]

      return <Breadcrumb variant="multiple" data={pages} spacing />
    }}
  </ComponentBox>
)
