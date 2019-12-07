---
draft: true
---

## Line height and the baseline grid

The following examples show how different line heights look and behave (whether they sit on the 8px grid or not) for a default paragraph of 16px (1rem).

When line heights are multiples of 8px (0.5rem), they will cause the content block to break on the base grid. If smaller space units are used to set line height such as 4px (0.25rem), the content block will break alternatively on and halfway between the base grid.

### These break _*neatly*_ on the grid (line heights 1rem, 1.5rem and 2rem)

Because their line-height **is** evenly divisible by 8.
<br />

### Line height = 1rem (16px)

<div className="typography-box">
  <p className="dnb-p lh-16">
    Quem facilisi moderatius id eam, id tamquam albucius per. Vel quem congue appareat cu, mei te eros convenire. Sea bonorum epicuri ea, ei exerci tacimates pro, aliquam pertinacia eu vim. Vix ei stet ornatus. Est mediocrem reprimique contentiones ei, mea
    ne primis intellegat. Dico purto nullam sea an.
  </p>
</div>

### Line height = 1.5rem (24px)

<div className="typography-box">
  <p className="dnb-p lh-24">
    Quem facilisi moderatius id eam, id tamquam albucius per. Vel quem congue appareat cu, mei te eros convenire. Sea bonorum epicuri ea, ei exerci tacimates pro, aliquam pertinacia eu vim. Vix ei stet ornatus. Est mediocrem reprimique contentiones ei, mea
    ne primis intellegat. Dico purto nullam sea an.
  </p>
</div>

### Line height = 2rem (32px)

<div className="typography-box">
  <p className="dnb-p lh-32">
    Quem facilisi moderatius id eam, id tamquam albucius per. Vel quem congue appareat cu, mei te eros convenire. Sea bonorum epicuri ea, ei exerci tacimates pro, aliquam pertinacia eu vim. Vix ei stet ornatus. Est mediocrem reprimique contentiones ei, mea
    ne primis intellegat. Dico purto nullam sea an.
  </p>
</div>

### These break alternatively on/off the grid (line heights 0.75rem, 1.25rem and 1.75rem)

Because their line-height **is not** evenly divisible by 8.
Try resizing the browser - you will see the 'off-grid' result.

### Line height = 0.75rem (12px)

<div className="typography-box">
  <p className="dnb-p lh-12">
    Quem facilisi moderatius id eam, id tamquam albucius per. Vel quem congue appareat cu, mei te eros convenire. Sea bonorum epicuri ea, ei exerci tacimates pro, aliquam pertinacia eu vim. Vix ei stet ornatus. Est mediocrem reprimique contentiones ei, mea
    ne primis intellegat. Dico purto nullam sea an.
  </p>
</div>

### Line height = 1.25rem (20px)

<div className="typography-box">
  <p className="dnb-p lh-20">
    Quem facilisi moderatius id eam, id tamquam albucius per. Vel quem congue appareat cu, mei te eros convenire. Sea bonorum epicuri ea, ei exerci tacimates pro, aliquam pertinacia eu vim. Vix ei stet ornatus. Est mediocrem reprimique contentiones ei, mea
    ne primis intellegat. Dico purto nullam sea an.
  </p>
</div>

### Line height = 1.75rem (28px)

<div className="typography-box">
  <p className="dnb-p lh-28">
    Quem facilisi moderatius id eam, id tamquam albucius per. Vel quem congue appareat cu, mei te eros convenire. Sea bonorum epicuri ea, ei exerci tacimates pro, aliquam pertinacia eu vim. Vix ei stet ornatus. Est mediocrem reprimique contentiones ei, mea
    ne primis intellegat. Dico purto nullam sea an.
  </p>
</div>
