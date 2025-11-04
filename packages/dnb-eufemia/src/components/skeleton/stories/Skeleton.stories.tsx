/**
 * @dnb/eufemia Component Story
 *
 */

import React from 'react'
import { Wrapper, Box } from 'storybook-utils/helpers'
import styled from '@emotion/styled'

import {
  Heading,
  Input,
  Textarea,
  Modal,
  Button,
  Slider,
  Switch,
  Checkbox,
  Radio,
  DatePicker,
  FormRow,
  ToggleButton,
  Accordion,
  Skeleton,
  IconPrimary,
} from '../..'
import { H1, H2, P, Ol, Li, Ul, Dl, Dt, Dd, Anchor } from '../../..'
import Provider from '../../../shared/Provider'
import { Article as SkeletonArticle } from '../figures'

export default {
  title: 'Eufemia/Components/Skeleton',
}

const CustomStyle = styled.div`
  /* background: var(--color-ocean-green); */
  p {
    background-color: rgba(213, 30, 149, 0.25);
  }
`

const WidthLimit = styled(FormRow)`
  ${'' /* width: 10rem; */}
`

export const SkeletonSandbox = () => {
  const [showSkeleton, setSkeletonState] = React.useState(true)

  return (
    <Provider>
      <Skeleton show={showSkeleton}>
        <CustomStyle>
          <Wrapper>
            <Box>
              <Skeleton.Exclude>
                <Accordion
                  rememberState
                  id="single-accordion"
                  variant="outlined"
                  title="Accordion title"
                >
                  Accordion content
                </Accordion>
                <Accordion.Provider
                  top
                  rememberState
                  icon="bell"
                  iconPosition="right"
                  variant="outlined"
                >
                  <Accordion
                    id="single-provider-accordion"
                    title="Accordion title"
                  >
                    Accordion content
                  </Accordion>
                </Accordion.Provider>
              </Skeleton.Exclude>
            </Box>

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
            </Box>

            <Box>
              <Heading>Heading Æ',;[]()."`Ø</Heading>
              <Anchor>Anchor</Anchor>
              <IconPrimary>bell</IconPrimary>
              <br />
              <Button>Button</Button>
              <Button variant="tertiary" icon="bell">
                Button
              </Button>
              <Slider label="Vertical slider:" vertical={false} top />
              <Modal top>123</Modal>
              <Checkbox label="Checkbox:" left />
              <Switch label="Switch:" left />
              <Radio label="Radio:" left />
              <Input top labelDirection="vertical" label="Input" />
              <Textarea top labelDirection="vertical" label="Textarea" />
            </Box>

            <Box>
              <DatePicker label="Date" />
              <br />
              <DatePicker label="Date with input" showInput />
            </Box>

            <Box>
              <H1>Big heading</H1>
              {/* <P top bottom>
                Paragraph Non habitasse ut nisi dictum laoreet ridiculus
                dui.
              </P> */}
            </Box>

            <Box>
              <WidthLimit vertical>
                {/* <div className="dnb-skeleton dnb-h--large">y</div> */}
                <H2>H2</H2>
                <P top>
                  Paragraph Non habitasse ut nisi dictum laoreet ridiculus
                  dui varius per nullam vel consectetur malesuada platea
                  molestie semper consequat commodo urna
                </P>
                <Input top label="Input" />
                <Input
                  top
                  label="Input"
                  size="medium"
                  value="Value"
                  icon="calendar"
                  align="right"
                />
                <Input
                  top
                  label="Input"
                  size="large"
                  placeholder="Placeholder"
                  iconPosition="right"
                  icon="calendar"
                  align="right"
                />
              </WidthLimit>
            </Box>

            <Box>
              <Ul>
                <Li>Item 1</Li>
                <Li>Item 2</Li>
                <Li>
                  Item 3
                  <Ul>
                    <Li>
                      Item 1 <br />
                      Break with a{' '}
                      <a className="dnb-anchor" href="/">
                        Anchor (Text Link
                      </a>
                    </Li>
                    <Li>Item 2</Li>
                  </Ul>
                </Li>
                <Li>Item 4</Li>
              </Ul>
            </Box>

            <Box>
              <Ol nested>
                <Li>Item</Li>
                <Li>
                  Item
                  <Ol>
                    <Li>
                      Item
                      <Ol>
                        <Li>Item</Li>
                        <Li>Item</Li>
                      </Ol>
                    </Li>
                    <Li>
                      Item
                      <Ol>
                        <Li>Item</Li>
                        <Li>Item</Li>
                      </Ol>
                    </Li>
                  </Ol>
                </Li>
                <Li>Item</Li>
              </Ol>
            </Box>

            <Box>
              <ListWidthLimit>
                <Ol nested className="dnb-ol--outside">
                  <Li>
                    Using <code className="dnb-code">dnb-ol--outside</code>{' '}
                    (default): Using Porta commodo tempus interdum habitant
                    urna magna aliquet quam nisl
                    <Ol>
                      <Li>
                        Porta commodo tempus interdum habitant urna magna
                        aliquet quam nisl
                      </Li>
                    </Ol>
                  </Li>
                </Ol>
                <Ol nested className="dnb-ol--inside">
                  <Li>
                    New ol, using{' '}
                    <code className="dnb-code">dnb-ol--inside</code>: Porta
                    commodo tempus interdum habitant urna magna aliquet
                    quam nisl
                    <Ol>
                      <Li>
                        Porta commodo tempus interdum habitant urna magna
                        aliquet quam nisl
                      </Li>
                    </Ol>
                  </Li>
                </Ol>
              </ListWidthLimit>
            </Box>

            <Box>
              <Dl>
                <Dt>Term</Dt>
                <Dd>Description</Dd>
                <Dt>Term</Dt>
                <Dd>Description 1</Dd>
                <Dd>Description 2</Dd>
                <Dd>Description 3</Dd>
                <dl className="dnb-dl">
                  <Dt>Sub Term</Dt>
                  <Dd>Sub Description</Dd>
                </dl>
              </Dl>
            </Box>

            <Box>
              <Skeleton show figure={() => <SkeletonArticle rows={5} />}>
                <Input
                  top
                  label="Input"
                  size="large"
                  placeholder="Placeholder"
                  iconPosition="right"
                  icon="calendar"
                  align="right"
                />
              </Skeleton>

              {/* <SkeletonFigure top className="dnb-h--xx-large" width={20}>
                </SkeletonFigure> */}
              {/* <SkeletonFigure top className="dnb-p" width={20} />
                <SkeletonFigure top figure="article" />
                <SkeletonFigure top figure="circle" />
                <SkeletonFigure top figure="product" /> */}
              {/* <Skeleton show top>
                  <P>Paragraph</P>
                </Skeleton> */}
            </Box>
          </Wrapper>
        </CustomStyle>
        end
      </Skeleton>
    </Provider>
  )
}

const ListWidthLimit = styled.div`
  max-width: 22rem;
  .dnb-ol li::before {
    font-weight: var(--font-weight-bold);
  }
`
