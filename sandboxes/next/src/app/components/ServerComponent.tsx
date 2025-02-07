import { Anchor, Button, Flex, H1, Link, P } from '@dnb/eufemia/build'

export default async function ServerComponent() {
  // Simulate fetching data from an API or database
  const data = (await fetchData()) as string
  console.log(data)

  return (
    <Flex.Stack>
      <H1>Server Component</H1>
      <P>Data fetched from the server: {data}</P>
      <Button
      // A lick handler will not work from a server component
      // onClick={() => {
      //   console.log('I am clicked')
      // }}
      >
        I'm SSR rendered
      </Button>

      {/* @ts-ignore */}
      <Anchor element={Link} href="/about">
        About
      </Anchor>
    </Flex.Stack>
  )
}

// Mock function to simulate data fetching
async function fetchData() {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  return 'Hello from the server!'
}
