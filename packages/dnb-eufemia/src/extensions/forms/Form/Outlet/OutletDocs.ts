import type { PropertiesTableProps } from '../../../../shared/types'

export const OutletProperties: PropertiesTableProps = {
  formHandlerId: {
    doc: 'Required Form.Handler id used to link this outlet to a specific form context.',
    type: 'SharedStateId',
    status: 'required',
  },
  children: {
    doc: 'Content rendered inside the linked Form.Handler context.',
    type: 'React.ReactNode',
    status: 'required',
  },
}
