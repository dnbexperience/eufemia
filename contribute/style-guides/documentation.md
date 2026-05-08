---
title: 'Documentation'
version: 11.2.1
generatedAt: 2026-05-08T08:59:09.363Z
checksum: 090b7d977ba4be5e2c4c04d199a30a4048416c59f443a56985df2f80629d9c40
---

# Documentation

The documentation is written in enhanced Markdown, called MDX. It allows us to import other Markdown files along with React components and JavaScript logic.

## Handling themes

If you need to show some documentation only for when a certain theme is selected, you can do so:

```md


## Eiendom examples

Text

<SpecialExample />


```

### Link to a specific theme

You can add a parameter called `eufemia-theme` to a url:

```md
[Relative](/uilib/components/badge/demos/?eufemia-theme=sbanken)
Absolute: https://eufemia.dnb.no/uilib/components/badge/demos/?eufemia-theme=sbanken
```

It will change and set the currently used theme once the user visits the related page.
