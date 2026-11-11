import {
  Search,
  Flex,
  FormLabel,
  ToggleButton,
  Menu,
  P,
} from '@dnb/eufemia/src'
import { useState } from 'react'
import ComponentBox from '../../../../shared/tags/ComponentBox'

export const SearchDefault = () => (
  <ComponentBox data-visual-test="search-default">
    <Search.Input label="Search content" />
  </ComponentBox>
)

export const SearchHero = () => (
  <ComponentBox data-visual-test="search-hero">
    <Search.Input
      variant="hero"
      shortcut
      label="Search components and guidance"
      placeholder="Search components and guidance"
    />
  </ComponentBox>
)

export const SearchCompact = () => (
  <ComponentBox data-visual-test="search-compact">
    <Search.Input variant="compact" shortcut label="Search content" />
  </ComponentBox>
)

export const SearchAutocomplete = () => (
  <ComponentBox data-visual-test="search-autocomplete">
    <Search.Autocomplete
      label="Search components"
      data={['Button', 'Input', 'Table']}
    />
  </ComponentBox>
)

export const SearchAutocompleteHero = () => (
  <ComponentBox data-visual-test="search-autocomplete-hero">
    <Search.Autocomplete
      variant="hero"
      shortcut
      label="Search components and guidance"
      placeholder="Search components and guidance"
      data={['Button', 'Input', 'Table']}
    />
  </ComponentBox>
)

export const SearchAutocompleteCompact = () => (
  <ComponentBox data-visual-test="search-autocomplete-compact">
    <Search.Autocomplete
      variant="compact"
      shortcut
      label="Search components"
      data={['Button', 'Input', 'Table']}
    />
  </ComponentBox>
)

export const SearchAsync = () => (
  <ComponentBox data-visual-test="search-async">
    {() => {
      const onType = ({
        value,
        event,
        updateData,
        setHidden,
        setVisible,
        showIndicator,
        hideIndicator,
        showNoOptionsItem,
        debounce,
      }) => {
        if (value.trim()) {
          showIndicator()
        } else {
          updateData([])
          setHidden()
          hideIndicator()
        }

        debounce(
          ({ value, input }) => {
            if (!value.trim()) {
              return
            }

            const results = ['Button', 'Input', 'Table'].filter((item) =>
              item.toLowerCase().includes(value.trim().toLowerCase())
            )
            if (document.activeElement === input) {
              setVisible()
            }
            updateData(results)
            hideIndicator()
            if (!results.length) {
              showNoOptionsItem()
            }
          },
          { value, input: event.target },
          500
        )
      }

      return (
        <Flex.Stack>
          <Search.Autocomplete
            label="Search components asynchronously"
            labelSrOnly={false}
            mode="async"
            onType={onType}
          />
          <Search.Panel
            label="Search components asynchronously in a panel"
            panelDescription="Search results appear after typing. Use the arrow keys to navigate results."
            labelSrOnly={false}
            variant="compact"
            shortcut
            mode="async"
            onType={onType}
          />
        </Flex.Stack>
      )
    }}
  </ComponentBox>
)

export const SearchPanel = () => (
  <ComponentBox hideCode data-visual-test="search-panel">
    {() => {
      const Example = () => {
        const [category, setCategory] = useState('all')
        const [sort, setSort] = useState('relevance')
        const sortLabel =
          sort === 'relevance' ? 'Relevance' : 'Alphabetical'
        const [selected, setSelected] = useState('')
        const items = [
          { content: 'Input', category: 'components' },
          { content: 'Button', category: 'components' },
          { content: 'Table', category: 'components' },
          { content: 'Accessibility', category: 'guidance' },
          { content: 'Getting started', category: 'guidance' },
          { content: 'Card', category: 'components' },
          { content: 'Checkbox', category: 'components' },
          { content: 'Dialog', category: 'components' },
          { content: 'Drawer', category: 'components' },
          { content: 'Dropdown', category: 'components' },
          { content: 'Icon', category: 'components' },
          { content: 'Radio', category: 'components' },
          { content: 'Slider', category: 'components' },
          { content: 'Switch', category: 'components' },
          { content: 'Tooltip', category: 'components' },
          { content: 'Colors', category: 'guidance' },
          { content: 'Forms', category: 'guidance' },
          { content: 'Layout', category: 'guidance' },
          { content: 'Spacing', category: 'guidance' },
          { content: 'Typography', category: 'guidance' },
        ]
        const data = items.filter(
          (item) => category === 'all' || item.category === category
        )
        if (sort === 'alphabetical') {
          data.sort((a, b) => a.content.localeCompare(b.content))
        }

        return (
          <Flex.Stack>
            <Search.Panel
              variant="compact"
              shortcut
              label="Search with filters"
              panelDescription="Search results include category filters and sorting. Use the arrow keys to navigate results and press Tab to reach the filters and sorting controls."
              data={data}
              search={{ reorder: sort === 'relevance' }}
              onChange={({ data }) => {
                if (data && typeof data !== 'string') {
                  setSelected(String(data.content))
                }
              }}
            >
              {({ results }) => (
                <Flex.Stack layoutEngine="css" gap="small">
                  <Flex.Container
                    layoutEngine="css"
                    justify="space-between"
                    align="center"
                    gap="x-small"
                    wrap
                  >
                    <FormLabel
                      element="span"
                      vertical={false}
                      right={false}
                    >
                      Show results from
                    </FormLabel>
                    <Flex.Item style={{ marginLeft: 'auto' }}>
                      <Menu.Root
                        skipPortal
                        alignOnTarget="right"
                        arrowPosition="right"
                        arrowPositionSelector=".dnb-button__icon"
                      >
                        <Menu.Button
                          variant="tertiary"
                          icon="chevron_down"
                          text={sortLabel}
                          aria-label={`Sort results: ${sortLabel}`}
                        />
                        <Menu.List
                          aria-label="Sort results"
                          style={{ whiteSpace: 'nowrap' }}
                        >
                          <Menu.Action
                            text="Relevance"
                            icon={
                              sort === 'relevance' ? 'check' : undefined
                            }
                            onClick={() => setSort('relevance')}
                          />
                          <Menu.Action
                            text="Alphabetical"
                            icon={
                              sort === 'alphabetical' ? 'check' : undefined
                            }
                            onClick={() => setSort('alphabetical')}
                          />
                        </Menu.List>
                      </Menu.Root>
                    </Flex.Item>
                  </Flex.Container>
                  <ToggleButton.Group
                    label="Show results from"
                    labelSrOnly
                    value={category}
                    onChange={({ value }) => setCategory(String(value))}
                  >
                    <ToggleButton text="All" value="all" />
                    <ToggleButton text="Components" value="components" />
                    <ToggleButton text="Guidance" value="guidance" />
                  </ToggleButton.Group>
                  {results}
                </Flex.Stack>
              )}
            </Search.Panel>
            <P aria-live="polite">
              {selected
                ? `Selected: ${selected}`
                : 'Select a result to try the search.'}
            </P>
          </Flex.Stack>
        )
      }

      return <Example />
    }}
  </ComponentBox>
)
