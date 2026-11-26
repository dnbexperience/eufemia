import { expect, it } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { MemoryRouter } from 'react-router'
import { validateInternalLinks } from '../../../../../../vite/prod/internal-links.mjs'
import AnimationDemo from '../AnimationDemo'

it('renders valid navigation links before hydration', () => {
  const url = '/web/components/breadcrumb/visual-tests/animation/'
  const html = renderToStaticMarkup(
    <MemoryRouter initialEntries={[url]}>
      <AnimationDemo />
    </MemoryRouter>
  )

  expect(
    validateInternalLinks([
      {
        url,
        html,
      },
    ]).errors
  ).toEqual([])
})
