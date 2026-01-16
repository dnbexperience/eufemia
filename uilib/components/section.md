---
title: 'Section'
description: 'The Section component is a visual helper.'
metadata: https://eufemia.dnb.no/uilib/components/section/metadata.json
---

## Import

```tsx
import { Section } from '@dnb/eufemia'
```

## Description

The Section component is a visual helper. It wraps content inside a visual section banner.

## Relevant links

- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/section)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/components/section)

### Breakout / fullscreen

Under the hood, it uses a couple of tricks to achieve an infinite fullscreen size. You do not need to do anything more than you normally would with your content. The background of the Section component will extend beyond a `max-width` when enabled with the `breakout` property.

## Usage

Many of the properties support [media queries](/uilib/layout/media-queries/). This makes this component well suited to change its look based on screen sizes.

Each of these properties do support either a single value or an object containing one or more media query sizes:

```js
{
  small: false,
  medium: true,
  large: true,
}
```

- `breakout={boolean}` or e.g. `breakout={{ small: boolean }}`
- `roundedCorner={boolean}` or e.g. `roundedCorner={{ small: boolean }}`
- `outline={boolean|string}` or e.g. `outline={{ small: 'black' }}`
- `backgroundColor={string}` or e.g. `backgroundColor={{ small: 'white' }}`
- `textColor={string}` or e.g. `textColor={{ small: 'black-80' }}`
- `innerSpace={string}` or e.g. `innerSpace={{ small: { top: 'small' } }}`

### Deprecated color styles

These [color styles](/uilib/components/section/deprecated/) are deprecated and will be removed in v11 of Eufemia.

## Demos

### Default Section

```tsx
render(
  <Section>
    <P space={0}>
      Visual Section: <Anchor href="#">default</Anchor>
    </P>
  </Section>,
)
```

### Default Section with inner space

```tsx
render(
  <Section
    innerSpace={{
      top: 'large',
      bottom: 'large',
      left: 'small',
    }}
  >
    <P space={0}>
      Visual Section: <Anchor href="#">default with innerSpace</Anchor>
    </P>
  </Section>,
)
```

### Responsive inner space (padding)

Where `innerSpace` do respond on different screen sizes.

```tsx
render(
  <Section
    innerSpace={{
      small: {
        top: 'small',
        bottom: 'small',
      },
      medium: true,
      large: false,
    }}
    backgroundColor="pistachio"
    breakout={false}
  >
    <P space={0}>Responsive innerSpace</P>
  </Section>,
)
```

### Responsive appearance

Where `breakout`, `outline`, `roundedCorner`, `backgroundColor` and `dropShadow` do respond on different screen sizes.

```tsx
render(
  <Section
    breakout={{
      small: true,
      medium: false,
      large: false,
    }}
    outline={{
      medium: true,
      large: 'black',
    }}
    roundedCorner={{
      large: true,
    }}
    backgroundColor={{
      small: 'white',
      medium: 'pistachio',
      large: 'pistachio',
    }}
    dropShadow={{
      small: false,
      medium: true,
      large: true,
    }}
    innerSpace
  >
    <P space={0}>Responsive properties</P>
  </Section>,
)
```

### No breakout

```tsx
render(
  <Section breakout={false} backgroundColor="pistachio">
    <P space={0}>No breakout</P>
  </Section>,
)
```

### White Section

Will be default in v11.

```tsx
render(
  <Section
    innerSpace={{
      top: 'large',
      bottom: 'large',
    }}
    backgroundColor="white"
  >
    <P space={0}>
      Visual Section: <Anchor href="#">white</Anchor>
    </P>
  </Section>,
)
```

### Divider Section

```tsx
render(
  <Section
    innerSpace={{
      top: 'medium',
      bottom: 'medium',
    }}
    variant="divider"
  >
    <P space={0}>
      Visual Section: <Anchor href="#">divider</Anchor>
    </P>
  </Section>,
)
```

### Variant: info

```tsx
render(
  <Section
    innerSpace={{
      top: 'large',
      bottom: 'large',
    }}
    variant="info"
  >
    <P space={0}>
      Generic info section: <Anchor href="#">info</Anchor>
    </P>
  </Section>,
)
```

### Variant: error

```tsx
render(
  <Section
    innerSpace={{
      top: 'large',
      bottom: 'large',
    }}
    variant="error"
  >
    <P space={0}>
      Error section: <Anchor href="#">error</Anchor>
    </P>
  </Section>,
)
```

### Variant: warning

```tsx
render(
  <Section
    innerSpace={{
      top: 'large',
      bottom: 'large',
    }}
    variant="warning"
  >
    <P space={0}>
      Warning section: <Anchor href="#">warning</Anchor>
    </P>
  </Section>,
)
```

### Variant: success

```tsx
render(
  <Section
    innerSpace={{
      top: 'large',
      bottom: 'large',
    }}
    variant="success"
  >
    <P space={0}>
      Success section: <Anchor href="#">success</Anchor>
    </P>
  </Section>,
)
```

```tsx
render(
  <Section
    innerSpace={{
      top: 'large',
      bottom: 'large',
    }}
    backgroundColor="mint-green-12"
  >
    mint-green-12
    <div>
      <Section
        innerSpace={{
          top: 'large',
          bottom: 'large',
        }}
        backgroundColor="mint-green"
      >
        mint-green
        <div>
          <Section
            innerSpace={{
              top: 'large',
              bottom: 'large',
            }}
            textColor="white"
            backgroundColor="sea-green"
          >
            sea-green
            <div>
              <Section
                innerSpace={{
                  top: 'large',
                  bottom: 'large',
                }}
                textColor="mint-green"
                backgroundColor="emerald-green"
              >
                emerald-green
                <div>
                  <Section
                    innerSpace={{
                      top: 'large',
                      bottom: 'large',
                    }}
                    textColor="white"
                    backgroundColor="fire-red"
                  >
                    fire-red
                    <div>
                      <Section
                        innerSpace={{
                          top: 'large',
                          bottom: 'large',
                        }}
                        textColor="black-80"
                        backgroundColor="sand-yellow"
                      >
                        sand-yellow
                        <div>
                          <Section
                            innerSpace={{
                              top: 'large',
                              bottom: 'large',
                            }}
                            textColor="black-80"
                            backgroundColor="pistachio"
                          >
                            pistachio
                            <div>
                              <Section
                                innerSpace={{
                                  top: 'large',
                                  bottom: 'large',
                                }}
                                textColor="black-80"
                                backgroundColor="lavender"
                              >
                                lavender
                                <div>
                                  <Section
                                    innerSpace={{
                                      top: 'large',
                                      bottom: 'large',
                                    }}
                                    variant="divider"
                                  >
                                    divider
                                  </Section>
                                </div>
                              </Section>
                            </div>
                          </Section>
                        </div>
                      </Section>
                    </div>
                  </Section>
                </div>
              </Section>
            </div>
          </Section>
        </div>
      </Section>
    </div>
  </Section>,
)
```
