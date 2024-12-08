import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true };
  }

  render() {
    if (this.state?.asError) {
      return this.props?.fallback;
    }

    return this.props?.children;
  }
}

export default ErrorBoundary;