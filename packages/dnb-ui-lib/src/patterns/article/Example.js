/**
 * UI lib Component Example
 *
 */

import React, { PureComponent, Fragment } from 'react'
import Article from './Article'

class Example extends PureComponent {
  render() {
    return (
      <Fragment>
        <Article>
          <main className="dnb-style">
            <h2>Article header patterns</h2>
            <p>
              The following header pattern consists of an H1 with the first
              part wrapped in a 'small' tag. The small tag is displaying as
              a block. Following the h1 is a paragarph tag with class
              'dnb-lead' which is used here as an ingress or intro
              paragraph.
            </p>
            <p>
              The default bottom margin is removed from elements (H1, H2, p
              etc.) placed inside a 'header'.
            </p>
            <div className="typography-box">
              <header>
                <h1>
                  <small>Ha finansieringsbeviset klart</small>
                  Det tar bare noen minutter å søke og få svar på hvor mye
                  du kan låne
                </h1>
                <p className="dnb-lead">
                  Vivamus litora imperdiet placerat aenean venenatis congue
                  nec porttitor risus
                </p>
              </header>
              <p>
                Spare er appen som samler alt om sparing på ett sted.
                Opprett sparemål og spar til de gode opplevelsene som du
                kan dele med de du er glad i. Last ned appen på mobilen din
                nå!
              </p>
            </div>

            <p>
              In these examples pattern, note the custom margin between the
              header and the last paragraph
            </p>
            <div className="typography-box">
              <header>
                <h1>
                  Ha finansieringsbeviset klart
                  <small>
                    Det tar bare noen minutter å søke og få svar på hvor
                    mye du kan låne
                  </small>
                </h1>
                <p className="dnb-lead">
                  Vivamus litora imperdiet placerat aenean venenatis congue
                  nec porttitor risus
                </p>
              </header>
              <p>
                Spare er appen som samler alt om sparing på ett sted.
                Opprett sparemål og spar til de gode opplevelsene som du
                kan dele med de du er glad i. Last ned appen på mobilen din
                nå!
              </p>
            </div>
            <h2>An example subheader</h2>
            <div className="typography-box">
              <h2>A sub header (h2 with default margin bottom.)</h2>
              <p>
                Spare er appen som samler alt om sparing på ett sted.
                Opprett sparemål og spar til de gode opplevelsene som du
                kan dele med de du er glad i. Last ned appen på mobilen din
                nå!
              </p>
            </div>

            <section>
              <hgroup>
                <h1>h1 HTML5 Kitchen Sink</h1>
                <h2>
                  h2 Back in my quaint <a href="www.eggs.com">garden</a>
                </h2>
                <h3>
                  h3 Jaunty <a href="www.eggs.com">zinnias</a> vie with
                  flaunting phlox
                </h3>
                <h4>
                  h4 Five or six big jet planes zoomed quickly by the new
                  tower.
                </h4>
                <h5>
                  h5 Expect skilled signwriters to use many jazzy, quaint
                  old alphabets effectively.
                </h5>
                <h6>h6 Pack my box with five dozen liquor jugs.</h6>
              </hgroup>
            </section>
            <hr />
            <section>
              <header>
                <nav>
                  <ul>
                    <li>
                      <a href="www.eggs.com">Home</a>
                    </li>
                    <li>
                      <a href="www.eggs.com">About</a>
                    </li>
                    <li>
                      <a href="www.eggs.com">Contact</a>
                    </li>
                  </ul>
                </nav>
              </header>

              <article>
                <p>
                  This paragraph is nested inside an article. It contains
                  many different, sometimes useful,{' '}
                  <a href="https://www.w3schools.com/tags/">HTML5 tags</a>.
                  Of course there are classics like <em>emphasis</em>,{' '}
                  <strong>strong</strong>, and <small>small</small> but
                  there are many others as well. Hover the following text
                  for abbreviation tag:{' '}
                  <abbr title="abbreviation">abbr</abbr>. Similarly, you
                  can use acronym tag like this:{' '}
                  <acronym title="For The Win">ftw</acronym>. You can
                  define <del>deleted text</del> which often gets replaced
                  with <ins>inserted</ins> text.
                </p>
                <p>
                  You can also use <kbd>keyboard text</kbd>, which
                  sometimes is styled similarly to the{' '}
                  <code>&lt;code&gt;</code> or <samp>samp</samp> tags. Even
                  more specifically, there is a tag just for{' '}
                  <var>variables</var>. Not to be mistaken with blockquotes
                  below, the quote tag lets you denote something as{' '}
                  <q>quoted text</q>. Lastly don't forget the sub (H
                  <sub>2</sub>O) and sup (E = MC<sup>2</sup>) tags.{' '}
                </p>
              </article>
              <aside>This is an aside.</aside>
              <footer>This is footer for this section</footer>
            </section>
            <hr />
            <section>
              <blockquote>
                <p>
                  Blockquote: I quickly explained that many big jobs
                  involve few hazards
                </p>
              </blockquote>
              <blockquote>
                <p>
                  This is a mult-line blockquote with a cite reference.
                  People think focus means saying yes to the thing you’ve
                  got to focus on. But that’s not what it means at all. It
                  means saying no to the hundred other good ideas that
                  there are. You have to pick carefully. I’m actually as
                  proud of the things we haven’tdone as the things I have
                  done. Innovation is saying no to 1,000 things.
                  <cite>
                    Steve Jobs – Apple Worldwide Developers’ Conference,
                    1997
                  </cite>
                </p>
              </blockquote>
            </section>
            <hr />
            <section>
              <table>
                <caption>Tables can have captions now.</caption>
                <tbody>
                  <tr>
                    <th>Person</th>
                    <th>Number</th>
                    <th>Third Column</th>
                  </tr>
                  <tr>
                    <td>Someone Lastname</td>
                    <td>900</td>
                    <td>
                      Nullam quis risus eget urna mollis ornare vel eu leo.
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <a href="www.eggs.com">Person Name</a>
                    </td>
                    <td>1200</td>
                    <td>
                      Vestibulum id ligula porta felis euismod semper.
                      Donec ullamcorper nulla non metus auctor fringilla.
                    </td>
                  </tr>
                  <tr>
                    <td>Another Person</td>
                    <td>1500</td>
                    <td>
                      Vivamus sagittis lacus vel augue laoreet rutrum
                      faucibus dolor auctor. Nullam id dolor id nibh
                      ultricies vehicula ut id elit.
                    </td>
                  </tr>
                  <tr>
                    <td>Last One</td>
                    <td>2800</td>
                    <td>
                      Morbi leo risus, porta ac consectetur ac, vestibulum
                      at eros. Cras mattis consectetur purus sit amet
                      fermentum.
                    </td>
                  </tr>
                </tbody>
              </table>
            </section>
            <hr />
            <section>
              <dl>
                <dt>Definition List Title</dt>
                <dd>Definition list division.</dd>
                <dt>Kitchen Sink</dt>
                <dd>
                  Used in expressions to describe work in which all
                  conceivable (and some inconceivable) sources have been
                  mined. In this case, a bunch of markup.
                </dd>
                <dt>aside</dt>
                <dd>Defines content aside from the page content</dd>
                <dt>blockquote</dt>
                <dd>
                  Defines a section that is quoted from another source
                </dd>
              </dl>
            </section>
            <hr />
            <section>
              <ul>
                <li>
                  Unordered List item one
                  <ul>
                    <li>
                      Nested list item
                      <ul>
                        <li>Level 3, item one</li>
                        <li>Level 3, item two</li>
                        <li>Level 3, item three</li>
                        <li>Level 3, item four</li>
                      </ul>
                    </li>
                    <li>List item two</li>
                    <li>List item three</li>
                    <li>List item four</li>
                  </ul>
                </li>
                <li>List item two</li>
                <li>List item three</li>
                <li>List item four</li>
              </ul>
              <hr />
              <ol>
                <li>
                  List item one
                  <ol>
                    <li>
                      List item one
                      <ol>
                        <li>List item one</li>
                        <li>List item two</li>
                        <li>List item three</li>
                        <li>List item four</li>
                      </ol>
                    </li>
                    <li>List item two</li>
                    <li>List item three</li>
                    <li>List item four</li>
                  </ol>
                </li>
                <li>List item two</li>
                <li>List item three</li>
                <li>List item four</li>
              </ol>
            </section>
            <hr />
            <section>
              <address>
                1 Infinite Loop
                <br />
                Cupertino, CA 95014
                <br />
                United States
              </address>
            </section>
            <hr />

            <figure>
              <img src="https://www.fillmurray.com/505/314" alt="dnb" />
              <figcaption>
                Fig1. A picture of Bill Murray from{' '}
                <a href="https://www.fillmurray.com/">fillmurray.com</a>
              </figcaption>
            </figure>
          </main>
        </Article>
      </Fragment>
    )
  }
}

export { Example }
export default () => <Example />
