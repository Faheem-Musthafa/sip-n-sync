import React, { Suspense, lazy, Component, ErrorInfo, ReactNode } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { LoadingSpinner } from './components/ui/LoadingSpinner';

// Lazy load pages for better performance
const HomePage = lazy(() => 
  import('./pages/HomePage').then(module => ({ default: module.HomePage }))
);
const EventsPage = lazy(() => 
  import('./pages/EventsPage').then(module => ({ default: module.EventsPage }))
);
const AboutPage = lazy(() => 
  import('./pages/AboutPage').then(module => ({ default: module.AboutPage }))
);
const ContactPage = lazy(() => 
  import('./pages/ContactPage').then(module => ({ default: module.ContactPage }))
);

// Error Boundary Class Component
interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: (error: Error, retry: () => void) => ReactNode;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  retry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback && this.state.error) {
        return this.props.fallback(this.state.error, this.retry);
      }

      return (
        <div className="min-h-screen bg-gradient-to-br from-cream-white via-white to-light-caramel/30 flex items-center justify-center">
          <div className="text-center max-w-md mx-auto p-8">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-red-600 text-2xl">⚠️</span>
            </div>
            <h2 className="text-2xl font-bold text-dark-roast mb-4 font-poppins">
              Oops! Something went wrong
            </h2>
            <p className="text-dark-roast/70 mb-6 text-sm">
              {this.state.error?.message || 'An unexpected error occurred. Please try refreshing the page.'}
            </p>
            <button
              onClick={this.retry}
              className="px-6 py-3 bg-coffee-brown text-white rounded-xl hover:bg-coffee-brown/90 transition-colors font-medium mr-3"
            >
              Try Again
            </button>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-gray-500 text-white rounded-xl hover:bg-gray-600 transition-colors font-medium"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Loading fallback component
const LoadingFallback: React.FC = () => (
  <div className="min-h-screen bg-gradient-to-br from-cream-white via-white to-light-caramel/30 flex items-center justify-center">
    <div className="text-center">
      <LoadingSpinner size="lg" className="mb-4" />
      <p className="text-dark-roast/70 text-lg">Loading page...</p>
    </div>
  </div>
);

// Layout component with improved structure and accessibility
const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="min-h-screen flex flex-col font-poppins bg-gradient-to-br from-cream-white via-white to-light-caramel/30">
    <a 
      href="#main-content" 
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-coffee-brown text-white px-4 py-2 rounded-lg z-50"
    >
      Skip to main content
    </a>
    
    <Header />
    
    <main 
      id="main-content" 
      className="flex-1"
      role="main"
      aria-label="Main content"
    >
      <ErrorBoundary>
        <Suspense fallback={<LoadingFallback />}>
          {children}
        </Suspense>
      </ErrorBoundary>
    </main>
    
    <Footer />
  </div>
);

// 404 Not Found component
const NotFound: React.FC = () => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <div className="text-center">
      <h1 className="text-4xl font-bold text-dark-roast mb-4 font-poppins">
        404 - Page Not Found
      </h1>
      <p className="text-dark-roast/70 mb-8">
        The page you're looking for doesn't exist.
      </p>
      <a 
        href="/" 
        className="inline-block px-6 py-3 bg-coffee-brown text-white rounded-xl hover:bg-coffee-brown/90 transition-colors font-medium"
      >
        Go Back Home
      </a>
    </div>
  </div>
);

// Main App component with improved error handling and performance
const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <Router>
        <Layout>
          <Routes>
            <Route 
              path="/" 
              element={<HomePage />} 
            />
            <Route 
              path="/events" 
              element={<EventsPage />} 
            />
            <Route 
              path="/about" 
              element={<AboutPage />} 
            />
            <Route 
              path="/contact" 
              element={<ContactPage />} 
            />
            <Route 
              path="*" 
              element={<NotFound />} 
            />
          </Routes>
        </Layout>
      </Router>
    </ErrorBoundary>
  );
};

export default App;