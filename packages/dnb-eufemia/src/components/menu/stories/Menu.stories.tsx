import React from 'react'
import Menu from '../Menu'
import '../style/dnb-menu.scss'
import {
  copy,
  edit,
  trash,
  file_pdf,
  file_png,
  folder,
} from '../../../icons'

export default {
  title: 'Eufemia/Components/Menu',
}

export const Default = {
  render: () => (
    <Menu.Root>
      <Menu.Button />
      <Menu.List>
        <Menu.Action
          onClick={() => console.log('copy')}
          text="Copy"
          icon={copy}
        />
        <Menu.Action
          onClick={() => console.log('paste')}
          text="Edit"
          icon={edit}
        />
        <Menu.Divider />
        <Menu.Action
          onClick={() => console.log('delete')}
          text="Delete"
          icon={trash}
        />
      </Menu.List>
    </Menu.Root>
  ),
}

export const Nested = {
  render: () => (
    <Menu.Root arrowPosition="left">
      <Menu.Button text="File" icon="chevron_down" />
      <Menu.List>
        <Menu.Action text="New" onClick={() => console.log('new')} />
        <Menu.Action text="Open" onClick={() => console.log('open')} />
        <Menu.Divider />
        <Menu.Root placement="right" arrowPosition="top">
          <Menu.Action icon={folder} text="Export as" />
          <Menu.List>
            <Menu.Action
              icon={file_pdf}
              text="PDF"
              onClick={() => console.log('pdf')}
            />
            <Menu.Action
              icon={file_png}
              text="PNG"
              onClick={() => console.log('png')}
            />
          </Menu.List>
        </Menu.Root>
        <Menu.Divider />
        <Menu.Action text="Close" onClick={() => console.log('close')} />
      </Menu.List>
    </Menu.Root>
  ),
}

export const Accordion = {
  render: () => (
    <Menu.Root>
      <Menu.Button text="File" icon="chevron_down" />
      <Menu.List>
        <Menu.Action text="New" onClick={() => console.log('new')} />
        <Menu.Action text="Open" onClick={() => console.log('open')} />
        <Menu.Divider />
        <Menu.Accordion icon={folder} text="Export as">
          <Menu.Action
            icon={file_pdf}
            text="PDF"
            onClick={() => console.log('pdf')}
          />
          <Menu.Action
            icon={file_png}
            text="PNG"
            onClick={() => console.log('png')}
          />
        </Menu.Accordion>
        <Menu.Divider />
        <Menu.Action text="Close" onClick={() => console.log('close')} />
      </Menu.List>
    </Menu.Root>
  ),
}
