import {
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from 'react'
import {
  Button,
  Checkbox,
  Card,
  H1,
  P,
  Switch,
  ToggleButton,
  Typography,
} from '@dnb/eufemia/src'
import { Theme, useTheme } from '@dnb/eufemia/src/shared'
import type { ThemeNames } from '@dnb/eufemia/src/shared/Theme'
import useCanUseDOM from '@dnb/eufemia/src/shared/helpers/useCanUseDOM'
import { useThemeHandler } from '../../../vite/client/shims/theme-handler'
import { SearchBarInput } from '../menu/SearchBar'
import PortalToolsMenu from '../menu/PortalToolsMenu'
import HomeBrands from './HomeBrands'
import homeData from './HomeData.json'
import useHangingMotion from './useHangingMotion'
import {
  heroStyle,
  titleStyle,
  introStyle,
  copyStyle,
  searchStyle,
  sceneStyle,
  hangingStyle,
  tetherStyle,
  specimenStyle,
  shadowStyle,
  tileStyle,
} from './Home.module.scss'

// Position, tether length, attachment point, depth, angle and reserved width.
const samples = [
  [18, 160, 53, 3, -7, 6.5],
  [65, 140, 48, 0, 6.5, 12],
  [34, 300, 52, 4, -5.5, 7.5],
  [78, 260, 49, 1, 4, 11],
  [25, 410, 48, 5, 6.5, 12],
  [83, 390, 52, 2, -7, 9.5],
] as const

const brands = [
  ['ui', 'DNB'],
  ['carnegie', 'DNB Carnegie'],
  ['sbanken', 'Sbanken'],
  ['eiendom', 'DNB Eiendom'],
] as const

const Fun = lazy(() => import('./play/Fun'))

export default function HomeHero() {
  const { ref, onQuery } = useHangingMotion()
  const [showFun, setShowFun] = useState(false)
  const handleQuery = useCallback(
    (value: string) => {
      if (value.trim().toLowerCase() === 'secret') {
        setShowFun(true)
      }
      onQuery(value)
    },
    [onQuery]
  )
  const { setTheme } = useThemeHandler()
  const activeTheme = useTheme()
  const canUseDOM = useCanUseDOM()
  const activeBrand = canUseDOM ? activeTheme.brand : 'ui'
  const colorScheme = canUseDOM ? activeTheme.colorScheme : 'light'
  const dark = colorScheme === 'dark'
  const previousBrand = useRef<ThemeNames>('ui')

  useEffect(() => {
    if (activeBrand && activeBrand !== 'carnegie') {
      previousBrand.current = activeBrand
    }
  }, [activeBrand])

  return (
    <section className={heroStyle} aria-labelledby="welcome-heading">
      <HomeBrands />
      <div className={copyStyle}>
        <Typography.Context responsive>
          <H1
            id="welcome-heading"
            size="xx-large"
            className={titleStyle}
            top={false}
            bottom={false}
          >
            {homeData.title.split('. ')[0]}. <br />
            {homeData.title.split('. ').slice(1).join('. ')}
          </H1>
          {showFun ? (
            <Suspense fallback={null}>
              <Fun />
            </Suspense>
          ) : (
            <P
              size="large"
              className={introStyle}
              top={false}
              bottom={false}
            >
              {homeData.introduction}
            </P>
          )}
        </Typography.Context>
        <div className={searchStyle}>
          <SearchBarInput
            id="portal-home-search"
            placeholder="Search components, patterns and guidance"
            stretch
            onQuery={handleQuery}
          />
        </div>
      </div>
      <div
        ref={ref}
        className={sceneStyle}
        role="group"
        aria-label="Brand and appearance"
      >
        {samples.map(([x, length, pin, depth, tilt, width], index) => {
          const brand = brands[index]?.[0]
          const name = brands[index]?.[1]
          const selected = brand === activeBrand
          return (
            <div
              key={index}
              className={hangingStyle}
              data-hanging-item={
                brand || (index === 4 ? 'mode' : 'settings')
              }
              style={
                {
                  '--desktop-x': x + '%',
                  '--desktop-length': length + 'px',
                  '--pin': pin + '%',
                  '--depth': depth,
                  '--tilt': tilt + 'deg',
                  '--specimen-width': width + 'rem',
                  '--specimen-height':
                    (index === 1 || index === 4 ? 4 : 3) + 'rem',
                  '--mobile-length': length * 0.65 - 60 + 'px',
                } as CSSProperties
              }
            >
              <span className={tetherStyle} aria-hidden>
                <svg
                  viewBox="0 0 64 100"
                  preserveAspectRatio="none"
                  width="64"
                  height="100"
                >
                  <path
                    d="M32 0 Q32 50 32 100"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    vectorEffect="non-scaling-stroke"
                  />
                </svg>
              </span>
              <div
                data-home-specimen
                className={
                  specimenStyle +
                  (brand ? ' portal-home-brand-' + brand : '')
                }
              >
                {/* Keep color schemes brand-independent so Carnegie inherits dark-mode support when its theme adds it. */}
                <Theme
                  brand={brand || activeBrand}
                  colorScheme={colorScheme}
                  surface="initial"
                >
                  {(index === 0 || index === 3) && (
                    <Button
                      size="large"
                      variant={index === 3 ? 'secondary' : undefined}
                      text={name}
                      aria-label={'Switch brand to ' + name}
                      aria-pressed={selected}
                      onClick={() => setTheme({ brand })}
                    />
                  )}
                  {(index === 1 || index === 4) && (
                    <Card
                      className={tileStyle}
                      responsive={false}
                      innerSpace="small"
                      backgroundColor="var(--token-color-background-neutral)"
                      outline
                    >
                      {index === 1 ? (
                        <Checkbox
                          size="large"
                          checked={selected}
                          label={name}
                          onChange={({ checked }) =>
                            setTheme({
                              brand: checked
                                ? 'carnegie'
                                : previousBrand.current,
                            })
                          }
                        />
                      ) : (
                        <Switch
                          size="large"
                          checked={dark}
                          label="Dark mode"
                          onChange={({ checked }) =>
                            setTheme({
                              colorScheme: checked ? 'dark' : 'light',
                            })
                          }
                        />
                      )}
                    </Card>
                  )}
                  {index === 2 && (
                    <ToggleButton.Group
                      value={activeBrand}
                      onChange={() => setTheme({ brand })}
                    >
                      <ToggleButton
                        size="large"
                        text={name}
                        value={brand}
                        aria-label={'Switch brand to ' + name}
                      />
                    </ToggleButton.Group>
                  )}
                  {index === 5 && (
                    <PortalToolsMenu
                      compactOnSmall={false}
                      triggerProps={{
                        text: 'Settings',
                        'aria-label': 'Open settings',
                        tooltip: null,
                        size: 'large',
                        left: false,
                      }}
                    />
                  )}
                </Theme>
              </div>
              <span className={shadowStyle} aria-hidden />
            </div>
          )
        })}
      </div>
    </section>
  )
}
