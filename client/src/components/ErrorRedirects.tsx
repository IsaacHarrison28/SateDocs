import { Component, type ErrorInfo, type ReactNode } from "react";
import { Navigate } from "react-router";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorRedirect extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // Log errors
    console.error("[ErrorRedirect] Caught error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return <Navigate to="/" replace />;
    }
    return this.props.children;
  }
}
