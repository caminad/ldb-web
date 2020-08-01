import { Component } from 'react';

export default class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    const { props, state } = this;

    if (state.hasError) {
      return (
        <div className="m-auto p-4 rounded border-2 border-red-600">
          <p className="font-bold text-red-600">Something went wrong.</p>
        </div>
      );
    }
    return props.children;
  }
}
