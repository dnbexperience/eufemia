import type { ReactElement } from 'react'
import Table from '../../components/Table'

export default function ChatResponseTable({
  children,
}: {
  children: ReactElement<HTMLTableElement>
}) {
  return (
    <div className="dnb-ai-response__table">
      <Table.ScrollView>{children}</Table.ScrollView>
    </div>
  )
}
