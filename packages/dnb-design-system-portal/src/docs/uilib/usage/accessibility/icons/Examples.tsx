import React from 'react'
import ComponentBox from '../../../../../shared/tags/ComponentBox'
import { H1, Icon, H4 } from '@dnb/eufemia/src'
import styled from '@emotion/styled'
import Beach from '../assets/beach'

export const IconsDecorativeExample = () => (
  <ComponentBox scope={{ Beach }}>
    <Icon icon={Beach} size="24" title="Beach" aria-hidden={true} />
  </ComponentBox>
)

export const IconsResponsiveExample = () => (
  <ComponentBox scope={{ Beach }}>
    <H1>
      My H1 with an icon <Icon icon={Beach} title="Beach" size="auto" />
    </H1>
    <H4>
      My H4 with the same icon{' '}
      <Icon icon={Beach} title="Beach" size="auto" />
    </H4>
  </ComponentBox>
)

export const IconsSVGExample = () => (
  <ComponentBox>
    {() => {
      const Responsive = styled.span`
        svg {
          font-size: inherit;
          width: 1.5em;
          height: 1.5em;
        }
      `
      const Svg = (props) => (
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          {...props}
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M4.03 5.22a.75.75 0 0 0-1.06 1.06l4.5 4.5a.75.75 0 0 0 1.06 0l4.5-4.5a.75.75 0 0 0-1.06-1.06L8 9.19 4.03 5.22z"
            fill="#000"
          />
        </svg>
      )

      return (
        <>
          <p>
            <Svg width="24" height="24" /> - has a fixed size
          </p>
          <p>
            <Responsive>
              <Svg />
            </Responsive>{' '}
            - is responsive
          </p>
          <p>
            <span className="dnb-icon dnb-icon--medium">
              <Svg />
            </span>{' '}
            - uses <code>.dnb-icon</code>
          </p>
        </>
      )
    }}
  </ComponentBox>
)
