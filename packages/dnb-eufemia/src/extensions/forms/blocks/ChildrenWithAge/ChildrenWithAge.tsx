import React from 'react'
import { Field, Form, Iterate, Value, Wizard } from '../..'
import { Card } from '../../../../components'
import { Lead } from '../../../../elements'
import { Translation, translations } from './ChildrenWithAgeTranslations'
import type { SectionProps } from '../../Form/Section'
import {
  omitSpacingProps,
  pickSpacingProps,
} from '../../../../components/flex/utils'
import { SpacingProps } from '../../../../shared/types'

type Mode = 'edit' | 'summary'
type Variant = Array<'joint-responsibility' | 'daycare'>

export type Props = SectionProps & {
  mode?: Mode
  enableAdditionalQuestions?: Variant
  toWizardStep?: number
} & SpacingProps

export default function ChildrenWithAge({
  mode,
  enableAdditionalQuestions,
  toWizardStep,
  ...props
}: Props) {
  const spacingProps = pickSpacingProps<Props>(props)
  const restProps = omitSpacingProps(props)
  return (
    <Form.Section translations={translations} required {...restProps}>
      {mode === 'summary' ? (
        <SummaryContainer
          toWizardStep={toWizardStep}
          spacingProps={spacingProps}
          enableAdditionalQuestions={enableAdditionalQuestions}
        />
      ) : (
        <EditContainer
          enableAdditionalQuestions={enableAdditionalQuestions}
          spacingProps={spacingProps}
        />
      )}
    </Form.Section>
  )
}

function EditContainer({
  spacingProps,
  enableAdditionalQuestions,
}: Props & {
  spacingProps?: SpacingProps
}) {
  const tr = Form.useTranslation<Translation>()

  return (
    <Card stack {...spacingProps}>
      <Lead>{tr.ChildrenWithAge.hasChildren.title}</Lead>

      <Field.Boolean
        path="/hasChildren"
        label={tr.ChildrenWithAge.hasChildren.fieldLabel}
        variant="buttons"
        errorMessages={{
          required: tr.ChildrenWithAge.hasChildren.required,
        }}
      />

      <Form.Visibility pathTrue="/hasChildren" animate>
        <Field.Number
          path="/countChildren"
          label={tr.ChildrenWithAge.countChildren.fieldLabel}
          errorMessages={{
            minimum: tr.ChildrenWithAge.countChildren.required,
            required: tr.ChildrenWithAge.countChildren.required,
          }}
          width="small"
          minimum={1}
          maximum={20}
          showStepControls
          decimalLimit={0}
          allowNegative={false}
        />

        <Form.Visibility pathTruthy="/countChildren" animate>
          <Iterate.Array
            path="/children"
            countPath="/countChildren"
            countPathTransform={transformAgeItem}
            countPathLimit={20}
            animate
          >
            <Field.Number
              itemPath="/age"
              label={tr.ChildrenWithAge.childrenAge.fieldLabel}
              errorMessages={{
                required: tr.ChildrenWithAge.childrenAge.required,
              }}
              placeholder="0"
              width="small"
              minimum={0}
              maximum={17}
              decimalLimit={0}
              allowNegative={false}
            />
          </Iterate.Array>
        </Form.Visibility>

        {enableAdditionalQuestions?.includes('daycare') && (
          <Field.Boolean
            path="/usesDaycare"
            label={tr.ChildrenWithAge.usesDaycare.fieldLabel}
            variant="buttons"
            errorMessages={{
              required: tr.ChildrenWithAge.usesDaycare.required,
            }}
            help={{
              title: tr.ChildrenWithAge.usesDaycare.fieldLabel,
              content: tr.renderMessage(
                tr.ChildrenWithAge.usesDaycare.helpText
              ),
            }}
          />
        )}

        {enableAdditionalQuestions?.includes('daycare') && (
          <Form.Visibility pathTrue="/usesDaycare" animate>
            <Field.Currency
              path="/daycareExpenses"
              label={tr.ChildrenWithAge.dayCareExpenses.fieldLabel}
              errorMessages={{
                required: tr.ChildrenWithAge.dayCareExpenses.required,
              }}
              minimum={0}
              allowNegative={false}
            />
          </Form.Visibility>
        )}

        {enableAdditionalQuestions?.includes('joint-responsibility') && (
          <Field.Boolean
            path="/hasJointResponsibility"
            label={tr.ChildrenWithAge.hasJointResponsibility.fieldLabel}
            variant="buttons"
            errorMessages={{
              required: tr.ChildrenWithAge.hasJointResponsibility.required,
            }}
          />
        )}
        {enableAdditionalQuestions?.includes('joint-responsibility') && (
          <Form.Visibility pathTrue="/hasJointResponsibility" animate>
            <Field.Currency
              path="/jointResponsibilityExpenses"
              label={
                tr.ChildrenWithAge.jointResponsibilityExpenses.fieldLabel
              }
              errorMessages={{
                required:
                  tr.ChildrenWithAge.jointResponsibilityExpenses.required,
              }}
              minimum={0}
              allowNegative={false}
            />
          </Form.Visibility>
        )}
      </Form.Visibility>
    </Card>
  )
}

function SummaryContainer({
  spacingProps,
  toWizardStep,
}: Props & {
  spacingProps?: SpacingProps
}) {
  const tr = Form.useTranslation<Translation>()

  const { getValue } = Form.useData()
  const hasNoChildren = getValue('/hasChildren') === false

  return (
    <Card stack {...spacingProps}>
      {<Lead>{tr.ChildrenWithAge.hasChildren.title}</Lead>}

      <Value.SummaryList>
        <Value.Boolean
          path="/hasChildren"
          label={tr.ChildrenWithAge.hasChildren.fieldLabel}
        />
        <Form.Visibility pathTrue="/hasChildren">
          <Value.Number
            path="/countChildren"
            label={tr.ChildrenWithAge.countChildren.fieldLabel}
            suffix={tr.ChildrenWithAge.countChildren.suffix}
            maximum={20}
            transformIn={(value) => (hasNoChildren ? 0 : value)}
          />
          <Iterate.Array
            path="/children"
            limit={hasNoChildren ? 0 : undefined}
          >
            <Value.Number
              itemPath="/age"
              label={tr.ChildrenWithAge.childrenAge.fieldLabel}
              suffix={tr.ChildrenWithAge.childrenAge.suffix}
              defaultValue="–"
            />
          </Iterate.Array>
          <Form.Visibility pathDefined="/usesDaycare">
            <Value.Boolean
              label={tr.ChildrenWithAge.usesDaycare.fieldLabel}
              path="/usesDaycare"
            />
            <Form.Visibility pathTrue="/usesDaycare">
              <Value.Currency
                label={tr.ChildrenWithAge.dayCareExpenses.fieldLabel}
                path="/daycareExpenses"
              />
            </Form.Visibility>
          </Form.Visibility>

          <Form.Visibility pathDefined="/hasJointResponsibility">
            <Value.Boolean
              path="/hasJointResponsibility"
              label={tr.ChildrenWithAge.hasJointResponsibility.fieldLabel}
            />
            <Form.Visibility pathTrue="/hasJointResponsibility">
              <Value.Currency
                label={
                  tr.ChildrenWithAge.jointResponsibilityExpenses.fieldLabel
                }
                path="/jointResponsibilityExpenses"
              />
            </Form.Visibility>
          </Form.Visibility>
        </Form.Visibility>
      </Value.SummaryList>

      {typeof toWizardStep === 'number' ? (
        <Wizard.EditButton toStep={toWizardStep} />
      ) : null}
    </Card>
  )
}

const transformAgeItem = ({ value }) =>
  Object.prototype.hasOwnProperty.call(value || {}, 'age')
    ? value
    : { age: undefined }

ChildrenWithAge._supportsSpacingProps = true
