import"./rolldown-runtime-BYbx6iT9.js";import{n as e,t}from"./jsx-runtime-BgMs7Gb-.js";import{n,r}from"./ListAllIcons-CHVmqiC_.js";import{t as i}from"./ComponentBox-geTEYZ7b.js";import{bi as a,ci as o,ni as s}from"./index-CMgyXmp3.js";e();var c=t(),l=()=>(0,c.jsx)(i,{"data-visual-test":`icon-default`,scope:{Bell:a,BellMedium:o},children:`
<Icon icon={Bell} title="Give Icons a Title, or ..." />
<Icon icon={BellMedium} aria-hidden />
<Bell title="I'm not responsive!" />
{/* <- Not responsive! */}

`}),u=()=>(0,c.jsx)(i,{"data-visual-test":`icon-border`,scope:{Bell:a,BellMedium:o},children:`<P>
  <Icon border={true} icon={Bell} right />
  <Icon border={true} icon={BellMedium} size="medium" right />
  <IconPrimary border={true} icon="information" right />
  <IconPrimary border={true} icon="information" size="medium" right />
  <Button icon={<IconPrimary icon="add" border />} text="Button" />
</P>
`}),d=()=>(0,c.jsx)(i,{"data-visual-test":`icon-inherit-sized`,scope:{Bell:a,BellMedium:o},children:`<h1 className="dnb-h--xx-large">
  h1 with auto sized <Icon icon={BellMedium} size="auto" aria-hidden />{' '}
  icon
</h1>
`}),f=()=>(0,c.jsx)(i,{"data-visual-test":`icon-medium`,scope:{Bell:a,BellMedium:o},children:`
<Icon icon={BellMedium} size="16" title="force default size" />
<Icon icon={BellMedium} title="is medium anyway" />
<Icon icon={Bell} size="medium" title="force medium size" />
<Icon icon={Bell} size="24" title="custom size: size=24" />
<Icon icon={Bell} width="24" height="24" title="not responsive" />

`}),p=()=>(0,c.jsx)(i,{"data-visual-test":`icon-alignment`,scope:{Bell:a,BellMedium:o},noInline:!0,children:`const ColoredP = styled(P)\`
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
`}),m=()=>(0,c.jsx)(i,{"data-visual-test":`icon-all-primary`,scope:{getListOfIcons:n,PrimaryIconsMedium:s},noInline:!0,children:`const Icons = () => (
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
`}),h=()=>(0,c.jsx)(i,{"data-visual-test":`icon-all-secondary`,scope:{getListOfIcons:n,SecondaryIconsMedium:r},noInline:!0,children:`const uniqueList = {}
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
`}),g=()=>(0,c.jsx)(i,{"data-visual-test":`icon-colors`,scope:{BellMedium:o},children:`
<Icon
  icon={BellMedium}
  color="var(--color-fire-red)"
  title="CSS variable"
/>
<Icon icon={BellMedium} color="#DC2A2A" title="Hex" />
<Icon icon={BellMedium} color="rgb(220,42,42)" title="RGB" />

`}),_=()=>(0,c.jsx)(i,{"data-visual-test":`icon-sizes`,scope:{BellMedium:o},children:`
<Icon icon={BellMedium} title="Beach" size="large" />
<Icon icon={BellMedium} title="Beach" size="x-large" />
<Icon icon={BellMedium} title="Beach" size="xx-large" />

`});function v(){return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(m,{}),(0,c.jsx)(h,{})]})}export{l as a,_ as c,g as i,p as n,d as o,u as r,f as s,v as t};