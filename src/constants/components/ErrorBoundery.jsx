import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render shows the fallback UI.
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        // Log error details to an error reporting service (optional).
        console.error("Error caught by ErrorBoundary:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            // Render a custom fallback UI when an error occurs.
            return (
                <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-4">
                    <h1 className="text-4xl font-bold text-red-500 mb-4">Something went wrong!</h1>
                    <p className="text-lg text-gray-700">Please try refreshing the page or contact support.</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-4 px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Refresh Page
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
