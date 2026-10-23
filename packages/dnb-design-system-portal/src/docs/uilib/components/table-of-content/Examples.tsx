import { useLayoutEffect, useRef, useState } from 'react'
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
    <ComponentBox data-visual-test="table-of-content-data">
      <TableOfContent.Data
        title="Integration guide"
        currentId="toc-data-internals"
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
    </ComponentBox>
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
