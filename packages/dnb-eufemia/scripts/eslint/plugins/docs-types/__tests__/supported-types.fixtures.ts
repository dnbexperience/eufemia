export const validCases = [
  {
    code: `
      const ButtonDocs = {
        children: {
          type: 'React.ReactNode',
        },
        size: {
          type: ['string', 'number', 'boolean'],
        },
        verticalPosition: {
          type: ['"top"', '"bottom"'],
        },
        horizontalPosition: {
          type: ['"left"', '"right"'],
        },
        render: {
          type: '({ active, ref, toggle }) => React.ReactNode',
        },
        data: {
          type: '{valueType}',
        },
      }
    `,
    filename: 'ButtonDocs.ts',
  },
]

export const invalidCases = [
  {
    code: `
      const ButtonDocs = {
        children: {
          type: 'React.Node',
        },
      }
    `,
    output: `
      const ButtonDocs = {
        children: {
          type: 'React.ReactNode',
        },
      }
    `,
    filename: 'ButtonDocs.ts',
    errors: [{ messageId: 'invalidTypeValue' }],
  },
  {
    code: `
      const ButtonDocs = {
        suffix: {
          type: ['React.node', '(string | React.Node)[]', 'ReactNode'],
        },
      }
    `,
    output: `
      const ButtonDocs = {
        suffix: {
          type: ['React.ReactNode', '(string | React.ReactNode)[]', 'React.ReactNode'],
        },
      }
    `,
    filename: 'ButtonDocs.ts',
    errors: [
      { messageId: 'invalidTypeValue' },
      { messageId: 'invalidTypeValue' },
      { messageId: 'invalidTypeValue' },
    ],
  },
  {
    code: `
      const ButtonDocs = {
        verticalPosition: {
          type: ['top', 'bottom'],
        },
        horizontalPosition: {
          type: ['left', 'right'],
        },
        trigger: {
          type: ['boolean', 'auto', 'on'],
        },
      }
    `,
    output: `
      const ButtonDocs = {
        verticalPosition: {
          type: ['"top"', '"bottom"'],
        },
        horizontalPosition: {
          type: ['"left"', '"right"'],
        },
        trigger: {
          type: ['boolean', '"auto"', '"on"'],
        },
      }
    `,
    filename: 'ButtonDocs.ts',
    errors: [
      { messageId: 'invalidTypeValue' },
      { messageId: 'invalidTypeValue' },
      { messageId: 'invalidTypeValue' },
      { messageId: 'invalidTypeValue' },
      { messageId: 'invalidTypeValue' },
      { messageId: 'invalidTypeValue' },
    ],
  },
  {
    code: `
      const ButtonDocs = {
        asObject: {
          type: ['Object', 'Function', 'Unknown'],
        },
        asString: {
          type: ' Number ',
        },
      }
    `,
    output: `
      const ButtonDocs = {
        asObject: {
          type: ['object', 'function', 'unknown'],
        },
        asString: {
          type: 'number',
        },
      }
    `,
    filename: 'ButtonDocs.ts',
    errors: [
      { messageId: 'invalidTypeValue' },
      { messageId: 'invalidTypeValue' },
      { messageId: 'invalidTypeValue' },
      { messageId: 'invalidTypeValue' },
    ],
  },
  {
    code: `
      const AnchorDocs = {
        target: {
          type: ['_self', '_blank', '_parent', '_top'],
        },
      }
    `,
    output: `
      const AnchorDocs = {
        target: {
          type: ['"_self"', '"_blank"', '"_parent"', '"_top"'],
        },
      }
    `,
    filename: 'AnchorDocs.ts',
    errors: [
      { messageId: 'invalidTypeValue' },
      { messageId: 'invalidTypeValue' },
      { messageId: 'invalidTypeValue' },
      { messageId: 'invalidTypeValue' },
    ],
  },
  {
    code: `
      const ListDocs = {
        list: {
          type: 'Array<React.Node>',
        },
      }
    `,
    output: `
      const ListDocs = {
        list: {
          type: 'Array<React.ReactNode>',
        },
      }
    `,
    filename: 'ListDocs.ts',
    errors: [{ messageId: 'invalidTypeValue' }],
  },
]

export const warningValidCases = [
  {
    code: `
      const ButtonDocs = {
        children: {
          type: 'React.ReactNode',
        },
        config: {
          type: '{ horizontalRef?: HTMLElement | React.MutableRefObject<HTMLElement> }',
        },
        render: {
          type: '({ close, open, toggle, id }) => React.ReactNode',
        },
      }
    `,
    filename: 'ButtonDocs.ts',
  },
]

export const warningInvalidCases = [
  {
    code: `
      const ListDocs = {
        data: {
          type: 'React.ReactNode[]',
        },
      }
    `,
    output: `
      const ListDocs = {
        data: {
          type: 'Array<React.ReactNode>',
        },
      }
    `,
    filename: 'ListDocs.ts',
    errors: [{ messageId: 'avoidArrayShorthand' }],
  },
  {
    code: `
      const InputDocs = {
        value: {
          type: 'string | number',
        },
      }
    `,
    output: `
      const InputDocs = {
        value: {
          type: ['string', 'number'],
        },
      }
    `,
    filename: 'InputDocs.ts',
    errors: [{ messageId: 'avoidPipeUnion' }],
  },
  {
    code: `
      const InputDocs = {
        variant: {
          type: 'bypassOnNavigation',
        },
      }
    `,
    filename: 'InputDocs.ts',
    errors: [{ messageId: 'unknownType' }],
  },
  {
    code: `
      const InputDocs = {
        status: {
          type: 'string or React.Element',
        },
      }
    `,
    filename: 'InputDocs.ts',
    errors: [{ messageId: 'unknownType' }],
  },
]
