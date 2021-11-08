/**
 * UI lib Component Example
 *
 */

import React from 'react'
import ComponentBox from 'Src/shared/tags/ComponentBox'

export const BreadcrumbSingle = () => (
  <ComponentBox data-visual-test="breadcrumb-single">
    {() => /* jsx */ `
<Breadcrumb
  onClick={() => {
      console.log('Going back!')
    }}
/>
`}
  </ComponentBox>
)

export const BreadcrumbMultipleData = () => (
  <ComponentBox noFragments={false} data-visual-test="breadcrumb-multiple">
    {() => /* jsx */ `
() => {
  // You can also import pages from a store and only do a remapping
  const pages = [
    {
      text: "",
      href: "/",
    },
    {
      text: "UI Library",
      href: "/uilib",
    },
    {
      text: "Components",
      href: "/uilib/components",
    },
    {
      text: "Breadcrumbs",
      href: "/uilib/components/breadcrumbs"
    }
  ];
  
  return (
    <Breadcrumb data={pages} />
  )
}
`}
  </ComponentBox>
)

export const BreadcrumbMultiple = () => (
  <ComponentBox data-visual-test="breadcrumb-multiple-children">
    {() => /* jsx */ `
<Breadcrumb>
  <Breadcrumb.Item onClick={() => {console.log("go home!")}} variant="home" />
  <Breadcrumb.Item text="Page item" onClick={() => {console.log("go to page 1")}} />
  <Breadcrumb.Item text="Page item" onClick={() => {console.log("go to page 2")}} variant="current" />
</Breadcrumb>
`}
  </ComponentBox>
)

export const BreadcrumbVariants = () => (
  <ComponentBox noFragments={false} data-visual-test="breadcrumb-collapse">
    {() => /* jsx */ `
() => {
  const pages = [
    {
      text: "",
      href: "/",
    },
    {
      text: "UI Library",
      href: "/uilib",
    },
    {
      text: "Components",
      href: "/uilib/components",
    }
  ];
  
  return (
    // Try changing variant here
    <Breadcrumb variant="collapse" data={pages} />
  )
}
`}
  </ComponentBox>
)

export const BreadcrumbCollapseOpen = () => (
  <ComponentBox
    noFragments={false}
    data-visual-test="breadcrumb-collapse-open"
  >
    {() => /* jsx */ `
() => {
  const pages = [
    {
      text: "",
      href: "/",
    },
    {
      text: "UI Library",
      href: "/uilib",
    },
    {
      text: "Components",
      href: "/uilib/components",
    }
  ];
  
  return (
    <Breadcrumb variant="collapse" data={pages} isCollapsed={false} />
  )
}
`}
  </ComponentBox>
)
