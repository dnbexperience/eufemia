/**
 * Inline Tag
 *
 */

import React, {
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react'
import clsx from 'clsx'
import { Highlight, Prism } from 'prism-react-renderer'
import Tag from './Tag'
import {
  Button,
  Checkbox,
  Space,
  ToggleButton,
} from '@dnb/eufemia/src/components'
import Theme from '@dnb/eufemia/src/shared/Theme'
import type {
  ThemeColorScheme,
  ThemeSurface,
} from '@dnb/eufemia/src/shared/Theme'
import { makeUniqueId } from '@dnb/eufemia/src/shared/component-helper'
import { Context } from '@dnb/eufemia/src/shared'
import { createSkeletonClass } from '@dnb/eufemia/src/components/skeleton/SkeletonHelper'
import {
  liveCodeEditorStyle,
  exampleBoxStyle,
  codeBlockStyle,
  toolbarStyle,
} from './CodeBlock.module.scss'
import {
  LiveProvider,
  LiveEditor,
  LiveError,
  LivePreview,
} from 'react-live-ssr' // we use this temporary version of until ssr is supported https://github.com/FormidableLabs/react-live/pull/322

// This theme uses CSS custom properties, so actual colors are controlled via CSS
import prismTheme from '@dnb/eufemia/src/style/themes/ui/prism/dnb-prism-theme'

// Import other languages not included in the default bundle of prism-react-renderer
import './prismLanguages'

export type CodeSectionProps = {
  scope?: Record<string, unknown>
  noInline?: boolean
  hideToolbar?: boolean
  hideCode?: boolean
  hidePreview?: boolean
  /**
   * Use surface="dark" to show the button to toggle surface, forcing it to be dark by default.
   */
  surface?: ThemeSurface
  reactLive?: boolean
  language?: string
  className?: string
  background?: 'grid' | 'plain'
  omitWrapper?: boolean
  children: string | React.ReactNode | (() => React.ReactNode)
  tabMode?: 'focus' | 'indentation'
  'data-visual-test'?: string
}

const CodeBlock = ({
  language,
  children: exampleCode,
  reactLive: isReactLive,
  ...props
}: CodeSectionProps) => {
  const context = useContext(Context)

  if (!language) {
    language = ((String(props && props.className).match(
      /language-(.*)$|\s/
    ) || [])[1] || 'jsx') as string
  }

  if (((props && props.scope) || isReactLive) && language === 'jsx') {
    return (
      <div
        className={clsx(
          codeBlockStyle,
          createSkeletonClass('code', context.skeleton)
        )}
      >
        <LiveCode code={exampleCode as string} {...props} />
      </div>
    )
  } else {
    return (
      <Highlight
        code={exampleCode as string}
        language={language}
        theme={prismTheme}
        prism={Prism}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <div
            className={clsx(
              codeBlockStyle,
              createSkeletonClass('code', context.skeleton)
            )}
          >
            <Tag as="pre" className={className} css={style}>
              {cleanTokens(tokens).map((line, i) => {
                const { key, ...lineProps } = getLineProps({
                  line,
                  key: i,
                })
                return (
                  <div key={String(key)} {...lineProps}>
                    {line.map((token, tokenKey) => {
                      const { key: tokenKeyProp, ...tokenProps } =
                        getTokenProps({ token, key: tokenKey })
                      return (
                        <span key={String(tokenKeyProp)} {...tokenProps} />
                      )
                    })}
                  </div>
                )
              })}
            </Tag>
          </div>
        )}
      </Highlight>
    )
  }
}

export default CodeBlock

type LiveCodeProps = {
  code: string
  noFragments?: boolean
} & Omit<CodeSectionProps, 'children'>

function prepareCode(code: string) {
  code = String(code).trim()
  if (
    /data-visual-test|visualTestProp/.test(code) &&
    // remove test attribute only if: we run live, and are not not test
    !globalThis.IS_TEST
  ) {
    code = code.replace(/\s+data-visual-test="[^"]*"/g, '') // remove test data
    code = code.replace(/ +{\.+visualTestProp.*}\n/g, '') // remove test data
  }
  return code
}

function LiveCode(props: LiveCodeProps) {
  const context = useContext(Context)
  const editorElementRef = useRef<HTMLDivElement>(null)
  const idRef = useRef(makeUniqueId())

  const [hideCode, setHideCode] = useState(props.hideCode)
  const [hidePreview, setHidePreview] = useState(props.hidePreview)
  const [tabMode] = useState<'focus' | 'indentation'>('focus')
  const [colorScheme, setColorScheme] = useState<
    ThemeColorScheme | undefined
  >(undefined)
  const [surface, setSurface] = useState<ThemeSurface | undefined>(
    props.surface
  )

  const {
    scope: scopeProp,
    noInline,
    noFragments = true,
    language = 'jsx',
    background,
    omitWrapper,
    hideToolbar,

    code: codeProp,
    hideCode: hideCodeProp,
    hidePreview: hidePreviewProp,
    surface: surfaceProp,
    'data-visual-test': visualTest,

    ...restProps
  } = props

  const scope = useMemo(() => scopeProp || {}, [scopeProp])
  const theme = context.theme || {}
  const inheritedDark = theme.colorScheme === 'dark'

  const codeToUse = useMemo(() => {
    const code =
      typeof props.code === 'string' ? prepareCode(props.code) : ''

    if (code.trim().length === 0) {
      return 'No Code provided'
    }

    return code
  }, [props.code])

  return (
    <div
      className={clsx(
        liveCodeEditorStyle,
        hideCode && 'hide-code',
        hidePreview && 'hide-preview',
        omitWrapper && 'omit-wrapper',
        background && `background--${background}`,
        surface && `surface--${surface}`
      )}
    >
      <LiveProvider
        theme={prismTheme}
        code={codeToUse}
        scope={scope}
        language={language}
        transformCode={useCallback(
          (code: string) =>
            !noInline && noFragments ? `<>${code}</>` : code,
          [noInline, noFragments]
        )}
        noInline={noInline}
        {...restProps}
      >
        {!hidePreview && (
          <Theme colorScheme={colorScheme} surface={surface}>
            {omitWrapper ? (
              <LivePreview
                className={clsx('dnb-live-preview')}
                data-visual-test={visualTest}
              />
            ) : (
              <div className={clsx('example-box', exampleBoxStyle)}>
                <LivePreview
                  className={clsx('dnb-live-preview')}
                  data-visual-test={visualTest}
                />
              </div>
            )}
          </Theme>
        )}

        {!global.IS_TEST && !hideToolbar && (
          <Space
            element="section"
            aria-label="Customize appearance"
            className={clsx('dnb-live-toolbar', toolbarStyle)}
          >
            {(omitWrapper && (
              <Button
                variant="tertiary"
                icon={hideCode ? 'chevron_down' : 'chevron_up'}
                onClick={() => setHideCode((checked) => !checked)}
                size="medium"
                left
              >
                {hideCode ? 'Show Code' : 'Hide Code'}
              </Button>
            )) || (
              <>
                {hideCodeProp && (
                  <ToggleButton
                    checked={!hideCode}
                    onChange={({ checked }) => setHideCode(!checked)}
                    size="medium"
                  >
                    {hideCode ? 'Show Code' : 'Hide Code'}
                  </ToggleButton>
                )}

                {hidePreviewProp && (
                  <ToggleButton
                    checked={!hidePreview}
                    onChange={({ checked }) => setHidePreview(!checked)}
                    size="medium"
                  >
                    Preview
                  </ToggleButton>
                )}

                {(process.env.NODE_ENV === 'development' ||
                  process.env.GATSBY_IS_PREVIEW === 'true') && (
                  <Checkbox
                    checked={
                      colorScheme === (inheritedDark ? 'light' : 'dark')
                    }
                    onChange={({ checked }) => {
                      setColorScheme(
                        checked
                          ? inheritedDark
                            ? 'light'
                            : 'dark'
                          : undefined
                      )
                    }}
                    size="medium"
                    label={inheritedDark ? 'Light mode' : 'Dark mode'}
                  />
                )}

                {surfaceProp === 'dark' && (
                  <Checkbox
                    checked={colorScheme !== 'dark' && surface === 'dark'}
                    onChange={({ checked }) =>
                      setSurface(checked ? 'dark' : undefined)
                    }
                    size="medium"
                    label="Dark surface"
                  />
                )}
              </>
            )}
          </Space>
        )}

        {!global.IS_TEST && !hideCode && (
          <Space
            title="Code Editor"
            element="section"
            className={clsx(
              'dnb-live-editor',
              createSkeletonClass('code', context.skeleton)
            )}
            ref={editorElementRef}
          >
            <LiveEditor
              prism={Prism}
              id={idRef.current}
              tabMode={tabMode}
              className="dnb-live-editor__editable dnb-pre"
            />
          </Space>
        )}

        <LiveError className="dnb-form-status dnb-form-status__text dnb-form-status--error" />
      </LiveProvider>
    </div>
  )
}

/** Removes the last token from a code example if it's empty. */
const cleanTokens = (tokens) => {
  const tokensLength = tokens.length
  if (tokensLength === 0) {
    return tokens
  }
  const lastToken = tokens[tokensLength - 1]
  if (lastToken.length === 1 && lastToken[0].empty) {
    return tokens.slice(0, tokensLength - 1)
  }
  return tokens
}

Prism.languages.insertBefore('jsx', 'template-string', {
  'styled-template-string': {
    pattern:
      /(styled(\.\w+|\([^)]*\))(\.\w+(\([^)]*\))*)*|css|injectGlobal|keyframes|css={)`(?:\$\{[^}]+\}|\\\\|\\?[^\\])*?`/,
    lookbehind: true,
    greedy: true,
    inside: {
      interpolation: {
        pattern: /\$\{[^}]+\}/,
        inside: {
          'interpolation-punctuation': {
            pattern: /^\$\{|\}$/,
            alias: 'punctuation',
          },
          rest: Prism.languages.jsx,
        },
      },
      string: {
        pattern: /[^$;]+/,
        inside: Prism.languages.css,
        alias: 'language-css',
      },
    },
  },
})
