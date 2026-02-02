import React from 'react'
import { Wrapper, Box } from 'storybook-utils/helpers'
import { Avatar, Checkbox, List } from '../../../components'
import { Value } from '../../../extensions/forms'
import { fish_medium } from '../../../icons'

export default {
  title: 'Eufemia/Components/List',
}

export function ListBasic() {
  return (
    <Wrapper>
      <Box data-visual-test="list-slots">
        <List.Container>
          <List.Item.Variant.Content>
            List item 1
          </List.Item.Variant.Content>
          <List.Item.Variant.Content selected>
            List item 2
          </List.Item.Variant.Content>

          <List.Item.Variant.Content>
            <List.Item.Layout.Start>Start</List.Item.Layout.Start>
            <List.Item.Layout.Center>Center</List.Item.Layout.Center>
            <List.Item.Layout.End>End</List.Item.Layout.End>
          </List.Item.Variant.Content>

          <List.Item.Variant.Navigate
            onClick={() => console.log('Clicked')}
          >
            <List.Item.Layout.Icon>{fish_medium}</List.Item.Layout.Icon>
            <List.Item.Layout.Title>Title</List.Item.Layout.Title>
            <List.Item.Layout.End>
              <Value.Currency value={1234} showEmpty />
            </List.Item.Layout.End>
          </List.Item.Variant.Navigate>

          <List.Item.Variant.Navigate href="#section">
            <List.Item.Layout.Icon>{fish_medium}</List.Item.Layout.Icon>
            <List.Item.Layout.Title>
              Link item (href)
            </List.Item.Layout.Title>
            <List.Item.Layout.End>
              <Value.Currency value={999} showEmpty />
            </List.Item.Layout.End>
          </List.Item.Variant.Navigate>

          <List.Item.Variant.Content>
            <List.Item.Layout.Start>
              <Checkbox label="Checkbox" />
            </List.Item.Layout.Start>
            <List.Item.Layout.End>
              <Value.Currency value={1234} showEmpty />
            </List.Item.Layout.End>
          </List.Item.Variant.Content>
        </List.Container>
      </Box>

      <Box data-visual-test="list-navigate">
        <List.Container>
          <List.Item.Variant.Navigate
            onClick={() => console.log('Clicked')}
          >
            <List.Item.Layout.Icon>{fish_medium}</List.Item.Layout.Icon>
            <List.Item.Layout.Title>Title</List.Item.Layout.Title>
            <List.Item.Layout.End>
              <Value.Currency value={1234} showEmpty />
            </List.Item.Layout.End>
          </List.Item.Variant.Navigate>
        </List.Container>
      </Box>

      <Box data-visual-test="list-navigate-href">
        <List.Container>
          <List.Item.Variant.Navigate href="#section">
            <List.Item.Layout.Icon>{fish_medium}</List.Item.Layout.Icon>
            <List.Item.Layout.Title>
              Link item (href)
            </List.Item.Layout.Title>
            <List.Item.Layout.End>
              <Value.Currency value={999} showEmpty />
            </List.Item.Layout.End>
          </List.Item.Variant.Navigate>
        </List.Container>
      </Box>

      <Box data-visual-test="list-form-elements">
        <List.Container>
          <List.Item.Variant.Content>
            <List.Item.Layout.Start>
              <Checkbox label="Checkbox" />
            </List.Item.Layout.Start>
            <List.Item.Layout.End>
              <Value.Currency value={1234} showEmpty />
            </List.Item.Layout.End>
          </List.Item.Variant.Content>
        </List.Container>
      </Box>

      <Box data-visual-test="list-pending">
        <List.Container>
          <List.Item.Variant.Navigate
            pending
            onClick={() => console.log('Clicked')}
          >
            <List.Item.Layout.Icon>{fish_medium}</List.Item.Layout.Icon>
            <List.Item.Layout.Title>Pending</List.Item.Layout.Title>
            <List.Item.Layout.End>
              <Value.Currency value={1234} showEmpty />
            </List.Item.Layout.End>
          </List.Item.Variant.Navigate>

          <List.Item.Variant.Navigate
            skeleton
            onClick={() => console.log('Clicked')}
          >
            <List.Item.Layout.Icon>{fish_medium}</List.Item.Layout.Icon>
            <List.Item.Layout.Title>Skeleton</List.Item.Layout.Title>
            <List.Item.Layout.End>
              <Value.Currency value={1234} showEmpty />
            </List.Item.Layout.End>
          </List.Item.Variant.Navigate>
        </List.Container>
      </Box>

      <Box>
        <List.Container>
          <List.Item.Variant.Navigate
            iconPosition="left"
            onClick={() => console.log('Clicked')}
          >
            <List.Item.Layout.Title>Title</List.Item.Layout.Title>
            <List.Item.Layout.End>
              <Value.Currency value={1234} showEmpty />
            </List.Item.Layout.End>
          </List.Item.Variant.Navigate>
        </List.Container>
      </Box>

      <Box data-visual-test="list-separated">
        <List.Container separated>
          <List.Item.Variant.Navigate
            onClick={() => console.log('Clicked')}
          >
            <List.Item.Layout.Icon>{fish_medium}</List.Item.Layout.Icon>
            <List.Item.Layout.Title>Title</List.Item.Layout.Title>
            <List.Item.Layout.End>
              <Value.Currency value={1234} showEmpty />
            </List.Item.Layout.End>
          </List.Item.Variant.Navigate>

          <List.Item.Variant.Content>
            <List.Item.Layout.Icon>{fish_medium}</List.Item.Layout.Icon>
            <List.Item.Layout.Title>Title</List.Item.Layout.Title>
            <List.Item.Layout.End>
              <Value.Currency value={1234} showEmpty />
            </List.Item.Layout.End>
          </List.Item.Variant.Content>
        </List.Container>
      </Box>

      <Box data-visual-test="list-accordion">
        <List.Container>
          <List.Item.Variant.Accordion>
            <List.Item.Variant.Accordion.Header>
              <List.Item.Layout.Icon>{fish_medium}</List.Item.Layout.Icon>
              <List.Item.Layout.Title>Title</List.Item.Layout.Title>
              <List.Item.Layout.End>
                <Value.Currency value={1234} showEmpty />
              </List.Item.Layout.End>
            </List.Item.Variant.Accordion.Header>

            <List.Item.Variant.Accordion.Content>
              <List.Item.Layout.Start innerSpace>
                Content ...
              </List.Item.Layout.Start>
            </List.Item.Variant.Accordion.Content>
          </List.Item.Variant.Accordion>

          <List.Item.Variant.Accordion open iconPosition="left">
            <List.Item.Variant.Accordion.Header>
              {/* <List.Item.Layout.Icon>{fish_medium}</List.Item.Layout.Icon> */}
              <List.Item.Layout.Title>Title</List.Item.Layout.Title>
            </List.Item.Variant.Accordion.Header>

            <List.Item.Variant.Accordion.Content>
              <List.Item.Layout.Start innerSpace>
                Content ...
              </List.Item.Layout.Start>
            </List.Item.Variant.Accordion.Content>
          </List.Item.Variant.Accordion>
        </List.Container>
      </Box>
    </Wrapper>
  )
}

export function ListAccordion() {
  return (
    <Wrapper>
      <Box data-visual-test="list-accordion">
        <List.Container>
          <List.Item.Variant.Accordion>
            <List.Item.Variant.Accordion.Header>
              <List.Item.Layout.Icon>{fish_medium}</List.Item.Layout.Icon>
              <List.Item.Layout.Title>Title</List.Item.Layout.Title>
              <List.Item.Layout.End>
                <Value.Currency value={1234} showEmpty />
              </List.Item.Layout.End>
            </List.Item.Variant.Accordion.Header>

            <List.Item.Variant.Accordion.Content>
              <List.Item.Layout.Start innerSpace>
                Content ...
              </List.Item.Layout.Start>
            </List.Item.Variant.Accordion.Content>
          </List.Item.Variant.Accordion>

          <List.Item.Variant.Accordion open iconPosition="left">
            <List.Item.Variant.Accordion.Header>
              <List.Item.Layout.Title>Title</List.Item.Layout.Title>
            </List.Item.Variant.Accordion.Header>

            <List.Item.Variant.Accordion.Content>
              <List.Item.Layout.Start innerSpace>
                Content ...
              </List.Item.Layout.Start>
            </List.Item.Variant.Accordion.Content>
          </List.Item.Variant.Accordion>
        </List.Container>
      </Box>
    </Wrapper>
  )
}

export function ListWithAvatar() {
  return (
    <Wrapper>
      <Box data-visual-test="list-avatar">
        <List.Container>
          <List.Item.Variant.Content>
            <List.Item.Layout.Start>
              <Avatar size="small">A</Avatar>
            </List.Item.Layout.Start>
            <List.Item.Layout.Title>Alice Andersen</List.Item.Layout.Title>
            <List.Item.Layout.End>
              <Value.Currency value={1234} showEmpty />
            </List.Item.Layout.End>
          </List.Item.Variant.Content>

          <List.Item.Variant.Navigate onClick={() => {}}>
            <List.Item.Layout.Start>
              <Avatar size="small">B</Avatar>
            </List.Item.Layout.Start>
            <List.Item.Layout.Title>Bob Berg</List.Item.Layout.Title>
            <List.Item.Layout.End>
              <Value.Currency value={5678} showEmpty />
            </List.Item.Layout.End>
          </List.Item.Variant.Navigate>

          <List.Item.Variant.Content>
            <List.Item.Layout.Start>
              <Avatar
                size="small"
                src="https://eufemia.dnb.no/images/avatars/1501870.jpg"
                alt=""
              />
            </List.Item.Layout.Start>
            <List.Item.Layout.Title>
              Carol with image
            </List.Item.Layout.Title>
            <List.Item.Layout.End>Value</List.Item.Layout.End>
          </List.Item.Variant.Content>
        </List.Container>
      </Box>
    </Wrapper>
  )
}
