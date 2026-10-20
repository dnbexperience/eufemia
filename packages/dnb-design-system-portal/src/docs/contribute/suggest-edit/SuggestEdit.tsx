import { useMemo, useState } from 'react'
import {
  Accordion,
  Anchor,
  Button,
  Flex,
  FormStatus,
  Textarea,
} from '@dnb/eufemia/src'
import { Field, Form } from '@dnb/eufemia/src/extensions/forms'
import { check, copy } from '@dnb/eufemia/src/icons'
import { copyToClipboard } from '@dnb/eufemia/src/shared/helpers'
import useCanUseDOM from '@dnb/eufemia/src/shared/helpers/useCanUseDOM'
import { getGitHubEditUrl } from '../../../core/githubSource'
import {
  createSuggestEditPrompt,
  parseSuggestEditQuery,
  type SuggestEditDeployment,
} from '../../../core/suggestEdit'

export default function SuggestEdit() {
  // The page is prerendered without the query, so it is read after hydration
  const { page, pageUrl, sourcePath } = parseSuggestEditQuery(
    useCanUseDOM() ? window.location.search : ''
  )

  const defaultData: SuggestEditData = {
    requestedChange: '',
    proposedWording: '',
    includeInReleaseNotes: false,
    deployment: 'regular',
    deadline: '',
    urgencyReason: '',
  }
  const [data, setData] = useState(defaultData)
  const [copyStatus, setCopyStatus] = useState<'copied' | 'failed'>(null)
  const [copyCount, setCopyCount] = useState(0)
  const copied = copyStatus === 'copied'

  const prompt = useMemo(() => {
    return createSuggestEditPrompt({
      pageUrl,
      sourcePath,
      ...data,
    })
  }, [data, pageUrl, sourcePath])

  const handleCopy = async (submittedData: SuggestEditData) => {
    const submittedPrompt = createSuggestEditPrompt({
      pageUrl,
      sourcePath,
      ...submittedData,
    })
    // copyToClipboard returns an error or a message when it fails
    const success = (await copyToClipboard(submittedPrompt)) === true
    setCopyStatus(success ? 'copied' : 'failed')
    setCopyCount((count) => count + 1)
  }

  return (
    <Flex.Stack gap="large" top="medium" bottom="large">
      <FormStatus state="information">
        Page: <Anchor href={page}>{page}</Anchor>
      </FormStatus>

      <Form.Handler
        defaultData={defaultData}
        onChange={(data) => {
          setData(data)
          setCopyStatus(null)
        }}
        onSubmit={handleCopy}
      >
        <Flex.Stack gap="large">
          <Field.String
            path="/requestedChange"
            label="What should change?"
            labelDescription="Describe what is wrong or outdated, and what the page should communicate instead."
            width="stretch"
            multiline
            rows={4}
            required
          />

          <Field.String
            path="/proposedWording"
            label="Proposed wording (optional)"
            labelDescription="Paste the exact replacement text if you already know it."
            width="stretch"
            multiline
            rows={5}
          />

          <Field.Boolean
            path="/includeInReleaseNotes"
            variant="checkbox"
            label="Mention this in the release notes"
            labelDescription="Choose this when the change should be visible in the next Eufemia release summary."
          />

          <Field.Selection
            path="/deployment"
            variant="radio"
            label="When should it be published?"
          >
            <Field.Option
              value="regular"
              title="With the next regular release"
            />
            <Field.Option
              value="portal-only"
              title="Earlier than the next release"
            />
          </Field.Selection>

          <Form.Visibility
            visibleWhen={{
              path: '/deployment',
              hasValue: 'portal-only',
            }}
            animate
          >
            <Flex.Stack gap="small">
              <Field.Date
                path="/deadline"
                label="Desired publication date"
                required
              />
              <Field.String
                path="/urgencyReason"
                label="Why is the earlier publication needed?"
                labelDescription="Give maintainers the context they need to evaluate a portal-only deployment."
                width="stretch"
                multiline
                rows={3}
                required
              />
            </Flex.Stack>
          </Form.Visibility>

          <p>
            Paste the prompt into your coding agent. For Eufemia guidance,{' '}
            <Anchor href="/working-with-ai/ai-skills#install-project-skills">
              install the Eufemia skills
            </Anchor>
            {' or '}
            <Anchor href="/working-with-ai/mcp-universe#hosted-mcp-server">
              connect the hosted Eufemia MCP server
            </Anchor>
            .
          </p>

          <Accordion title="Preview prompt" variant="filled">
            <Textarea
              label="Generated prompt"
              labelSrOnly
              rows={14}
              stretch
              readOnly
              value={prompt}
            />
          </Accordion>

          <Form.ButtonRow>
            <Form.SubmitButton
              text={copied ? 'Prompt copied' : 'Copy prompt'}
              icon={copied ? check : copy}
            />
          </Form.ButtonRow>

          {copyStatus === 'failed' && (
            // A new key per attempt lets screen readers announce it again
            <FormStatus key={copyCount} state="error">
              Could not copy the prompt. Open &quot;Preview prompt&quot;
              and copy it from there.
            </FormStatus>
          )}

          {sourcePath && (
            <Button
              variant="tertiary"
              text="Edit source on GitHub"
              href={getGitHubEditUrl(sourcePath)}
              target="_blank"
              rel="noopener noreferrer"
            />
          )}
        </Flex.Stack>
      </Form.Handler>
    </Flex.Stack>
  )
}

type SuggestEditData = {
  requestedChange: string
  proposedWording: string
  includeInReleaseNotes: boolean
  deployment: SuggestEditDeployment
  deadline: string
  urgencyReason: string
}
