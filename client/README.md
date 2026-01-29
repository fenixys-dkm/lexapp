        main.jsx
        ↓
        <AuthProvider>
        ↓
        <App />
        ↓
        <Router>                  ← in App.jsx
        ↓
        <Routes>
        ↓
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />