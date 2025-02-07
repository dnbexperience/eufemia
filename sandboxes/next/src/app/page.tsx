import { Suspense } from 'react'
import { Flex } from '@dnb/eufemia/build'
import ServerComponent from './components/ServerComponent'
import ClientComponent from './components/ClientComponent'

export default function Home() {
  return (
    <main>
      <Flex.Stack>
        <ClientComponent />

        <Suspense fallback="Loading server component...">
          <ServerComponent />
        </Suspense>
      </Flex.Stack>
    </main>
  )
}
