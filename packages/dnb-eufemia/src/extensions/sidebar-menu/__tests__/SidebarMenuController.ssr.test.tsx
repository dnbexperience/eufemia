// @vitest-environment node
import { renderToString } from 'react-dom/server'
import * as SidebarMenu from '../SidebarMenu'

describe('SidebarMenu content controller on the server', () => {
  it('renders only the content passed by each request', () => {
    const render = (text: string) =>
      renderToString(
        <SidebarMenu.Data
          controllerId="shared-navigation"
          data={[{ id: 'home', text }]}
        />
      )

    expect(render('First request')).toContain('First request')
    expect(render('Second request')).not.toContain('First request')
    expect(render('Second request')).toContain('Second request')
  })

  it('does not retain browser content or callbacks on the server', () => {
    const sidebar = SidebarMenu.getController('shared-navigation')
    expect(() => sidebar.setContent({ data: [] }, { key: 'app' })).toThrow(
      'Use Data props for server rendering'
    )
    expect(() =>
      sidebar.transformContent((content) => content, { key: 'app' })
    ).toThrow('Use Data props for server rendering')
  })
})
