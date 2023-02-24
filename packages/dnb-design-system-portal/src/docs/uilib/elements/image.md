---
title: 'Image'
---

import {
ImagePlainExample,
ImageInvalidSourceExample,
ImageCaptionExample,
ImageSkeletonExample
} from 'Docs/uilib/elements/image/Examples'

# Image

The image element associated with the class `dnb-img` does not have much opinionated styling. It exists more to have a future possibility to optimize and add features.

As of now, the React image "element" (Img) does provide a `figure` element with the `role="img"` and an `img` tag inside. This is mainly to support the [Skeleton](/uilib/components/skeleton) provider.

```jsx
import { Img } from '@dnb/eufemia/elements'

render(<InlineImg alt="..." src="..." width="100" height="100" />)
```

## Basic image element

<ImagePlainExample />

## Image with invalid source

<ImageInvalidSourceExample />

## Image with caption

<ImageCaptionExample />

## Image element with skeleton

<ImageSkeletonExample />
