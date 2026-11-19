import foundation from './color.tokens.json'

// Keep error text readable on Birdhouse's dark neutral surfaces until Figma is corrected.
export const birdhouseDarkErrorOverride = {
  $value: foundation.dnb.red[100].$value,
  $extensions: {
    'com.figma.aliasData': {
      targetVariableId:
        foundation.dnb.red[100].$extensions['com.figma.variableId'],
      targetVariableName: 'dnb/red/100',
      targetVariableSetId:
        'VariableCollectionId:e5cc40ef8bbcdb0b7df7793463523846b0a81d09/6948:19',
      targetVariableSetName: 'colors',
    },
  },
}

// Use the dark-surface focus color on Birdhouse's dark neutral surfaces too.
export const birdhouseDarkFocusOverride = {
  $value: foundation.dnb.blue[100].$value,
  $extensions: {
    'com.figma.aliasData': {
      targetVariableId:
        foundation.dnb.blue[100].$extensions['com.figma.variableId'],
      targetVariableName: 'dnb/blue/100',
      targetVariableSetId:
        'VariableCollectionId:e5cc40ef8bbcdb0b7df7793463523846b0a81d09/6948:19',
      targetVariableSetName: 'colors',
    },
  },
}

// Keep control boundaries visible on every dark neutral surface.
export const birdhouseDarkActionOverride = {
  $value: foundation['dnb-eiendom'].emeraldgreen[200].$value,
  $extensions: {
    'com.figma.aliasData': {
      targetVariableId:
        foundation['dnb-eiendom'].emeraldgreen[200].$extensions[
          'com.figma.variableId'
        ],
      targetVariableName: 'dnb-eiendom/emeraldgreen/200',
      targetVariableSetId:
        'VariableCollectionId:e5cc40ef8bbcdb0b7df7793463523846b0a81d09/6948:19',
      targetVariableSetName: 'colors',
    },
  },
}
