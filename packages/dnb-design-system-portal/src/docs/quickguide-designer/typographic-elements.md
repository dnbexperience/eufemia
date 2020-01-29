---
draft: true
---

## Typographic elements

This is an overview of the default, basic typographic elements such as **headings**, **sub-headings**, **body text** etc.

## H1 heading

### Specs:

- font-weight: DNB Medium
- font-size: 3rem (48px)
- line-height: 3.5rem (56px)
- margin-top: 3rem (48px)
- margin-bottom: 2.5rem (40px)

### Example:

<div className="typography-box">
  <h1 className="dnb-h1 skip-anchor">
    Quem facilisi moderatius id eam, id tamquam albucius per.
  </h1>
  <p className="dnb-p">
    Quem facilisi moderatius id eam, id tamquam albucius per. Vel quem congue appareat cu, mei te eros convenire. Sea bonorum epicuri ea, ei exerci tacimates pro, aliquam pertinacia eu vim.
  </p>
</div>

## H1 small heading

### Specs:

- font-weight: DNB Medium
- font-size: 2.125rem (34px)
- line-height: 2.5rem (40px)
- margin-top: 3rem (48px)
- margin-bottom: 2.5rem (40px)

### Example:

<div className="typography-box">
  <h1 className="dnb-h1 skip-anchor">
    <small>
      This part is small facilisi moderatius id eam, id tamquam albucius per. Vel quem congue appareat cu, mei te eros convenire
    </small>
  </h1>
  <p className="dnb-p">
    Quem facilisi moderatius id eam, id tamquam albucius per. Vel quem congue appareat cu, mei te eros convenire. Sea bonorum epicuri ea, ei exerci tacimates pro, aliquam pertinacia eu vim.
  </p>
</div>

## H2 Heading

### Specs:

- font-weight: DNB Medium
- font-size: 1.625rem (26px)
- line-height: 2rem (32px)
- margin-top: 3rem (48px)
- margin-bottom: 1rem (16px)

### Example:

<div className="typography-box">
  <h2 className="dnb-h2 skip-anchor">
    Quem facilisi moderatius id eam, id tamquam albucius per. Vel quem congue appareat cu, mei te eros convenire. Sea bonorum epicuri ea, ei exerci tacimates pro.
  </h2>
  <p className="dnb-p">
    Quem facilisi moderatius id eam, id tamquam albucius per. Vel quem congue appareat cu, mei te eros convenire. Sea bonorum epicuri ea, ei exerci tacimates pro, aliquam pertinacia eu vim.
  </p>
</div>

## Lead (H3) - Heading and/or Block text

### Specs:

- font-weight: DNB Medium
- font-size: 1.25rem (20px)
- line-height: 1.75rem (28px)
- margin-top: 2rem (32px)
- margin-bottom: 1rem (16px)

### Example:

<div className="typography-box">
  <h3 className="dnb-lead skip-anchor">
    Quem facilisi moderatius id eam, id tamquam albucius per. Vel quem congue appareat cu, mei te eros convenire. Sea bonorum epicuri ea, ei exerci tacimates pro, aliquam pertinacia eu vim. Vix ei stet ornatus. Est mediocrem reprimique contentiones ei, mea
    ne primis intellegat. Dico purto nullam sea an.
  </h3>
  <p className="dnb-p">
    Quem facilisi moderatius id eam, id tamquam albucius per. Vel quem congue appareat cu, mei te eros convenire. Sea bonorum epicuri ea, ei exerci tacimates pro, aliquam pertinacia eu vim.
  </p>
</div>

## Body text (paragraph)

### Specs:

- font-weight: DNB Regular or DNB Medium
- font-size: 1.125rem (18px)
- line-height: 1.5rem (24px)
- margin-bottom: 1.5rem (24px)

### Example:

<div className="typography-box">
  <p className="dnb-p">
    Quem facilisi moderatius id eam, id tamquam albucius per. Vel quem congue appareat cu, mei te eros convenire. Sea bonorum epicuri ea, ei exerci tacimates pro, aliquam pertinacia eu vim. Vix ei stet ornatus. Est mediocrem reprimique contentiones ei, mea
    ne primis intellegat. Dico purto nullam sea an.
  </p>
  <p className="dnb-p">
    Quem facilisi moderatius id eam, id tamquam albucius per. Vel quem congue appareat cu, mei te eros convenire. Sea bonorum epicuri ea, ei exerci tacimates pro, aliquam pertinacia eu vim.
  </p>
</div>

## Small Text

### Specs:

- font-weight: DNB Regular or DNB Medium
- font-size: 1rem (16px)
- line-height: 1.25rem (20px)
- margin-bottom: 1.5rem (24px)

### Note:

There are two methods to create small text. One, is to use the `.dnb-p--small` modifier class which can be used on paragraphs etc. and allows you to use a bottom margin. The other method is to just use a `<small>` tag which is inline and cannot have a margin.

### Example

<div className="typography-box">
  <p className="dnb-p dnb-p--small">
    This is a paragraph with a <b>modifier class</b>. This is the small content. Quem facilisi moderatius id eam, id tamquam albucius per. Vel quem congue appareat cu, mei te eros convenire. Sea bonorum epicuri ea, ei exerci tacimates pro, aliquam pertinacia eu vim.
  </p>
  <p className="dnb-p">
    <small>
      This is a paragraph with a <b>small tag</b> inserted here: this is the small content. Quem facilisi moderatius id eam, id tamquam albucius per. Vel quem congue appareat cu, mei te eros convenire. Sea bonorum epicuri ea, ei exerci tacimates pro, aliquam pertinacia eu vim.
    </small>
  </p>
</div>
