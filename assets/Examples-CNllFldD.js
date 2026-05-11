import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{n as t,r as n}from"./ListAllIcons-DPKpLdWt.js";import{t as r}from"./ComponentBox-xW2kV1s2.js";import{si as i,ti as a,yi as o}from"./index-DVm0MbGb.js";var s=e(),c=()=>(0,s.jsx)(r,{"data-visual-test":`icon-default`,scope:{Bell:o,BellMedium:i},children:`
<Icon icon={Bell} title="Give Icons a Title, or ..." />
<Icon icon={BellMedium} aria-hidden />
<Bell title="I'm not responsive!" />
{/* <- Not responsive! */}

`}),l=()=>(0,s.jsx)(r,{"data-visual-test":`icon-border`,scope:{Bell:o,BellMedium:i},children:`<P>
  <Icon border={true} icon={Bell} right />
  <Icon border={true} icon={BellMedium} size="medium" right />
  <IconPrimary border={true} icon="information" right />
  <IconPrimary border={true} icon="information" size="medium" right />
  <Button icon={<IconPrimary icon="add" border />} text="Button" />
</P>
`}),u=()=>(0,s.jsx)(r,{"data-visual-test":`icon-inherit-sized`,scope:{Bell:o,BellMedium:i},children:`<h1 className="dnb-h--xx-large">
  h1 with auto sized <Icon icon={BellMedium} size="auto" aria-hidden />{' '}
  icon
</h1>
`}),d=()=>(0,s.jsx)(r,{"data-visual-test":`icon-medium`,scope:{Bell:o,BellMedium:i},children:`
<Icon icon={BellMedium} size="16" title="force default size" />
<Icon icon={BellMedium} title="is medium anyway" />
<Icon icon={Bell} size="medium" title="force medium size" />
<Icon icon={Bell} size="24" title="custom size: size=24" />
<Icon icon={Bell} width="24" height="24" title="not responsive" />

`}),f=()=>(0,s.jsx)(r,{"data-visual-test":`icon-alignment`,scope:{Bell:o,BellMedium:i},noInline:!0,children:`const ColoredP = styled(P)\`
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
`}),p=()=>(0,s.jsx)(r,{"data-visual-test":`icon-all-primary`,scope:{getListOfIcons:t,PrimaryIconsMedium:a},noInline:!0,children:`const Icons = () => (
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
`}),m=()=>(0,s.jsx)(r,{"data-visual-test":`icon-all-secondary`,scope:{getListOfIcons:t,SecondaryIconsMedium:n},noInline:!0,children:`const uniqueList = {}
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
`}),h=()=>(0,s.jsx)(r,{"data-visual-test":`icon-colors`,scope:{BellMedium:i},children:`
<Icon
  icon={BellMedium}
  color="var(--color-fire-red)"
  title="CSS variable"
/>
<Icon icon={BellMedium} color="#DC2A2A" title="Hex" />
<Icon icon={BellMedium} color="rgb(220,42,42)" title="RGB" />

`}),g=()=>(0,s.jsx)(r,{"data-visual-test":`icon-sizes`,scope:{BellMedium:i},children:`
<Icon icon={BellMedium} title="Beach" size="large" />
<Icon icon={BellMedium} title="Beach" size="x-large" />
<Icon icon={BellMedium} title="Beach" size="xx-large" />

`});function _(){return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(p,{}),(0,s.jsx)(m,{})]})}export{c as a,g as c,h as i,f as n,u as o,l as r,d as s,_ as t};