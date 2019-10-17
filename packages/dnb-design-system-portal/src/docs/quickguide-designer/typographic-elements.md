---
draft: true
---

## Typographic elements

This is an overview of the default, basic typographic elements such as **headings, sub-headings, body text etc.**

Note, the following have a 16px (1 rem) default bottom margin. This can be adjusted to suite the context. Increase or decrease in Eufemia space units (4,8,16...etc,).
<br /><br />

#### H1 heading

##### Specs:

<ul>
    <li>font-size: 3em (48px)</li>
    <li>line-height: 3.5rem (56px)</li>
    <li>margin-bottom: 1rem (16px)</li>
</ul>

##### Example:

<div class="typography-box">
  <h1 class="dnb-h1">
    Quem facilisi moderatius id eam, id tamquam albucius per.
  </h1>
  <p>
    This is a regular paragraph following the text above. Quem facilisi moderatius id eam, id tamquam albucius per. Vel quem congue appareat cu, mei te eros convenire. Sea bonorum epicuri ea, ei exerci tacimates pro, aliquam pertinacia eu vim.
  </p>
</div>

#### H1 small heading

##### Specs:

<ul>
    <li>font-size: var(--font-size-x-large) (32px)</li>
    <li>line-height: 3rem (48px)</li>
    <li>margin-bottom: 1rem (16px)</li>
</ul>

##### Example:

<div class="typography-box">
  <h1 class="dnb-h1">
    <small>This part is small facilisi moderatius id eam, id tamquam albucius per. Vel quem congue appareat cu, mei te eros convenire</small>
  </h1>
  <p>
    This is a regular paragraph following the text above. Quem facilisi moderatius id eam, id tamquam albucius per. Vel quem congue appareat cu, mei te eros convenire. Sea bonorum epicuri ea, ei exerci tacimates pro, aliquam pertinacia eu vim.
  </p>
</div>

#### H2 Heading

##### Use when:

You wish to.....

##### Specs:

<ul>
  <li>font-size: 1.5em (24px)</li>
  <li>line-height: 2rem (32px)</li>
  <li>margin-top: 1.5rem (24px)</li>
  <li>margin-bottom: 1rem (16px)</li>
</ul>

##### Example:

<div class="typography-box">
  <h2 class="dnb-h2">
    Quem facilisi moderatius id eam, id tamquam albucius per. Vel quem congue appareat cu, mei te eros convenire. Sea bonorum epicuri ea, ei exerci tacimates pro.
  </h2>
  <p>
    This is a regular paragraph following the text above. Quem facilisi moderatius id eam, id tamquam albucius per. Vel quem congue appareat cu, mei te eros convenire. Sea bonorum epicuri ea, ei exerci tacimates pro, aliquam pertinacia eu vim.
  </p>
</div>

#### H3 - Heading

##### Specs:

<ul>
  <li>font-size: 1.25em (20px)</li>
  <li>line-height: 2rem (32px)</li>
  <li>margin-bottom: 1rem (16px)</li>
</ul>

##### Example:

<div class="typography-box">
  <h3 class="dnb-h3">
    Quem facilisi moderatius id eam, id tamquam albucius per. Vel quem congue appareat cu, mei te eros convenire. Sea bonorum epicuri ea, ei exerci tacimates pro, aliquam pertinacia eu vim. Vix ei stet ornatus. Est mediocrem reprimique contentiones ei, mea
    ne primis intellegat. Dico purto nullam sea an.
  </h3>
  <p>
    This is a regular paragraph following the text above. Quem facilisi moderatius id eam, id tamquam albucius per. Vel quem congue appareat cu, mei te eros convenire. Sea bonorum epicuri ea, ei exerci tacimates pro, aliquam pertinacia eu vim.
  </p>
</div>

#### Lead - Block of text

##### Specs:

<ul>
  <li>font-size: 1.25em (20px)</li>
  <li>line-height: 2rem (32px)</li>
  <li>margin-bottom: 1rem (16px)</li>
</ul>

##### Example:

<div class="typography-box">
  <p class="dnb-lead">
    Quem facilisi moderatius id eam, id tamquam albucius per. Vel quem congue appareat cu, mei te eros convenire. Sea bonorum epicuri ea, ei exerci tacimates pro, aliquam pertinacia eu vim. Vix ei stet ornatus. Est mediocrem reprimique contentiones ei, mea
    ne primis intellegat. Dico purto nullam sea an.
  </p>
  <p>
    This is a regular paragraph following the text above. Quem facilisi moderatius id eam, id tamquam albucius per. Vel quem congue appareat cu, mei te eros convenire. Sea bonorum epicuri ea, ei exerci tacimates pro, aliquam pertinacia eu vim.
  </p>
</div>

#### Body text (paragraph)

##### Specs:

<ul>
  <li>font-size: 1em (16px)</li>
  <li>line-height: var(--line-height-basis) (24px)</li>
  <li>margin-bottom: 1rem (16px)</li>
</ul>

##### Example:

<div class="typography-box">
  <p>
    Quem facilisi moderatius id eam, id tamquam albucius per. Vel quem congue appareat cu, mei te eros convenire. Sea bonorum epicuri ea, ei exerci tacimates pro, aliquam pertinacia eu vim. Vix ei stet ornatus. Est mediocrem reprimique contentiones ei, mea
    ne primis intellegat. Dico purto nullam sea an.
  </p>
  <p>
    This is a regular paragraph following the text above. Quem facilisi moderatius id eam, id tamquam albucius per. Vel quem congue appareat cu, mei te eros convenire. Sea bonorum epicuri ea, ei exerci tacimates pro, aliquam pertinacia eu vim.
  </p>
</div>

#### Small Text

#### Specs:

<ul>
  <li>font-size: 0.875em</li>
  <li>line-height: 1.375rem</li>
</ul>

##### Note:

There are two methods to create 'small' text. One, is to use the 'dnb-small' class which can be used on paragraphs etc. and allows you to use a bottom margin. The other method is to just use a 'small' tag which is inline and cannot have a margin.

##### Example #1 - small tag embedded in a p tag:

<div class="typography-box">
  <p>
    This is a paragraph with a <b>small tag</b> inserted here: <small>this is the small content</small>. This is a regular paragraph following the text above. Quem facilisi moderatius id eam, id tamquam albucius per. Vel quem congue appareat cu, mei te eros convenire. Sea bonorum epicuri ea, ei exerci tacimates pro, aliquam pertinacia eu vim.
  </p>
</div>

##### Example #2 text wrapped in a small tag:

<div class="typography-box">
  <small>
    This is just with a <b>small tag</b>. This is a regular paragraph following the text above. Quem facilisi moderatius id eam, id tamquam albucius per. Vel quem congue appareat cu, mei te eros convenire. Sea bonorum epicuri ea, ei exerci tacimates pro, aliquam pertinacia eu vim.
  </small>
</div>
