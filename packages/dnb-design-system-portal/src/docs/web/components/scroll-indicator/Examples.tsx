import { useId, useState } from 'react'
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
      scope={{ useState, useId }}
    >
      {() => {
        const Example = () => {
          const [current, setCurrent] = useState(0)
          const id = useId()
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
              <img
                id={id}
                src={images[current].src}
                alt={images[current].alt}
                width="160"
                height="160"
              />
              <ScrollIndicator
                aria-label="Gallery"
                aria-controls={id}
                items={images.map(({ alt }, index) => ({
                  label: 'Show ' + alt.toLowerCase(),
                  active: index === current,
                }))}
                onChange={({ index }) => setCurrent(index)}
              />
            </>
          )
        }
        return <Example />
      }}
    </ComponentBox>
  )
}
