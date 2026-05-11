---
title: 'Fonts & Typography'
version: 11.2.2
generatedAt: 2026-05-11T08:17:53.844Z
checksum: 090b7d977ba4be5e2c4c04d199a30a4048416c59f443a56985df2f80629d9c40
---

# Fonts & Typography


## In general

The default font for all web applications is the `DNB` font.

### Download DNB font family

You can download the [DNB font files as a ZIP package](https://github.com/dnbexperience/eufemia/raw/refs/heads/main/packages/dnb-eufemia/assets/fonts/dnb/DNB.zip). **Last update: November 8, 2020.**

If you get access to the Figma **Eufemia Web** main file, then you don't need to install the DNB font. Figma will provide the font automatically for you inside Figma. If you use other designer tools, make sure it is installed on your system so you can use the design resources.

## Typographic scale

The Eufemia typographic scale is as follows:

_16px, 18px, 20px, 26px, 34px, 48px_





## In general

Sbanken has two fonts in its profile; Roboto and Maison Neue. The latter is used mainly for headlines,
Roboto for everything else.

You can download these fonts from the <a href="https://bc.dnb.no/brandcenter/no/sbanken/typografi">Brand Center</a>.

## Typographic scale

The Eufemia typographic scale for Sbanken is as follows:

_12px, 14px, 16px, 20px, 26px, 34px, 48px_



**NB!** we use `rem` for setting the size in code **not** pixels.

Line-heights vary depending on context but adhere to the Eufemia space units (multiples of 8 including halves (4px)).

## Typographic styling

Refer to the Figma style guides for styling typography with color.

## Margins & Padding

Blocks of text (headings and body etc.) do not have TOP, RIGHT, BOTTOM or LEFT margins by default. This is usually set by the containing element and based on context. However, there is a helper class to enable the "default" spacing:

```html
<div class="dnb-spacing">
  <h1 class="dnb-h--xx-large">...</h1>
  <p class="dnb-p">...</p>
</div>
```

The reason for this is to provide an out-of-the-box style which looks good before any customizing is applied.

Make sure to stick to the Eufemia spacing system when adding or removing bottom margins.

Padding is also not something applied to blocks of text by default.


## Typographic elements

This is an overview of the default, basic typographic elements such as **headings**, **sub-headings**, **body text**, etc.

## Heading xx-large

### Specs:

- font-weight: DNB Medium
- font-size: 3rem (48px)
- line-height: 3.5rem (56px)
- (optional) margin-top: 3rem (48px)
- (optional) margin-bottom: 2.5rem (40px)

### Example:

<TypographyBox>
  <h1 className="dnb-h--xx-large skip-anchor">
    Quem facilisi moderatius id eam, id tamquam albucius per.
  </h1>
  <p className="dnb-p">
    Quem facilisi moderatius id eam, id tamquam albucius per. Vel quem
    congue appareat cu, mei te eros convenire. Sea bonorum epicuri ea, ei
    exerci tacimates pro, aliquam pertinacia eu vim.
  </p>
</TypographyBox>

## Heading x-large

### Specs:

- font-weight: DNB Medium
- font-size: 2.125rem (34px)
- line-height: 2.5rem (40px)
- (optional) margin-top: 3rem (48px)
- (optional) margin-bottom: 2.5rem (40px)

### Example:

<TypographyBox>
  <h4 className="dnb-h--x-large skip-anchor">
    Facilisi moderatius id eam, id tamquam albucius per. Vel quem congue
    appareat cu, mei te eros convenire
  </h4>
  <p className="dnb-p">
    Quem facilisi moderatius id eam, id tamquam albucius per. Vel quem
    congue appareat cu, mei te eros convenire. Sea bonorum epicuri ea, ei
    exerci tacimates pro, aliquam pertinacia eu vim.
  </p>
</TypographyBox>

## Heading large

### Specs:

- font-weight: DNB Medium
- font-size: 1.625rem (26px)
- line-height: 2rem (32px)
- (optional) margin-top: 3rem (48px)
- (optional) margin-bottom: 1rem (16px)

### Example:

<TypographyBox>
  <h4 className="dnb-h--large skip-anchor">
    Quem facilisi moderatius id eam, id tamquam albucius per. Vel quem
    congue appareat cu, mei te eros convenire.
  </h4>
  <p className="dnb-p">
    Quem facilisi moderatius id eam, id tamquam albucius per. Vel quem
    congue appareat cu, mei te eros convenire. Sea bonorum epicuri ea, ei
    exerci tacimates pro, aliquam pertinacia eu vim.
  </p>
</TypographyBox>

## Text lead

### Specs:

- font-weight: DNB Medium
- font-size: 1.25rem (20px)
- line-height: 1.75rem (28px)
- (optional) margin-top: 2rem (32px)
- (optional) margin-bottom: 1rem (16px)

### Example:

<TypographyBox>
  <h4 className="dnb-lead skip-anchor">
    Quem facilisi moderatius id eam, id tamquam albucius per. Vel quem
    congue appareat cu, mei te eros convenire. Sea bonorum epicuri ea, ei
    exerci tacimates pro, aliquam pertinacia eu vim. Vix ei stet ornatus.
    Est mediocrem reprimique contentiones ei, mea ne primis intellegat.
    Dico purto nullam sea an.
  </h4>
  <p className="dnb-p">
    Quem facilisi moderatius id eam, id tamquam albucius per. Vel quem
    congue appareat cu, mei te eros convenire. Sea bonorum epicuri ea, ei
    exerci tacimates pro, aliquam pertinacia eu vim.
  </p>
</TypographyBox>

## Text basis (paragraph)

### Specs:

- font-weight: DNB Regular or DNB Medium
- font-size: 1.125rem (18px)
- line-height: 1.5rem (24px)
- (optional) margin-bottom: 1.5rem (24px)

### Example:

<TypographyBox>
  <p className="dnb-p">
    Quem facilisi moderatius id eam, id tamquam albucius per. Vel quem
    congue appareat cu, mei te eros convenire. Sea bonorum epicuri ea, ei
    exerci tacimates pro, aliquam pertinacia eu vim. Vix ei stet ornatus.
    Est mediocrem reprimique contentiones ei, mea ne primis intellegat.
    Dico purto nullam sea an.
  </p>
  <p className="dnb-p">
    Quem facilisi moderatius id eam, id tamquam albucius per. Vel quem
    congue appareat cu, mei te eros convenire. Sea bonorum epicuri ea, ei
    exerci tacimates pro, aliquam pertinacia eu vim.
  </p>
</TypographyBox>

## Text basis - small

### Specs:

- font-weight: DNB Regular or DNB Medium
- font-size: 1rem (16px)
- line-height: 1.25rem (20px)
- (optional) margin-bottom: 1.5rem (24px)

### Note:

There are two methods to create small text. One, is to use the `.dnb-t__size--small` modifier class. The other method is to just use a `<small>` tag.

### Example

<TypographyBox>
  <p className="dnb-p dnb-t__size--small">
    This is a paragraph with a <b>modifier class</b> `.dnb-t__size--small`.
    This is the small content. Quem facilisi moderatius id eam, id tamquam
    albucius per. Vel quem congue appareat cu, mei te eros convenire. Sea
    bonorum epicuri ea, ei exerci tacimates pro, aliquam pertinacia eu vim.
  </p>
  <p className="dnb-p">
    <small>
      This is a paragraph with a <b>small tag</b> inserted here: this is
      the small content. Quem facilisi moderatius id eam, id tamquam
      albucius per. Vel quem congue appareat cu, mei te eros convenire. Sea
      bonorum epicuri ea, ei exerci tacimates pro, aliquam pertinacia eu
      vim.
    </small>
  </p>
</TypographyBox>


## Font Weights

Achieved with HTML classes: `.dnb-t__weight--regular`,`.dnb-t__weight--medium` or `.dnb-t__weight--bold`.

The old classes, `.dnb-typo-regular`, `.dnb-typo-medium` and `.dnb-typo-bold`, still work, but will also set font-family and font-style.

### Body Regular

**NB!** body text is automatically set to use **regular** weight so there is
no need to use a class.

<TypographyBox>
  <p className="dnb-t__weight--regular">
    Here is a paragraph with some nonsense lipsum text. Contrary to popular
    belief, Lorem Ipsum passage, and going through the cites of the word in
    classical literature, discovered the undoubtable source. Lorem Ipsum
    comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et
    Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC.
  </p>
</TypographyBox>

### Body Medium

<TypographyBox>
  <p className="dnb-t__weight--medium">
    Here is a paragraph with some nonsense lipsum text. Contrary to popular
    belief, Lorem Ipsum passage, and going through the cites of the word in
    classical literature, discovered the undoubtable source. Lorem Ipsum
    comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et
    Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC.
  </p>
</TypographyBox>

### Body Bold

**NB!** bold is generally not used, use medium, unless there is a specific unique use case.

<TypographyBox>
  <p className="dnb-t__weight--bold">
    Here is a paragraph with some nonsense lipsum text. Contrary to popular
    belief, Lorem Ipsum passage, and going through the cites of the word in
    classical literature, discovered the undoubtable source. Lorem Ipsum
    comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et
    Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC.
  </p>
</TypographyBox>


## Line height and the baseline grid

The following examples show how different line heights look and behave (whether they sit on the 8px grid or not) for a default paragraph of 16px (1rem).

When line heights are multiples of 8px (0.5rem), they will cause the content block to break on the base grid. If smaller space units are used to set line height such as 4px (0.25rem), the content block will break alternatively on and halfway between the base grid.

### These break _*neatly*_ on the grid (line heights 1rem, 1.5rem and 2rem)

Because their line-height **is** evenly divisible by 8.


### Line height = 1rem (16px)

<TypographyBox>
  <p className="dnb-p lh-16">
    Quem facilisi moderatius id eam, id tamquam albucius per. Vel quem
    congue appareat cu, mei te eros convenire. Sea bonorum epicuri ea, ei
    exerci tacimates pro, aliquam pertinacia eu vim. Vix ei stet ornatus.
    Est mediocrem reprimique contentiones ei, mea ne primis intellegat.
    Dico purto nullam sea an.
  </p>
</TypographyBox>

### Line height = 1.5rem (24px)

<TypographyBox>
  <p className="dnb-p lh-24">
    Quem facilisi moderatius id eam, id tamquam albucius per. Vel quem
    congue appareat cu, mei te eros convenire. Sea bonorum epicuri ea, ei
    exerci tacimates pro, aliquam pertinacia eu vim. Vix ei stet ornatus.
    Est mediocrem reprimique contentiones ei, mea ne primis intellegat.
    Dico purto nullam sea an.
  </p>
</TypographyBox>

### Line height = 2rem (32px)

<TypographyBox>
  <p className="dnb-p lh-32">
    Quem facilisi moderatius id eam, id tamquam albucius per. Vel quem
    congue appareat cu, mei te eros convenire. Sea bonorum epicuri ea, ei
    exerci tacimates pro, aliquam pertinacia eu vim. Vix ei stet ornatus.
    Est mediocrem reprimique contentiones ei, mea ne primis intellegat.
    Dico purto nullam sea an.
  </p>
</TypographyBox>

### These break alternatively on/off the grid (line heights 0.75rem, 1.25rem and 1.75rem)

Because their line-height **is not** evenly divisible by 8.
Try resizing the browser - you will see the 'off-grid' result.

### Line height = 0.75rem (12px)

<TypographyBox>
  <p className="dnb-p lh-12">
    Quem facilisi moderatius id eam, id tamquam albucius per. Vel quem
    congue appareat cu, mei te eros convenire. Sea bonorum epicuri ea, ei
    exerci tacimates pro, aliquam pertinacia eu vim. Vix ei stet ornatus.
    Est mediocrem reprimique contentiones ei, mea ne primis intellegat.
    Dico purto nullam sea an.
  </p>
</TypographyBox>

### Line height = 1.25rem (20px)

<TypographyBox>
  <p className="dnb-p lh-20">
    Quem facilisi moderatius id eam, id tamquam albucius per. Vel quem
    congue appareat cu, mei te eros convenire. Sea bonorum epicuri ea, ei
    exerci tacimates pro, aliquam pertinacia eu vim. Vix ei stet ornatus.
    Est mediocrem reprimique contentiones ei, mea ne primis intellegat.
    Dico purto nullam sea an.
  </p>
</TypographyBox>

### Line height = 1.75rem (28px)

<TypographyBox>
  <p className="dnb-p lh-28">
    Quem facilisi moderatius id eam, id tamquam albucius per. Vel quem
    congue appareat cu, mei te eros convenire. Sea bonorum epicuri ea, ei
    exerci tacimates pro, aliquam pertinacia eu vim. Vix ei stet ornatus.
    Est mediocrem reprimique contentiones ei, mea ne primis intellegat.
    Dico purto nullam sea an.
  </p>
</TypographyBox>


# Font Families



The default font family for all web applications is the `DNB` font.

## DNB Regular

<TypographyBox>
  <p className="dnb-p dnb-t__weight--regular dnb-t__family--default">
    Here is a paragraph with some nonsense lipsum text. Contrary to popular
    belief, Lorem Ipsum passage, and going through the cites of the word in
    classical literature, discovered the undoubtable source. Lorem Ipsum
    comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et
    Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC.
  </p>
</TypographyBox>

## DNB Medium

<TypographyBox>
  <p className="dnb-p dnb-t__weight--medium dnb-t__family--default">
    Here is a paragraph with some nonsense lipsum text. Contrary to popular
    belief, Lorem Ipsum passage, and going through the cites of the word in
    classical literature, discovered the undoubtable source. Lorem Ipsum
    comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et
    Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC.
  </p>
</TypographyBox>

## DNB Bold

**NB!** bold is generally not used, use medium, unless there is a specific unique use case.

<TypographyBox>
  <p className="dnb-p dnb-t__weight--bold dnb-t__family--default">
    Here is a paragraph with some nonsense lipsum text. Contrary to popular
    belief, Lorem Ipsum passage, and going through the cites of the word in
    classical literature, discovered the undoubtable source. Lorem Ipsum
    comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et
    Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC.
  </p>
</TypographyBox>

## DNBMono Regular

<TypographyBox>
  <p className="dnb-p dnb-t__weight--regular dnb-t__family--monospace">
    Here is a paragraph with some nonsense lipsum text. Contrary to popular
    belief, Lorem Ipsum passage, and going through the cites of the word in
    classical literature, discovered the undoubtable source. Lorem Ipsum
    comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et
    Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC.
  </p>
</TypographyBox>




The default font family for all web applications is `Roboto`; however, for headlines and some other items, we use `Maison Neue`.

### Maison Neue

<TypographyBox>
  <p className="dnb-p dnb-t__size--large dnb-t__line-height--large dnb-t__family--heading">
    This is a paragraph using the headline font Maison Neue.
  </p>
</TypographyBox>

### Roboto Regular

<TypographyBox>
  <p className="dnb-p dnb-t__weight--regular dnb-t__family--default">
    Here is a paragraph with some nonsense lipsum text. Contrary to popular
    belief, Lorem Ipsum passage, and going through the cites of the word in
    classical literature, discovered the undoubtable source. Lorem Ipsum
    comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et
    Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC.
  </p>
</TypographyBox>

### Roboto Medium

<TypographyBox>
  <p className="dnb-p dnb-t__weight--medium dnb-t__family--default">
    Here is a paragraph with some nonsense lipsum text. Contrary to popular
    belief, Lorem Ipsum passage, and going through the cites of the word in
    classical literature, discovered the undoubtable source. Lorem Ipsum
    comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et
    Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC.
  </p>
</TypographyBox>

### Roboto Bold

**NB!** bold is generally not used, use medium, unless there is a specific unique use case.

<TypographyBox>
  <p className="dnb-p dnb-t__weight--bold dnb-t__family--default">
    Here is a paragraph with some nonsense lipsum text. Contrary to popular
    belief, Lorem Ipsum passage, and going through the cites of the word in
    classical literature, discovered the undoubtable source. Lorem Ipsum
    comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et
    Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC.
  </p>
</TypographyBox>
