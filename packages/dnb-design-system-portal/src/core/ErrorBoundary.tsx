import { Component } from 'react'
import type { ReactNode } from 'react'
import GlobalError from '@dnb/eufemia/src/components/global-error/GlobalError'
import { Code, CopyOnClick, P } from '@dnb/eufemia/src'

type ErrorBoundaryProps = {
  children: ReactNode
}

type ErrorBoundaryState = {
  error: Error | null
}

export default class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { error: null }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error }
  }

  render() {
    if (this.state.error) {
      return (
        <GlobalError
          statusCode={null}
          title="Something went wrong"
          text={
            <>
              <P>Here is the error message for debugging purposes:</P>
              <Code>
                <CopyOnClick>{this.state.error.message}</CopyOnClick>
              </Code>
            </>
          }
        />
      )
    }

    return this.props.children
  }
}
