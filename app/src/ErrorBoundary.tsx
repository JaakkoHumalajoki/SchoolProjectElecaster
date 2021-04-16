import React, { Component, ErrorInfo, ReactNode } from "react"

interface Props {
  children: ReactNode
}

interface State {
  showError: boolean
}

/**
 * @class ErrorBoundary Error boundary acts as a global "catch" block
 * which catches uncaught errors from subcomponents
 *
 * Partly derived from
 * https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/error_boundaries
 */
class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { showError: false }
  }

  public static getDerivedStateFromError(): State {
    // Update state so the next render will show the fallback UI.
    return { showError: true }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // eslint-disable-next-line
    console.error("Uncaught error:", error, errorInfo)
  }

  public render(): JSX.Element | ReactNode {
    const { children } = this.props
    const { showError } = this.state

    if (showError) {
      return <h1>Sorry.. something went wrong. Please refresh the page</h1>
    }

    return children
  }
}

export default ErrorBoundary
