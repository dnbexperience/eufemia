import React, { useCallback } from 'react'
import { Div, H3, Hr, P } from '../../../../elements'
import { Flex, FormStatus, HelpButton } from '../../../../components'
import Field, { Ajv, Form, Iterate, Value, Wizard } from '../../Forms'
import { InfoOverlay, Visibility, useData } from '../../Form'
import WizardContainer from '../Container/WizardContainer'
import FormHandler from '../../Form/Handler/Handler'
import addFormats from 'ajv-formats'
import { Toolbar } from '../../Iterate'

export default {
  title: 'Eufemia/Extensions/Forms/WizardContainerDebug',
}

const MainSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  $id: 'urn:dnb:codd:dkt:as/Main',
  type: 'object',
  title: 'DKT AS',
  additionalProperties: false,
  unevaluatedProperties: false,
  required: [
    'mainContactPerson',
    'contactInformation',
    'businessActivities',
    'internationalTransactions',
    'mainBank',
    'customerRelationshipFunds',
    'ownershipAndControl',
    'shareClasses',
    'directOwnership',
    'beneficialOwners',
    'pep',
  ],
  properties: {
    mainContactPerson: {
      $schema: 'https://json-schema.org/draft/2020-12/schema',
      type: 'object',
      required: [
        'firstName',
        'lastName',
        'dateOfBirth',
        'phoneNumber',
        'emailAddress',
      ],
      properties: {
        dateOfBirth: {
          type: 'string',
          format: 'date',
        },
        firstName: {
          type: 'string',
          maxLength: 30,
        },
        lastName: {
          type: 'string',
          maxLength: 30,
        },
        phoneNumber: {
          type: 'string',
          minLength: 8,
          maxLength: 20,
        },
        emailAddress: {
          type: 'string',
          format: 'email',
        },
      },
    },
    contactInformation: {
      $schema: 'https://json-schema.org/draft/2020-12/schema',
      type: 'object',
      required: ['phoneNumber', 'emailAddress'],
      properties: {
        phoneNumber: {
          type: 'string',
        },
        emailAddress: {
          type: 'string',
          format: 'email',
        },
        webAddress: {
          type: 'string',
        },
      },
    },
    businessActivities: {
      $schema: 'https://json-schema.org/draft/2020-12/schema',
      type: 'object',
      required: [
        'virtualCurrencyActivities',
        'financialAuthorityObligation',
        'paymentServices',
      ],
      properties: {
        virtualCurrencyActivities: {
          type: 'boolean',
        },
        financialAuthorityObligation: {
          type: 'boolean',
        },
        paymentServices: {
          type: 'boolean',
        },
      },
    },
    internationalTransactions: {
      $schema: 'https://json-schema.org/draft/2020-12/schema',
      type: 'object',
      required: ['hasInternationalTransactions'],
      additionalProperties: false,
      properties: {
        hasInternationalTransactions: {
          type: 'boolean',
        },
        transactions: {
          type: 'array',
          minItems: 1,
          items: {
            type: 'object',
            additionalProperties: false,
            unevaluatedProperties: false,
            required: [
              'type',
              'country',
              'purpose',
              'expectedNumberOfTransactionsPerMonth',
              'expectedTotalAmountPerMonth',
            ],
            properties: {
              type: {
                type: 'array',
                minItems: 1,
                maxItems: 2,
                items: {
                  type: 'string',
                  enum: ['SEND', 'RECEIVE'],
                },
              },
              country: {
                type: 'string',
                minLength: 2,
                maxLength: 2,
              },
              purpose: {
                type: 'array',
                minItems: 1,
                items: {
                  type: 'string',
                  enum: [
                    'GOODS',
                    'SERVICES',
                    'SALARY',
                    'INVESTMENTS',
                    'DIVIDEND',
                    'RENT',
                    'LOAN',
                    'OTHER',
                  ],
                },
              },
              expectedNumberOfTransactionsPerMonth: {
                type: 'integer',
                minimum: 0,
              },
              expectedTotalAmountPerMonth: {
                type: 'integer',
                minimum: 0,
              },
              otherPurpose: {
                type: 'string',
              },
            },
            if: {
              properties: {
                purpose: {
                  type: 'array',
                  contains: {
                    const: 'OTHER',
                  },
                },
              },
            },
            then: {
              required: ['otherPurpose'],
            },
          },
        },
      },
      if: {
        properties: {
          hasInternationalTransactions: {
            const: true,
          },
        },
      },
      then: {
        required: ['transactions'],
      },
    },
    mainBank: {
      $schema: 'https://json-schema.org/draft/2020-12/schema',
      type: 'object',
      additionalProperties: false,
      required: ['isDNBTheCompanysMainBank'],
      properties: {
        isDNBTheCompanysMainBank: {
          type: 'boolean',
        },
        mainBankIfNotDNB: {
          type: 'string',
        },
      },
      if: {
        properties: {
          isDNBTheCompanysMainBank: {
            const: false,
          },
        },
      },
      then: {
        required: ['mainBankIfNotDNB'],
      },
    },

    customerRelationshipFunds: {
      $schema: 'https://json-schema.org/draft/2020-12/schema',
      type: 'object',
      required: [
        'cashManagement',
        'expectedAnnualIncome',
        'primaryIncomeSource',
      ],
      properties: {
        cashManagement: {
          type: 'boolean',
        },
        cashManagementMonthlyTurnover: {
          type: 'integer',
          minimum: 0,
          exclusiveMaximum: 1000000000000,
        },
        expectedAnnualIncome: {
          type: 'integer',
          minimum: 0,
          exclusiveMaximum: 1000000000000,
        },
        primaryIncomeSource: {
          type: 'string',
          enum: [
            'OPERATING_OR_SALES_INCOME',
            'RENTAL_INCOME',
            'RETURN_ON_INVESTMENTS_OR_FINANCIAL_PLACEMENTS',
            'COLLECTION_OR_GIFTS',
            'OTHER',
          ],
        },
        primaryIncomeSourceOtherComment: {
          type: 'string',
          maxLength: 200,
        },
        otherIncomeSource: {
          type: 'array',
          minItems: 1,
          maxItems: 3,
          items: {
            type: 'string',
            enum: [
              'OPERATING_OR_SALES_INCOME',
              'RENTAL_INCOME',
              'RETURN_ON_INVESTMENTS_OR_FINANCIAL_PLACEMENTS',
              'COLLECTION_OR_GIFTS',
              'OTHER',
            ],
          },
        },
        otherIncomeSourceOtherComment: {
          type: 'string',
          maxLength: 200,
        },
      },
      allOf: [
        {
          if: {
            properties: {
              cashManagement: {
                const: true,
              },
            },
          },
          then: {
            required: ['cashManagementMonthlyTurnover'],
          },
        },
        {
          if: {
            properties: {
              primaryIncomeSource: {
                const: 'OTHER',
              },
            },
          },
          then: {
            required: ['primaryIncomeSourceOtherComment'],
          },
        },
        {
          if: {
            required: ['otherIncomeSource'],
            properties: {
              otherIncomeSource: {
                type: 'array',
                contains: {
                  const: 'OTHER',
                },
              },
            },
          },
          then: {
            required: ['otherIncomeSourceOtherComment'],
          },
        },
      ],
    },
  },
}

function FormEntry() {
  const ajv = new Ajv({
    strict: true,
    allErrors: true,
    strictRequired: false,
  })

  addFormats(ajv)

  const onSubmitHandler = async (data: Partial<any>) => {
    console.log('onSubmitHandler', data)
  }
  const data = undefined
  return (
    <FormHandler
      id="as"
      //defaultData={data.initialData}
      schema={MainSchema}
      ajvInstance={ajv}
      onSubmit={onSubmitHandler}
    >
      <FormContents data={data} />
    </FormHandler>
  )
}

function BusinessActivitiesView() {
  return (
    <Form.Section.ViewContainer variant="basic">
      <Value.SummaryList layout="vertical">
        <Value.String
          value={'test'.toString()}
          label={'BusinessActivities.questions.numberOfEmployees'}
        />
        {/* Need to make two summaryList element, since Div is not a Value component. Adding Div to SummaryList gives warnings in console. */}
      </Value.SummaryList>
      <Div bottom="medium" style={{ color: 'grey', fontSize: 'small' }}>
        text
      </Div>
      <Value.SummaryList layout="vertical">
        <HelpButton
          title={'BusinessActivities.helpText.virtualCurrencies.header'}
        >
          {'BusinessActivities.helpText.virtualCurrencies.text'}
        </HelpButton>
        <Value.Boolean
          path="/virtualCurrencyActivities"
          showEmpty
          label={'BusinessActivities.questions.virtualCurrencies'}
        />
        <HelpButton
          title={'BusinessActivities.helpText.paymentServices.header'}
        >
          {'BusinessActivities.helpText.paymentServices.text'}
        </HelpButton>
        <Value.Boolean
          path="/paymentServices"
          showEmpty
          label={'BusinessActivities.questions.paymentServices'}
        />
        <HelpButton
          title={
            'BusinessActivities.helpText.subjectToRegistration.header'
          }
        >
          {'BusinessActivities.helpText.subjectToRegistration.text'}
        </HelpButton>
        <Value.Boolean
          path="/financialAuthorityObligation"
          showEmpty
          label={'BusinessActivities.questions.subjectToRegistration'}
        />
      </Value.SummaryList>
    </Form.Section.ViewContainer>
  )
}

function BusinessAcitivitesEdit() {
  return (
    <Form.Section.EditContainer variant="basic">
      <Value.String
        value={''.toString()}
        label={'BusinessActivities.questions.numberOfEmployees'}
      />
      <Div bottom="medium" style={{ color: 'grey', fontSize: 'small' }}>
        {'BusinessActivities.numberOfEmployeesExplanation'}
      </Div>
      <Field.Boolean
        path="/virtualCurrencyActivities"
        label={'BusinessActivities.questions.virtualCurrencies'}
        variant="buttons"
        help={{
          title: 'BusinessActivities.helpText.virtualCurrencies.header',
          content: 'BusinessActivities.helpText.virtualCurrencies.text',
        }}
      />
      <Field.Boolean
        path="/paymentServices"
        label={'BusinessActivities.questions.paymentServices'}
        variant="buttons"
        help={{
          title: 'BusinessActivities.helpText.paymentServices.header',
          content: 'BusinessActivities.helpText.paymentServices.text',
        }}
      />
      <Field.Boolean
        path="/financialAuthorityObligation"
        label={'BusinessActivities.questions.subjectToRegistration'}
        variant="buttons"
        help={{
          title:
            'BusinessActivities.helpText.subjectToRegistration.header',
          content:
            'BusinessActivities.helpText.subjectToRegistration.text',
        }}
      />
    </Form.Section.EditContainer>
  )
}

function BusinessActivitiesSection(props: any) {
  return (
    <Form.Section {...props} path="/businessActivities">
      <Form.MainHeading bottom="1rem" left="0">
        MainHeading
      </Form.MainHeading>
      <P bottom="2rem">Paragraph</P>
      <Form.Card>
        <BusinessActivitiesView />
        <BusinessAcitivitesEdit />
      </Form.Card>
    </Form.Section>
  )
}

function ContactInformationView() {
  return (
    <Form.Section.ViewContainer variant="basic">
      <Value.SummaryList layout="horizontal">
        <Value.PhoneNumber
          label={'ContactInformation.phoneNumber'}
          path="/phoneNumber"
          showEmpty
        />
        <Value.Email
          label={'ContactInformation.emailAddress'}
          path="/emailAddress"
          showEmpty
        />
        <Value.String
          label={'ContactInformation.webAddress'}
          path="/webAddress"
          showEmpty
        />
      </Value.SummaryList>
    </Form.Section.ViewContainer>
  )
}

function ContactInformationEdit() {
  return (
    <Form.Section.EditContainer variant="basic">
      <Field.PhoneNumber
        path="/phoneNumber"
        countries="Prioritized"
        label={'ContactInformation.phoneNumber'}
      />
      <Field.Email
        placeholder={'ContactInformation.emailAddress'}
        label={<>"ContactInformation.emailAddress" :</>}
        path="/emailAddress"
      />

      <Field.String
        label={'ContactInformation.webAddress'}
        path="/webAddress"
      />
    </Form.Section.EditContainer>
  )
}

function ContactInformationSection(props: any) {
  return (
    <Form.Section {...props} path="/contactInformation">
      <Form.MainHeading bottom="1rem" left="0">
        "ContactInformation.heading"
      </Form.MainHeading>
      <P bottom="2rem">"ContactInformation.lead"</P>
      <Form.Card>
        <ContactInformationView />
        <ContactInformationEdit />
      </Form.Card>
    </Form.Section>
  )
}

function MainBankEdit() {
  const { update } = useData()

  return (
    <Form.Section>
      <Field.Boolean
        path="/isDNBTheCompanysMainBank"
        label={'MainBank.lead'}
        variant="buttons"
        help={{
          title: 'MainBank.helpTitle',
          content: 'MainBank.helpContent',
        }}
        onChange={(value) => {
          if (!value) {
            update('/mainBank/mainBankIfNotDNB', undefined)
          }
        }}
      />
      <Form.Visibility pathFalse="/isDNBTheCompanysMainBank" animate>
        <Field.String
          path="/mainBankIfNotDNB"
          label={'MainBank.otherBank'}
        />
      </Form.Visibility>
    </Form.Section>
  )
}

function mapOptions(options: any): any {
  return Object.keys(options).map((key) => ({
    value: key,
    title: options[key],
  }))
}

function CustomerRelationshipFundsEdit() {
  return (
    <Form.Section>
      <Div bottom="medium">
        <H3 size="medium" bottom="x-small" top="xx-small">
          "CustomerRelationshipFunds.cashManagement.heading"
        </H3>
        <Field.Boolean
          path="/cashManagement"
          label={'texts.cashManagement.question'}
          variant="buttons"
          help={{
            title: 'texts.cashManagement.helpTextTitle',
            content: 'texts.cashManagement.helpText',
          }}
          bottom="small"
        />
        <Form.Visibility pathTrue="/cashManagement" animate>
          <Field.Currency
            width="large"
            path="/cashManagementMonthlyTurnover"
            label={'texts.cashManagement.monthlyTurnover'}
          />
        </Form.Visibility>
      </Div>

      <Div bottom="medium">
        <Field.Currency
          width="large"
          path="/expectedAnnualIncome"
          label={<span>{'fundsTexts.expectedAnnualIncome.text'}</span>}
          help={{
            title: 'fundsTexts.expectedAnnualIncome.helpTextTitle',
            content: 'fundsTexts.expectedAnnualIncome.helpText',
          }}
          bottom="medium"
          errorMessages={{
            type: 'fundsTexts.expectedAnnualIncome.errorMessages.type',
          }}
        />
        <Field.Selection
          label={<span>{'fundsTexts.primaryIncomeSource.text'}</span>}
          help={{
            title: 'fundsTexts.incomeSourceHelp.title',
            content: 'content',
          }}
          variant="button"
          optionsLayout="horizontal"
          path="/primaryIncomeSource"
          data={mapOptions({
            OPERATING_OR_SALES_INCOME: 'Driftsinntekter',
            RENTAL_INCOME: 'Leieinntekter',
            RETURN_ON_INVESTMENTS_OR_FINANCIAL_PLACEMENTS:
              'Avkastning på investeringer / finansielle plasseringer',
            COLLECTION_OR_GIFTS: 'Innsamling/gaver',
            OTHER: 'Annet',
          })}
          bottom="x-small"
        />
        <Form.Visibility
          visibleWhen={{
            path: '/primaryIncomeSource',
            hasValue: (value: string) => value === 'OTHER',
          }}
          animate
        >
          <Field.String
            path="/primaryIncomeSourceOtherComment"
            label={'fundsTexts.primaryIncomeSource.otherSource'}
          />
        </Form.Visibility>
      </Div>
      <Field.ArraySelection
        label={<span>{'fundsTexts.otherIncomeSources.text'}</span>}
        labelDescription={'fundsTexts.otherIncomeSources.subtitle'}
        help={{
          title: 'fundsTexts.incomeSourceHelp.heading',
          content: 'content',
        }}
        variant="checkbox-button"
        optionsLayout="horizontal"
        path="/otherIncomeSource"
        data={mapOptions({
          OPERATING_OR_SALES_INCOME: 'Driftsinntekter',
          RENTAL_INCOME: 'Leieinntekter',
          RETURN_ON_INVESTMENTS_OR_FINANCIAL_PLACEMENTS:
            'Avkastning på investeringer / finansielle plasseringer',
          COLLECTION_OR_GIFTS: 'Innsamling/gaver',
          OTHER: 'Annet',
        })}
        bottom="x-small"
        errorMessages={{
          minItems: 'secondaryIncomeSourceErrorMessages.minItems',
          maxItems: 'secondaryIncomeSourceErrorMessages.maxItems',
        }}
      />
      <Form.Visibility
        visibleWhen={{
          path: '/otherIncomeSource',
          hasValue: (values: string[]) =>
            values?.includes('OTHER') ?? false,
        }}
        animate
      >
        <Field.String
          path="/otherIncomeSourceOtherComment"
          label={'fundsTexts.otherIncomeSources.otherSource'}
        />
      </Form.Visibility>
    </Form.Section>
  )
}

function CustomerRelationshipFundsSection(props: any) {
  return (
    <Form.Section {...props} path="/customerRelationshipFunds">
      <Form.MainHeading bottom="1rem" left="0">
        "CustomerRelationshipFunds.heading"
      </Form.MainHeading>
      <Form.Card>
        <CustomerRelationshipFundsEdit />
      </Form.Card>
    </Form.Section>
  )
}

function MainBankSection(props: any) {
  return (
    <Form.Section {...props} path="/mainBank">
      <Form.MainHeading bottom="1rem" left="0">
        "MainBank.heading"
      </Form.MainHeading>
      <Form.Card>
        <MainBankEdit />
      </Form.Card>
    </Form.Section>
  )
}

const View = () => {
  const item = Iterate.useItem()
  const value = item.value as any

  const localeCountry = 'temp'

  return (
    <Iterate.ViewContainer
      toolbar={
        <Toolbar>
          <Iterate.ViewContainer.EditButton />
          <Iterate.ViewContainer.RemoveButton showConfirmDialog />
        </Toolbar>
      }
    >
      <Flex.Horizontal>
        <Visibility
          inferData={() =>
            value?.type?.includes('SEND') &&
            !value?.type?.includes('RECEIVE')
          }
        >
          <P>{'InternationalTransactions.questions.sendTo'}</P>
        </Visibility>
        <Visibility
          inferData={() =>
            !value?.type?.includes('SEND') &&
            value?.type?.includes('RECEIVE')
          }
        >
          <P>{'InternationalTransactions.questions.receiveFrom'}</P>
        </Visibility>
        <Visibility
          inferData={() =>
            value?.type?.includes('SEND') &&
            value?.type?.includes('RECEIVE')
          }
        >
          <P>{'InternationalTransactions.questions.toAndFrom'}</P>
        </Visibility>
      </Flex.Horizontal>
      <P modifier="medium">
        <Flex.Horizontal gap="x-small">
          <Flex.Item></Flex.Item>
        </Flex.Horizontal>
      </P>
      <Value.SummaryList layout="vertical">something</Value.SummaryList>
    </Iterate.ViewContainer>
  )
}

const EditForm = () => {
  return (
    <Flex.Stack>
      <Field.ArraySelection
        optionsLayout="horizontal"
        variant="checkbox-button"
        itemPath="/type"
      >
        <Field.Option
          value="SEND"
          title={'InternationalTransactions.questions.sendTo'}
        />
        <Field.Option
          value="RECEIVE"
          title={'InternationalTransactions.questions.receiveFrom'}
        />
      </Field.ArraySelection>
      <Field.SelectCountry itemPath="/country" />
      <Field.ArraySelection
        itemPath="/purpose"
        label={'InternationalTransactions.questions.purpose'}
      >
        <Field.Option
          label={
            'InternationalTransactions.questions.purposeOptions.GOODS'
          }
          value="GOODS"
        />
        <Field.Option
          label={
            '  InternationalTransactions.questions.purposeOptions.SERVICES'
          }
          value="SERVICES"
        />
        <Field.Option
          label={
            'InternationalTransactions.questions.purposeOptions.SALARY'
          }
          value="SALARY"
        />
        <Field.Option
          label={
            ' InternationalTransactions.questions.purposeOptions.INVESTMENTS'
          }
          value="INVESTMENTS"
        />
        <Field.Option
          label={
            ' InternationalTransactions.questions.purposeOptions.DIVIDEND'
          }
          value="DIVIDEND"
        />
        <Field.Option
          label={'InternationalTransactions.questions.purposeOptions.RENT'}
          value="RENT"
        />
        <Field.Option
          label={'InternationalTransactions.questions.purposeOptions.LOAN'}
          value="LOAN"
        />
        <Field.Option
          label={
            'InternationalTransactions.questions.purposeOptions.OTHER'
          }
          value="OTHER"
        />
      </Field.ArraySelection>
      <Visibility
        visibleWhen={{
          itemPath: '/purpose',
          hasValue: (value?: string[]) => {
            if (!value) {
              return false
            }
            return value?.includes('OTHER')
          },
        }}
      >
        <Field.String
          label={
            'InternationalTransactions.questions.purposeOptions.OTHER'
          }
          itemPath="/otherPurpose"
        />
      </Visibility>
      <Field.Number
        width="small"
        label={
          'InternationalTransactions.questions.expectedNumberOfTransactionsPerMonth'
        }
        itemPath="/expectedNumberOfTransactionsPerMonth"
      />
      <Field.Currency
        label={
          'InternationalTransactions.questions.expectedTotalAmountPerMonth'
        }
        itemPath="/expectedTotalAmountPerMonth"
      />
    </Flex.Stack>
  )
}

const CreateNewEntry = () => {
  return (
    <Iterate.PushContainer
      path="/internationalTransactions/transactions"
      title={'InternationalTransactions.subHeading'}
      openButton={
        <Iterate.PushContainer.OpenButton
          text={'InternationalTransactions.addElement'}
        />
      }
      showOpenButtonWhen={(list) => list.length > 0}
      variant="basic"
      bubbleValidation
    >
      <EditForm />
    </Iterate.PushContainer>
  )
}

const Edit = () => {
  return (
    <Iterate.EditContainer title={'InternationalTransactions.subHeading'}>
      <EditForm />
    </Iterate.EditContainer>
  )
}

function InternationalTransactions() {
  return (
    <Iterate.Array
      path="/internationalTransactions/transactions"
      errorMessages={{
        minItems: 'InternationalTransactions.atLeastOneTransactionMessage',
      }}
    >
      <View />
      <Edit />
    </Iterate.Array>
  )
}

function InternationalTransactionsSection(props: any) {
  const { previousInternationalTransactions, ...rest } = props
  return (
    <Form.Section {...rest} validateInitially>
      <Form.MainHeading bottom="1rem" left="0">
        "InternationalTransactions.heading"
      </Form.MainHeading>
      <Form.Card stack>
        <Field.Boolean
          path="/internationalTransactions/hasInternationalTransactions"
          label={'label'}
          variant="buttons"
        />
        <FormStatus
          size="large"
          text={'InternationalTransactions.helpText'}
          state="info"
        />

        <Visibility pathTrue="/internationalTransactions/hasInternationalTransactions">
          <InternationalTransactions />
          <Hr />
          <CreateNewEntry />
        </Visibility>
      </Form.Card>
    </Form.Section>
  )
}

function FormContents({ data }: any) {
  return (
    <InfoOverlay
      success={{
        title: 'Submit.Success.title',
        description: 'Submit.Success.lead',
        buttonText: 'Submit.Success.backAction',
        buttonClickHandler: () => window.location.assign('/'),
      }}
      error={{
        title: 'Submit.Error.title',
        description: 'Submit.Error.lead',
      }}
    >
      <WizardContainer>
        <Wizard.Step title={"Steps['1']"}>
          <ContactInformationSection />
          {/* <MainContactPersonSection
            persons={data.organization.persons || []}
          /> */}
          <BusinessActivitiesSection />
          <Flex.Horizontal bottom="1rem">
            <Wizard.Buttons />
          </Flex.Horizontal>
        </Wizard.Step>

        <Wizard.Step title={"Steps['2']"}>
          <MainBankSection />
          <CustomerRelationshipFundsSection />
          <InternationalTransactionsSection
            previousInternationalTransactions={undefined}
          />
          <Flex.Horizontal bottom="1rem">
            <Wizard.NextButton />
          </Flex.Horizontal>
        </Wizard.Step>
      </WizardContainer>
    </InfoOverlay>
  )
}

export const Basic = () => {
  return <FormEntry />
}
