import { RuleTester } from 'eslint'
import rule from '../rules/require-component-prefix'

const tester = new RuleTester({
  languageOptions: {
    parser: require('@typescript-eslint/parser'),
    ecmaVersion: 2022,
    sourceType: 'module',
  },
})

tester.run('require-component-prefix', rule, {
  valid: [
    // Correctly prefixed type in a component file
    {
      code: 'export type DatePickerDateType = Date | string',
      filename: '/src/components/date-picker/DatePickerContext.ts',
    },
    // Correctly prefixed interface
    {
      code: 'export interface DatePickerProps { date: string }',
      filename: '/src/components/date-picker/DatePicker.tsx',
    },
    // Correctly prefixed - single-word component
    {
      code: 'export type SliderValue = number',
      filename: '/src/components/slider/types.ts',
    },
    // Name matches the component dir exactly (e.g. "Slider" in "slider/")
    {
      code: 'export type Slider = { value: number }',
      filename: '/src/components/slider/types.ts',
    },
    // Non-component file — rule should not apply
    {
      code: 'export type SomeType = string',
      filename: '/src/shared/helpers.ts',
    },
    // Allowlisted type name
    {
      code: 'export type Store = { data: unknown }',
      filename: '/src/components/accordion/AccordionStore.ts',
      options: [{ allowlist: ['Store'] }],
    },
    // Non-exported type — rule only checks exports
    {
      code: 'type InternalHelper = string',
      filename: '/src/components/date-picker/DatePickerCalc.ts',
    },
    // Fragments directory
    {
      code: 'export type DrawerListProps = { items: string[] }',
      filename: '/src/fragments/drawer-list/DrawerList.tsx',
    },
    // Extensions directory
    {
      code: 'export type FormsFieldProps = { value: string }',
      filename: '/src/extensions/forms/Field.tsx',
    },
    // Multi-word component with multi-word type
    {
      code: 'export type NumberFormatReturnValue = { value: number }',
      filename: '/src/components/number-format/NumberUtils.ts',
    },
    // Enum with correct prefix
    {
      code: 'export enum DatePickerMode { Single, Range }',
      filename: '/src/components/date-picker/types.ts',
    },
  ],
  invalid: [
    // Missing prefix
    {
      code: 'export type DateType = Date | string',
      filename: '/src/components/date-picker/DatePickerContext.ts',
      errors: [{ messageId: 'missingPrefix' }],
    },
    // Missing prefix for interface
    {
      code: 'export interface CalendarDay { date: Date }',
      filename: '/src/components/date-picker/DatePickerCalendar.tsx',
      errors: [{ messageId: 'missingPrefix' }],
    },
    // Generic name without component prefix
    {
      code: 'export type ValueTypes = number | number[]',
      filename: '/src/components/slider/types.ts',
      errors: [{ messageId: 'missingPrefix' }],
    },
    // Wrong prefix
    {
      code: 'export type ModalCloseHandler = () => void',
      filename: '/src/components/popover/types.ts',
      errors: [{ messageId: 'missingPrefix' }],
    },
    // Single-word non-prefixed in multi-word component
    {
      code: 'export type FormatType = string',
      filename: '/src/components/number-format/NumberUtils.ts',
      errors: [{ messageId: 'missingPrefix' }],
    },
    // Enum without correct prefix
    {
      code: 'export enum CalendarView { Month, Year }',
      filename: '/src/components/date-picker/types.ts',
      errors: [{ messageId: 'missingPrefix' }],
    },
  ],
})
