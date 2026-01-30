import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Dashboard sub-pages
import DashboardHome from './pages/dashboard/DashboardHome';
import LegalDomain from './pages/dashboard/LegalDomain';
import LegislationHub from './pages/dashboard/LegislationHub';
import Notifications from './pages/dashboard/Notifications';
import Resources from './pages/dashboard/Resources';
import Settings from './pages/dashboard/Settings';

// Modals
import LoginModal from './components/LoginModal';
import SignUpModal from './components/SignUpModal';
import ForgotPasswordModal from './components/ForgotPasswordModal';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public landing page */}
        <Route path="/" element={<Home />} />

        {/* Protected Dashboard with nested routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          {/* Default dashboard home */}
          <Route index element={<DashboardHome />} />

          {/* Sub-pages */}
          <Route path="legal_domain" element={<LegalDomain />} />
          <Route path="legislation_hub" element={<LegislationHub />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="resources" element={<Resources />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>

      {/* Global modals */}
      <LoginModal />
      <SignUpModal />
      <ForgotPasswordModal />

      <ToastContainer
        position="bottom-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"           // or "colored", or "dark"
        // limit={3}            // optional: max simultaneous toasts
      />
    </Router>
  );
}

export default App;