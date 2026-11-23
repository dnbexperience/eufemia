import { useId, useRef, useState } from 'react'
import ComponentBox from '../../../../shared/tags/ComponentBox'
import { P, ScrollIndicator } from '@dnb/eufemia/src'

export function MultipleVisibleItems() {
  return (
    <ComponentBox
      data-visual-test="scroll-indicator-multiple"
      scope={{ useState, useId }}
    >
      {() => {
        const Example = () => {
          const [start, setStart] = useState(0)
          const id = useId()
          return (
            <>
              <P id={id}>
                Items {start + 1} and {start + 2} are in view.
              </P>
              <ScrollIndicator
                aria-label="Visible items"
                aria-controls={id}
                items={Array.from({ length: 5 }, (_, index) => ({
                  label: `Show item ` + (index + 1),
                  active: index >= start && index <= start + 1,
                }))}
                onChange={({ index }) => setStart(Math.min(index, 3))}
              />
            </>
          )
        }
        return <Example />
      }}
    </ComponentBox>
  )
}

export function Gallery() {
  return (
    <ComponentBox
      data-visual-test="scroll-indicator-gallery"
      scope={{ useState, useId, useRef }}
    >
      {() => {
        const Example = () => {
          const [current, setCurrent] = useState(0)
          const id = useId()
          const ref = useRef<HTMLDivElement>(null)
          const images = [
            {
              src: '/images/avatars/35217511.jpg',
              alt: 'First contributor portrait',
            },
            {
              src: '/images/avatars/21338570.jpg',
              alt: 'Second contributor portrait',
            },
            {
              src: '/images/avatars/1501870.jpg',
              alt: 'Third contributor portrait',
            },
          ]
          return (
            <>
              <div
                id={id}
                ref={ref}
                style={{
                  display: 'flex',
                  width: '10rem',
                  overflowX: 'auto',
                  scrollSnapType: 'x mandatory',
                }}
                onScroll={(event) => {
                  const element = event.currentTarget
                  setCurrent(
                    Math.round(element.scrollLeft / element.clientWidth)
                  )
                }}
              >
                {images.map(({ src, alt }) => (
                  <img
                    key={src}
                    src={src}
                    alt={alt}
                    width="160"
                    height="160"
                    style={{ flex: 'none', scrollSnapAlign: 'start' }}
                  />
                ))}
              </div>
              <ScrollIndicator
                aria-label="Gallery"
                aria-controls={id}
                items={images.map(({ alt }, index) => ({
                  label: 'Show ' + alt.toLowerCase(),
                  active: index === current,
                }))}
                onChange={({ index }) => {
                  ref.current.scrollTo({
                    left: index * ref.current.clientWidth,
                  })
                }}
              />
            </>
          )
        }
        return <Example />
      }}
    </ComponentBox>
  )
}
