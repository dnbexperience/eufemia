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
import { copyToClipboard } from '@dnb/eufemia/src/shared/helpers'
import { getGitHubEditUrl } from '../../../core/githubSource'
import {
  createSuggestEditPrompt,
  type SuggestEditDeployment,
} from '../../../core/suggestEdit'

export default function SuggestEdit() {
  const params =
    typeof window === 'undefined'
      ? new URLSearchParams()
      : new URLSearchParams(window.location.search)
  const page = params.get('page') || '/'
  const sourcePath = params.get('source') || ''
  const pageUrl = new URL(page, 'https://eufemia.dnb.no').toString()

  const defaultData: SuggestEditData = {
    requestedChange: '',
    proposedWording: '',
    includeInReleaseNotes: false,
    deployment: 'regular',
    deadline: '',
    urgencyReason: '',
  }
  const [data, setData] = useState(defaultData)
  const [copied, setCopied] = useState(false)

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
    setCopied(await copyToClipboard(submittedPrompt))
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
          setCopied(false)
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
            autoResize={false}
            required
          />

          <Field.String
            path="/proposedWording"
            label="Proposed wording (optional)"
            labelDescription="Paste the exact replacement text if you already know it."
            width="stretch"
            multiline
            rows={5}
            autoResize={false}
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
                autoResize={false}
                required
              />
            </Flex.Stack>
          </Form.Visibility>

          <p>
            Paste the prompt into your coding agent. You can{' '}
            <Anchor href="/uilib/usage/first-steps/tools/#install-project-skills">
              install the Eufemia skills
            </Anchor>
            {' or '}
            <Anchor href="/uilib/usage/first-steps/tools/#hosted-mcp-server">
              connect the hosted Eufemia MCP server
            </Anchor>{' '}
            to give the agent Eufemia guidance.
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
              icon={copied ? 'check' : 'copy'}
            />
          </Form.ButtonRow>

          {sourcePath && (
            <Accordion title="For developers">
              <Button
                variant="tertiary"
                text="Edit source on GitHub"
                href={getGitHubEditUrl(sourcePath)}
                target="_blank"
                rel="noopener noreferrer"
              />
            </Accordion>
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
