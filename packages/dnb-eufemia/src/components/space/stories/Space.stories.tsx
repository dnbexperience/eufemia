/**
 * @dnb/eufemia Component Story
 *
 */

import React from 'react'
import { Wrapper, Box } from 'storybook-utils/helpers'
import styled from '@emotion/styled'
import { css, Global } from '@emotion/react'

import { Space, Input } from '../../'
import { H1, H2, P } from '../../..'
import Provider from '../../../shared/Provider'

export default {
  title: 'Eufemia/Components/Space',
}

export const SpaceSandbox = () => (
  <Wrapper skipCoreStyle>
    <Global
      styles={css`
        :root {
          --spacing-modifier: 1;
          --spacing-xx-small: calc(0.25rem * var(--spacing-modifier));
          --spacing-x-small: calc(0.5rem * var(--spacing-modifier));
          --spacing-small: calc(1rem * var(--spacing-modifier));
          --spacing-medium: calc(1.5rem * var(--spacing-modifier));
          --spacing-large: calc(2rem * var(--spacing-modifier));
          --spacing-x-large: calc(3rem * var(--spacing-modifier));
          --spacing-xx-large: calc(3.5rem * var(--spacing-modifier));
        }
      `}
    />

    <code>With dnb-core-style</code>
    <div className="dnb-core-style">
      <TestCase />
    </div>

    <code>Without</code>
    <TestCase />
    <Box>
      <CustomStyle>
        <VisualSpace>
          {/* <MagicBox top="medium" /> */}
          <Space top="large x-small">
            <Input label="Input:" />
          </Space>
        </VisualSpace>
      </CustomStyle>
    </Box>
    <Box>
      <Provider
        space={{
          noCollapse: true,
        }}
      >
        <Collapsing bottom="small">
          <H1>H1</H1>
        </Collapsing>
        <Collapsing top="large">
          <H2>H2</H2>
        </Collapsing>
      </Provider>
    </Box>
    <Box>
      <Collapsing bottom="small" noCollapse={true}>
        <div>
          I have <code className="dnb-code">bottom="small"</code>
        </div>
      </Collapsing>
      <Collapsing top="large">
        <div>
          I have <code className="dnb-code">top="large"</code>
        </div>
      </Collapsing>
    </Box>
    <Box>
      <code>type</code>
      <CustomStyle>
        <VisualSpace>
          <P top="zero">zero</P>
        </VisualSpace>
        <VisualSpace>
          <P top="xx-small">xx-small</P>
        </VisualSpace>
        <VisualSpace>
          <P top="x-small">x-small</P>
        </VisualSpace>
        <VisualSpace>
          <P top="small">small</P>
        </VisualSpace>
        <VisualSpace>
          <P top="medium">medium</P>
        </VisualSpace>
        <VisualSpace>
          <P top="large">large</P>
        </VisualSpace>
        <VisualSpace>
          <P top="x-large">x-large</P>
        </VisualSpace>
        <VisualSpace>
          <P top="xx-large">xx-large</P>
        </VisualSpace>
        <VisualSpace>
          <P top="xx-large-x2">xx-large-x2</P>
        </VisualSpace>
      </CustomStyle>
      <code>2 types</code>
      <CustomStyle>
        <VisualSpace>
          <P top="zero zero">zero zero</P>
        </VisualSpace>
        <VisualSpace>
          <P top="xx-small xx-small">xx-small xx-small</P>
        </VisualSpace>
        <VisualSpace>
          <P top="x-small x-small">x-small x-small</P>
        </VisualSpace>
        <VisualSpace>
          <P top="small small">small small</P>
        </VisualSpace>
        <VisualSpace>
          <P top="medium medium">medium medium</P>
        </VisualSpace>
        <VisualSpace>
          <P top="large large">large large</P>
        </VisualSpace>
        <VisualSpace>
          <P top="x-large x-large">x-large x-large</P>
        </VisualSpace>
        <VisualSpace>
          <P top="xx-large xx-large">xx-large xx-large</P>
        </VisualSpace>
        <VisualSpace>
          <P top="xx-large-x2 xx-large-x2">
            xx-large-x2 xx-large-x2(max limit is 10rem)
          </P>
        </VisualSpace>
      </CustomStyle>
      <code>different type combinations</code>
      <CustomStyle>
        <VisualSpace>
          <P top="zero zero xx-small xx-small">
            zero zero xx-small xx-small
          </P>
        </VisualSpace>
        <VisualSpace>
          <P top="xx-small xx-small xx-small xx-small xx-small xx-small xx-small xx-small xx-small xx-small xx-small xx-small xx-small xx-small xx-small xx-small xx-small xx-small xx-small xx-small xx-small xx-small xx-small xx-small xx-small xx-small xx-small xx-small xx-small xx-small xx-small xx-small xx-small xx-small xx-small xx-small xx-small xx-small xx-small xx-small">
            xx-small x40
          </P>
        </VisualSpace>
        <VisualSpace>
          <P top="zero xx-small x-small small medium large x-large">
            zero xx-small x-small small medium large x-large
          </P>
        </VisualSpace>
        <VisualSpace>
          <P top="x-large xx-large-x2">x-large xx-large-x2</P>
        </VisualSpace>
      </CustomStyle>
      <code>rem as number - rem as string(Xrem) - rem as string</code>
      <CustomStyle>
        <VisualSpace>
          <P top={0}>0</P>
        </VisualSpace>
        <VisualSpace>
          <P top={0.25}>0.25</P>
        </VisualSpace>
        <VisualSpace>
          <P top={0.5}>0.5</P>
        </VisualSpace>
        <VisualSpace>
          <P top={1}>1</P>
        </VisualSpace>
        <VisualSpace>
          <P top={1.5}>1.5</P>
        </VisualSpace>
        <VisualSpace>
          <P top={2}>2</P>
        </VisualSpace>
        <VisualSpace>
          <P top={2.5}>2.5</P>
        </VisualSpace>
        <VisualSpace>
          <P top={3}>3</P>
        </VisualSpace>
        <VisualSpace>
          <P top={3.5}>3.5</P>
        </VisualSpace>
        <VisualSpace>
          <P top={4}>4</P>
        </VisualSpace>
        <VisualSpace>
          <P top={4.5}>4.5</P>
        </VisualSpace>
        <VisualSpace>
          <P top={5}>5</P>
        </VisualSpace>
        <VisualSpace>
          <P top={5.5}>5.5</P>
        </VisualSpace>
        <VisualSpace>
          <P top={6}>6</P>
        </VisualSpace>
        <VisualSpace>
          <P top={6.5}>6.5</P>
        </VisualSpace>
        <VisualSpace>
          <P top={7}>7</P>
        </VisualSpace>
        <VisualSpace>
          <P top={7.5}>7.5</P>
        </VisualSpace>
        <VisualSpace>
          <P top={8}>8</P>
        </VisualSpace>
        <VisualSpace>
          <P top={8.5}>8.5</P>
        </VisualSpace>
        <VisualSpace>
          <P top={9}>9</P>
        </VisualSpace>
        <VisualSpace>
          <P top={9.5}>9.5</P>
        </VisualSpace>
        <VisualSpace>
          <P top={10}>10</P>
        </VisualSpace>
        <VisualSpace>
          <P top="0rem">0rem</P>
        </VisualSpace>
        <VisualSpace>
          <P top="0.25rem">0.25rem</P>
        </VisualSpace>
        <VisualSpace>
          <P top="0.5rem">0.5rem</P>
        </VisualSpace>
        <VisualSpace>
          <P top="1rem">1rem</P>
        </VisualSpace>
        <VisualSpace>
          <P top="1.5rem">1.5rem</P>
        </VisualSpace>
        <VisualSpace>
          <P top="2rem">2rem</P>
        </VisualSpace>
        <VisualSpace>
          <P top="2.5rem">2.5rem</P>
        </VisualSpace>
        <VisualSpace>
          <P top="3rem">3rem</P>
        </VisualSpace>
        <VisualSpace>
          <P top="3.5rem">3.5rem</P>
        </VisualSpace>
        <VisualSpace>
          <P top="4rem">4rem</P>
        </VisualSpace>
        <VisualSpace>
          <P top="4.5rem">4.5rem</P>
        </VisualSpace>
        <VisualSpace>
          <P top="5rem">5rem</P>
        </VisualSpace>
        <VisualSpace>
          <P top="5.5rem">5.5rem</P>
        </VisualSpace>
        <VisualSpace>
          <P top="6rem">6rem</P>
        </VisualSpace>
        <VisualSpace>
          <P top="6.5rem">6.5rem</P>
        </VisualSpace>
        <VisualSpace>
          <P top="7rem">7rem</P>
        </VisualSpace>
        <VisualSpace>
          <P top="7.5rem">7.5rem</P>
        </VisualSpace>
        <VisualSpace>
          <P top="8rem">8rem</P>
        </VisualSpace>
        <VisualSpace>
          <P top="8.5rem">8.5rem</P>
        </VisualSpace>
        <VisualSpace>
          <P top="9rem">9rem</P>
        </VisualSpace>
        <VisualSpace>
          <P top="9.5rem">9.5rem</P>
        </VisualSpace>
        <VisualSpace>
          <P top="10rem">10rem</P>
        </VisualSpace>
        <VisualSpace>
          <P top="0">0</P>
        </VisualSpace>
        <VisualSpace>
          <P top="0.25rem">0.25</P>
        </VisualSpace>
        <VisualSpace>
          <P top="0.5">0.5</P>
        </VisualSpace>
        <VisualSpace>
          <P top="1">1</P>
        </VisualSpace>
        <VisualSpace>
          <P top="1.5">1.5</P>
        </VisualSpace>
        <VisualSpace>
          <P top="2">2</P>
        </VisualSpace>
        <VisualSpace>
          <P top="2.5">2.5</P>
        </VisualSpace>
        <VisualSpace>
          <P top="3">3</P>
        </VisualSpace>
        <VisualSpace>
          <P top="3.5">3.5</P>
        </VisualSpace>
        <VisualSpace>
          <P top="4">4</P>
        </VisualSpace>
        <VisualSpace>
          <P top="4.5">4.5</P>
        </VisualSpace>
        <VisualSpace>
          <P top="5">5</P>
        </VisualSpace>
        <VisualSpace>
          <P top="5.5">5.5</P>
        </VisualSpace>
        <VisualSpace>
          <P top="6">6</P>
        </VisualSpace>
        <VisualSpace>
          <P top="6.5">6.5</P>
        </VisualSpace>
        <VisualSpace>
          <P top="7">7</P>
        </VisualSpace>
        <VisualSpace>
          <P top="7.5">7.5</P>
        </VisualSpace>
        <VisualSpace>
          <P top="8">8</P>
        </VisualSpace>
        <VisualSpace>
          <P top="8">8</P>
        </VisualSpace>
        <VisualSpace>
          <P top="9">9</P>
        </VisualSpace>
        <VisualSpace>
          <P top="9.5">9.5</P>
        </VisualSpace>
        <VisualSpace>
          <P top="10">10</P>
        </VisualSpace>
      </CustomStyle>

      <code>px as string(Xpx) - interval of 10</code>
      <CustomStyle>
        <VisualSpace>
          <P top="0px">0px</P>
        </VisualSpace>
        <VisualSpace>
          <P top="10px">10px</P>
        </VisualSpace>
        <VisualSpace>
          <P top="20px">20px</P>
        </VisualSpace>
        <VisualSpace>
          <P top="30px">30px</P>
        </VisualSpace>
        <VisualSpace>
          <P top="40px">40px</P>
        </VisualSpace>
        <VisualSpace>
          <P top="50px">50px</P>
        </VisualSpace>
        <VisualSpace>
          <P top="60px">60px</P>
        </VisualSpace>
        <VisualSpace>
          <P top="70px">70px</P>
        </VisualSpace>
        <VisualSpace>
          <P top="80px">80px</P>
        </VisualSpace>
        <VisualSpace>
          <P top="90px">90px</P>
        </VisualSpace>
        <VisualSpace>
          <P top="100px">100px</P>
        </VisualSpace>
        <VisualSpace>
          <P top="110px">110px</P>
        </VisualSpace>
        <VisualSpace>
          <P top="120px">120px</P>
        </VisualSpace>
        <VisualSpace>
          <P top="130px">130px</P>
        </VisualSpace>
        <VisualSpace>
          <P top="140px">140px</P>
        </VisualSpace>
        <VisualSpace>
          <P top="150px">150px</P>
        </VisualSpace>
        <VisualSpace>
          <P top="160px">160px</P>
        </VisualSpace>
        <VisualSpace>
          <P top="170px">170px(max limit is 10rem)</P>
        </VisualSpace>
      </CustomStyle>

      <code>px as string</code>
      <CustomStyle>
        <VisualSpace>
          <P top="0.5px">0.5px</P>
        </VisualSpace>
        <VisualSpace>
          <P top="11px">11px</P>
        </VisualSpace>
        <VisualSpace>
          <P top="22px">22px</P>
        </VisualSpace>
        <VisualSpace>
          <P top="33px">33px</P>
        </VisualSpace>
        <VisualSpace>
          <P top="44px">44px</P>
        </VisualSpace>
        <VisualSpace>
          <P top="55px">55px</P>
        </VisualSpace>
        <VisualSpace>
          <P top="66px">66px</P>
        </VisualSpace>
        <VisualSpace>
          <P top="77px">77px</P>
        </VisualSpace>
        <VisualSpace>
          <P top="88px">88px</P>
        </VisualSpace>
        <VisualSpace>
          <P top="99px">99px</P>
        </VisualSpace>
        <VisualSpace>
          <P top="101px">101px</P>
        </VisualSpace>
        <VisualSpace>
          <P top="112px">112px</P>
        </VisualSpace>
        <VisualSpace>
          <P top="123px">123px</P>
        </VisualSpace>
        <VisualSpace>
          <P top="134px">134px</P>
        </VisualSpace>
        <VisualSpace>
          <P top="145px">145px</P>
        </VisualSpace>
        <VisualSpace>
          <P top="156px">156px</P>
        </VisualSpace>
        <VisualSpace>
          <P top="159px">159px</P>
        </VisualSpace>
        <VisualSpace>
          <P top="167px">167px(max limit is 10rem)</P>
        </VisualSpace>
      </CustomStyle>

      <code>boolean</code>
      <CustomStyle>
        <VisualSpace>
          <P top={true}>true</P>
        </VisualSpace>
        <VisualSpace>
          <P top={false}>false</P>
        </VisualSpace>
      </CustomStyle>
    </Box>
  </Wrapper>
)

const CustomStyle = styled.div`
  display: flex;
  flex-direction: row;
  box-shadow: 0 0 0 1px var(--color-fire-red);

  .box {
    background-color: blue;
    height: 150px;
    width: 200px;
    color: var(--color-white);
  }
`

const Block = styled.div`
  position: relative;

  display: flex;
  justify-content: center;

  width: 1.5rem;
  height: 1.5rem;

  background-color: var(--color-mint-green);
`
const Line = styled.div`
  position: absolute;
  bottom: 100%;

  display: flex;
  align-items: center;

  width: 0.0625rem;
  height: 100%;

  background-color: var(--color-fire-red);
  ${'' /* border-left: 0.0625rem dotted var(--color-fire-red); */}
`
const MarginContainer = styled.div`
  position: relative;
`
const Margin = styled.div`
  position: absolute;
  bottom: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;

  background-color: rgba(213, 30, 149, 0.25);
  ${'' /* border-left: 0.0625rem dotted var(--color-fire-red); */}
`
const Label = styled.label`
  display: block;
  margin-left: 0.25rem;
  font-size: 0.5rem;
  text-align: center;
  color: var(--color-black-80);
`

const MagicBox = ({ label, ...rest }: { label?: string } = {}) => {
  const ref = React.createRef<HTMLDivElement>()

  const [spaceInRem, setLabel] = React.useState(label)
  const [title, setTitle] = React.useState(null)

  React.useEffect(() => {
    if (!label) {
      const spaceInPixels = window
        .getComputedStyle(ref.current.parentElement)
        .getPropertyValue('margin-top')
      const spaceInRem = `${parseFloat(spaceInPixels) / 16}`
      setLabel(spaceInRem)

      const title = ref.current.parentElement.getAttribute('class')
      setTitle(title)
    }
  }, [label, ref])

  return (
    <Block {...rest} ref={ref} title={title}>
      <Line style={{ height: `${spaceInRem}rem` }} />
      <Label>{spaceInRem}</Label>
    </Block>
  )
}

const VisualSpace = ({
  label,
  children,
  ...rest
}: { label?: string; children?: React.ReactNode } = {}) => {
  const ref = React.createRef<HTMLDivElement>()

  const [spaceInRem, setLabel] = React.useState(label)
  const [title, setTitle] = React.useState(null)

  React.useEffect(() => {
    if (!label) {
      const spaceInPixels = window
        .getComputedStyle(ref.current.children[0])
        .getPropertyValue('margin-top')
      const spaceInRem = `${parseFloat(spaceInPixels) / 16}`
      setLabel(spaceInRem)

      const title = ref.current.parentElement.getAttribute('class')
      setTitle(title)
    }
  }, [label, ref])

  return (
    <Space {...rest} title={title}>
      <MarginContainer ref={ref}>
        {children}
        <Margin style={{ height: `${spaceInRem}rem` }}>
          <Label>{spaceInRem}</Label>
        </Margin>
      </MarginContainer>
    </Space>
  )
}

const Collapsing = styled<any>(Space)`
  border: 1px solid;
`

function TestCase() {
  const listOfBoxes = []
  for (let i = 0, c = 0, l = 20; i <= l; i++) {
    listOfBoxes.push(String(c))
    c += 0.5
  }
  return (
    <CustomStyle>
      {listOfBoxes.map((v) => (
        <Space key={v} top={v}>
          <MagicBox />
        </Space>
      ))}
    </CustomStyle>
  )
}
