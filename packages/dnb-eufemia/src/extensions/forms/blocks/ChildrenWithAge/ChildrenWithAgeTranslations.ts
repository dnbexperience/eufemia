const nbNO = {
  hasChildren: {
    title: 'Antall barn',
    fieldLabel: 'Har du/dere barn under 18 år?',
    required: 'Du må angi om du har barn under 18 år eller ikke.',
  },
  countChildren: {
    fieldLabel: 'Antall barn under 18 år',
    required: 'Du må skrive inn antall barn.',
    suffix: 'barn',
  },
  childrenAge: {
    fieldLabel: 'Alder på barn nr. {itemNo}',
    required: 'Du må skrive inn alder på barnet.',
    suffix: 'år',
  },
  hasJointResponsibility: {
    fieldLabel: 'Betaler du/dere barnebidrag?',
    required: 'Du må angi om du/dere betaler barnebidrag.',
  },
  jointResponsibilityExpenses: {
    fieldLabel: 'Oppgi barnebidrag per måned',
    required: 'Du må oppgi barnebidrag per måned.',
  },
  usesDaycare: {
    fieldLabel: 'Har du/dere utgifter til SFO/AKS?',
    required: 'Du må angi om du/dere har utgifter til SFO/AKS.',
    helpText:
      'Oppgi totalt beløp per måned som du betaler til Skolefritidsordningen (SFO) eller Aktivitetsskolen (AKS).{br}{br}Barnehageutgifter skal ikke tas med her.',
  },
  dayCareExpenses: {
    fieldLabel: 'Oppgi utgifter til SFO/AKS per måned',
    required: 'Du må oppgi dine utgifter til SFO/AKS per måned.',
  },
}

const enGB = {
  hasChildren: {
    title: 'Number of children',
    fieldLabel: 'Do you have children under the age of 18?',
    required: 'You must state whether you have children under 18 or not.',
  },
  countChildren: {
    fieldLabel: 'Number of children under the age of 18',
    required: 'You must enter the number of children.',
    suffix: 'children',
  },
  childrenAge: {
    fieldLabel: 'Age of child no. {itemNo}',
    required: 'You must enter the age of the child.',
    suffix: 'years old',
  },
  hasJointResponsibility: {
    fieldLabel: 'Do you pay child support?',
    required: 'You must state whether you pay child support.',
  },
  jointResponsibilityExpenses: {
    fieldLabel: 'Enter child support per month',
    required: 'You must enter child support per month.',
  },
  usesDaycare: {
    fieldLabel: 'Do you have expenses for SFO/AKS?',
    required: 'You must state whether you have any expenses for SFO/AKS.',
    helpText:
      'State the total amount per month that you pay to Skolefritidsordningen (SFO) or Aktivitetsskolen (AKS).{br}{br}Kindergarten expenses are not to be included here.',
  },
  dayCareExpenses: {
    fieldLabel: 'Enter expenses for SFO/AKS per month',
    required: 'You must enter your expenses for SFO/AKS per month.',
  },
} satisfies typeof nbNO

export const translations = {
  'nb-NO': { ChildrenWithAge: nbNO },
  'en-GB': { ChildrenWithAge: enGB },
}

export type Translation = (typeof translations)[keyof typeof translations]
