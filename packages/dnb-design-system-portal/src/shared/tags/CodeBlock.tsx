/**
 * Inline Tag
 *
 */

import {
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react'
import type { ReactNode } from 'react'
import clsx from 'clsx'
import { Highlight, Prism } from 'prism-react-renderer'
import Tag from './Tag'
import {
  Accordion,
  Button,
  Checkbox,
  Flex,
  Space,
} from '@dnb/eufemia/src/components'
import {
  copy as copyIcon,
  check as checkIcon,
  fullscreen as focusModeIcon,
  close as focusModeCloseIcon,
  fullscreen as focusModePaddingIcon,
  layout_grid as focusModeCompactIcon,
  launch as launchIcon,
} from '@dnb/eufemia/src/icons'
import { copyToClipboard } from '@dnb/eufemia/src/shared/helpers'
import Theme from '@dnb/eufemia/src/shared/Theme'
import type {
  ThemeColorScheme,
  ThemeSurface,
} from '@dnb/eufemia/src/shared/Theme'

import { Context } from '@dnb/eufemia/src/shared'
import { createSkeletonClass } from '@dnb/eufemia/src/components/skeleton/SkeletonHelper'
import { useFocusModeCode } from '../../core/FocusModeCodeContext'
import {
  liveCodeEditorStyle,
  exampleBoxStyle,
  codeBlockStyle,
  copyButtonStyle,
  showFocusModePaddingStyle,
  toolbarStyle,
} from './CodeBlock.module.scss'
import {
  LiveProvider,
  LiveEditor,
  LiveError,
  LivePreview,
  LiveContext,
} from 'react-live-ssr' // we use this temporary version of until ssr is supported https://github.com/FormidableLabs/react-live/pull/322

// This theme uses CSS custom properties, so actual colors are controlled via CSS
import prismTheme from '@dnb/eufemia/src/style/themes/ui/prism/dnb-prism-theme'
import ChangeStyleTheme from '../../core/ChangeStyleTheme'
import { openInStackBlitz } from './openInStackBlitz'

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
  children: string | ReactNode | (() => ReactNode)
  'data-visual-test'?: string

  /** Injected by the babel transform — enclosing export name, stable across HMR. */
  stableName?: string

  /** Injected by the babel transform — original import statements from the Examples file. */
  sourceImports?: string[]
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
            <CopyCodeButton
              code={String(exampleCode)}
              className={copyButtonStyle}
            />

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

/**
 * Hook for copy-to-clipboard functionality with feedback state.
 * Handles the copied state, timeout cleanup, and async clipboard operation.
 */
function useCopyToClipboard(code: string) {
  const [copied, setCopied] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined)

  const handleCopy = useCallback(async () => {
    const success = await copyToClipboard(code)
    if (success) {
      setCopied(true)
      clearTimeout(timeoutRef.current)
      timeoutRef.current = setTimeout(() => setCopied(false), 2000)
    }
  }, [code])

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current)
  }, [])

  return { copied, handleCopy }
}

type CopyCodeButtonProps = {
  code: string
  className?: string
  variant?: 'tertiary'
}

/**
 * Reusable copy-to-clipboard button with visual feedback.
 * Used both for static code blocks (with copyButtonStyle) and live code toolbar.
 */
function CopyCodeButton({
  code,
  className,
  variant,
}: CopyCodeButtonProps) {
  const { copied, handleCopy } = useCopyToClipboard(code)

  return (
    <Button
      className={className}
      variant={variant}
      icon={copied ? checkIcon : copyIcon}
      title="Copy to clipboard"
      tooltip={copied ? 'Copied!' : 'Copy to clipboard'}
      onClick={handleCopy}
    />
  )
}

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
  const focusModeId = props.stableName
  const baseId = useId()
  const codeAccordionId = `${baseId}-code`
  const previewAccordionId = `${baseId}-preview`

  const [hideCode, setHideCode] = useState(props.hideCode)
  const [hidePreview, setHidePreview] = useState(props.hidePreview)
  const [showFocusModePadding, setShowFocusModePadding] = useState(true)
  const [editedCode, setEditedCode] = useState<string | null>(null)
  const [colorScheme, setColorScheme] = useState<
    ThemeColorScheme | undefined
  >(undefined)
  const [surface, setSurface] = useState<ThemeSurface | undefined>(
    props.surface
  )

  const { focusModeCodeId, setFocusModeCodeId, savedScrollY } =
    useFocusModeCode()
  const isInFocusMode = focusModeCodeId === focusModeId
  const anotherBlockIsInFocusMode =
    focusModeCodeId !== null && !isInFocusMode
  const wrapperRef = useRef<HTMLDivElement>(null)

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
    stableName: _stableName,
    sourceImports,

    ...restProps
  } = props

  const scope = useMemo(() => scopeProp || {}, [scopeProp])
  const theme = context.theme || {}

  // During SSR, colorScheme resolves to 'light' (no matchMedia).
  // The blocking script may flip it to 'dark' before hydration,
  // so we defer the resolved value to avoid a text mismatch
  // ("Dark mode" vs "Light mode").
  const [inheritedDark, setInheritedDark] = useState(false)
  useEffect(() => {
    setInheritedDark(theme.colorScheme === 'dark')
  }, [theme.colorScheme])

  // Hide sibling DOM elements in focus mode so only this code block is visible.
  useEffect(() => {
    if (!isInFocusMode) {
      return // stop here
    }

    const el = wrapperRef.current
    if (!el) {
      return // stop here
    }

    document.documentElement.setAttribute('data-code-focus-mode', 'true')

    const hidden: HTMLElement[] = []
    let current = el as HTMLElement

    while (current.parentElement) {
      const parent = current.parentElement

      for (const sibling of Array.from(parent.children)) {
        if (sibling !== current && sibling instanceof HTMLElement) {
          sibling.setAttribute('data-prev-display', sibling.style.display)
          sibling.style.display = 'none'
          hidden.push(sibling)
        }
      }

      if (parent.id === 'dnb-app-content' || parent === document.body) {
        break
      }

      current = parent
    }

    window.scrollTo({ top: 0 })

    // Remove the preload style now that sibling hiding has taken over
    document.getElementById('portal-preload-style')?.remove()

    return () => {
      document.documentElement.removeAttribute('data-code-focus-mode')

      for (const el of hidden) {
        el.style.display = el.getAttribute('data-prev-display') || ''
        el.removeAttribute('data-prev-display')
      }
    }
  }, [isInFocusMode, savedScrollY])

  const codeToUse = useMemo(() => {
    const code =
      typeof props.code === 'string' ? prepareCode(props.code) : ''

    if (code.trim().length === 0) {
      return 'No Code provided'
    }

    return code
  }, [props.code])

  const transformCode = useCallback(
    (code: string) => (!noInline && noFragments ? `<>${code}</>` : code),
    [noInline, noFragments]
  )

  const canToggleFocusModePadding =
    isInFocusMode && !omitWrapper && !hidePreview

  const focusModeButton = (
    <Button
      onClick={() => {
        if (!isInFocusMode) {
          savedScrollY.current = window.scrollY

          try {
            sessionStorage.setItem('scroll-window', String(window.scrollY))
          } catch {
            // ignore
          }

          window.scrollTo({ top: 0 })
        }

        setFocusModeCodeId(isInFocusMode ? null : focusModeId)
      }}
      variant="tertiary"
      tooltip={isInFocusMode ? 'Quit focus mode' : 'Focus mode'}
      aria-label={isInFocusMode ? 'Quit focus mode' : 'Focus mode'}
      icon={isInFocusMode ? focusModeCloseIcon : focusModeIcon}
    />
  )

  const copyCodeButton = (
    <CopyCodeButton code={editedCode ?? codeToUse} variant="tertiary" />
  )

  const handleOpenInStackBlitz = useCallback(async () => {
    const codeToOpen = editedCode ?? codeToUse
    await openInStackBlitz(codeToOpen, sourceImports)
  }, [editedCode, codeToUse, sourceImports])

  const openInStackBlitzButton = (
    <Button
      onClick={handleOpenInStackBlitz}
      variant="tertiary"
      tooltip="Open in StackBlitz"
      aria-label="Open in StackBlitz"
      icon={launchIcon}
    />
  )

  const focusModePaddingButton = canToggleFocusModePadding && (
    <Button
      onClick={() =>
        setShowFocusModePadding((currentValue) => !currentValue)
      }
      variant="tertiary"
      tooltip={
        showFocusModePadding
          ? 'Hide preview padding'
          : 'Show preview padding'
      }
      aria-label={
        showFocusModePadding
          ? 'Hide preview padding'
          : 'Show preview padding'
      }
      aria-pressed={showFocusModePadding}
      icon={
        showFocusModePadding ? focusModePaddingIcon : focusModeCompactIcon
      }
    />
  )

  const codeEditor = (
    <Space
      title="Make changes to see them live!"
      element="section"
      className={clsx(
        'dnb-live-editor',
        createSkeletonClass('code', context.skeleton)
      )}
    >
      <LiveCodeEditor onCodeChange={setEditedCode} />
    </Space>
  )

  const previewContent = (
    <Theme colorScheme={colorScheme} surface={surface}>
      {omitWrapper ? (
        <LivePreview
          className={clsx('dnb-live-preview')}
          data-visual-test={visualTest}
        />
      ) : (
        <div
          className={clsx(
            'example-box',
            exampleBoxStyle,
            showFocusModePadding && showFocusModePaddingStyle
          )}
        >
          <LivePreview
            className={clsx('dnb-live-preview')}
            data-visual-test={visualTest}
          />
        </div>
      )}
    </Theme>
  )

  // The code editor is collapsible via an Accordion whenever a toggle is
  // rendered in the toolbar (always for omitWrapper, or when hideCode is set).
  // Without a toolbar there is no toggle, so the editor renders directly.
  const showCodeToggle = !hideToolbar && (omitWrapper || hideCodeProp)

  const codeToggleAccordion = (
    <Accordion
      variant="tertiary"
      id={codeAccordionId}
      expanded={!hideCode}
      onChange={({ expanded }) => setHideCode(!expanded)}
      title="Code"
    />
  )

  const previewToggleAccordion = (
    <Accordion
      variant="tertiary"
      id={previewAccordionId}
      expanded={!hidePreview}
      onChange={({ expanded }) => setHidePreview(!expanded)}
      title="Preview"
    />
  )

  return (
    <div
      ref={wrapperRef}
      id={focusModeId}
      className={clsx(
        liveCodeEditorStyle,
        hideCode && 'hide-code',
        hidePreview && 'hide-preview',
        omitWrapper && 'omit-wrapper',
        background && `background--${background}`,
        surface && `surface--${surface}`
      )}
    >
      {!anotherBlockIsInFocusMode && (
        <LiveProvider
          theme={prismTheme}
          code={codeToUse}
          scope={scope}
          language={language}
          transformCode={transformCode}
          noInline={noInline}
          {...restProps}
        >
          {!omitWrapper && hidePreviewProp ? (
            <Accordion.Content connectedTo={previewAccordionId}>
              {previewContent}
            </Accordion.Content>
          ) : (
            !hidePreview && previewContent
          )}

          {!global.IS_TEST && !hideToolbar && (
            <Space
              element="section"
              aria-label="Customize appearance"
              className={clsx('dnb-live-toolbar', toolbarStyle)}
            >
              {omitWrapper ? (
                codeToggleAccordion
              ) : (
                <>
                  {hideCodeProp && codeToggleAccordion}

                  {isInFocusMode && (
                    <ChangeStyleTheme
                      variant="button"
                      size="medium"
                      optionsLayout="horizontal"
                      labelSrOnly
                    />
                  )}

                  <Flex.Horizontal align="center">
                    {!hidePreview && (
                      <Checkbox
                        checked={
                          colorScheme ===
                          (inheritedDark ? 'light' : 'dark')
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

                    {hidePreviewProp && previewToggleAccordion}

                    {surfaceProp === 'dark' && (
                      <Checkbox
                        checked={
                          colorScheme !== 'dark' && surface === 'dark'
                        }
                        onChange={({ checked }) =>
                          setSurface(checked ? 'dark' : undefined)
                        }
                        size="medium"
                        label="Dark surface"
                      />
                    )}

                    {!isInFocusMode && copyCodeButton}

                    {!isInFocusMode && openInStackBlitzButton}

                    {focusModePaddingButton}

                    {focusModeButton}
                  </Flex.Horizontal>
                </>
              )}
            </Space>
          )}

          {!global.IS_TEST &&
            (showCodeToggle ? (
              <Accordion.Content connectedTo={codeAccordionId}>
                {codeEditor}
              </Accordion.Content>
            ) : (
              !hideCode && codeEditor
            ))}

          <LiveError className="dnb-form-status dnb-form-status__text dnb-form-status--error" />
        </LiveProvider>
      )}
    </div>
  )
}

/**
 * Wrapper component that combines the LiveContext onChange with external tracking.
 * This ensures editing code updates the preview AND tracks the edited code for e.g. copying.
 */
function LiveCodeEditor({
  onCodeChange,
}: {
  onCodeChange: (code: string) => void
}) {
  const { onChange: contextOnChange } = useContext(LiveContext)

  const handleChange = useCallback(
    (code: string) => {
      contextOnChange(code)
      onCodeChange(code)
    },
    [contextOnChange, onCodeChange]
  )

  return (
    <LiveEditor
      prism={Prism}
      tabMode="focus"
      className="dnb-live-editor__editable dnb-pre"
      onChange={handleChange}
    />
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
