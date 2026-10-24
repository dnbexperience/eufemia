import { useLayoutEffect, useRef, useState } from 'react'
import type { MouseEvent } from 'react'
import {
  H2,
  H3,
  P,
  ScrollView,
  Switch,
  TableOfContent,
} from '@dnb/eufemia/src'
import ComponentBox from '../../../../shared/tags/ComponentBox'
import '@dnb/eufemia/src/components/table-of-content/style'
import styles from './Examples.module.scss'

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
  const link = (event.target as Element).closest<HTMLAnchorElement>(
    '.dnb-table-of-content a[href^="#"]'
  )
  const target =
    link && document.getElementById(decodeURIComponent(link.hash.slice(1)))
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
    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ? 'instant'
      : 'smooth',
  })
}

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
      scope={{ IntegrationExample }}
      data-visual-test="table-of-content-data"
    >
      <IntegrationExample />
    </ComponentBox>
  )
}

function IntegrationExample() {
  const articleRef = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState(0)
  useLayoutEffect(() => {
    const update = () =>
      setOffset(articleRef.current.getBoundingClientRect().top + 18)
    update()
    window.addEventListener('scroll', update, {
      capture: true,
      passive: true,
    })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update, { capture: true })
      window.removeEventListener('resize', update)
    }
  }, [])
  return (
    <div className={styles.example}>
      <TableOfContent.Data
        onClick={(event) => navigateExample(event, articleRef.current)}
        title="Integration guide"
        currentSectionOffset={offset}
        maxDepth={2}
        data={[
          { id: 'toc-data-title', text: 'Integration guide', level: 1 },
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
      <ScrollView
        ref={articleRef}
        className={styles.article}
        interactive
        role="region"
        aria-label="Example integration guide"
      >
        <section>
          <H2 id="toc-data-install">Install the package</H2>
          <P>Add Eufemia to your application and load its styles.</P>
        </section>
        <section>
          <H2 id="toc-data-root">TableOfContent.Root</H2>
          <P>Compose section links or supply a flat list of headings.</P>
        </section>
        <section>
          <H3 id="toc-data-props">Properties and configuration</H3>
          <P>Adjust the depth and sticky offset to fit your page.</P>
          <H3 id="toc-data-internals">Implementation details</H3>
          <P>
            Headings below the visible depth highlight their nearest
            visible ancestor.
          </P>
        </section>
        <section>
          <H2 id="toc-data-accessibility">
            Test accessibility in your application
          </H2>
          <P>Check keyboard navigation and descriptive section labels.</P>
        </section>
      </ScrollView>
    </div>
  )
}

export function Controlled() {
  const [expanded, setExpanded] = useState(true)
  return (
    <ComponentBox
      scope={{ expanded, setExpanded }}
      data-visual-test="table-of-content-controlled"
    >
      <Switch
        label="Expand contents on small screens"
        checked={expanded}
        onChange={({ checked }) => setExpanded(checked)}
        bottom="small"
      />
      <TableOfContent.Data
        title="Application guide"
        stretch
        expanded={expanded}
        onExpandedChange={setExpanded}
        currentId={null}
        data={[
          {
            id: 'toc-controlled-before',
            text: 'Before you apply',
            level: 2,
          },
          {
            id: 'toc-controlled-documents',
            text: 'Documents you need',
            level: 2,
          },
          {
            id: 'toc-controlled-submit',
            text: 'Send your application',
            level: 2,
          },
        ]}
      />
    </ComponentBox>
  )
}

export function ScrollableArticle() {
  return (
    <ComponentBox
      hideCode
      scope={{ ArticleExample }}
      data-visual-test="table-of-content-article"
    >
      <ArticleExample />
    </ComponentBox>
  )
}

function ArticleExample() {
  const id = 'toc-article'
  const articleRef = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState(0)

  useLayoutEffect(() => {
    const article = articleRef.current
    const update = () =>
      setOffset(article.getBoundingClientRect().top + 18)
    update()
    window.addEventListener('scroll', update, {
      passive: true,
      capture: true,
    })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update, { capture: true })
      window.removeEventListener('resize', update)
    }
  }, [])

  return (
    <div className={styles.example}>
      <TableOfContent.Data
        onClick={(event) => navigateExample(event, articleRef.current)}
        title="Plan your savings"
        defaultExpanded
        currentSectionOffset={offset}
        data={[
          { id: id + '-goal', text: 'Set a savings goal', level: 2 },
          { id: id + '-amount', text: 'Choose an amount', level: 3 },
          {
            id: id + '-account',
            text: 'Find the right account',
            level: 2,
          },
          { id: id + '-review', text: 'Review your progress', level: 2 },
        ]}
      />
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
            Give your savings a purpose. A clear goal helps you decide how
            much to set aside and when you need the money.
          </P>
          <H3 id={id + '-amount'}>Choose an amount</H3>
          <P>
            Start with an amount that fits your everyday budget. You can
            adjust it as your situation changes.
          </P>
        </section>
        <section>
          <H2 id={id + '-account'}>Find the right account</H2>
          <P>
            Compare access to your money, interest and fees. Keep an
            emergency buffer available for unexpected expenses.
          </P>
        </section>
        <section>
          <H2 id={id + '-review'}>Review your progress</H2>
          <P>
            Check your progress regularly. Small, consistent contributions
            can help you build a useful buffer over time.
          </P>
        </section>
      </ScrollView>
    </div>
  )
}
