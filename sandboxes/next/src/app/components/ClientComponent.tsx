'use client'

import { Anchor, Button, Flex, H1, Link, P } from '@dnb/eufemia/build'

export default function ClientComponent() {
  // Simulate fetching data from an API or database

  const clickHandler = () => {
    console.log('I am clicked')
  }

  return (
    <Flex.Stack>
      <H1>Client Component</H1>
      <Button onClick={clickHandler}>I'm Client rendered</Button>

      {/* @ts-ignore */}
      <Anchor element={Link} href="/about">
        About
      </Anchor>
    </Flex.Stack>
  )
}
