"use strict";(self.webpackChunkdnb_design_system_portal=self.webpackChunkdnb_design_system_portal||[]).push([[30290],{28332:function(n,e,o){o.r(e);var i=o(52322),t=o(45392),c=o(69100);function l(n){const e=Object.assign({h2:"h2",h3:"h3",strong:"strong",code:"code",p:"p"},(0,t.ah)(),n.components);return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(e.h2,{children:"Demos"}),"\n",(0,i.jsx)(e.h3,{children:"Default and Medium-sized icons (Responsive)"}),"\n",(0,i.jsx)(c.QL,{}),"\n",(0,i.jsxs)(e.h3,{children:["Icons with border. ",(0,i.jsx)(e.strong,{children:"NB:"})," Use it with caution. It should not be used where it can confuse users with being a clickable button."]}),"\n",(0,i.jsx)(c.zA,{}),"\n",(0,i.jsxs)(e.h3,{children:["Responsive to its inherited ",(0,i.jsx)(e.code,{children:"font-size"})]}),"\n",(0,i.jsx)(c.bM,{}),"\n",(0,i.jsx)(e.h3,{children:"Icon color variations"}),"\n",(0,i.jsx)(e.p,{children:"All of these methods will output the same color"}),"\n",(0,i.jsx)(c.zo,{})]})}e.default=function(n){void 0===n&&(n={});const{wrapper:e}=Object.assign({},(0,t.ah)(),n.components);return e?(0,i.jsx)(e,Object.assign({},n,{children:(0,i.jsx)(l,n)})):l(n)}},69100:function(n,e,o){o.d(e,{QL:function(){return a},aL:function(){return h},bM:function(){return m},f7:function(){return I},ym:function(){return f},zA:function(){return u},zo:function(){return b}});o(2784);var i=o(41404),t=o(79357),c=o(46515),l=o(80495),s=o(51403),r=o(62140),d=o(52322);const a=()=>(0,d.jsx)(i.Z,{"data-visual-test":"icon-default",scope:{Bell:t.Z,BellMedium:c.Z},children:'\n<Icon icon={Bell} title="Give Icons a Title, or ..." />\n<Icon icon={BellMedium} aria-hidden />\n<Bell title="I\'m not responsive!" />\n{/* <- Not responsive! */}\n\n'}),u=()=>(0,d.jsx)(i.Z,{"data-visual-test":"icon-border",scope:{Bell:t.Z,BellMedium:c.Z},children:'<P>\n  <Icon border={true} icon={Bell} right />\n  <Icon border={true} icon={BellMedium} size="medium" right />\n  <IconPrimary border={true} icon="information" right />\n  <IconPrimary border={true} icon="information" size="medium" right />\n  <Button icon={<IconPrimary icon="add" border />} text="Button" />\n</P>\n'}),m=()=>(0,d.jsx)(i.Z,{"data-visual-test":"icon-inherit-sized",scope:{Bell:t.Z,BellMedium:c.Z},children:'<h1 className="dnb-h--xx-large">\n  h1 with auto sized <Icon icon={BellMedium} size="auto" aria-hidden />{\' \'}\n  icon\n</h1>\n'}),h=()=>(0,d.jsx)(i.Z,{"data-visual-test":"icon-medium",scope:{Bell:t.Z,BellMedium:c.Z},children:'\n<Icon icon={BellMedium} size="16" title="force default size" />\n<Icon icon={BellMedium} title="is medium anyway" />\n<Icon icon={Bell} size="medium" title="force medium size" />\n<Icon icon={Bell} size="24" title="custom size: size=24" />\n<Icon icon={Bell} width="24" height="24" title="not responsive" />\n\n'}),I=()=>(0,d.jsx)(i.Z,{"data-visual-test":"icon-alignment",scope:{Bell:t.Z,BellMedium:c.Z},noInline:!0,children:'const ColoredP = styled(P)`\n  display: inline-block;\n  background-color: yellowgreen;\n`\nconst ColoredH = styled(H2)`\n  display: inline-block;\n  margin: 0 0 0.5rem 0 !important;\n  background-color: yellowgreen;\n`\nconst ColoredIcon = styled(Icon)`\n  background-color: yellow;\n`\nrender(\n  <div className="dnb-core-style">\n    <ColoredH>\n      <ColoredIcon icon={Bell} />\n      Text\n    </ColoredH>\n    <br />\n    <ColoredP>\n      <ColoredIcon icon={Bell} />\n      Text\n    </ColoredP>\n  </div>,\n)\n'}),g=()=>(0,d.jsx)(i.Z,{"data-visual-test":"icon-all-primary",scope:{getListOfIcons:r.x,PrimaryIconsMedium:l},noInline:!0,children:'const Icons = () => (\n  <>\n    {getListOfIcons(PrimaryIconsMedium).map(({ iconName, Svg }) => {\n      return (\n        <Icon\n          title={iconName}\n          key={iconName}\n          icon={Svg}\n          size="medium"\n          right="small"\n          bottom="small"\n        />\n      )\n    })}\n  </>\n)\nrender(<Icons />)\n'}),x=()=>(0,d.jsx)(i.Z,{"data-visual-test":"icon-all-secondary",scope:{getListOfIcons:r.x,SecondaryIconsMedium:s},noInline:!0,children:'const uniqueList = {}\nconst Icons = () => (\n  <>\n    {getListOfIcons(SecondaryIconsMedium).map(({ iconName, Svg }) => {\n      if (uniqueList[iconName]) {\n        console.warn(\'The icon is already used:\', iconName, Svg)\n      }\n      uniqueList[iconName] = true\n      return (\n        <Icon\n          title={iconName}\n          key={iconName}\n          icon={Svg}\n          size="medium"\n          right="small"\n          bottom="small"\n        />\n      )\n    })}\n  </>\n)\nrender(<Icons />)\n'}),b=()=>(0,d.jsx)(i.Z,{"data-visual-test":"icon-colors",scope:{BellMedium:c.Z},children:'\n<Icon\n  icon={BellMedium}\n  color="var(--color-fire-red)"\n  title="CSS variable"\n/>\n<Icon icon={BellMedium} color="#DC2A2A" title="Hex" />\n<Icon icon={BellMedium} color="rgb(220,42,42)" title="RGB" />\n\n'});function f(){return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(g,{}),(0,d.jsx)(x,{})]})}}}]);
//# sourceMappingURL=component---src-docs-uilib-components-icon-demos-mdx-e9e4246c1c7144299b52.js.map