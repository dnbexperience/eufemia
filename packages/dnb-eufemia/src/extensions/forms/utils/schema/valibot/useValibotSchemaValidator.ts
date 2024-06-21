import { useCallback, useContext, useEffect } from 'react'
import SharedContext from '../../../../../shared/Context'
import translations from '../../../constants/locales'
import {
  CustomErrorMessages,
  CustomErrorMessagesWithPaths,
  Path,
  SchemaValidatorProps,
  SchemaValidatorReturn,
} from '../../../types'
import * as v from 'valibot'

type Locale = keyof typeof translations

export function useValibotSchemaValidator<Data>({
  schema,
  path: identifier,
  dataRef,
  errorMessages,
  setErrors = undefined,
}: SchemaValidatorProps<Data>) {
  const locale = useContext(SharedContext).locale as Locale

  const executeSchemaValidator = useCallback<
    SchemaValidatorReturn['executeSchemaValidator']
  >(() => {
    if (!schema) {
      return
    }

    const result = v.safeParse(
      schema as v.BaseSchema<unknown, unknown, v.BaseIssue<unknown>>,
      dataRef.current
    )

    if (result?.success) {
      setErrors?.(undefined)
    } else {
      const errors = Object.values(result.issues).reduce((acc, issue) => {
        const path = makePath(issue)
        acc[path] = new Error(issue.message)

        return acc
      }, {})

      setErrors?.(errors)

      return errors
    }
  }, [dataRef, schema, setErrors])

  useEffect(() => {
    v.setGlobalMessage((issue) => {
      return getValidationMessage({
        issue,
        locale,
        identifier,
        errorMessages,
      })
    })
  }, [errorMessages, identifier, locale])

  return {
    executeSchemaValidator,
  }
}

export function valibotSchema(
  schema: v.BaseSchema<unknown, unknown, v.BaseIssue<unknown>>
) {
  return () => {
    return { schema, schemaValidator: useValibotSchemaValidator }
  }
}

function getValidationMessage({
  issue,
  locale,
  identifier,
  errorMessages,
}: {
  issue: v.BaseIssue<unknown>
  locale: Locale
  identifier?: Path
  errorMessages?: CustomErrorMessages | CustomErrorMessagesWithPaths
}) {
  const { Field, StringField, NumberField } = translations[locale]
  const requirement = String(issue.requirement)
  const path = makePath(issue) || identifier
  const em = errorMessages as CustomErrorMessages
  // const em = { ...errorMessages?.[path], ...errorMessages } // TODO: remove this if not needed

  switch (issue.received) {
    case 'undefined':
      return em?.required || Field.errorRequired
  }

  switch (issue.type) {
    case 'non_empty':
    case 'non_optional':
      return em?.required || Field.errorRequired
    case 'regex':
      return (em?.pattern || Field.errorPattern).replace(
        '{pattern}',
        requirement
      )

    // - String field
    case 'min_length':
      return (em?.minLength || StringField.errorMinLength).replace(
        '{minLength}',
        requirement
      )
    case 'max_length':
      return (em?.maxLength || StringField.errorMaxLength).replace(
        '{maxLength}',
        requirement
      )

    // - Number field
    case 'min_value':
      return (em?.minimum || NumberField.errorMinimum).replace(
        '{minimum}',
        requirement
      )
    case 'max_value':
      return (em?.maximum || NumberField.errorMaximum).replace(
        '{maximum}',
        requirement
      )
    case 'exclusive_minimum':
      return (
        em?.exclusiveMinimum || NumberField.errorExclusiveMinimum
      ).replace('{exclusiveMinimum}', requirement)
    case 'exclusive_maximum':
      return (
        em?.exclusiveMaximum || NumberField.errorExclusiveMaximum
      ).replace('{exclusiveMaximum}', requirement)
    case 'multiple_of':
      return (em?.multipleOf || NumberField.errorMultipleOf).replace(
        '{multipleOf}',
        requirement
      )
  }

  if (String(issue.message).includes('Invalid type:')) {
    const field = path ? `field at path="${path}"` : 'field'
    const message = `The ${field} value (${issue.input}) type must be ${issue.type}`

    // Warn about the issue
    console.error(message)

    return message
  }

  return issue.message
}

function makePath(issue: v.BaseIssue<unknown>) {
  if (issue.path) {
    return (
      '/' +
      (issue.path
        .reduce((acc, cur) => {
          const { key } = cur as v.ObjectPathItem
          acc.push(key)
          return acc
        }, [] as string[])
        .join('/') || '')
    )
  }
}

export function custom<TInput>(
  check: (input: unknown) => boolean,
  {
    type,
    requirement,
    message,
  }: {
    type: any
    requirement: unknown
    message?: v.ErrorMessage<v.CustomIssue>
  }
): v.CustomSchema<TInput, v.ErrorMessage<v.CustomIssue> | undefined> & {
  type: string
  requirement: unknown
} {
  return {
    ...v.custom(check, message),
    type,
    requirement,
  }
}

export function isValibotSchema(schema: unknown): boolean {
  return (
    Object.prototype.hasOwnProperty.call(schema ?? {}, 'kind') &&
    Object.prototype.hasOwnProperty.call(schema ?? {}, '_run')
  )
}
