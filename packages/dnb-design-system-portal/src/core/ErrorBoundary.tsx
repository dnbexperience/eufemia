import { Component } from 'react'
import type { ReactNode } from 'react'
import GlobalError from '@dnb/eufemia/src/components/global-error/GlobalError'
import { Code, CopyOnClick, P } from '@dnb/eufemia/src'

type ErrorBoundaryProps = {
  children: ReactNode
  onError?: (error: Error) => void
  resetKey?: unknown
}

type ErrorBoundaryState = {
  error: Error | null
}

export default class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  override state: ErrorBoundaryState = { error: null }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error }
  }

  override componentDidCatch(error: Error): void {
    this.props.onError?.(error)
  }

  override componentDidUpdate(previousProps: ErrorBoundaryProps): void {
    if (
      this.state.error &&
      previousProps.resetKey !== this.props.resetKey
    ) {
      this.setState({ error: null })
    }
  }

  override render() {
    if (this.state.error) {
      return (
        <GlobalError
          statusCode={null}
          title="Something went wrong"
          text={
            <>
              <P>Here is the error message for debugging purposes:</P>
              <Code top>
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
