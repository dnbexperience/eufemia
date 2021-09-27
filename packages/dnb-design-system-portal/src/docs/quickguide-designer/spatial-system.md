---
title: 'Spatial system'
icon: 'special'
---

import InlineImg from 'Tags/Img'

import TypeAndLayoutSvg from 'Pages/quickguide-designer/assets/type-and-layout.svg'
import PaddingExampleSvg from 'Pages/quickguide-designer/assets/padding-example.svg'
import MarginExampleSvg from 'Pages/quickguide-designer/assets/margin-example.svg'
import BordersAndLinesSvg from 'Pages/quickguide-designer/assets/borders-lines.svg'
import LineHeightSvg from 'Pages/quickguide-designer/assets/line-height.svg'
import DesignersIntentionsSvg from 'Pages/quickguide-designer/assets/designers-intentions.svg'
import MultipleMarginsSvg from 'Pages/quickguide-designer/assets/multiple-margins.svg'
import PaddingButtonsSvg from 'Pages/quickguide-designer/assets/padding-buttons.svg'
import ZindexSvg from 'Pages/quickguide-designer/assets/zindex.svg'
import ExtentsSvg from 'Pages/quickguide-designer/assets/extents.svg'
import SpaceWithinSvg from 'Pages/quickguide-designer/assets/space-within.svg'
import TypeOnGridSvg from 'Pages/quickguide-designer/assets/type-on-grid.svg'
import SpaceBlocksSvg from 'Pages/quickguide-designer/assets/space-blocks.svg'
import DiscrepanciesSvg from 'Pages/quickguide-designer/assets/discrepancies.svg'
import StandardSpacingBlocks from 'Pages/quickguide-designer/assets/standard-spacing-blocks.svg'

# Spatial system

## About

The Eufemia Design System uses a simple 8 pixel spatial system for both layout and typography.
The reason for this is because many device and digital metrics are divisible by 8. For example, many popular browsers set their default body font-size to 16px and many screen sizes are also divisible by 8.
The 8 pixel base grid unit has been adopted by many well known design systems such as Google's Material Design.

Ultimately the best reason for adopting 8 as a base number is because we can apply it perfectly to both type and layout.
It is simple and consistent whilst allowing for some design freedom.

**NB!** All unitless measurements in the following illustrations are multiples of 8px (for example: x2 means two 8px units)

<InlineImg src={TypeAndLayoutSvg} caption="Label with line height 16 aligning with dropdown of 32px high, padding left and right 16px and an icon sized 16x16" alt="My alt" />

### Line-height % Grid base unit = 0

A general rule for getting type to sit precisely on the 8px grid is to make sure that line heights are divisible by 8

### Don't make me think - Make everything out of 8's

Applying the 8px base system to as much as possible within UI design means that design decisions can be made easier. margins, paddings, empty space, widths and heights can all be made with multiples of 8.

### Exceptions

Sometimes 8 is not small enough or too big. Line thicknesses and borders are usually 1-2px in thickness. When we encounter situations where lines may 'throw' the layout off the grid, we can compensate by removing these line thicknesses from the padding or margin of the neighbouring element.

<InlineImg src={BordersAndLinesSvg} caption="Removing border thickness from padding" alt="Removing border thickness from padding" />

### Calculating line thickness v. the 8px grid

A single pixel equates to about 0.0625em ( 1/16 ), therefore if an element has padding of 1em (~16px) and a border of thickness 1px, we remove the border thickness from the padding:

Border = 0.0625em
Padding = 1em - 0.0625em = 0.9375em

For a 2px thick border we set the padding to be:

Padding = 1em - 0.125em = 0.875em

The bordered element will now sit nicely on the baseline grid.

In typography, a similar effect is seen when the line height of a text style is not evenly divisible by 8. For example, body text (paragraph), is set at 16px and it's line height is set at 24px.

In this case **line-height / 8** is equal to 3 (24 / 8 = 3)

### Horizontal lines and divider Lines

The same process should be applied in dealing with divider lines.
Horizontal rules and other dividing mechanisms usually have some margin or padding around them. Remove the lines thickness from the padding or margin (above or below), to maintain the baseline grid.

<InlineImg src={LineHeightSvg} caption="Line heights divisible by 8 sit on the grid (left side)" alt="Line heights and the grid" />

## Why do we need a spatial system?

Space affects consistency, usability, readability and ultimately user experience.

A good spatial system takes some of the guesswork out of layout decisions for designers and developers. It also makes it's easier for others to understand the intentions of the designer when viewing design files.

In the example below, a viewer informed of the spatial system could easily assume that the colored line thicknesses are 8px, 16px and 24px respectively and not 'odd' numbers like 7, 13 and 25.
<InlineImg src={DesignersIntentionsSvg} caption="Three padding thicknesses easily assumed to be 8, 16 and 24px" alt="Image showing three padding thicknesses" />

<InlineImg src={MultipleMarginsSvg} caption="Vertical and horizontal margins based on the 8px grid" alt="Image showing Vertical and horizontal margins" />

## Principles

1.  Be consistent - use the spatial system for both layout and typography
2.  Keep it simple - avoid adding more block sizes or 'in-between' sizes
3.  Abstract the spacing - set spacing rules at an abstract level to allow for scalability and future changes across whole systems

## Where the spacing system is applied:

1.  margins
2.  padding
3.  z-index
4.  extents (wide display empty space)
5.  space within elements
6.  typography - margins and line-height (problems of cap-height and baseline )

### 1. Margins

Margin refers to the space **outside or around** an object.
Use margins to create space between elements. Objects which allow interaction by touch should have enough margin around them that users don't accidentally hit the wrong object. Small margins can be used to indicate relationship between objects, large margins to indicate otherwise (Link to Gestalt principles of proximity (https://www.interaction-design.org/literature/topics/gestalt-principles)).

Set margins based on one or more spatial blocks.
margins do not have to be equal on all sides of and object. Margins between related objects can be reduced to position closer together.

<InlineImg src={MarginExampleSvg} caption="Margin - highlighted in yellow" alt="Margin example" />

### 2. Padding

Padding refers to the space **within** an object.

<InlineImg src={PaddingExampleSvg} caption="Padding - highlighted in magenta" alt="Padding example" />

Padding can be used to 'inflate' an objects bounding or 'hit area' or make it larger without scaling it's internal parts.

<InlineImg src={PaddingButtonsSvg} caption="Padding used to increase the appearance of a button" alt="Padding in buttons" />

### 3. Z-index

Z-index spacing refers to space along the z-axis of an interface. It is not used much, except when styling shadows perhaps indicating that an object moves closer/further from/to the user. The shadow's blur, color and offset combine to give the illusion of the object being 'above' the rest of the elements on the UI.

In the example below the shadow on the left is used for modal windows whereas the shadow on the right is used for open elements and components such as date pickers and dropdowns.

<InlineImg src={ZindexSvg} caption="Shadows used to illustrate space below an object" alt="Shadows" />

### 4. Extents

Extents refers to the amount of space available on displays and how much of it the content should take up. Ideal line length at default text-size (16px) is about 11-12 words. On large displays this can create vast areas of white space on the sides while still requiring the user to scroll. Use breakpoints to decide if multiple columns of content is a better way to present the content.

<InlineImg src={ExtentsSvg} caption="Making use of the horizontal space" alt="Extents" />

### 5. Space within elements

This relates to the amount of inner space an objects has. It has similarities to padding but also deals with small intricate cavities especially in graphic elements such as icons. When icons are resized down they sometimes loose some of their details and legibility.

<InlineImg src={SpaceWithinSvg} caption="Space within objects - highlighted here by the checkerboard" alt="Space within objects" />

### 6. Typography

Typographic rules are intrinsically linked to the spatial system.

Typographic elements have a kind of internal space and an external one. Their line heights create space above and below (between the lines). Adding margins to blocks of text creates further space them.

Eufemia typographic rules are built on the same units of measurement (multiples of 8), however, aligning type to the baseline grid is not as straightforward as setting font sizes to multiples of 8.

The Eufemia type scale should be limited to **12px, 14px, 16px, 18px, 24px, 32px**. Larger sizes can be used but must follow the sizing and spacing rules.

<InlineImg src={TypeOnGridSvg} caption="Type elements aligning to the grid" alt="Type elements aligning to the grid" />

For those familiar with CSS, we establish typographic rules in the following way:

1.  Set a body size for the interface. The default size for a browser is 100%

    `html { font-size: 100%; }`

    This will set the default size for paragraph text to **16px**

2.  Set font styles on paragraphs, headers, buttons etc. (basically everything) in the following manner:

    - font sizes should be set with **em**
    - line-heights should be set with **rem**
    - margin-**bottom** should be set with **rem**

    Use a calculator to calculate the **rem** and **em**.
    Alternatively, refer to these test pages which show various font sizes embedded in various body font sizes.
    Here is a good one: http://pxtoem.com/

<!--

### How we space things

Padding and vertical margins : .......

So, how do we establish a system for ALL probable combinations of elements in a GUI?

Answer: We provide a set of spacing units and a **guide** for how the spacing should be applied.

The spatial system doesn’t care what elements are in the design guide. It doesn’t care how they look or feel.

Rules dictate which slugs are placed adjacent to which blocks.
-->

## Eufemia Spatial System ≠ A Grid System

A spatial system and grid system are two different things. A grid is a component which _uses_ space.
The Eufemia Spatial System is a very simple set of ’space-blocks’ than _create_ space - akin to the leading slugs in a typesetters frame.

<InlineImg src={SpaceBlocksSvg} caption="Space blocks separating objects" alt="Space blocks" />

A _grid system_ is typically a more elaborate set of containers which divide the UI into sections with margins and gutters between them. Eufemia's spatial system is a simple guide for space and type set around the 8px base unit.

### Keep it simple

In order for a spatial system to be adopted it needs to be very simple.
Deviations from the simple but strict rules should be allowed for edge cases but avoided if the aim to to maintain consistency.

### Process

By relating our base grid for elements and components to the typographic sizing system, we can maintain visual consistency between type and layout.

**Designers:**

Set up an 8px x 8px underlay for all interface design work.
When positioning elements, have them 'snap' to this underlay.

Use _'space blocks'_ to add margins and paddings to elements, components and the UI white space.

**Developers:**

If the designer has laid out the UI correctly in Figma, there should be no _'off sizes'_ - strange uneven numbers that are almost a multiple of 8 but not quite.

It is always good practice to cross check it with the design before releasing.

If there are issues maintaining the spatial system when components are coded, then inform the designer so that a suitable solution is found.

### Design Software View Vs. Browser View

When designing with type, there may sometimes be small discrepancies between the design file view and the coded in-browser view.

In order to see how type is rendered in the browser and view the space it uses, toggle the grid view in the top right of this document.

<InlineImg src={DiscrepanciesSvg} caption="Slight discrepancies between design tool and browser rendering" alt="Discrepancies between design tool and browser" />

In the image above the heading with the blue background is how Figma shows the space the the heading uses. The heading with the yellow background is how the browser (Chrome) renders and shows the space taken up. Note the space above the first letter 'T'. In Figma this is 2 pixels whereas in Chrome it is 6 pixels.

## Using Eufemia's spatial system for layout

The Eufemia Figma library contains a set of standard spacing components which can be very helpful when laying out user interfaces, web pages etc.:

<InlineImg src={StandardSpacingBlocks} caption="Standard Eufemia spacing blocks" alt="Standard Eufemia spacing blocks" />

Layout design is not limited to these selected sizing blocks. If you need more space than the blocks provide simply add it in multiples of **8 pixels**, but don't stretch the components as another designer or developer may simply glance at the space component and read it's label assuming it is exactly as large it was when created.

### Examples

The [example demo apps](/uilib/getting-started/demos) shows the 8px system in practice.

<!-- import ExampleAarsoppgaveGuidesSvg from 'Pages/quickguide-designer/assets/example-aarsoppgave-guides.svg'
import ExampleAarsoppgaveSvg from 'Pages/quickguide-designer/assets/example-aarsoppgave.svg'

<InlineImg src={ExampleAarsoppgaveSvg} caption="A simple example of the 8px system in use" alt="Aarsoppgave example" />

<InlineImg src={ExampleAarsoppgaveGuidesSvg} caption="The 8px system highlighted" alt="Aarsoppgave example" /> -->
