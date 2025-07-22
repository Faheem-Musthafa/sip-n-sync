import React, { memo } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { EventsPage } from './pages/EventsPage';

// Layout component for consistent page structure
const Layout: React.FC<{ children: React.ReactNode }> = memo(({ children }) => (
  <div className="min-h-screen flex flex-col font-poppins">
    <Header />
    <main className="flex-1">
      {children}
    </main>
    <Footer />
  </div>
));

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/events" element={<EventsPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;