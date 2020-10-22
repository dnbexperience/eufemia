---
title: 'Checklist'
description: 'Accessibility checklist to help you remember the most important tasks you have to follow during front end development.'
---

# Accessibility Checklist

- [ ] Follow **semantics** properly, use **landmarks** ([landmark and semantic example](/uilib/usage/accessibility/checklist#landmark--and-semantics-example)).
- [ ] Ensure correct [heading levels](/uilib/usage/best-practices/for-typography#headings-and-styling).
- [ ] Use different **screen readers** and test [regularly](/uilib/usage/accessibility/screenreader).
- [ ] Make sure, [everything is responsive](/uilib/usage/layout#web-applications) - use mostly the `rem` [unit](/uilib/usage/best-practices/for-styling#units).
- [ ] Make everything accessible for [keyboard navigation only](/uilib/usage/accessibility#keyboard-users) and handle [focus management](/uilib/usage/accessibility/focus#managing-the-focus-state) properly.
- [ ] Group form elements inside `<fieldset />` and `<legend />`. The [FormRow](/uilib/components/form-row) is doing this by default.
- [ ] Do never expose a form element as `disabled` to the user. Use good UX instead.
- [ ] Have a [Skip Link](/uilib/usage/accessibility/focus#skip-link) in place if the user has to tab many times to reach the main content.
- [ ] Make good use of `aria-label` and `aria-hidden`, e.g. of [decorative content](/uilib/usage/accessibility/icons#decorative-icons).
- [ ] Make [images and illustrations](/uilib/usage/accessibility/screenreader#images-and-illustrations) accessible.
- [ ] Have `aria-live` in place for dynamic content, like updates coming from the server.
- [ ] Hide **invisible content** with `display: none;` or with the `hidden` attribute, or remove the markup entirely (with React States).
- [ ] Properly use the `for="#id"` attribute on [labels](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label#Attributes). Every [form component](/uilib/components) is supporting internal label usage, like `<Input label="Input label:" />`.
- [ ] Allow viewport zooming in web pages. Example below.

## Viewport

Allow zooming in web pages, especially important on touch and mobile devices.

```html
<meta
  name="viewport"
  content="width=device-width, initial-scale=1, shrink-to-fit=no, user-scalable=yes"
/>
```

## Landmark- and semantics example

Example usage of HTML5 `landmarks` (e.g. `<nav>` or `<section>` etc.):

```html
<body>
  <header>Header</header>
  <nav>Main navigation</nav>

  <main role="main">

    <section aria-label="I'm now a region">
      <h1 class="dnb-h--large">h1 styled as h2</h1>
      <p class="dnb-o">text</p>
    </section>

    <article>
      <h2 class="dnb-h--xx-large">h2 styled as h1</h2>
      <h3 class="dnb-h--medium">h3</h2>
      <h4 class="dnb-h--basis">h4</h2>
      ...
    </article>

    <article>
      <header>I'm not a landmark anymore, because I'm inside article</header>
      <h2 class="dnb-h--large">Another article h2</h2>
      ...
      <footer>I'm not a landmark anymore, because I'm inside article</footer>
    </article>

  </main>

  <aside>Aside the main landmark</aside>

  <footer>Footer</footer>
</body>
```

Read more about [HTML landmarks and sectioning elements](https://www.w3.org/TR/wai-aria-practices/examples/landmarks/HTML5.html).

## Practical Support of ARIA labels

ARIA labels like `aria-label`, `aria-labelledby` and `aria-describedby` will mostly work on interactive HTML elements, and not on elements such as `div`, `span`, `p` or `ul`.

Read more [about label-support in the w3 docs](https://www.w3.org/TR/using-aria/#label-support).
