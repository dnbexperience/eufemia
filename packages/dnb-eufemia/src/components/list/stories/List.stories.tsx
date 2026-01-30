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
      <Box>
        <List.Container>
          <List.Item.Content>List item 1</List.Item.Content>
          <List.Item.Content selected>List item 2</List.Item.Content>

          <List.Item.Content>
            <List.Item.Start>Start</List.Item.Start>
            <List.Item.Center>Center</List.Item.Center>
            <List.Item.End>End</List.Item.End>
          </List.Item.Content>

          <List.Item.Navigate onClick={() => console.log('Clicked')}>
            <List.Item.Icon>{fish_medium}</List.Item.Icon>
            <List.Item.Title>Title</List.Item.Title>
            <List.Item.End>
              <Value.Currency value={1234} showEmpty />
            </List.Item.End>
          </List.Item.Navigate>

          <List.Item.Content>
            <List.Item.Start>
              <Checkbox label="Checkbox" />
            </List.Item.Start>
            <List.Item.End>
              <Value.Currency value={1234} showEmpty />
            </List.Item.End>
          </List.Item.Content>
        </List.Container>
      </Box>

      <Box>
        <List.Container>
          <List.Item.Navigate
            pending
            onClick={() => console.log('Clicked')}
          >
            <List.Item.Icon>{fish_medium}</List.Item.Icon>
            <List.Item.Title>Pending</List.Item.Title>
            <List.Item.End>
              <Value.Currency value={1234} showEmpty />
            </List.Item.End>
          </List.Item.Navigate>

          <List.Item.Navigate
            skeleton
            onClick={() => console.log('Clicked')}
          >
            <List.Item.Icon>{fish_medium}</List.Item.Icon>
            <List.Item.Title>Skeleton</List.Item.Title>
            <List.Item.End>
              <Value.Currency value={1234} showEmpty />
            </List.Item.End>
          </List.Item.Navigate>
        </List.Container>
      </Box>

      <Box>
        <List.Container>
          <List.Item.Navigate
            iconPosition="left"
            onClick={() => console.log('Clicked')}
          >
            <List.Item.Title>Title</List.Item.Title>
            <List.Item.End>
              <Value.Currency value={1234} showEmpty />
            </List.Item.End>
          </List.Item.Navigate>
        </List.Container>
      </Box>

      <Box>
        <List.Container separated>
          <List.Item.Navigate onClick={() => console.log('Clicked')}>
            <List.Item.Icon>{fish_medium}</List.Item.Icon>
            <List.Item.Title>Title</List.Item.Title>
            <List.Item.End>
              <Value.Currency value={1234} showEmpty />
            </List.Item.End>
          </List.Item.Navigate>

          <List.Item.Content>
            <List.Item.Icon>{fish_medium}</List.Item.Icon>
            <List.Item.Title>Title</List.Item.Title>
            <List.Item.End>
              <Value.Currency value={1234} showEmpty />
            </List.Item.End>
          </List.Item.Content>
        </List.Container>
      </Box>
    </Wrapper>
  )
}

export function ListAccordion() {
  return (
    <Wrapper>
      <Box>
        <List.Container>
          <List.Item.Accordion>
            <List.Item.Accordion.Header>
              <List.Item.Icon>{fish_medium}</List.Item.Icon>
              <List.Item.Title>Title</List.Item.Title>
              <List.Item.End>
                <Value.Currency value={1234} showEmpty />
              </List.Item.End>
            </List.Item.Accordion.Header>

            <List.Item.Accordion.Content>
              <List.Item.Start innerSpace>Content ...</List.Item.Start>
            </List.Item.Accordion.Content>
          </List.Item.Accordion>

          <List.Item.Accordion open iconPosition="left">
            <List.Item.Accordion.Header>
              {/* <List.Item.Icon>{fish_medium}</List.Item.Icon> */}
              <List.Item.Title>Title</List.Item.Title>
            </List.Item.Accordion.Header>

            <List.Item.Accordion.Content>
              <List.Item.Start innerSpace>Content ...</List.Item.Start>
            </List.Item.Accordion.Content>
          </List.Item.Accordion>
        </List.Container>
      </Box>
    </Wrapper>
  )
}

export function ListWithAvatar() {
  return (
    <Wrapper>
      <Box>
        <List.Container>
          <List.Item.Content>
            <List.Item.Start>
              <Avatar size="small">A</Avatar>
            </List.Item.Start>
            <List.Item.Title>Alice Andersen</List.Item.Title>
            <List.Item.End>
              <Value.Currency value={1234} showEmpty />
            </List.Item.End>
          </List.Item.Content>

          <List.Item.Navigate onClick={() => {}}>
            <List.Item.Start>
              <Avatar size="small">B</Avatar>
            </List.Item.Start>
            <List.Item.Title>Bob Berg</List.Item.Title>
            <List.Item.End>
              <Value.Currency value={5678} showEmpty />
            </List.Item.End>
          </List.Item.Navigate>

          <List.Item.Content>
            <List.Item.Start>
              <Avatar
                size="small"
                src="https://eufemia.dnb.no/images/avatars/1501870.jpg"
                alt=""
              />
            </List.Item.Start>
            <List.Item.Title>Carol with image</List.Item.Title>
            <List.Item.End>Value</List.Item.End>
          </List.Item.Content>
        </List.Container>
      </Box>
    </Wrapper>
  )
}
