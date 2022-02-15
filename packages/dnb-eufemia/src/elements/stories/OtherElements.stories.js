/**
 * @dnb/eufemia Element Story
 *
 */

import React from 'react'
import { Wrapper, Box } from 'storybook-utils/helpers'

import { css } from '@emotion/react'
import styled from '@emotion/styled'

import {
  FormStatus,
  FormRow,
  Skeleton,
  IconPrimary,
  ToggleButton,
} from '../../components'
import { H1, H2, P, Hr, Link, Span, Div, Img } from '../'
// import Link from '../../../elements/Link'

export default {
  title: 'Eufemia/Elements/Other',
}

const CustomStyles = styled.div`
  .dnb-form-row {
    background-color: rgba(200, 0, 200, 0.15);
  }

  ul,
  ol,
  dl {
    background-color: rgba(200, 0, 200, 0.15);
  }

  li,
  dt {
    background-color: rgba(0, 0, 0, 0.15);
  }

  dd {
    background-color: rgba(0, 0, 0, 0.075);
  }

  li ul li {
    background-color: rgba(0, 0, 0, 0.15);
  }

  li ul li ul li {
    background-color: rgba(0, 0, 0, 0.15);
  }

  p {
    background-color: rgba(0, 0, 0, 0.15);
  }
  ${
    '' /* .dnb-form-row + p,
  textarea + p {
    margin-top: 1rem;
  } */
  }
`

export const OtherElementSandbox = () => (
  <Wrapper className="dnb-spacing">
    <Box>
      <CustomStyles>
        <H1 className="dnb-small">H1</H1>
        <H2
          css={css`
            color: red;
          `}
        >
          H2
        </H2>
        <P>
          Fermentum sapien ipsum cursus lorem iaculis sagittis elit euismod
          non
        </P>
        <Link href="/">Link</Link>
      </CustomStyles>
    </Box>
  </Wrapper>
)

export const ULListSandbox = () => (
  <Wrapper className="dnb-spacing">
    <CustomStyles>
      <Box>
        <p className="dnb-p">Paragraph</p>
        <ul className="dnb-ul">
          <li>Item 1</li>
          <li>Item 2</li>
          <li>
            Item Title
            <ul>
              <li>
                Item 1 <br />
                Break
              </li>
              <li>Item 2</li>
              <li>
                Item Title
                <ul>
                  <li>Item 1</li>
                  <li>Item 2</li>
                  <li>
                    Item 3 with <p className="dnb-p">Paragraph</p>
                  </li>
                  <li>Item 4</li>
                </ul>
              </li>
              <li>Item 4</li>
            </ul>
          </li>
          <li>Item 4</li>
        </ul>
        <p className="dnb-p">
          Lorem in morbi euismod id lectus varius imperdiet proin dui
        </p>
        <p className="dnb-p">
          Lorem in morbi euismod id lectus varius imperdiet proin dui
        </p>
      </Box>
    </CustomStyles>
  </Wrapper>
)

export const OLListSandbox = () => (
  <Wrapper className="dnb-spacing">
    <CustomStyles>
      <Box>
        <ol className="dnb-ol">
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3</li>
          <li>
            Item Title
            <ol>
              <li>Item 1</li>
              <li>Item 2</li>
              <li>Item 3</li>
              <li>Item 4</li>
            </ol>
          </li>
        </ol>
      </Box>
    </CustomStyles>
  </Wrapper>
)

export const DLListSandbox = () => (
  <Wrapper className="dnb-spacing">
    <CustomStyles>
      <Box>
        <dl className="dnb-dl">
          <dt>Item Title 1</dt>
          <dd>Item Description 1</dd>
          <dt>Item Title 1</dt>
          <dd>Item Description 1</dd>
        </dl>
      </Box>
    </CustomStyles>
  </Wrapper>
)

export const Textarea = () => (
  <Wrapper className="dnb-spacing">
    <CustomStyles>
      <Box>
        <FormRow vertical>
          <label className="dnb-form-label" htmlFor="hendrerit">
            Label for the textarea:
          </label>
          <textarea
            className="dnb-textarea"
            id="hendrerit"
            rows="5"
            cols="33"
            defaultValue="Nec litora inceptos vestibulum id interdum donec gravida
              nostra lacinia bibendum hendrerit porttitor volutpat nam duis
              nisl scelerisque sapien erat"
          />
        </FormRow>
        <p className="dnb-p">I have to be on the grid!</p>
      </Box>
      <Box>
        <FormRow>
          <label className="dnb-form-label" htmlFor="litora">
            Label for the textarea:
          </label>
          <textarea
            className="dnb-textarea"
            id="litora"
            rows="3"
            placeholder="Nec litora inceptos vestibulum id interdum donec gravida nostra
            lacinia bibendum hendrerit porttitor volutpat nam duis nisl
            scelerisque sapien erat"
          />
        </FormRow>
        <p className="dnb-p">I have to be on the grid!</p>
      </Box>
      <Box>
        <textarea
          className="dnb-textarea"
          rows="5"
          cols="33"
          minLength="10"
          maxLength="20"
          required
          defaultValue="Nec litora inceptos vestibulum id interdum donec gravida nostra
            lacinia bibendum hendrerit porttitor volutpat nam duis nisl
            scelerisque sapien erat"
        />
        <p className="dnb-p">I have to be on the grid!</p>
      </Box>
      <Box>
        <FormRow vertical>
          <label className="dnb-form-label" htmlFor="vestibulum">
            Label:
          </label>
          <textarea
            id="vestibulum"
            className="dnb-textarea status--error"
            cols="33"
            defaultValue="Nec litora inceptos vestibulum id interdum donec gravida nostra
            lacinia bibendum hendrerit porttitor volutpat nam duis nisl
            scelerisque sapien erat"
          />
          <FormStatus text="Message to the user" />
        </FormRow>
        <p className="dnb-p">I have to be on the grid!</p>
      </Box>
      <Box>
        <FormRow>
          <label className="dnb-form-label" htmlFor="volutpat">
            Label:
          </label>
          <textarea
            className="dnb-textarea"
            id="volutpat"
            disabled
            // readOnly
            cols="33"
            defaultValue="Nec litora inceptos vestibulum id interdum donec gravida nostra
            lacinia bibendum hendrerit porttitor volutpat nam duis nisl
            scelerisque sapien erat"
          />
        </FormRow>
        <p className="dnb-p">I have to be on the grid!</p>
      </Box>
    </CustomStyles>
  </Wrapper>
)

export const ElementsAndSkeleton = () => {
  // React.useEffect(() => {
  //   console.log('myRef', myRef.current)
  //   // console.log('myRef', Input, myRef.current)
  //   // myRef.current.focus()
  // })

  const [showSkeleton, setSkeletonState] = React.useState(false)
  // console.log('showSkeleton', showSkeleton)

  return (
    <Box>
      <Skeleton.Exclude>
        <ToggleButton
          skeleton={false}
          checked={showSkeleton}
          on_change={() => setSkeletonState((s) => !s)}
        >
          Toggle Skeleton
        </ToggleButton>
      </Skeleton.Exclude>
      <Skeleton
        show={showSkeleton}
        // no_animation
        // show
        // figure={() => <SkeletonArticle rows={2} />}
        // style_type="shine"
        // style_type="dots"
        // style_type="norway"
        // style_type="rainbow"
        // style_type="brand"
      >
        <Hr top="large" bottom />
        <Span>span span</Span>
        <Hr top bottom />
        <Div>div</Div>
        <Hr top bottom />
        <StyledImg
          top
          width="200"
          height="200"
          src="https://raw.githubusercontent.com/dnbexperience/eufemia/main/logo.png"
          alt="logo"
        />
        <Hr top bottom />
        <StyledButton className="dnb-button dnb-button--reset">
          <Span>Text</Span>
          <IconPrimary icon="chevron_right" />
        </StyledButton>
      </Skeleton>
    </Box>
  )
}

const StyledImg = styled(Img)`
  border-radius: 1rem;
`
const StyledButton = styled.button`
  display: flex;
  justify-content: space-between;

  width: 100%;

  &:hover {
    color: var(--color-sea-green);
  }
  &:active {
    opacity: 0.6;
  }
`
