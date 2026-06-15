---
title: 'License'
version: 11.6.1
generatedAt: 2026-06-15T12:16:59.813Z
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
