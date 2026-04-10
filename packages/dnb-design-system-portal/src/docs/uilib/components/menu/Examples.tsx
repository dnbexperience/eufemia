import React from 'react'
import ComponentBox from '../../../../shared/tags/ComponentBox'
import { Menu } from '@dnb/eufemia/src'
import {
  copy,
  edit,
  file,
  file_add,
  file_pdf,
  file_png,
  folder,
  home,
  launch,
  layout_card,
  save,
  scissors,
} from '@dnb/eufemia/src/icons'

export function MenuExampleDefault() {
  return (
    <ComponentBox>
      <Menu.Root>
        <Menu.Button />
        <Menu.List>
          <Menu.Action text="Action" onClick={() => null} />
          <Menu.Action text="Link" href="https://www.dnb.no/" />
        </Menu.List>
      </Menu.Root>
    </ComponentBox>
  )
}

export function MenuExampleWithLinks() {
  return (
    <ComponentBox scope={{ home, layout_card, launch }}>
      <Menu.Root>
        <Menu.Button
          text="Navigate"
          icon="chevron_down"
          variant="tertiary"
        />
        <Menu.List>
          <Menu.Action icon={home} text="Home" href="/" />
          <Menu.Action
            icon={layout_card}
            text="Dashboard"
            href="/dashboard"
          />
          <Menu.Action
            icon={launch}
            text="External"
            href="https://example.com"
            target="_blank"
            rel="noopener noreferrer"
          />
        </Menu.List>
      </Menu.Root>
    </ComponentBox>
  )
}

export function MenuExampleNested() {
  return (
    <ComponentBox
      scope={{ file_add, folder, file_pdf, file_png, file }}
      data-visual-test="menu-accordion"
    >
      <Menu.Root arrowPosition="left">
        <Menu.Button text="File" icon="chevron_down" />
        <Menu.List>
          <Menu.Action
            icon={file_add}
            text="New"
            onClick={() => console.log('new')}
          />
          <Menu.Action
            icon={folder}
            text="Open"
            onClick={() => console.log('open')}
          />
          <Menu.Divider />

          <Menu.Root placement="right" arrowPosition="top">
            <Menu.Action icon={folder} text="Export as" />
            <Menu.List>
              <Menu.Action
                icon={file_pdf}
                text="PDF"
                onClick={() => console.log('export pdf')}
              />
              <Menu.Action
                icon={file_png}
                text="PNG"
                onClick={() => console.log('export png')}
              />
              <Menu.Action
                icon={file}
                text="SVG"
                onClick={() => console.log('export svg')}
              />
            </Menu.List>
          </Menu.Root>

          <Menu.Divider />
          <Menu.Action
            icon="close"
            text="Close"
            onClick={() => console.log('close')}
          />
        </Menu.List>
      </Menu.Root>
    </ComponentBox>
  )
}

export function MenuExampleAccordion() {
  return (
    <ComponentBox scope={{ file_add, folder, file_pdf, file_png, save }}>
      <Menu.Root>
        <Menu.Button text="File" icon="chevron_down" />
        <Menu.List>
          <Menu.Action
            icon={file_add}
            text="New"
            onClick={() => console.log('new')}
          />
          <Menu.Action
            icon={folder}
            text="Open"
            onClick={() => console.log('open')}
          />
          <Menu.Divider />

          <Menu.Accordion icon={folder} text="Export as">
            <Menu.Action
              icon={file_pdf}
              text="PDF"
              onClick={() => console.log('export pdf')}
            />
            <Menu.Action
              icon={file_png}
              text="PNG"
              onClick={() => console.log('export png')}
            />
          </Menu.Accordion>

          <Menu.Divider />
          <Menu.Action
            icon={save}
            text="Save"
            onClick={() => console.log('save')}
          />
        </Menu.List>
      </Menu.Root>
    </ComponentBox>
  )
}

export function MenuExampleWithHeader() {
  return (
    <ComponentBox scope={{ scissors, copy, edit }}>
      <Menu.Root>
        <Menu.Button text="Edit" icon="chevron_down" />
        <Menu.List>
          <Menu.Header text="Clipboard" />
          <Menu.Action
            icon={scissors}
            text="Cut"
            onClick={() => console.log('cut')}
          />
          <Menu.Action
            icon={copy}
            text="Copy"
            onClick={() => console.log('copy')}
          />
          <Menu.Action icon={edit} text="Paste" disabled />
          <Menu.Divider />
          <Menu.Header text="Selection" />
          <Menu.Action icon="check" text="Select All" />
        </Menu.List>
      </Menu.Root>
    </ComponentBox>
  )
}

export function MenuExampleMaxVisibleListItems() {
  return (
    <ComponentBox>
      <Menu.Root>
        <Menu.Button text="Long list" icon="chevron_down" />
        <Menu.List maxVisibleListItems={4}>
          <Menu.Action text="Item 1" />
          <Menu.Action text="Item 2" />
          <Menu.Action text="Item 3" />
          <Menu.Action text="Item 4" />
          <Menu.Action text="Item 5" />
          <Menu.Action text="Item 6" />
          <Menu.Action text="Item 7" />
          <Menu.Action text="Item 8" />
        </Menu.List>
      </Menu.Root>
    </ComponentBox>
  )
}
