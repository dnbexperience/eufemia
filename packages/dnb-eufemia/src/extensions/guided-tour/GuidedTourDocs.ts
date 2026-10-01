import type { PropertiesTableProps } from '../../shared/types'

export const GuidedTourProperties: PropertiesTableProps = {
  open: {
    doc: 'Whether the tour is shown.',
    type: 'boolean',
    status: 'required',
  },
  steps: {
    doc: 'The steps of the tour. See [step properties](#step-properties).',
    type: 'Array<GuidedTourStep>',
    status: 'required',
  },
  intro: {
    doc: 'Shown in a Dialog before the first step, with a start and a skip button.',
    type: '{ title?: React.ReactNode, content: React.ReactNode }',
    status: 'optional',
  },
  outro: {
    doc: 'Shown in a Dialog after the last step.',
    type: '{ title?: React.ReactNode, content: React.ReactNode }',
    status: 'optional',
  },
}

export const GuidedTourStepProperties: PropertiesTableProps = {
  id: {
    doc: 'Stable identifier of the step.',
    type: 'string',
    status: 'required',
  },
  target: {
    doc: 'The element the step points at: a CSS selector, an element, a ref or a function that returns an element. Omit it to show the step centered on the screen. Steps whose target is missing or hidden are skipped.',
    type: [
      'string',
      'HTMLElement',
      'React.RefObject<HTMLElement>',
      '() => HTMLElement | null',
    ],
    status: 'optional',
  },
  title: {
    doc: 'Heading of the step.',
    type: 'React.ReactNode',
    status: 'optional',
  },
  content: {
    doc: 'Content of the step.',
    type: 'React.ReactNode',
    status: 'required',
  },
  placement: {
    doc: 'Preferred side of the target to place the step on.',
    type: ['"top"', '"right"', '"bottom"', '"left"'],
    defaultValue: '"bottom"',
    status: 'optional',
  },
  align: {
    doc: 'Horizontal alignment on the target when `placement` is `top` or `bottom`.',
    type: ['"left"', '"center"', '"right"'],
    defaultValue: '"center"',
    status: 'optional',
  },
  onBeforeShow: {
    doc: 'Runs before the step is shown, e.g. to reveal the target. May return a promise. The step waits up to 1.5 seconds for it, and then for the target to appear, before the step is skipped.',
    type: '() => void | Promise<void>',
    status: 'optional',
  },
}

export const GuidedTourEvents: PropertiesTableProps = {
  onOpenChange: {
    doc: 'Called with `false` when the tour is completed or canceled.',
    type: '(open: boolean) => void',
    status: 'optional',
  },
  onComplete: {
    doc: 'Called when the user finishes the tour.',
    type: '() => void',
    status: 'optional',
  },
  onCancel: {
    doc: 'Called when the user closes or skips the tour before it is finished.',
    type: '() => void',
    status: 'optional',
  },
}
