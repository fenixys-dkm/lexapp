import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard'; // ← create this next
import ProtectedRoute from './components/ProtectedRoute';
import LoginModal from './components/LoginModal';
import SignUpModal from './components/SignUpModal';
import ForgotPasswordModal from './components/ForgotPasswordModal';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public landing page */}
        <Route path="/" element={<Home />} />

        {/* Protected dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Add more protected pages later */}
        {/* <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} /> */}
      </Routes>

      {/* Global modals - always visible */}
      <LoginModal />
      <SignUpModal />
      <ForgotPasswordModal />
    </Router>
  );
}

export default App;