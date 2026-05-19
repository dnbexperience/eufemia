import{a as e}from"./rolldown-runtime-BYbx6iT9.js";import{t}from"./jsx-runtime-BgMs7Gb-.js";import{a as n,i as r,n as i,r as a}from"./ListAllIcons-BIbFW6q3.js";import{t as o}from"./ComponentBox-a4aOn231.js";import{li as s,ri as c,xi as l}from"./index-DqqByKA2.js";var u=e(t()),d=()=>(0,u.jsx)(o,{"data-visual-test":`icon-default`,scope:{Bell:l,BellMedium:s},stableName:`IconDefault`,children:`
<Icon icon={Bell} title="Give Icons a Title, or ..." />
<Icon icon={BellMedium} aria-hidden />
<Bell title="I'm not responsive!" />
{/* <- Not responsive! */}

`}),f=()=>(0,u.jsx)(o,{"data-visual-test":`icon-border`,scope:{Bell:l,BellMedium:s},stableName:`IconBorder`,children:`<Flex.Horizontal align="center">
  <Icon border={true} icon={Bell} />
  <Icon border={true} icon={BellMedium} size="medium" />
  <IconPrimary border={true} icon="information" />
  <IconPrimary border={true} icon="information" size="medium" />
  <Button icon={<IconPrimary icon="add" border />} text="Button" />
</Flex.Horizontal>
`}),p=()=>(0,u.jsx)(o,{"data-visual-test":`icon-filled`,scope:{Star:r,Heart:n},stableName:`IconFilled`,children:`<Flex.Stack>
  <Flex.Horizontal align="center">
    <Icon icon={Star} fill />
    <Icon icon={Heart} fill />
    <Avatar icon={<Icon icon={Star} fill />} size="small" />
    <Button icon={<Icon icon={Heart} fill />} />
  </Flex.Horizontal>
</Flex.Stack>
`}),m=()=>(0,u.jsx)(o,{"data-visual-test":`icon-inherit-sized`,scope:{Bell:l,BellMedium:s},stableName:`IconInheritSized`,children:`<h1 className="dnb-h--xx-large">
  h1 with auto sized <Icon icon={BellMedium} size="auto" aria-hidden />{' '}
  icon
</h1>
`}),h=()=>(0,u.jsx)(o,{"data-visual-test":`icon-medium`,scope:{Bell:l,BellMedium:s},stableName:`IconMedium`,children:`
<Icon icon={BellMedium} size="16" title="force default size" />
<Icon icon={BellMedium} title="is medium anyway" />
<Icon icon={Bell} size="medium" title="force medium size" />
<Icon icon={Bell} size="24" title="custom size: size=24" />
<Icon icon={Bell} width="24" height="24" title="not responsive" />

`}),g=()=>(0,u.jsx)(o,{"data-visual-test":`icon-alignment`,scope:{Bell:l,BellMedium:s},stableName:`IconAlignment`,noInline:!0,children:`const ColoredP = styled(P)\`
  display: inline-block;
  background-color: yellowgreen;
\`
const ColoredH = styled(H2)\`
  display: inline-block;
  margin: 0 0 0.5rem 0 !important;
  background-color: yellowgreen;
\`
const ColoredIcon = styled(Icon)\`
  background-color: yellow;
\`
render(
  <div className="dnb-core-style">
    <ColoredH>
      <ColoredIcon icon={Bell} />
      Text
    </ColoredH>
    <br />
    <ColoredP>
      <ColoredIcon icon={Bell} />
      Text
    </ColoredP>
  </div>
)
`}),_=()=>(0,u.jsx)(o,{"data-visual-test":`icon-all-primary`,scope:{getListOfIcons:i,PrimaryIconsMedium:c},stableName:`AllPrimaryIcons`,noInline:!0,children:`const Icons = () => (
  <>
    {getListOfIcons(PrimaryIconsMedium).map(({ iconName, Svg }) => {
      return (
        <Icon
          title={iconName}
          key={iconName}
          icon={Svg}
          size="medium"
          right="small"
          bottom="small"
        />
      )
    })}
  </>
)
render(<Icons />)
`}),v=()=>(0,u.jsx)(o,{"data-visual-test":`icon-all-secondary`,scope:{getListOfIcons:i,SecondaryIconsMedium:a},stableName:`AllSecondaryIcons`,noInline:!0,children:`const uniqueList = {}
const Icons = () => (
  <>
    {getListOfIcons(SecondaryIconsMedium).map(({ iconName, Svg }) => {
      if (uniqueList[iconName]) {
        console.warn('The icon is already used:', iconName, Svg)
      }
      uniqueList[iconName] = true
      return (
        <Icon
          title={iconName}
          key={iconName}
          icon={Svg}
          size="medium"
          right="small"
          bottom="small"
        />
      )
    })}
  </>
)
render(<Icons />)
`}),y=()=>(0,u.jsx)(o,{"data-visual-test":`icon-colors`,scope:{BellMedium:s},stableName:`IconColors`,children:`
<Icon
  icon={BellMedium}
  color="var(--color-fire-red)"
  title="CSS variable"
/>
<Icon icon={BellMedium} color="#DC2A2A" title="Hex" />
<Icon icon={BellMedium} color="rgb(220,42,42)" title="RGB" />

`}),b=()=>(0,u.jsx)(o,{"data-visual-test":`icon-sizes`,scope:{BellMedium:s},stableName:`IconsSizes`,children:`
<Icon icon={BellMedium} title="Beach" size="large" />
<Icon icon={BellMedium} title="Beach" size="x-large" />
<Icon icon={BellMedium} title="Beach" size="xx-large" />

`});function x(){return(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(_,{}),(0,u.jsx)(v,{})]})}export{d as a,h as c,y as i,b as l,g as n,p as o,f as r,m as s,x as t};