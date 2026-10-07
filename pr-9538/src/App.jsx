import { useState } from 'react'
import {
  Anchor,
  Button,
  Card,
  Checkbox,
  Code,
  Dd,
  Dl,
  Dt,
  Flex,
  H2,
  Hr,
  Li,
  Ol,
  P,
} from '@dnb/eufemia'
import { Field, Form, Value, Wizard } from '@dnb/eufemia/extensions/forms'
import pkg from '../package.json'

const eufemiaVersion = pkg.dependencies['@dnb/eufemia']
const isReleaseBuild = eufemiaVersion.startsWith('https://pkg.pr.new')

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

// Eufemia only shows the submit indicator for async handlers
const slowStepChange = async () => {
  await wait(2000)
}

const slowSubmit = async () => {
  await wait(2000)
}

export default function App() {
  return (
    <Flex.Stack
      gap="large"
      style={{ maxWidth: '56rem', margin: '2rem auto', padding: '0 1rem' }}
    >
      <Form.MainHeading>
        Wizard and Form.SubmitButton changes in the next Eufemia release
      </Form.MainHeading>

      <P>
        This build:{' '}
        <Code>
          {isReleaseBuild
            ? `release PR #9538, commit ${eufemiaVersion.split('@').pop()}`
            : `@dnb/eufemia@${eufemiaVersion} (before this release)`}
        </Code>
      </P>

      <P>
        The same app runs on v11.15.1 and on the build of the release PR{' '}
        <Anchor
          href="https://github.com/dnbexperience/eufemia/pull/9538"
          target="_blank"
        >
          #9538
        </Anchor>
        . Open both and compare. The async handlers wait 2 seconds, so you
        can see which button shows the &quot;Please wait&quot; dots.
      </P>

      <GoingBack />
      <GoingForward />
      <SeveralSubmitButtons />
      <OnClickHandlers />
    </Flex.Stack>
  )
}

function GoingBack() {
  return (
    <Card>
      <Flex.Stack>
        <H2>1. Going back</H2>
        <P>
          PR #9640 and #9668. The Wizard has an async{' '}
          <Code>onStepChange</Code>.
        </P>

        <Ol>
          <Li>Click &quot;Next&quot; twice to reach &quot;Summary&quot;.</Li>
          <Li>Click &quot;Back&quot;, and &quot;Back&quot; again.</Li>
          <Li>
            Go to &quot;Summary&quot; again. Go back with &quot;Edit&quot;,
            with &quot;Step 1&quot; in the list of steps at the top, or with
            &quot;Jump to step 1&quot;.
          </Li>
        </Ol>

        <Expected
          before={
            <>
              The dots show on &quot;Send&quot; on the summary, and on
              &quot;Next&quot; on step 2. It looks like the form is sent or
              moves forward.
            </>
          }
          after={<>The dots show on &quot;Back&quot;.</>}
        />

        <Hr />

        <Form.Handler onSubmit={slowSubmit}>
          <Wizard.Container onStepChange={slowStepChange}>
            <Wizard.Step title="Step 1">
              <P>This is step 1.</P>
              <Wizard.Buttons />
            </Wizard.Step>

            <Wizard.Step title="Step 2">
              <P>This is step 2.</P>
              <Wizard.Buttons />
            </Wizard.Step>

            <Wizard.Step title="Summary">
              <Flex.Horizontal>
                <Wizard.EditButton toStep={0} />
                <JumpButton toStep={0}>
                  Jump to step 1 (setActiveIndex)
                </JumpButton>
              </Flex.Horizontal>

              <Flex.Horizontal>
                <Wizard.Buttons />
                <Form.SubmitButton />
              </Flex.Horizontal>
            </Wizard.Step>
          </Wizard.Container>
        </Form.Handler>
      </Flex.Stack>
    </Card>
  )
}

function GoingForward() {
  return (
    <Card>
      <Flex.Stack>
        <H2>2. Going forward</H2>
        <P>
          PR #9681 and #9683. The Wizard has an async{' '}
          <Code>onStepChange</Code>, and each step also shows a
          &quot;Send&quot; button.
        </P>

        <Ol>
          <Li>Click &quot;Next&quot;.</Li>
          <Li>
            Go back to &quot;Step 1&quot;. Go forward with &quot;Step 3&quot;
            in the list of steps at the top, or with &quot;Jump to step
            3&quot;.
          </Li>
        </Ol>

        <Expected
          before={
            <>
              The dots show on both &quot;Next&quot; and &quot;Send&quot;. It
              looks like the form is sent.
            </>
          }
          after={<>The dots show on &quot;Next&quot; only.</>}
        />

        <Hr />

        <Form.Handler onSubmit={slowSubmit}>
          <Wizard.Container onStepChange={slowStepChange} mode="loose">
            <Wizard.Step title="Step 1">
              <P>This is step 1.</P>
              <JumpButton toStep={2}>
                Jump to step 3 (setActiveIndex)
              </JumpButton>

              <Flex.Horizontal>
                <Wizard.Buttons />
                <Form.SubmitButton />
              </Flex.Horizontal>
            </Wizard.Step>

            <Wizard.Step title="Step 2">
              <P>This is step 2.</P>
              <Flex.Horizontal>
                <Wizard.Buttons />
                <Form.SubmitButton />
              </Flex.Horizontal>
            </Wizard.Step>

            <Wizard.Step title="Step 3">
              <P>This is step 3.</P>
              <Flex.Horizontal>
                <Wizard.Buttons />
                <Form.SubmitButton />
              </Flex.Horizontal>
            </Wizard.Step>
          </Wizard.Container>
        </Form.Handler>
      </Flex.Stack>
    </Card>
  )
}

function SeveralSubmitButtons() {
  return (
    <Card>
      <Flex.Stack>
        <H2>3. Several submit buttons</H2>
        <P>
          PR #9636 and #9639. The form has an async <Code>onSubmit</Code>.
          &quot;Submit from code&quot; uses <Code>Form.useSubmit</Code>,
          like an autosave or a keyboard shortcut would.
        </P>

        <Ol>
          <Li>
            Click &quot;Second&quot; and wait until it is done. Then click
            &quot;Submit from code&quot;.
          </Li>
          <Li>
            Clear &quot;Name&quot; and click &quot;Second&quot;, so the error
            stops it. Type a name and click &quot;Submit from code&quot;.
          </Li>
        </Ol>

        <Expected
          before={
            <>
              Only &quot;Second&quot; shows the dots, because it keeps them
              from the earlier click.
            </>
          }
          after={
            <>Both &quot;First&quot; and &quot;Second&quot; show the dots.</>
          }
        />

        <Hr />

        <Form.Handler onSubmit={slowSubmit} defaultData={{ name: 'Nora' }}>
          <Flex.Stack>
            <Field.String label="Name" path="/name" required />
            <Form.ButtonRow>
              <Form.SubmitButton text="First" />
              <Form.SubmitButton text="Second" />
              <SubmitFromCodeButton />
            </Form.ButtonRow>
          </Flex.Stack>
        </Form.Handler>
      </Flex.Stack>
    </Card>
  )
}

function OnClickHandlers() {
  const [entries, setEntries] = useState([])
  const [returnFalse, setReturnFalse] = useState(false)

  const log = (message) => {
    const time = new Date().toLocaleTimeString('en-GB')
    setEntries((current) => [...current, `${time}  ${message}`])
  }

  const onClick = (name) => () => {
    log(`${name}: onClick${returnFalse ? ' returns false' : ''}`)
    if (returnFalse) {
      return false
    }
  }

  return (
    <Card>
      <Flex.Stack>
        <H2>4. onClick on the built-in buttons</H2>
        <P>
          PR #9569 and #9620. A given <Code>onClick</Code> used to replace
          the action of the button. Now both run, the given one first, and
          returning <Code>false</Code> skips the action.
        </P>

        <Ol>
          <Li>Click &quot;Next&quot;, and &quot;Back&quot; on step 2.</Li>
          <Li>
            Type a name in the isolated field and click &quot;Add&quot;.
          </Li>
          <Li>Check &quot;Return false from onClick&quot; and try again.</Li>
        </Ol>

        <Expected
          before={
            <>
              Only the <Code>onClick</Code> runs. The Wizard stays on the
              step, and &quot;Add&quot; adds nothing. The checkbox makes no
              difference.
            </>
          }
          after={
            <>
              The <Code>onClick</Code> runs, then the step changes or the
              name is added. With the checkbox checked, nothing else
              happens.
            </>
          }
        />

        <Hr />

        <Checkbox
          label="Return false from onClick"
          checked={returnFalse}
          onChange={({ checked }) => setReturnFalse(checked)}
        />

        <Form.Handler>
          <Flex.Stack>
            <Wizard.Container
              onStepChange={(index, mode) =>
                log(`Wizard: onStepChange (${mode}) to step ${index + 1}`)
              }
            >
              <Wizard.Step title="Step 1">
                <P>This is step 1.</P>
                <Form.ButtonRow>
                  <Wizard.NextButton onClick={onClick('Next')} />
                </Form.ButtonRow>
              </Wizard.Step>

              <Wizard.Step title="Step 2">
                <P>This is step 2.</P>
                <Form.ButtonRow>
                  <Wizard.PreviousButton onClick={onClick('Back')} />
                  <Wizard.NextButton onClick={onClick('Next')} />
                </Form.ButtonRow>
              </Wizard.Step>

              <Wizard.Step title="Step 3">
                <P>This is step 3.</P>
                <Form.ButtonRow>
                  <Wizard.PreviousButton onClick={onClick('Back')} />
                </Form.ButtonRow>
              </Wizard.Step>
            </Wizard.Container>

            <Hr />

            <Form.Isolation
              resetDataAfterCommit
              onCommit={(data) =>
                log(`Isolation: onCommit ${JSON.stringify(data)}`)
              }
            >
              <Flex.Stack>
                <Field.String label="Name (isolated)" path="/name" />
                <Form.ButtonRow>
                  <Form.Isolation.CommitButton onClick={onClick('Add')} />
                </Form.ButtonRow>
              </Flex.Stack>
            </Form.Isolation>

            <Value.String
              label="Added name"
              path="/name"
              placeholder="Nothing added yet"
            />
          </Flex.Stack>
        </Form.Handler>

        <Flex.Stack gap="x-small">
          <pre
            style={{
              margin: 0,
              padding: '0.75rem',
              minHeight: '4rem',
              whiteSpace: 'pre-wrap',
              background: 'var(--color-lavender, #f2f2f5)',
            }}
          >
            {entries.length > 0 ? entries.join('\n') : 'Nothing logged yet'}
          </pre>
          <Button variant="tertiary" onClick={() => setEntries([])}>
            Clear log
          </Button>
        </Flex.Stack>
      </Flex.Stack>
    </Card>
  )
}

function JumpButton({ toStep, children }) {
  const { setActiveIndex } = Wizard.useStep()

  return (
    <Button variant="tertiary" onClick={() => setActiveIndex(toStep)}>
      {children}
    </Button>
  )
}

function SubmitFromCodeButton() {
  const { submit } = Form.useSubmit()

  return (
    <Button variant="tertiary" onClick={() => submit()}>
      Submit from code
    </Button>
  )
}

function Expected({ before, after }) {
  return (
    <Dl>
      <Dt>v11.15.1{isReleaseBuild ? '' : ' (this build)'}</Dt>
      <Dd>{before}</Dd>
      <Dt>Release PR #9538{isReleaseBuild ? ' (this build)' : ''}</Dt>
      <Dd>{after}</Dd>
    </Dl>
  )
}
