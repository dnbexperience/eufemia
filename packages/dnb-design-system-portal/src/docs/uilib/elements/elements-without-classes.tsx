import React from 'react'

/**
 * NB: In order to update the styles for this page,
 * run: yarn workspace dnb-design-system-portal node scripts/compile-css-packages.cjs
 *
 * This is because this package is not imported as it would interfere with the class based styles.
 *
 * During the visual tests, the needed styles are generated.
 */

export default function ElementsWithoutClassesVisibleWhenVisualTest() {
  return (
    <div
      className="dnb-core-style"
      data-visual-test="elements-without-classes"
    >
      <a href="/">anchor</a>

      <p>
        paragraph Dis leo ala tractatos <br />
        vivendum tractatos <a href="/uilib/elements#blockquote">
          anchor
        </a>{' '}
        ei quo.
      </p>

      <h1>h1</h1>
      <h2>h2</h2>
      <h3>h3</h3>
      <h4>h4</h4>
      <h5>h5</h5>
      <h6>h6</h6>

      <ul>
        <li>ul li 1</li>
        <li>ul li 2</li>
      </ul>

      <ol>
        <li>ol li 1</li>
        <li>ol li 2</li>
      </ol>

      <dl>
        <dt>dl title 1</dt>
        <dd>dl description 1</dd>
        <dt>dl title 2</dt>
        <dd>dl description 2</dd>
      </dl>

      <hr />

      <br />

      <img
        width="100"
        height="100"
        alt="DNB logo"
        src="/dnb/android-chrome-192x192.png"
      />

      <br />

      <figure>
        <img
          width="100"
          height="100"
          alt="alt text"
          src="https://invalid"
        />
        <figcaption>img caption</figcaption>
      </figure>

      <br />

      <label>
        label <input type="checkbox" />
      </label>

      <br />

      <pre>
        pre tag <br /> with a newline
      </pre>

      <blockquote>
        Dis leo ala tractatos{' '}
        <a href="/uilib/elements#blockquote">vivendum tractatos</a> ei quo.
        <cite>Cite Reference</cite>
      </blockquote>
    </div>
  )
}

export const Head = () => {
  return (
    <link
      href="/ui-theme-tags.css"
      rel="stylesheet"
      data-name="data-visual-test"
    />
  )
}
