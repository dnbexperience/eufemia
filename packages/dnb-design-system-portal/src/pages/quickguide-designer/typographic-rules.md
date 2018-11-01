---
draft: true
---

The default font for all web applications is Fedra Sans Standard. Fallback fonts (for when Fedra does not load or is not supported), are:

### Typographic scale

The DNB typographic scale is as follows:

14, 16, 20, 24, 48

Line-heights vary depending on context but adhere to the DNB space units (multiples of 8 including halves (4px)).

### Typographic styles

Refer to the Figma style guide for styling typography.

### Margins & Padding

Blocks of text (headings and body etc.) do not have TOP, LEFT or RIGHT margins by default. This is usually set by the containing element and based on context. However, they do have a default BOTTOM margin of 1rem ( 16px ). This can be adjusted depending on context.

The reason for this is to provide an out-of-the-box style which looks good before any customising is applied.

Make sure to stick to the Eufemia spacing system when adding or removing bottom margins.

Padding is also NOT something applied to blocks of text by default.

<div class="gridbox">
This is a gridbox
</div>

### Typographic rules

The following are the default typographic rules for basic typographic elements such as headings and body text.

The examples below are shown with a paragraph below each example to illustrate the default margin below the typographic element.

# H1 heading with a default 1rem (16px) margin bottom (2 grid boxes)

Quem facilisi moderatius id eam, id tamquam albucius per. Vel quem congue appareat cu, mei te eros convenire. Sea bonorum epicuri ea, ei exerci tacimates pro, aliquam pertinacia eu vim. Vix ei stet ornatus. Est mediocrem reprimique contentiones ei, mea
ne primis intellegat. Dico purto nullam sea an.

## H2 heading with a default 1rem (16px) margin bottom (2 grid boxes)

Quem facilisi moderatius id eam, id tamquam albucius per. Vel quem congue appareat cu, mei te eros convenire. Sea bonorum epicuri ea, ei exerci tacimates pro, aliquam pertinacia eu vim. Vix ei stet ornatus. Est mediocrem reprimique contentiones ei, mea
ne primis intellegat. Dico purto nullam sea an.

### Typographic components

(Note, the following have a 16px (1 rem) default bottom margin)

NB @Kevin - See if we need to make the defaults more varied so design/dev can start using without having to override.

# H1

          1. font-size: 2em (32px)
          2. line-height: 3rem (48px)
          3. margin-bottom: 1rem (16px)

Quem facilisi moderatius id eam, id tamquam albucius per. Vel quem congue appareat cu, mei te eros convenire. Sea bonorum epicuri ea, ei exerci tacimates pro, aliquam pertinacia eu vim. Vix ei stet ornatus. Est mediocrem reprimique contentiones ei, mea
ne primis intellegat. Dico purto nullam sea an.

## H2

          1. font-size: 3em (48px)
          2. line-height: 3.5rem (56px)
          3. margin-bottom: 1rem (16px)

Quem facilisi moderatius id eam, id tamquam albucius per. Vel quem congue appareat cu, mei te eros convenire. Sea bonorum epicuri ea, ei exerci tacimates pro, aliquam pertinacia eu vim. Vix ei stet ornatus. Est mediocrem reprimique contentiones ei, mea
ne primis intellegat. Dico purto nullam sea an.

### H3

          1. font-size: 1.5em (24px)
          2. line-height: 2rem (32px)
          3. margin-bottom: 1rem (16px)

Quem facilisi moderatius id eam, id tamquam albucius per. Vel quem congue appareat cu, mei te eros convenire. Sea bonorum epicuri ea, ei exerci tacimates pro, aliquam pertinacia eu vim. Vix ei stet ornatus. Est mediocrem reprimique contentiones ei, mea
ne primis intellegat. Dico purto nullam sea an.

#### H4

          1. font-size: 1.25em (20px)
          2. line-height: 2rem (32px)
          3. margin-bottom: 1rem (16px)

Quem facilisi moderatius id eam, id tamquam albucius per. Vel quem congue appareat cu, mei te eros convenire. Sea bonorum epicuri ea, ei exerci tacimates pro, aliquam pertinacia eu vim. Vix ei stet ornatus. Est mediocrem reprimique contentiones ei, mea
ne primis intellegat. Dico purto nullam sea an.

##### H5

No H5 default styles have been defined.

##### P - paragraph

          1. font-size: 1em (16px)
          2. line-height: 1.5rem (24px)
          3. margin-bottom: 1rem (16px)

<p>
Quem facilisi moderatius id eam, id tamquam albucius per. Vel quem congue appareat cu, mei te eros convenire. Sea bonorum epicuri ea, ei exerci tacimates pro, aliquam pertinacia eu vim. Vix ei stet ornatus. Est mediocrem reprimique contentiones ei, mea
ne primis intellegat. Dico purto nullam sea an.
</p>

##### Lead Text

          1. font-size: 1em (16px)
          2. line-height: 1.75rem (28px)
          3. margin-bottom: 1rem (16px)

<p class="text-lead">
Quem facilisi moderatius id eam, id tamquam albucius per. Vel quem congue appareat cu, mei te eros convenire. Sea bonorum epicuri ea, ei exerci tacimates pro, aliquam pertinacia eu vim. Vix ei stet ornatus. Est mediocrem reprimique contentiones ei, mea
ne primis intellegat. Dico purto nullam sea an.
</p>

##### Label Text

          1. font-size: 0.8125em (14px)
          2. line-height: 1.25rem (20px)
          3. margin-bottom: 1rem (16px)

<p class="text-label">
Quem facilisi moderatius id eam, id tamquam albucius per. Vel quem congue appareat cu, mei te eros convenire. Sea bonorum epicuri ea, ei exerci tacimates pro, aliquam pertinacia eu vim. Vix ei stet ornatus. Est mediocrem reprimique contentiones ei, mea
ne primis intellegat. Dico purto nullam sea an.
</p>

##### Small Text

          1. font-size: 0.8125em (14px)
          2. line-height: 1.0rem (16px)
          3. margin-bottom: 1rem (16px)

<p class="text-small">
Quem facilisi moderatius id eam, id tamquam albucius per. Vel quem congue appareat cu, mei te eros convenire. Sea bonorum epicuri ea, ei exerci tacimates pro, aliquam pertinacia eu vim. Vix ei stet ornatus. Est mediocrem reprimique contentiones ei, mea
ne primis intellegat. Dico purto nullam sea an.
</p>

### Line heights

The following examples show how different line heights look and behave (whether they sit on the 8px grid or not) for a default paragraph of 16px (1em).

When line heights are multiples of 8px (0.5rem), they will cause the content block to break on the base grid. If smaller space units are used to set line height such as 4px (0.25rem), the content block will break alternatively on and halfway between the base grid.

#### These break on the grid (line heights 1rem, 1.5rem and 2rem)

Because their line-height **is** evenly divisible by 8.

<p class="lh-16">
Line height = 1rem / 16px;

Quem facilisi moderatius id eam, id tamquam albucius per. Vel quem congue appareat cu, mei te eros convenire. Sea bonorum epicuri ea, ei exerci tacimates pro, aliquam pertinacia eu vim. Vix ei stet ornatus. Est mediocrem reprimique contentiones ei, mea
ne primis intellegat. Dico purto nullam sea an.

</p>

<p class="lh-24">
Line height = 1.5rem / 24px;

Quem facilisi moderatius id eam, id tamquam albucius per. Vel quem congue appareat cu, mei te eros convenire. Sea bonorum epicuri ea, ei exerci tacimates pro, aliquam pertinacia eu vim. Vix ei stet ornatus. Est mediocrem reprimique contentiones ei, mea
ne primis intellegat. Dico purto nullam sea an.

</p>

<p class="lh-32">
Line height = 2rem / 32px;

Quem facilisi moderatius id eam, id tamquam albucius per. Vel quem congue appareat cu, mei te eros convenire. Sea bonorum epicuri ea, ei exerci tacimates pro, aliquam pertinacia eu vim. Vix ei stet ornatus. Est mediocrem reprimique contentiones ei, mea
ne primis intellegat. Dico purto nullam sea an.

</p>

#### These break alternatively on/off the grid (line heights 0.75rem, 1.25rem and 1.75rem)

Because their line-height **is not** evenly divisible by 8.

<p class="lh-12">
Line height = 0.75rem / 12px;

Quem facilisi moderatius id eam, id tamquam albucius per. Vel quem congue appareat cu, mei te eros convenire. Sea bonorum epicuri ea, ei exerci tacimates pro, aliquam pertinacia eu vim. Vix ei stet ornatus. Est mediocrem reprimique contentiones ei, mea
ne primis intellegat. Dico purto nullam sea an.

</p>

<p class="lh-20">
Line height = 1.25rem / 20px;

Quem facilisi moderatius id eam, id tamquam albucius per. Vel quem congue appareat cu, mei te eros convenire. Sea bonorum epicuri ea, ei exerci tacimates pro, aliquam pertinacia eu vim. Vix ei stet ornatus. Est mediocrem reprimique contentiones ei, mea
ne primis intellegat. Dico purto nullam sea an.

</p>

<p class="lh-28">
Line height = 1.75rem / 28px;

Quem facilisi moderatius id eam, id tamquam albucius per. Vel quem congue appareat cu, mei te eros convenire. Sea bonorum epicuri ea, ei exerci tacimates pro, aliquam pertinacia eu vim. Vix ei stet ornatus. Est mediocrem reprimique contentiones ei, mea
ne primis intellegat. Dico purto nullam sea an.

</p>
