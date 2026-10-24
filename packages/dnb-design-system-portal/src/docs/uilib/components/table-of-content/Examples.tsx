import { useLayoutEffect, useRef, useState } from 'react'
import type { MouseEvent, RefObject } from 'react'
import {
  H2,
  H3,
  H4,
  P,
  ScrollView,
  TableOfContent,
} from '@dnb/eufemia/src'
import ComponentBox from '../../../../shared/tags/ComponentBox'
import '@dnb/eufemia/src/components/table-of-content/style'
import styles from './Examples.module.scss'

export function Declarative() {
  return (
    <ComponentBox data-visual-test="table-of-content-declarative">
      <TableOfContent.Root
        title="Your savings guide"
        currentId="toc-declarative-interest"
      >
        <TableOfContent.Item
          id="toc-declarative-start"
          text="Get started"
        />
        <TableOfContent.Item
          id="toc-declarative-accounts"
          text="Choose an account"
        >
          <TableOfContent.Item
            id="toc-declarative-interest"
            text="Interest and fees"
          />
        </TableOfContent.Item>
        <TableOfContent.Item id="toc-declarative-next" text="Next steps" />
      </TableOfContent.Root>
    </ComponentBox>
  )
}

export function FromData() {
  return (
    <ComponentBox
      hideCode
      scope={{ styles }}
      data-visual-test="table-of-content-data"
    >
      {() => {
        function navigateExample(
          event: MouseEvent<HTMLElement>,
          article: HTMLDivElement | null
        ) {
          if (
            event.defaultPrevented ||
            event.button !== 0 ||
            event.metaKey ||
            event.ctrlKey ||
            event.shiftKey ||
            event.altKey ||
            !article
          ) {
            return
          }
          const link = (
            event.target as Element
          ).closest<HTMLAnchorElement>(
            '.dnb-table-of-content a[href^="#"]'
          )
          const target =
            link &&
            document.getElementById(decodeURIComponent(link.hash.slice(1)))
          if (!target || !article.contains(target)) {
            return
          }

          event.preventDefault()
          const padding =
            parseFloat(getComputedStyle(article).scrollPaddingTop) || 0
          article.scrollTo({
            top:
              article.scrollTop +
              target.getBoundingClientRect().top -
              article.getBoundingClientRect().top -
              article.clientTop -
              padding,
            behavior: window.matchMedia('(prefers-reduced-motion: reduce)')
              .matches
              ? 'instant'
              : 'smooth',
          })
        }

        function useArticleOffset(
          articleRef: RefObject<HTMLDivElement>,
          inset = 1
        ) {
          const [offset, setOffset] = useState(0)
          useLayoutEffect(() => {
            const update = () => {
              const element = articleRef.current
              if (element) {
                setOffset(
                  element.getBoundingClientRect().top +
                    element.clientTop +
                    inset *
                      parseFloat(
                        getComputedStyle(document.documentElement).fontSize
                      )
                )
              }
            }
            update()
            window.addEventListener('scroll', update, {
              capture: true,
              passive: true,
            })
            window.addEventListener('resize', update)
            return () => {
              window.removeEventListener('scroll', update, {
                capture: true,
              })
              window.removeEventListener('resize', update)
            }
          }, [articleRef, inset])
          return offset
        }

        function IntegrationExample() {
          const articleRef = useRef<HTMLDivElement>(null)
          const offset = useArticleOffset(articleRef)
          return (
            <div className={styles.example + ' ' + styles.exampleRight}>
              <ScrollView
                ref={articleRef}
                className={styles.article}
                interactive
                role="region"
                aria-label="Example integration guide"
              >
                <section>
                  <H2 id="toc-data-install">Install the package</H2>
                  <P>
                    Add Eufemia to your application and load its styles.
                  </P>
                </section>
                <section>
                  <H2 id="toc-data-root">TableOfContent.Root</H2>
                  <P>
                    Compose section links or supply a flat list of
                    headings.
                  </P>
                </section>
                <section>
                  <H3 id="toc-data-props">Properties and configuration</H3>
                  <P>
                    Adjust the depth and sticky offset to fit your page.
                  </P>
                  <H4 id="toc-data-internals">Implementation details</H4>
                  <P>
                    Headings below the visible depth highlight their
                    nearest visible ancestor.
                  </P>
                </section>
                <section>
                  <H2 id="toc-data-accessibility">
                    Test accessibility in your application
                  </H2>
                  <P>
                    Check keyboard navigation and descriptive section
                    labels.
                  </P>
                </section>
              </ScrollView>
              <TableOfContent.Data
                onClick={(event) =>
                  navigateExample(event, articleRef.current)
                }
                locale="en-GB"
                aria-label="Integration guide"
                currentSectionOffset={offset}
                maxDepth={2}
                data={[
                  {
                    id: 'toc-data-title',
                    text: 'Integration guide',
                    level: 1,
                  },
                  {
                    id: 'toc-data-install',
                    text: 'Install the package',
                    level: 2,
                  },
                  {
                    id: 'toc-data-root',
                    text: <code>TableOfContent.Root</code>,
                    level: 2,
                  },
                  {
                    id: 'toc-data-props',
                    text: 'Properties and configuration',
                    level: 3,
                  },
                  {
                    id: 'toc-data-internals',
                    text: 'Implementation details',
                    level: 4,
                  },
                  {
                    id: 'toc-data-accessibility',
                    text: 'Test accessibility in your application',
                    level: 2,
                  },
                ]}
              />
            </div>
          )
        }

        return <IntegrationExample />
      }}
    </ComponentBox>
  )
}

export function DesktopArticle() {
  return (
    <ComponentBox
      hideCode
      scope={{ styles }}
      data-visual-test="table-of-content-desktop-article"
    >
      {() => {
        function navigateExample(
          event: MouseEvent<HTMLElement>,
          article: HTMLDivElement | null
        ) {
          if (
            event.defaultPrevented ||
            event.button !== 0 ||
            event.metaKey ||
            event.ctrlKey ||
            event.shiftKey ||
            event.altKey ||
            !article
          ) {
            return
          }
          const link = (
            event.target as Element
          ).closest<HTMLAnchorElement>(
            '.dnb-table-of-content a[href^="#"]'
          )
          const target =
            link &&
            document.getElementById(decodeURIComponent(link.hash.slice(1)))
          if (!target || !article.contains(target)) {
            return
          }

          event.preventDefault()
          const padding =
            parseFloat(getComputedStyle(article).scrollPaddingTop) || 0
          article.scrollTo({
            top:
              article.scrollTop +
              target.getBoundingClientRect().top -
              article.getBoundingClientRect().top -
              article.clientTop -
              padding,
            behavior: window.matchMedia('(prefers-reduced-motion: reduce)')
              .matches
              ? 'instant'
              : 'smooth',
          })
        }

        function useArticleOffset(
          articleRef: RefObject<HTMLDivElement>,
          inset = 1
        ) {
          const [offset, setOffset] = useState(0)
          useLayoutEffect(() => {
            const update = () => {
              const element = articleRef.current
              if (element) {
                setOffset(
                  element.getBoundingClientRect().top +
                    element.clientTop +
                    inset *
                      parseFloat(
                        getComputedStyle(document.documentElement).fontSize
                      )
                )
              }
            }
            update()
            window.addEventListener('scroll', update, {
              capture: true,
              passive: true,
            })
            window.addEventListener('resize', update)
            return () => {
              window.removeEventListener('scroll', update, {
                capture: true,
              })
              window.removeEventListener('resize', update)
            }
          }, [articleRef, inset])
          return offset
        }

        function DesktopArticleExample() {
          const articleRef = useRef<HTMLDivElement>(null)
          const offset = useArticleOffset(articleRef, 4)
          const sections = [
            {
              id: 'start',
              text: 'Build your savings plan',
              level: 2,
              body: 'A little planning makes it easier to put money aside. Start with what matters to you, then find a rhythm that fits everyday life.',
            },
            {
              id: 'goal',
              text: 'Choose a goal',
              level: 3,
              body: 'A holiday, a new home or a little more peace of mind. Give your savings a purpose and decide when you want to reach it.',
            },
            {
              id: 'amount',
              text: 'Find your monthly amount',
              level: 4,
              body: 'Look at what comes in and what goes out. Choose an amount you can keep saving, even in a busy month.',
            },
            {
              id: 'buffer',
              text: 'Keep a safety buffer',
              level: 4,
              body: 'Set aside a little for unexpected expenses. Keep this money easy to reach when you need it.',
            },
            {
              id: 'account',
              text: 'Find the right account',
              level: 2,
              body: 'Match the account to your goal. Compare interest rates, fees and how quickly you can access your savings.',
            },
            {
              id: 'access',
              text: 'Access to your money',
              level: 3,
              body: 'Some accounts let you withdraw whenever you want. Others reward you for leaving the money untouched.',
            },
            {
              id: 'interest',
              text: 'Interest and fees',
              level: 3,
              body: 'Check the effective interest rate and any withdrawal fees. Small differences add up over time.',
            },
            {
              id: 'compare',
              text: 'Compare your options',
              level: 4,
              body: 'Read the terms side by side and choose an account that supports how you plan to save.',
            },
            {
              id: 'routine',
              text: 'Make saving a habit',
              level: 2,
              body: 'A regular transfer can help your savings grow without adding another task to your day.',
            },
            {
              id: 'transfer',
              text: 'Set up a regular transfer',
              level: 3,
              body: 'Choose a date just after payday. Start small and increase the amount when your budget allows it.',
            },
            {
              id: 'adjust',
              text: 'Adjust when life changes',
              level: 3,
              body: 'Your savings plan can change with you. Lower the amount for a while or save a little more when you can.',
            },
            {
              id: 'review',
              text: 'Review your progress',
              level: 2,
              body: 'Take a moment to see how far you have come. Regular check-ins help you stay on track.',
            },
            {
              id: 'milestones',
              text: 'Celebrate small milestones',
              level: 3,
              body: 'Notice each step forward. Consistent contributions matter more than a perfect month.',
            },
            {
              id: 'next',
              text: 'Plan your next step',
              level: 3,
              body: 'When you reach your goal, decide what comes next. Keep the habits that worked for you.',
            },
          ]
          return (
            <ScrollView
              ref={articleRef}
              className={styles.desktopScroll}
              interactive
              role="region"
              aria-label="Example savings plan with a sticky header"
            >
              <div className={styles.desktopHeader}>
                <P>Sticky header</P>
              </div>
              <div className={styles.desktopLayout}>
                <div className={styles.desktopContent}>
                  {sections.map(({ id, text, level, body }) => {
                    const Title = level === 2 ? H2 : level === 3 ? H3 : H4
                    return (
                      <section key={id}>
                        <Title id={'toc-desktop-' + id}>{text}</Title>
                        <P>{body}</P>
                      </section>
                    )
                  })}
                </div>
                <TableOfContent.Data
                  locale="en-GB"
                  aria-label="Savings plan"
                  breakpoint="small"
                  defaultExpanded
                  maxDepth={3}
                  stickyOffset="4rem"
                  currentSectionOffset={offset}
                  data={sections.map(({ id, text, level }) => ({
                    id: 'toc-desktop-' + id,
                    text,
                    level,
                  }))}
                  onClick={(event) =>
                    navigateExample(event, articleRef.current)
                  }
                />
              </div>
            </ScrollView>
          )
        }

        return <DesktopArticleExample />
      }}
    </ComponentBox>
  )
}

export function ScrollableArticle() {
  return (
    <ComponentBox
      hideCode
      scope={{ styles }}
      data-visual-test="table-of-content-article"
    >
      {() => {
        function navigateExample(
          event: MouseEvent<HTMLElement>,
          article: HTMLDivElement | null
        ) {
          if (
            event.defaultPrevented ||
            event.button !== 0 ||
            event.metaKey ||
            event.ctrlKey ||
            event.shiftKey ||
            event.altKey ||
            !article
          ) {
            return
          }
          const link = (
            event.target as Element
          ).closest<HTMLAnchorElement>(
            '.dnb-table-of-content a[href^="#"]'
          )
          const target =
            link &&
            document.getElementById(decodeURIComponent(link.hash.slice(1)))
          if (!target || !article.contains(target)) {
            return
          }

          event.preventDefault()
          const padding =
            parseFloat(getComputedStyle(article).scrollPaddingTop) || 0
          article.scrollTo({
            top:
              article.scrollTop +
              target.getBoundingClientRect().top -
              article.getBoundingClientRect().top -
              article.clientTop -
              padding,
            behavior: window.matchMedia('(prefers-reduced-motion: reduce)')
              .matches
              ? 'instant'
              : 'smooth',
          })
        }

        function useArticleOffset(
          articleRef: RefObject<HTMLDivElement>,
          inset = 1
        ) {
          const [offset, setOffset] = useState(0)
          useLayoutEffect(() => {
            const update = () => {
              const element = articleRef.current
              if (element) {
                setOffset(
                  element.getBoundingClientRect().top +
                    element.clientTop +
                    inset *
                      parseFloat(
                        getComputedStyle(document.documentElement).fontSize
                      )
                )
              }
            }
            update()
            window.addEventListener('scroll', update, {
              capture: true,
              passive: true,
            })
            window.addEventListener('resize', update)
            return () => {
              window.removeEventListener('scroll', update, {
                capture: true,
              })
              window.removeEventListener('resize', update)
            }
          }, [articleRef, inset])
          return offset
        }

        function ArticleExample() {
          const id = 'toc-article'
          const articleRef = useRef<HTMLDivElement>(null)
          const offset = useArticleOffset(articleRef)

          return (
            <div className={styles.example + ' ' + styles.exampleRight}>
              <ScrollView
                ref={articleRef}
                className={styles.article}
                interactive
                role="region"
                aria-label="Example savings article"
              >
                <section>
                  <H2 id={id + '-goal'}>Set a savings goal</H2>
                  <P>
                    Give your savings a purpose. A clear goal helps you
                    decide how much to set aside and when you need the
                    money.
                  </P>
                  <H3 id={id + '-amount'}>Choose an amount</H3>
                  <P>
                    Start with an amount that fits your everyday budget.
                    You can adjust it as your situation changes.
                  </P>
                </section>
                <section>
                  <H2 id={id + '-account'}>Find the right account</H2>
                  <P>
                    Compare access to your money, interest and fees. Keep
                    an emergency buffer available for unexpected expenses.
                  </P>
                </section>
                <section>
                  <H2 id={id + '-review'}>Review your progress</H2>
                  <P>
                    Check your progress regularly. Small, consistent
                    contributions can help you build a useful buffer over
                    time.
                  </P>
                </section>
              </ScrollView>
              <TableOfContent.Data
                onClick={(event) =>
                  navigateExample(event, articleRef.current)
                }
                title="Plan your savings"
                defaultExpanded
                currentSectionOffset={offset}
                data={[
                  {
                    id: id + '-goal',
                    text: 'Set a savings goal',
                    level: 2,
                  },
                  {
                    id: id + '-amount',
                    text: 'Choose an amount',
                    level: 3,
                  },
                  {
                    id: id + '-account',
                    text: 'Find the right account',
                    level: 2,
                  },
                  {
                    id: id + '-review',
                    text: 'Review your progress',
                    level: 2,
                  },
                ]}
              />
            </div>
          )
        }

        return <ArticleExample />
      }}
    </ComponentBox>
  )
}
