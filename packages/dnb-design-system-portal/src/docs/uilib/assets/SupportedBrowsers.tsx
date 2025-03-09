import React from 'react'
import config from '@dnb/browserslist-config'
import supportedBrowsers from '@dnb/browserslist-config/supportedBrowsers.mjs'
import {
  Table,
  Th,
  Tr,
  Code,
  CopyOnClick,
  Space,
  Td,
} from '@dnb/eufemia/src'

export function SupportedBrowsersConfig() {
  return (
    <Space element="pre">
      <Code>
        <Space innerSpace>
          <CopyOnClick>
            {config
              .map((browser) => {
                return browser
              })
              .join(',\n')}
          </CopyOnClick>
        </Space>
      </Code>
    </Space>
  )
}

export function SupportedBrowsersTable() {
  return (
    <Table size="small" outline>
      <thead>
        <Tr>
          <Th
            style={{
              width: '30%',
            }}
          >
            Browser
          </Th>
          <Th>Minimum version</Th>
        </Tr>
      </thead>

      <tbody>
        {supportedBrowsers.map((browser, key) => {
          return (
            <Tr key={key}>
              <Td>{browser.name}</Td>
              <Td>
                <Code>{browser.minimumVersion}</Code>
              </Td>
            </Tr>
          )
        })}
      </tbody>
    </Table>
  )
}
