---
title: 'License'
version: 11.2.2
generatedAt: 2026-05-11T08:17:53.840Z
checksum: 090b7d977ba4be5e2c4c04d199a30a4048416c59f443a56985df2f80629d9c40
---

# License

export const License = (props) => {
  return (
    <P
      {...props}
      dangerouslySetInnerHTML={{
        __html: license?.replace(/\n|\r/g, '<br />'),
      }}
    />
  )
}

<Logo top="x-large" height="100" />

# Eufemia Design System License

---

<License top="large" bottom="xx-large" />
