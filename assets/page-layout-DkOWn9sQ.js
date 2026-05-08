import{r as e}from"./rolldown-runtime-BYbx6iT9.js";import{t}from"./jsx-runtime-BgMs7Gb-.js";import{t as n}from"./ComponentBox-C64JNWnl.js";import{Fa as r,Lr as i,Pa as a,wi as o}from"./index-2AO2Cu5K.js";var s=e({PageLayoutExample:()=>l}),c=t();function l(){return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(a,{styles:r`
          /** Reset global styles */
          #dnb-app-content,
          .dnb-app-content.fullscreen-page {
            padding: 0;
          }
          .example-box {
            padding-left: 0 !important;
            padding-right: 0 !important;
          }
        `}),(0,c.jsx)(n,{hideCode:!0,scope:{useMedia:o},noInline:!0,children:`function PageLayout() {
  const { isSmall, isMedium, isLarge } = useMedia()
  const { minimizedSidebar, Toggle } = useMinimizeSidebar()
  const renderWideSidebar = !isMedium
  const sidebarColumns = isSmall ? 0 : minimizedSidebar ? 1 : 3
  const pageColumns = isSmall ? 4 : isMedium ? 6 : isLarge ? 12 : 0
  return (
    <PageContainerWithStyles>
      {renderWideSidebar && (
        <SidebarContent columns={sidebarColumns} Toggle={Toggle} />
      )}

      <Grid.Container
        className="pageContainer"
        columns={pageColumns}
        columnGap="medium"
      >
        <Grid.Item span={[1, 'end']}>
          <PageContent columns={pageColumns} />
        </Grid.Item>
      </Grid.Container>
    </PageContainerWithStyles>
  )
}
function SidebarContent({ columns, Toggle }) {
  const content = useColumns({
    columns,
    color: colors[1],
  })
  return (
    columns > 0 && (
      <Grid.Container
        className="sidebarContent"
        data-columns={columns}
        columnGap
        columns={columns}
        element="aside"
        aria-label="Main Menu"
      >
        {content}

        <Grid.Item
          span="full"
          style={{
            display: 'grid',
            placeContent: 'center',
          }}
        >
          <Toggle />
        </Grid.Item>
      </Grid.Container>
    )
  )
}
function PageContent({ columns }) {
  const content = useColumns({
    columns,
    color: colors[0],
  })
  return (
    <Grid.Container className="pageContent" columns={columns} columnGap>
      {content}
    </Grid.Container>
  )
}
function useColumns({ columns, color }) {
  const content = [...Array(columns)].map((_, i) => {
    const nr = i + 1
    return (
      <Grid.Item
        className="columnItem"
        key={i}
        span={[nr, nr]}
        style={color}
      >
        {nr}
      </Grid.Item>
    )
  })
  return content
}
function useMinimizeSidebar() {
  const [minimizedSidebar, setMinimize] = useState(false)
  const clickHandler = () => {
    setMinimize((s) => !s)
  }
  return {
    minimizedSidebar,
    Toggle: () => (
      <Button
        icon={minimizedSidebar ? 'arrow_right' : 'arrow_left'}
        space="x-small"
        variant="secondary"
        onClick={clickHandler}
      />
    ),
  }
}
const PageContainerWithStyles = styled.div\`
  --sidebar-width: 17rem;
  --page-container-gap: var(--spacing-medium);
  --page-width: var(--layout-large);

  // horizontal layout
  display: flex;

  // the gap between the sidebar and the page content
  column-gap: var(--page-container-gap);

  // center everything
  margin: auto;

  // max page width
  max-width: calc(
    var(--sidebar-width) + var(--page-container-gap) + var(--page-width)
  );

  .sidebarContent {
    --width: var(--sidebar-width);
    &[data-columns='1'] {
      --width: calc(var(--sidebar-width) / 3);
    }

    width: var(--width);
  }

  .pageContainer {
    flex-grow: 1;
  }

  .pageContent {
  }

  // for demo purposes
  background-color: var(--color-lavender);
  box-shadow: 0 0 0 1px black;

  .columnItem {
    display: grid;
    place-content: center;

    html:not([data-visual-test]) & {
      min-height: 70vh;
    }

    text-align: center;
  }

  .sidebarContent {
    transition: width 400ms var(--easing-default);
    background-color: var(--color-sand-yellow);
  }
\`
const colors = [
  {
    background: 'var(--color-sea-green-30)',
  },
  {
    background: 'var(--color-mint-green-50)',
  },
]
render(<PageLayout />)
`})]})}function u(e){let t={p:`p`,...i(),...e.components};return s||f(`Examples`,!1),l||f(`Examples.PageLayoutExample`,!0),(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(t.p,{children:`This is a demo of how to use the Grid component for a page layout. It visualizes each column, instead of the actual content.
Resize your browser window to see how it changes based on different breakpoints.`}),`
`,(0,c.jsx)(l,{})]})}function d(e={}){let{wrapper:t}={...i(),...e.components};return t?(0,c.jsx)(t,{...e,children:(0,c.jsx)(u,{...e})}):u(e)}function f(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{d as default};