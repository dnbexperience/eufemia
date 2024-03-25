/**
 * @dnb/eufemia Component Story
 *
 */

import React from 'react'
import { Wrapper, Box } from 'storybook-utils/helpers'
import styled from '@emotion/styled'

import {
  Input,
  InputMasked,
  HelpButton,
  Button,
  FormLabel,
  GlobalStatus,
  Flex,
} from '../..'

import { format } from '../../number-format/NumberUtils'
import { FieldBlock, Form } from '../../../extensions/forms'
import { Provider } from '../../../shared'

export default {
  title: 'Eufemia/Components/Input',
}

const CustomStyle = styled.div`
  p {
    background-color: rgba(213, 30, 149, 0.25);
  }
`

const myRef = React.createRef<HTMLInputElement>()

// export default {
//   title: 'Components'
// }

export const InputSandbox = () => {
  // React.useEffect(() => {
  //   console.log('myRef', myRef.current)
  //   // console.log('myRef', Input, myRef.current)
  //   // myRef.current.focus()
  // })

  return (
    <CustomStyle>
      <Wrapper>
        <Box>
          <Provider formElement={{ label_direction: 'vertical' }}>
            <Flex.Vertical>
              <Input value="Plain" />
              <Input value="Search" type="search" />
              <Input value="Search" size="medium" type="search" />
              <Input value="Search" size="large" type="search" />
              <Input
                value="Value Eu pretium sit magnis suscipit cursus dis proin rutrum elementum"
                icon="calendar"
                align="right"
              />
              <Input
                placeholder="Placeholder Eu pretium sit magnis suscipit cursus dis proin rutrum elementum"
                icon_position="right"
                icon="calendar"
                align="right"
              />
              <Input
                size="medium"
                value="Value"
                icon="calendar"
                align="right"
              />
              <Input
                size="medium"
                placeholder="Placeholder"
                icon_position="right"
                icon="calendar"
                align="right"
              />
              <Input
                size="large"
                value="Value"
                icon="calendar"
                align="right"
              />
              <Input
                size="large"
                placeholder="Placeholder"
                icon_position="right"
                icon="calendar"
                align="right"
              />
            </Flex.Vertical>
          </Provider>
        </Box>
        <Box>
          <Input
            label="Choose file:"
            type="file"
            accept="image/png, image/jpeg"
          />
        </Box>
        <Box>
          <CustomInput />
        </Box>
        <Box>
          🚀
          <Provider formElement={{ label_direction: 'vertical' }}>
            <Form.Handler>
              <FieldBlock label="Long label labwl Adipiscing mauris dis proin nec Condimentum egestas class blandit netus non a suscipit id urna:">
                <Flex.Vertical>
                  <Input
                    inner_ref={myRef}
                    label="Input A:"
                    placeholder="Placeholder text"
                  />

                  <Input label="Input B:" placeholder="Placeholder text" />
                  <Input label="Input C:" />
                </Flex.Vertical>
              </FieldBlock>
            </Form.Handler>
          </Provider>
        </Box>
        <Box>
          <Provider
            formElement={{
              label_direction: 'vertical',
            }}
          >
            <FieldBlock label="Vertical label:">
              <Flex.Horizontal>
                <Input label="Input label A:" right="small" />
                <Input label="Input label B:" />
              </Flex.Horizontal>
            </FieldBlock>
          </Provider>
        </Box>
        <Box>
          <FieldBlock label="Legend:">
            <Flex.Vertical>
              <Input label="Vertical 1:" />
              <Input label="Vertical 2:" stretch top="small" />
            </Flex.Vertical>
          </FieldBlock>
        </Box>
        <Box>
          <Provider formElement={{ label_direction: 'vertical' }}>
            <FieldBlock label="Legend:">
              <Flex.Vertical>
                <Input label="Vertical 1:" />
                <Input label="Vertical 2:" stretch top="small" />
              </Flex.Vertical>
            </FieldBlock>
          </Provider>
        </Box>
        <Box>
          <Input
            label="Vertical label:"
            value="Stretch me ..."
            stretch
            label_direction="vertical"
          />
        </Box>
        <Box>
          Text
          <Input
            selectall
            label="Label:"
            on_change={(event) => {
              console.log('on_change', event)
            }}
          >
            Input ...
          </Input>
          Text
        </Box>
        <Box>
          Text
          <FormLabel>FormLabel:</FormLabel>
          <Input>Input ...</Input>
          Text
        </Box>
        <Box>
          <p className="dnb-p">
            <Input label="ReadOnly:" placeholder="Placeholder" readOnly />
          </p>
        </Box>
        <Box>
          <Input
            label="Search:"
            type="search"
            align="right"
            stretch
            placeholder="Search text placeholder"
          />
          <Input
            label="Search:"
            size="medium"
            type="search"
            align="right"
            stretch
            placeholder="Medium input clear button with right aligned text"
          />
          <Input
            label="Search:"
            size="large"
            type="search"
            align="right"
            stretch
            submit_button_title="Custom search button title"
            placeholder="Large input clear button with right aligned text"
          />
        </Box>
        <Box>
          <Input
            disabled
            status="Error"
            label="Disabled search:"
            type="search"
            submit_button_title="Custom search button title"
            placeholder="Search text placeholder"
          />
        </Box>
        <Box>
          <Input
            label="Input clear button with status:"
            status="Message to the user"
            value="Input value with status"
          />
        </Box>
        <Box>
          <Input
            label="Input clear button with description:"
            suffix="Description to the user"
            value="Input value with status"
          />
        </Box>
        <Box>
          <InputMasked
            label="Masked:"
            autocomplete="off"
            // value="1000000"
            mask={[
              '+',
              /[4]/, // have to start with 4
              /[5-7]/, // can be 5,6 or 7
              ' ',
              '/',
              ' ',
              /[49]/, // have to start with 4 or 9
              /\d/,
              /\d/,
              ' ',
              /\d/,
              /\d/,
              ' ',
              /\d/,
              /\d/,
              /\d/,
            ]}
            show_mask={true}
          />
        </Box>
        <Box>
          <form
            onSubmit={(event) => {
              // console.log('onSubmit', event)
              event.preventDefault()
              // event.persist()
            }}
          >
            <InputUpdate />
            <Button
              text="Submit"
              type="submit"
              on_click={(event) => {
                console.log('on_click', event)
              }}
              onClick={(event) => {
                console.log('onClick', event)
              }}
            />
          </form>
        </Box>

        {/* <Box>
          <Input
            clear
           label="Input" />
        </Box>
        <Box>
          <Input
          clear
            label="Small Input"
            size="small"
            icon_size="small"
            bottom="small"
          />
        </Box>
        <Box>
          <Input
          clear
            label="Medium Input"
            size="medium"
            bottom="small"
          />
        </Box>
        <Box>
          <Input
          clear
            label="Large Input"
            size="large"
          />
        </Box>
        <Box>
          <Input
          clear
            label="Input clear button with submit button"
            type="search"
          />
        </Box>
        <Box>
          <Input
          clear
            label="Small Input clear button with submit button"
            type="search"
            size="small"
          />
        </Box>
        <Box>
          <Input
          clear
            label="Medium Input clear button with submit button"
            type="search"
            size="medium"
          />
        </Box>
        <Box>
          <Input
          clear
            label="Large Input clear button with submit button"
            type="search"
            size="large"
          />
        </Box> */}
      </Wrapper>
    </CustomStyle>
  )
}

const InputUpdate = () => {
  const [initValue, setNewValue] = React.useState('Input ...')

  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      setNewValue('')
    }, 1e3)
    return () => clearTimeout(timeoutId)
  })

  return (
    <Input
      label="Label:"
      on_change={({ value }) => {
        console.log('on_change', value)
      }}
      on_submit={({ value }) => {
        console.log('on_submit', value)
      }}
      value={initValue}
    />
  )
}

const CustomInput = () => {
  const [value, setValue] = React.useState('2019-02-15')
  return (
    <>
      <Input
        value={value}
        on_change={({ value }) => {
          console.log('on_change', value)
          setValue(value)
        }}
        on_state_update={({ value }) => {
          console.warn('on_state_update', value)
          setValue(value)
        }}
        right
        suffix={<HelpButton>123</HelpButton>}
      />
      <Button
        text="Reset"
        on_click={() => {
          setValue('123')
        }}
      />
    </>
  )
}

export function InputClearButton() {
  return (
    <Wrapper>
      <Box>
        <Input icon="loupe" label="Input" />
        <br />
        <Input icon="loupe" clear label="Input" />
      </Box>
      <Box>
        <Input
          icon="loupe"
          clear
          label="Small Input"
          size="small"
          icon_size="small"
          bottom="small"
        />
      </Box>
      <Box>
        <Input
          icon="loupe"
          clear
          label="Medium Input"
          size="medium"
          bottom="small"
        />
      </Box>
      <Box>
        <Input icon="loupe" clear label="Large Input" size="large" />
      </Box>
      <Box>
        <Input icon="loupe" label="Input A" />

        <br />

        <Input icon="loupe" label="Input B" type="search" />

        <br />

        <Input icon="loupe" clear label="Input C" type="search" />
      </Box>
      <Box>
        <Input
          icon="loupe"
          clear
          label="Small Input clear button with submit button"
          type="search"
          size="small"
        />
      </Box>
      <Box>
        <Input
          icon="loupe"
          clear
          label="Medium Input clear button with submit button"
          type="search"
          size="medium"
        />
      </Box>
      <Box>
        <Input
          icon="loupe"
          clear
          label="Large Input clear button with submit button"
          type="search"
          size="large"
        />
      </Box>
    </Wrapper>
  )
}

export function ControlledInput() {
  const [value, setValue] = React.useState('123')

  const onChangeHandler = ({ value }) => {
    value = value.replace(/[^0-9]/g, '')
    setValue(value)
    // return format(value)
    // return false
  }

  const onChangeHandlerHtml = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, '')
    setValue(e.target.value)
  }

  const onKeyDownHandler = ({ event }) => {
    event.preventDefault()
  }

  console.log(format(value))

  return (
    <>
      <Input
        align="right"
        top
        left
        right
        on_change={onChangeHandler}
        on_key_down={onKeyDownHandler}
        value={format(value).toString()}
        selectall
      />
      <input
        onChange={onChangeHandlerHtml}
        value={format(value).toString()}
      />
    </>
  )
}

export const GlobalStatusExample = () => {
  return (
    <>
      <GlobalStatus id="my-id" />
      <Input
        title="Default"
        globalStatus={{ id: 'my-id', message: 'my message' }}
        status="Message"
      />
    </>
  )
}
