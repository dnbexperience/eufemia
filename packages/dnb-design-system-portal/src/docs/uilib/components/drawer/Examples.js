/**
 * UI lib Component Example
 *
 */

import ComponentBox from 'dnb-design-system-portal/src/shared/tags/ComponentBox'

export const SimpleDrawerExample = () => (
  <ComponentBox data-visual-test="simple-drawer">
    {
      /* jsx */ `
<Drawer 
  title="Drawer title"
  triggerAttributes={{text: "Open drawer"}}
> 
  <P top>
    Some informational content
  </P>
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
  </P>
</Drawer>    
    `
    }
  </ComponentBox>
)
export const FullDrawerExample = () => (
  <ComponentBox
    data-visual-test="full-drawer"
    scope={{ handleBack: () => {} }}
  >
    {
      /* jsx */ `
<Drawer
  title="Custom title"
  >
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
    <FormStatus state="info">This is a lorem ipsum dolor</FormStatus>
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
    <Tabs.Content id="unique-linked-id">
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
              interdum metus sollicitudin magnis libero sapien habitant non
              class ridiculus consectetur congue nec litora sociosqu
              aliquet felis in rhoncus nascetur odio ultricies nullam a
              iaculis massa nisi ante nam cras aenean erat facilisi vivamus
              ut cursus auctor arcu lobortis himenaeos dictum habitasse
              tristique mauris at blandit sagittis nibh dignissim
              condimentum per integer duis lacinia malesuada est adipiscing
              maecenas donec eleifend turpis dictumst dapibus tempor fusce
              aliquam torquent hac ac curabitur venenatis et tincidunt
              augue porta vehicula enim facilisis posuere primis molestie
              convallis diam vel fringilla dolor leo quis diam cursus massa
              sapien tristique cum senectus sed tortor natoque amet
              hendrerit ut fusce ipsum quis
            </P>
          </>
        )
      }}
    </Tabs.Content>
  </Drawer.Body>
</Drawer>
`
    }
  </ComponentBox>
)

export const DrawerCustomTriggerExample = () => (
  <ComponentBox data-visual-test="drawer-custom-trigger">
    {
      /* jsx */ `
<Drawer 
  title="Drawer with custom trigger"
  triggerAttributes={{
    text: "Custom trigger",
    variant: "primary",
    size: "large",
    icon: "loupe",
    icon_position: "left"
  }}
> 
<Drawer.Body spacing>
  <P>
    Opened a Drawer with a custom trigger button!
  </P>
  </Drawer.Body>
</Drawer>    
    `
    }
  </ComponentBox>
)

export const DrawerCallbackExample = () => (
  <ComponentBox data-visual-test="callback-drawer">
    {
      /* jsx */ `
<Drawer 
  title="Drawer title"
  triggerAttributes={{text: "Open drawer"}}
> 
  {({ close }) => (
    <>
      <Button text="Close by callback" on_click={close} />
    </>
  )}
</Drawer>    
    `
    }
  </ComponentBox>
)

export const DrawerNoAnimationNoSpacing = () => (
  <ComponentBox data-visual-test="drawer-no-animation">
    {
      /* jsx */ `
<Drawer 
  title="No spacing or animation"
  noAnimation
  spacing={false}
> 
<Drawer.Body>
    <P top bottom>This is a lorem ipsum dolor</P>
    <Button bottom size="large">
      Lorem ipsum
    </Button>
    <Button bottom size="large" variant="secondary">
      Dolor sit
    </Button>
    <FormStatus state="info">This is a lorem ipsum dolor</FormStatus>
</Drawer.Body>
</Drawer>    
    `
    }
  </ComponentBox>
)
