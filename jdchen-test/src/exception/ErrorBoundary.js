import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor (props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError (error) {
    return {
      hasError: true,
    };
  }

  componentDidCatch (error, errorInfo) {
    this.setState({ hasError: true });

    console.log(error, errorInfo);
  }

  render () {
    const { hasError } = this.state;
    if (hasError) {
      return <h1>something went wrong!</h1>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
