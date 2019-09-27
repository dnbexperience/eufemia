---
fullscreen: true
draft: true
order: 12
---

<Intro>

# Accessibility

**This is important!** You as a developer has the responsibility to implement and [use best practices](!/uilib/usage/accessibility) to make applications accessible for every end user.

## ARIA Examples

Example usage of `role`, `aria-label`, `aria-labelledby` and `aria-hidden`.

```html
<a aria-label="Describe the action" href="/action" className="dnb-anchor">
  <svg aria-hidden="true" ... />
</a>

<div role="alert">Dynamic content alert message</div>

<img role="presentation" alt="image alt" src="..." />

<figure aria-labelledby="figure-id" role="group">
  <img alt="image alt" src="..." />
  <figcaption id="figure-id">Description <cite>Name</cite> ...</figcaption>
</figure>
```

## Semantic Elements

Example usage of HTML5 `landmarks`.

```html
<body>
  <header>Header</header>
  <nav>Main Navigation</nav>
  <section>
    <h1>Section</h1>
    ...
  </section>
  <article>
    <h2>Article</h2>
    ...
  </article>
  <article>
    <h2>Article</h2>
    ...
  </article>
  <aside>Aside the Section and the Articles</aside>
  <footer>Footer</footer>
</body>
```

---

<IntroFooter href="/uilib/intro/04-ux-handover" text="Next - UX handover" />

</Intro>
