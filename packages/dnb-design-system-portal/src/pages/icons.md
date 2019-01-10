---
header: 'Icons Library'
title: 'Icons Introduction'
draft: false
order: 1
---

import Img from 'Tags/Img'
import IconNearestNeighbour from 'Pages/quickguide-designer/assets/icon-nearest-neighbour.svg'

# Icons

At DNB we are currently using Streamline icons as our source for off-the-shelf vector icons.

Link: https://www.streamlineicons.com/

#### Using Icons

The icons are in SVG format and are optimized for performance and to have the smallest footprint possible in the package build process.

The sources are located in the [assets folder](https://unpkg.com/dnb-ui-lib@latest/assets/icons/).

They also exists as [React Components](/uilib/components/icon) to be easily integrated, without need of an additional SVG file loader.

#### Sizing

Eufemia icons come in **two** sizes:

- **Default Size** 16px with 1.5px stroke weight
- **Medium Size** 24px with 1.5px stroke weight

The reason why there are two sizes, is mainly do to the SVG artifact, that the Icons, alongside with the strokes, will scale up, once we use them with a larger width and height.

#### Spacing

Icons should have a minimum area of 8px between them and their nearest neighbor.

<div class="image-box">
  <Img
    src={IconNearestNeighbour}
    caption="Icons with nearest neighbour 8px distance"
    alt="Icon's nearest neighbour"
    height="136"
  />
</div>

#### Custom Icons

Streamline caters for pretty much all of Eufemia's icon needs. However, sometimes there is a need for a custom icon. In these cases please contact one of Eufemia's design leads.
