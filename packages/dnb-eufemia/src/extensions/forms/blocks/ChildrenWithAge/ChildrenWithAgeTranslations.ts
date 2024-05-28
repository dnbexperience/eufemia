export const translations = {
  'nb-NO': {
    ChildrenWithAge: {
      hasChildren: {
        title: 'Antall barn',
        fieldLabel: 'Har du/dere barn under 18 år?',
        required: 'Du må angi om du har barn under 18 år eller ikke.',
      },
      countChildren: {
        fieldLabel: 'Antall barn under 18 år',
        required: 'Du må skrive inn antall barn.',
        valueVale: 'Antall barn under 18 år',
        suffix: 'barn',
      },
      childrenAge: {
        fieldLabel: 'Alder på barn nr. {itemNr}',
        required: 'Du må skrive inn alder på barnet.',
        suffix: 'år',
      },
      hasJointResponsibility: {
        fieldLabel: 'Har du delt omsorg for noen av barna?',
      },
      confirmJointResponsibility: {
        fieldLabel: 'Delt omsorg',
      },
      usesDaycare: {
        fieldLabel: 'Har du/dere SFO/AKS for noen av barna?',
        required: 'Du må angi om du har SFO/AKS for noen av barna.',
      },
      hasDaycare: {
        fieldLabel: 'Er på SFO/AKS',
      },
      jointResponsibilityTrue: 'delt omsorg',
      jointResponsibilityFalse: 'ikke delt omsorg',
      daycareTrue: 'SFO/AKS',
      daycareFalse: 'uten SFO/AKS',
    },
  },
  'en-GB': {
    ChildrenWithAge: {
      hasChildren: {
        title: 'Number of children',
        fieldLabel: 'Do you have children under the age of 18?',
        required:
          'You must state whether you have children under 18 or not.',
      },
      countChildren: {
        fieldLabel: 'Number of children under the age of 18',
        required: 'You must enter the number of children.',
        valueVale: 'Number of children under the age of 18',
        suffix: 'children',
      },
      childrenAge: {
        fieldLabel: 'Age of child no. {itemNr}',
        required: 'You must enter the age of the child.',
        suffix: 'years old',
      },
      hasJointResponsibility: {
        fieldLabel:
          'Do you have joint parental responsibility for any of the children?',
      },
      confirmJointResponsibility: {
        fieldLabel: 'Joint parental responsibility',
      },
      usesDaycare: {
        fieldLabel: 'Do you have SFO/AKS for any of the children?',
        required:
          'You must state whether you have SFO/AKS for any of the children.',
      },
      hasDaycare: {
        fieldLabel: 'Has SFO/AKS',
      },
      jointResponsibilityTrue: 'joint parental responsibility',
      jointResponsibilityFalse: 'not joint parental responsibility',
      daycareTrue: 'SFO/AKS',
      daycareFalse: 'without SFO/AKS',
    },
  },
}
export type Translation = (typeof translations)[keyof typeof translations]
