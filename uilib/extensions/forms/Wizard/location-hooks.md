---
title: 'Location Hooks'
description: 'Is a set of React Hooks that lets you easily hook up your existing router in order to store the current step in the URL query string.'
metadata: https://eufemia.dnb.no/uilib/extensions/forms/Wizard/location-hooks/metadata.json
---

## Description

In order to store the current step in the browser location:

```bash
https://www.dnb.no/path/?unique-id-step=1
```

You may use one of the listed React Hooks to easily integrate your application router.

The `id` parameter is used to identify the `Wizard.Container` component. But it is not required when used inside a `Wizard.Container`.

## Supported routers

If you use a router, you may connect one of the supported hooks to it. This way your application will not import unnecessary and unused code.

- [react-router-dom](https://reactrouter.com/) via [useReactRouter](#with-react-router-dom)
- [@reach/router](https://reach.tech/router/) via [useReachRouter](#with-reachrouter)
- [Next.js](https://nextjs.org/) via [useNextRouter](#with-nextnavigation)

If you do not use a router, you can make use of the [useQueryLocator](#without-a-router) hook.

### With `react-router-dom`

```jsx
import { Form, Wizard } from '@dnb/eufemia/extensions/forms'
import { useSearchParams } from 'react-router-dom'

function MyForm() {
  Wizard.useReactRouter('unique-id', { useSearchParams })

  return (
    <Form.Handler>
      <Wizard.Container id="unique-id">...</Wizard.Container>
    </Form.Handler>
  )
}
```

### With `@reach/router`

```jsx
import { Form, Wizard } from '@dnb/eufemia/extensions/forms'
import { navigate, useLocation } from '@reach/router'

function MyForm() {
  Wizard.useReachRouter('unique-id', { useLocation, navigate })

  return (
    <Form.Handler>
      <Wizard.Container id="unique-id">...</Wizard.Container>
    </Form.Handler>
  )
}
```

### With `next/navigation`

```jsx
import { Form, Wizard } from '@dnb/eufemia/extensions/forms'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'

function MyForm() {
  Wizard.useNextRouter('unique-id', {
    useRouter,
    usePathname,
    useSearchParams,
  })

  return (
    <Form.Handler>
      <Wizard.Container id="unique-id">...</Wizard.Container>
    </Form.Handler>
  )
}
```

#### SSR support

Each hook has a `getIndex` function to get the current step index. You can unitize it to set the initial step index.

```jsx
import { Form, Wizard } from '@dnb/eufemia/extensions/forms'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'

function MyForm() {
  const { getIndex } = Wizard.useNextRouter('unique-id', {
    useRouter,
    usePathname,
    useSearchParams,
  })

  return (
    <Form.Handler>
      <Wizard.Container initialActiveIndex={getIndex()} id="unique-id">
        ...
      </Wizard.Container>
    </Form.Handler>
  )
}
```

## Without a router

You connect the hook with the `Wizard.Container` component via a unique `id` (string, function, object or React Context as the reference). The `id` will be used in the URL query string: `url?unique-id-step=1`.

```jsx
import { Form, Wizard } from '@dnb/eufemia/extensions/forms'

function MyForm() {
  Wizard.useQueryLocator('unique-id')

  return (
    <Form.Handler>
      <Wizard.Container id="unique-id">...</Wizard.Container>
    </Form.Handler>
  )
}
```

## Demos

```tsx
const Component = () => {
  Wizard.useQueryLocator('unique-id')
  return (
    <Form.Handler>
      <Wizard.Container id="unique-id">
        <MyStep title="Step 1" />
        <MyStep title="Step 2" />
        <MyStep title="Step 3" />
      </Wizard.Container>
    </Form.Handler>
  )
}
const MyStep = ({ title }) => {
  return (
    <Wizard.Step title={title}>
      <Form.Card>
        <P>Contents of {title}</P>
      </Form.Card>
      <Wizard.Buttons />
    </Wizard.Step>
  )
}
render(<Component />)
```

## Reach router

```tsx
const Component = () => {
  Wizard.useReachRouter('wizard-with-router', {
    useLocation,
    navigate,
  })
  return (
    <Form.Handler>
      <Wizard.Container id="wizard-with-router">
        <MyStep title="Step 1" />
        <MyStep title="Step 2" />
        <MyStep title="Step 3" />
      </Wizard.Container>
    </Form.Handler>
  )
}
const MyStep = ({ title }) => {
  return (
    <Wizard.Step title={title}>
      <Form.Card>
        <P>Contents of {title}</P>
      </Form.Card>
      <Wizard.Buttons />
    </Wizard.Step>
  )
}
render(<Component />)
```
