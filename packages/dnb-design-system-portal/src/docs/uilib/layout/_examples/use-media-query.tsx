import { useMediaQuery } from '@dnb/eufemia/shared'

function Component() {
  const match = useMediaQuery({
    matchOnSSR: true,
    when: { min: 'medium' },
  })

  return match ? 'true' : 'false'
}
