import React from 'react'

interface Props {
  children: React.ReactNode
}

export default function TestElement({ children }: Props) {
  return <div className="dnb-forms-test-element">{children}</div>
}
