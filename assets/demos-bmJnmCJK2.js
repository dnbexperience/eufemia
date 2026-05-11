import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{t}from"./ComponentBox-xW2kV1s2.js";import{Lr as n}from"./index-DVm0MbGb.js";var r=e(),i=()=>(0,r.jsx)(t,{"data-visual-test":`simple-drawer`,children:`<Drawer
  title="Drawer title"
  triggerAttributes={{
    text: 'Open drawer',
  }}
>
  <P top>Some informational content</P>
  <P top>
    Elementum eu suspendisse sit platea elit porttitor magna laoreet ad
    ultrices tempus urna curae parturient conubia quisque viverra eget
    vestibulum neque pulvinar semper vulputate id dis varius pellentesque
    nunc egestas risus amet mus aptent luctus imperdiet netus natoque
    cubilia mattis nostra proin ornare scelerisque sodales faucibus
    placerat sem bibendum pretium rutrum vitae sociis ligula inceptos morbi
    quam mi sed pharetra fermentum tortor ullamcorper ipsum tellus eros
    euismod volutpat nisl dui lectus fames suscipit phasellus praesent
    justo mollis montes velit taciti gravida
  </P>
</Drawer>
`}),a=()=>(0,r.jsx)(t,{"data-visual-test":`large-content-drawer`,noInline:!0,children:`const MockComponent = () => {
  const scrollRef = useRef(null)
  return (
    <Drawer
      title="Drawer title"
      scrollRef={scrollRef}
      onOpen={() => {
        scrollRef.current.scrollTop = 50
      }}
    >
      <P top>Some informational content</P>
      <P top>
        Elementum eu suspendisse sit platea elit porttitor magna laoreet ad
        ultrices tempus urna curae parturient conubia quisque viverra eget
        vestibulum neque pulvinar semper vulputate id dis varius
        pellentesque nunc egestas risus amet mus aptent luctus imperdiet
        netus natoque cubilia mattis nostra proin ornare scelerisque
        sodales faucibus placerat sem bibendum pretium rutrum vitae sociis
        ligula inceptos morbi quam mi sed pharetra fermentum tortor
        ullamcorper ipsum tellus eros euismod volutpat nisl dui lectus
        fames suscipit phasellus praesent justo mollis montes velit taciti
        gravida
      </P>
      <P top>
        Elementum eu suspendisse sit platea elit porttitor magna laoreet ad
        ultrices tempus urna curae parturient conubia quisque viverra eget
        vestibulum neque pulvinar semper vulputate id dis varius
        pellentesque nunc egestas risus amet mus aptent luctus imperdiet
        netus natoque cubilia mattis nostra proin ornare scelerisque
        sodales faucibus placerat sem bibendum pretium rutrum vitae sociis
        ligula inceptos morbi quam mi sed pharetra fermentum tortor
        ullamcorper ipsum tellus eros euismod volutpat nisl dui lectus
        fames suscipit phasellus praesent justo mollis montes velit taciti
        gravida
      </P>

      <P top>
        Elementum eu suspendisse sit platea elit porttitor magna laoreet ad
        ultrices tempus urna curae parturient conubia quisque viverra eget
        vestibulum neque pulvinar semper vulputate id dis varius
        pellentesque nunc egestas risus amet mus aptent luctus imperdiet
        netus natoque cubilia mattis nostra proin ornare scelerisque
        sodales faucibus placerat sem bibendum pretium rutrum vitae sociis
        ligula inceptos morbi quam mi sed pharetra fermentum tortor
        ullamcorper ipsum tellus eros euismod volutpat nisl dui lectus
        fames suscipit phasellus praesent justo mollis montes velit taciti
        gravida
      </P>
    </Drawer>
  )
}
render(<MockComponent />)
`}),o=()=>(0,r.jsx)(t,{"data-visual-test":`left-placement-drawer`,children:`<Drawer title="Drawer title" containerPlacement="left">
  <P top>Some informational content</P>
  <P top>
    Elementum eu suspendisse sit platea elit porttitor magna laoreet ad
    ultrices tempus urna curae parturient conubia quisque viverra eget
    vestibulum neque pulvinar semper vulputate id dis varius pellentesque
    nunc egestas risus amet
  </P>
</Drawer>
`}),s=()=>(0,r.jsx)(t,{"data-visual-test":`top-placement-drawer`,children:`<Drawer title="Drawer title" containerPlacement="top">
  <P top>Some informational content</P>
  <P top>
    Elementum eu suspendisse sit platea elit porttitor magna laoreet ad
    ultrices tempus urna curae parturient conubia quisque viverra eget
    vestibulum neque pulvinar semper vulputate id dis varius pellentesque
    nunc egestas risus amet
  </P>
</Drawer>
`}),c=()=>(0,r.jsx)(t,{"data-visual-test":`bottom-placement-drawer`,children:`<Drawer title="Drawer title" containerPlacement="bottom">
  <P top>Some informational content</P>
  <P top>
    Elementum eu suspendisse sit platea elit porttitor magna laoreet ad
    ultrices tempus urna curae parturient conubia quisque viverra eget
    vestibulum neque pulvinar semper vulputate id dis varius pellentesque
    nunc egestas risus amet
  </P>
</Drawer>
`}),l=()=>(0,r.jsx)(t,{"data-visual-test":`fullscreen-drawer`,children:`<Drawer
  fullscreen
  title="Drawer title"
  triggerAttributes={{
    text: 'Open drawer',
  }}
>
  <P top>Some informational content</P>
  <P top>
    Elementum eu suspendisse sit platea elit porttitor magna laoreet ad
    ultrices tempus urna curae parturient conubia quisque viverra eget
    vestibulum neque pulvinar semper vulputate id dis varius pellentesque
    nunc egestas risus amet
  </P>
</Drawer>
`}),u=()=>{},d=()=>(0,r.jsx)(t,{"data-visual-test":`full-drawer`,scope:{handleBack:u},children:`<Drawer title="Custom title">
  <Drawer.Navigation>
    <Breadcrumb onClick={handleBack} />
  </Drawer.Navigation>
  <Drawer.Header>
    <P bottom>This is a lorem ipsum dolor</P>
    <Button bottom size="large">
      Lorem ipsum
    </Button>
    <Button bottom size="large" variant="secondary">
      Dolor sit
    </Button>
    <FormStatus state="information">
      This is a lorem ipsum dolor
    </FormStatus>
    <Tabs
      id="unique-linked-id"
      data={[
        {
          title: 'One',
          key: 'one',
        },
        {
          title: 'Two',
          key: 'two',
        },
      ]}
    />
  </Drawer.Header>
  <Drawer.Body>
    <Tabs.Content id="unique-linked-id" key="contentKey">
      {({ title }) => {
        return (
          <>
            <H2>{title}</H2>
            <P top>This is a left aligned Drawer content.</P>
            <P top>
              Elementum eu suspendisse sit platea elit porttitor magna
              laoreet ad ultrices tempus urna curae parturient conubia
              quisque viverra eget vestibulum neque pulvinar semper
              vulputate id dis varius pellentesque nunc egestas risus amet
              mus aptent luctus imperdiet netus natoque cubilia mattis
              nostra proin ornare scelerisque sodales faucibus placerat sem
              bibendum pretium rutrum vitae sociis ligula inceptos morbi
              quam mi sed pharetra fermentum tortor ullamcorper ipsum
              tellus eros euismod volutpat nisl dui lectus fames suscipit
              phasellus praesent justo mollis montes velit taciti gravida
              lacus commodo senectus feugiat lorem etiam consequat
              penatibus cum hendrerit accumsan orci potenti purus nulla
            </P>
          </>
        )
      }}
    </Tabs.Content>
  </Drawer.Body>
</Drawer>
`}),f=()=>(0,r.jsx)(t,{"data-visual-test":`drawer-custom-trigger`,children:`<Drawer
  title="Drawer with custom trigger"
  triggerAttributes={{
    text: 'Custom trigger',
    variant: 'primary',
    size: 'large',
    icon: 'loupe',
    iconPosition: 'left',
  }}
>
  <Drawer.Body
    innerSpace={{
      block: 'large',
    }}
  >
    <P>Opened a Drawer with a custom trigger button!</P>
  </Drawer.Body>
</Drawer>
`}),p=()=>(0,r.jsx)(t,{"data-visual-test":`callback-drawer`,children:`<Drawer
  title="Drawer title"
  triggerAttributes={{
    text: 'Open drawer',
  }}
  hideCloseButton
>
  {/* @ts-expect-error -- strictFunctionTypes */}
  {({ close }) => (
    <>
      <Button text="Close by callback" onClick={close} />
    </>
  )}
</Drawer>
`}),m=()=>(0,r.jsx)(t,{"data-visual-test":`drawer-no-animation`,children:`<Drawer
  title="No spacing or animation"
  noAnimation
  spacing={false}
  hideCloseButton
>
  <Drawer.Body>
    <P top bottom>
      This is a lorem ipsum dolor
    </P>
    <Button bottom size="large">
      Lorem ipsum
    </Button>
    <Button bottom size="large" variant="secondary">
      Dolor sit
    </Button>
    <FormStatus state="information">
      This is a lorem ipsum dolor
    </FormStatus>
  </Drawer.Body>
</Drawer>
`}),h=()=>(0,r.jsx)(t,{"data-visual-test":`drawer-scroll-view`,noInline:!0,children:`const DrawerMock = () => {
  const scrollRef = useRef(null)
  const ref = useRef(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const message = errorMessage
    ? errorMessage
    : 'Yes, the "dnb-scroll-view" is used!'
  return (
    <Drawer
      contentRef={ref}
      scrollRef={scrollRef}
      onOpen={() => {
        const innerOverflowY = window.getComputedStyle(
          ref.current
        ).overflowY
        const contentElem = scrollRef.current.querySelector(
          '.dnb-drawer__content'
        )
        const contentOverflowY =
          window.getComputedStyle(contentElem)?.overflowY
        const scrollOverflowY = window.getComputedStyle(
          scrollRef.current
        ).overflowY
        if (contentOverflowY !== 'visible') {
          setErrorMessage(
            \`.dnb-drawer__content was "\${contentOverflowY}" and not "visible"\`
          )
        } else if (innerOverflowY !== 'visible') {
          setErrorMessage(
            \`.dnb-drawer__inner was "\${innerOverflowY}" and not "visible"\`
          )
        } else if (scrollOverflowY !== 'auto') {
          setErrorMessage('.dnb-scroll-view was not "auto"')
        }
      }}
    >
      <Drawer.Body>
        <div
          style={{
            height: '100rem',
          }}
        >
          <div className="drawer-scroll-view">
            <P size="x-large">{message}</P>
          </div>
        </div>
      </Drawer.Body>
    </Drawer>
  )
}
render(<DrawerMock />)
`}),g=()=>(0,r.jsx)(t,{"data-visual-test":`update-navigation-header-example`,noInline:!0,children:`const MockComponent = () => {
  const [showMe, setShowMe] = useState(false)
  const scrollRef = useRef(null)
  return (
    <Drawer
      title="Drawer title"
      scrollRef={scrollRef}
      onOpen={() => {
        setShowMe(!showMe)
        scrollRef.current.scrollTop = 50
      }}
    >
      <Drawer.Navigation>
        {showMe ? (
          <>
            <P bottom>This is a lorem ipsum dolor</P>
            <P bottom>This is a lorem ipsum dolor</P>
            <P bottom>This is a lorem ipsum dolor</P>
            <P bottom>This is a lorem ipsum dolor</P>
          </>
        ) : null}
      </Drawer.Navigation>
      <Drawer.Header>
        <P bottom>This is a lorem ipsum dolor</P>
        <Button bottom size="large">
          Lorem ipsum
        </Button>
        <Button bottom size="large" variant="secondary">
          Dolor sit
        </Button>
        <FormStatus state="information">
          This is a lorem ipsum dolor
        </FormStatus>
        <Tabs
          id="unique-linked-id-x"
          data={[
            {
              title: 'One',
              key: 'one',
            },
            {
              title: 'Two',
              key: 'two',
            },
          ]}
        />
      </Drawer.Header>
      <Drawer.Body>
        <Tabs.Content id="unique-linked-id-x" key="contentKey0">
          {({ title }) => {
            return (
              <>
                <H2>{title}</H2>

                <P top>This is a left aligned Drawer content.</P>
                <P top>
                  Elementum eu suspendisse sit platea elit porttitor magna
                  laoreet ad ultrices tempus urna curae parturient conubia
                  quisque viverra eget vestibulum neque pulvinar semper
                  vulputate id dis
                </P>
                <P top>
                  Elementum eu suspendisse sit platea elit porttitor magna
                  laoreet ad ultrices tempus urna curae parturient conubia
                  quisque viverra eget vestibulum neque pulvinar semper
                  vulputate id dis
                </P>
                <P top>
                  Elementum eu suspendisse sit platea elit porttitor magna
                  laoreet ad ultrices tempus urna curae parturient conubia
                  quisque viverra eget vestibulum neque pulvinar semper
                  vulputate id dis
                </P>
              </>
            )
          }}
        </Tabs.Content>
      </Drawer.Body>
    </Drawer>
  )
}
render(<MockComponent />)
`});function _(e){let t={h2:`h2`,h3:`h3`,...n(),...e.components},{VisibleWhenVisualTest:u}=t;return u||y(`VisibleWhenVisualTest`,!0),(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(t.h2,{children:`Demos`}),`
`,(0,r.jsx)(t.h3,{children:`Basic Drawer`}),`
`,(0,r.jsx)(i,{}),`
`,(0,r.jsx)(t.h3,{children:`Basic Drawer left placement`}),`
`,(0,r.jsx)(o,{}),`
`,(0,r.jsx)(t.h3,{children:`Basic Drawer in fullscreen`}),`
`,(0,r.jsx)(l,{}),`
`,(0,r.jsx)(t.h3,{children:`Drawer with custom content`}),`
`,(0,r.jsx)(d,{}),`
`,(0,r.jsx)(t.h3,{children:`Customize trigger button`}),`
`,(0,r.jsx)(f,{}),`
`,(0,r.jsx)(t.h3,{children:`Close Drawer by callback method`}),`
`,(0,r.jsx)(p,{}),`
`,(0,r.jsx)(t.h3,{children:`Remove animation and spacing`}),`
`,(0,r.jsx)(m,{}),`
`,(0,r.jsxs)(u,{children:[(0,r.jsx)(h,{}),(0,r.jsx)(s,{}),(0,r.jsx)(c,{}),(0,r.jsx)(a,{}),(0,r.jsx)(g,{})]})]})}function v(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(_,{...e})}):_(e)}function y(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{v as default};