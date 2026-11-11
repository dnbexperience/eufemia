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
  <ComponentBox hideCode data-visual-test="search-default-group">
    <Flex.Stack layoutEngine="css" wrap={false}>
      <Flex.Stack
        layoutEngine="css"
        wrap={false}
        gap="x-small"
        data-visual-test="search-default"
        data-testid="search-default"
      >
        <P>Search.Input</P>
        <Search.Input label="Search content" />
      </Flex.Stack>
      <Flex.Stack
        layoutEngine="css"
        wrap={false}
        gap="x-small"
        data-visual-test="search-autocomplete"
        data-testid="search-autocomplete"
      >
        <P>Search.Autocomplete</P>
        <Search.Autocomplete
          label="Search components"
          data={['Button', 'Input', 'Table']}
        />
      </Flex.Stack>
      <Flex.Stack
        layoutEngine="css"
        wrap={false}
        gap="x-small"
        data-visual-test="search-panel-default"
        data-testid="search-panel-default"
      >
        <P>Search.Panel</P>
        <Search.Panel
          label="Search components in a panel"
          panelDescription="Use the arrow keys to navigate search results."
          data={['Button', 'Input', 'Table']}
        />
      </Flex.Stack>
    </Flex.Stack>
  </ComponentBox>
)

export const SearchHero = () => (
  <ComponentBox hideCode data-visual-test="search-hero-group">
    <Flex.Stack layoutEngine="css" wrap={false}>
      <Flex.Stack
        layoutEngine="css"
        wrap={false}
        gap="x-small"
        data-visual-test="search-hero"
        data-testid="search-hero"
      >
        <P>Search.Input</P>
        <Search.Input
          variant="hero"
          shortcut
          label="Search components and guidance"
          placeholder="Search components and guidance"
        />
      </Flex.Stack>
      <Flex.Stack
        layoutEngine="css"
        wrap={false}
        gap="x-small"
        data-visual-test="search-autocomplete-hero"
        data-testid="search-autocomplete-hero"
      >
        <P>Search.Autocomplete</P>
        <Search.Autocomplete
          variant="hero"
          shortcut
          label="Search components and guidance"
          placeholder="Search components and guidance"
          data={['Button', 'Input', 'Table']}
        />
      </Flex.Stack>
      <Flex.Stack
        layoutEngine="css"
        wrap={false}
        gap="x-small"
        data-visual-test="search-panel-hero"
        data-testid="search-panel-hero"
      >
        <P>Search.Panel</P>
        <Search.Panel
          variant="hero"
          shortcut
          label="Search components and guidance in a panel"
          placeholder="Search components and guidance"
          panelDescription="Use the arrow keys to navigate search results."
          data={['Button', 'Input', 'Table']}
        />
      </Flex.Stack>
    </Flex.Stack>
  </ComponentBox>
)

export const SearchCompact = () => (
  <ComponentBox hideCode data-visual-test="search-compact-group">
    <Flex.Stack layoutEngine="css" wrap={false}>
      <Flex.Stack
        layoutEngine="css"
        wrap={false}
        gap="x-small"
        data-visual-test="search-compact"
        data-testid="search-compact"
      >
        <P>Search.Input</P>
        <Search.Input variant="compact" shortcut label="Search content" />
      </Flex.Stack>
      <Flex.Stack
        layoutEngine="css"
        wrap={false}
        gap="x-small"
        data-visual-test="search-autocomplete-compact"
        data-testid="search-autocomplete-compact"
      >
        <P>Search.Autocomplete</P>
        <Search.Autocomplete
          variant="compact"
          shortcut
          label="Search components"
          data={['Button', 'Input', 'Table']}
        />
      </Flex.Stack>
      <Flex.Stack
        layoutEngine="css"
        wrap={false}
        gap="x-small"
        data-visual-test="search-panel-compact"
        data-testid="search-panel-compact"
      >
        <P>Search.Panel</P>
        <Search.Panel
          variant="compact"
          shortcut
          label="Search components in a panel"
          panelDescription="Use the arrow keys to navigate search results."
          data={['Button', 'Input', 'Table']}
        />
      </Flex.Stack>
    </Flex.Stack>
  </ComponentBox>
)

export const SearchAsync = () => (
  <ComponentBox hideCode data-visual-test="search-async">
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
        <Flex.Stack
          layoutEngine="css"
          wrap={false}
          data-testid="search-async"
        >
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
          <Flex.Stack
            layoutEngine="css"
            wrap={false}
            data-testid="search-panel"
          >
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
                <Flex.Stack layoutEngine="css" wrap={false} gap="small">
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
