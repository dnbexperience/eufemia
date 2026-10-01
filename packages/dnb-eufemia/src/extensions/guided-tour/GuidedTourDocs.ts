import type { PropertiesTableProps } from '../../shared/types'

export const GuidedTourProperties: PropertiesTableProps = {
  open: {
    doc: 'Whether the tour is shown. Use together with `onOpenChange`.',
    type: 'boolean',
    status: 'required',
  },
  steps: {
    doc: 'The steps of the tour. See [step properties](#step-properties).',
    type: 'Array<GuidedTourStep>',
    status: 'required',
  },
  intro: {
    doc: 'Dialog shown before the first step, with a start and a skip button.',
    type: '{ title?: React.ReactNode, content: React.ReactNode }',
    status: 'optional',
  },
  outro: {
    doc: 'Dialog shown after the last step. Closing it also completes the tour.',
    type: '{ title?: React.ReactNode, content: React.ReactNode }',
    status: 'optional',
  },
}

export const GuidedTourStepProperties: PropertiesTableProps = {
  id: {
    doc: 'Unique identifier of the step.',
    type: 'string',
    status: 'required',
  },
  target: {
    doc: 'The element to highlight: a CSS selector, an element, a ref or a function that returns an element. Without it, the step is centered on the screen. Steps with a missing or hidden target are skipped.',
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
    doc: 'Preferred side of the target to show the step on.',
    type: ['"top"', '"right"', '"bottom"', '"left"'],
    defaultValue: '"bottom"',
    status: 'optional',
  },
  align: {
    doc: 'Alignment on the target when `placement` is `top` or `bottom`.',
    type: ['"left"', '"center"', '"right"'],
    defaultValue: '"center"',
    status: 'optional',
  },
  onBeforeShow: {
    doc: 'Runs each time before the step is shown, e.g. to reveal its target. May return a promise. The tour waits up to 1.5 seconds for the promise, then up to 1.5 seconds for the target to appear, before it skips the step. A rejected promise skips the step.',
    type: '() => void | Promise<void>',
    status: 'optional',
  },
}

export const GuidedTourEvents: PropertiesTableProps = {
  onOpenChange: {
    doc: 'Called with `false` when the tour ends.',
    type: '(open: boolean) => void',
    status: 'optional',
  },
  onComplete: {
    doc: 'Called when the tour is finished: after the last step, or when the outro is closed.',
    type: '() => void',
    status: 'optional',
  },
  onCancel: {
    doc: 'Called when the tour is skipped or closed before the last step.',
    type: '() => void',
    status: 'optional',
  },
}
