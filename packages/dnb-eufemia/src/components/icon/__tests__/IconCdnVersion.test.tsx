import { act, fireEvent, render } from '@testing-library/react'
import { renderToString } from 'react-dom/server'
import { hydrateRoot } from 'react-dom/client'
import Icon from '../Icon'
import IconPrimary from '../../icon-primary/IconPrimary'
import Provider from '../../../shared/Provider'
import { getVersion } from '../../../shared/build-info/BuildInfo'

vi.mock('../../../shared/build-info/BuildInfo', () => ({
  getVersion: vi.fn(() => '__VERSION__'),
  getSha: vi.fn(() => '__SHA__'),
  getBuildDate: vi.fn(() => '__BUILD_DATE__'),
}))

const origin = 'https://assets.eufemia.dnb.no'
let probes: HTMLImageElement[]
const getIcon = () => document.querySelector<HTMLElement>('.dnb-icon__cdn')

beforeEach(() => {
  probes = []
  vi.mocked(getVersion).mockReturnValue('11.14.1')
  vi.spyOn(window, 'Image').mockImplementation(function () {
    const image = document.createElement('img')
    probes.push(image)
    return image
  })
})

afterEach(() => {
  vi.restoreAllMocks()
  vi.unstubAllEnvs()
})

describe('versioned CDN icons', () => {
  it.each(['11.14.1', '12.0.0-beta.2'])(
    'uses the installed release version %s',
    (version) => {
      vi.mocked(getVersion).mockReturnValue(version)
      render(<Icon icon="bell" size="medium" />)
      expect(getIcon().style.maskImage).toBe(
        `url("${origin}/v${version}/icons/dnb/bell_medium.svg")`
      )
    }
  )

  it.each(['__VERSION__', 'feat/my-branch', '0.0.0-development'])(
    'uses the stable CDN for development version %s',
    (version) => {
      vi.mocked(getVersion).mockReturnValue(version)
      render(<Icon icon="bell" />)
      expect(getIcon().style.maskImage).toBe(
        `url("${origin}/icons/dnb/bell.svg")`
      )
      expect(probes).toHaveLength(0)
    }
  )

  it('falls back if the released asset is not available yet', () => {
    render(<Icon icon="bell" size="medium" />)
    expect(probes).toHaveLength(1)
    expect(probes[0].crossOrigin).toBe('anonymous')
    expect(probes[0].src).toBe(
      `${origin}/v11.14.1/icons/dnb/bell_medium.svg`
    )
    fireEvent.error(probes[0])
    expect(getIcon().style.maskImage).toBe(
      `url("${origin}/icons/dnb/bell_medium.svg")`
    )
  })

  it('uses the installed version for primary-icon fallbacks', () => {
    render(<IconPrimary icon="heart" />)
    expect(getIcon().style.maskImage).toContain(
      '/v11.14.1/icons/dnb/heart.svg'
    )
  })

  it('does not fetch assets for bundled primary icons', () => {
    render(<IconPrimary icon="bell" />)
    expect(getIcon()).not.toBeInTheDocument()
    expect(probes).toHaveLength(0)
  })

  it('keeps explicit directories independent of the official fallback', () => {
    render(
      <Provider iconBaseUrl="/my-icons">
        <Icon icon="bell" />
      </Provider>
    )
    expect(getIcon().style.maskImage).toBe('url("/my-icons/bell.svg")')
    expect(probes).toHaveLength(0)
  })

  it('resets the versioned resource when the icon name changes', () => {
    const { rerender } = render(<Icon icon="bell" />)
    fireEvent.error(probes[0])
    rerender(<Icon icon="heart" />)
    expect(getIcon().style.maskImage).toContain(
      '/v11.14.1/icons/dnb/heart.svg'
    )
    expect(probes).toHaveLength(2)
  })

  it('preserves original SVG colours during fallback', () => {
    render(<Icon icon="bell" inheritColor={false} />)
    fireEvent.error(probes[0])
    expect(getIcon().style.backgroundImage).toBe(
      `url("${origin}/icons/dnb/bell.svg")`
    )
  })

  it('resets fallback state when an explicit directory matches the default', () => {
    const { rerender } = render(<Icon icon="bell" />)
    fireEvent.error(probes[0])
    rerender(
      <Provider iconBaseUrl={`${origin}/v11.14.1/icons/dnb`}>
        <Icon icon="bell" />
      </Provider>
    )
    expect(getIcon().style.maskImage).toContain(
      '/v11.14.1/icons/dnb/bell.svg'
    )
  })

  it('cleans up the old request when the icon changes', () => {
    const { rerender } = render(<Icon icon="bell" />)
    const previous = probes[0]
    rerender(<Icon icon="heart" />)
    expect(previous.onerror).toBeNull()
    fireEvent.error(previous)
    expect(getIcon().style.maskImage).toContain(
      '/v11.14.1/icons/dnb/heart.svg'
    )
  })

  describe('load warning', () => {
    const getWarnings = (log: ReturnType<typeof vi.spyOn>) =>
      log.mock.calls
        .map((args) => String(args.at(-1)))
        .filter((message) => message.includes('could not be loaded'))

    it('warns once per URL in development when an icon cannot be loaded', () => {
      vi.stubEnv('NODE_ENV', 'development')
      vi.mocked(getVersion).mockReturnValue('0.0.0-development')
      const log = vi.spyOn(console, 'log').mockImplementation(() => null)

      render(
        <>
          <Icon icon="missing_one" />
          <Icon icon="missing_one" />
        </>
      )
      expect(probes).toHaveLength(2)
      expect(probes[0].src).toBe(`${origin}/icons/dnb/missing_one.svg`)

      probes.forEach((probe) => fireEvent.error(probe))

      const warnings = getWarnings(log)
      expect(warnings).toHaveLength(1)
      expect(warnings[0]).toContain(`${origin}/icons/dnb/missing_one.svg`)
    })

    it('warns about the fallback URL when neither official URL loads', () => {
      vi.stubEnv('NODE_ENV', 'development')
      const log = vi.spyOn(console, 'log').mockImplementation(() => null)

      render(<Icon icon="missing_two" />)
      fireEvent.error(probes[0])
      expect(getWarnings(log)).toHaveLength(0)

      expect(probes).toHaveLength(2)
      expect(probes[1].src).toBe(`${origin}/icons/dnb/missing_two.svg`)
      fireEvent.error(probes[1])

      const warnings = getWarnings(log)
      expect(warnings).toHaveLength(1)
      expect(warnings[0]).toContain(`${origin}/icons/dnb/missing_two.svg`)
    })

    it('checks custom directories in development', () => {
      vi.stubEnv('NODE_ENV', 'development')
      const log = vi.spyOn(console, 'log').mockImplementation(() => null)

      render(
        <Provider iconBaseUrl="/my-icons">
          <Icon icon="missing_three" />
        </Provider>
      )
      expect(probes).toHaveLength(1)
      fireEvent.error(probes[0])

      expect(getWarnings(log)[0]).toContain('/my-icons/missing_three.svg')
    })

    it('does not check icons that cannot fall back in production', () => {
      vi.stubEnv('NODE_ENV', 'production')
      vi.mocked(getVersion).mockReturnValue('0.0.0-development')

      render(<Icon icon="missing_four" />)

      expect(probes).toHaveLength(0)
    })
  })

  it('hydrates the versioned URL without replacing the server markup', async () => {
    const element = <Icon icon="bell" />
    const container = document.createElement('div')
    container.innerHTML = renderToString(element)
    expect(container.innerHTML).toContain('/v11.14.1/icons/dnb/bell.svg')
    expect(probes).toHaveLength(0)
    const serverIcon = container.firstElementChild
    const onRecoverableError = vi.fn()
    let root: ReturnType<typeof hydrateRoot>
    await act(async () => {
      root = hydrateRoot(container, element, { onRecoverableError })
    })
    expect(container.firstElementChild).toBe(serverIcon)
    expect(onRecoverableError).not.toHaveBeenCalled()
    await act(async () => root.unmount())
  })
})
