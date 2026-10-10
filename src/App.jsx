import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Overview from './pages/Overview';
import Architecture from './pages/Architecture';
import Playground from './pages/Playground';
import Evaluation from './pages/Evaluation';
import { AnimatePresence } from 'framer-motion';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AppLayout() {
  const location = useLocation();
  const isPlayground = location.pathname === '/playground';

  return (
    <div className="app-container" style={{ display: 'flex', flexDirection: 'column', minHeight: '100dvh' }}>
      <div className="aurora-bg">
        <div className="aurora-blob blob-1"></div>
        <div className="aurora-blob blob-2"></div>
        <div className="aurora-blob blob-3"></div>
      </div>
      <Navigation />
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 'calc(100dvh - 72px)' }}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Overview />} />
            <Route path="/architecture" element={<Architecture />} />
            <Route path="/playground" element={<Playground />} />
            <Route path="/evaluation" element={<Evaluation />} />
          </Routes>
        </AnimatePresence>
      </main>
      {!isPlayground && <Footer />}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppLayout />
    </BrowserRouter>
  );
}

export default App;
