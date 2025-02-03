import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box, Text, Spinner } from '@chakra-ui/react';
import AppProviders from './providers/appProvider';
import { AuthProvider, useAuth } from './providers/authProvider';
import Login from './components/login';

const ProtectedRoute = ({ allowedRoles, children }) => {
  const user = useAuth();

  console.log(user);
  if (!user || !allowedRoles.includes(user.role)) {
    return <Box width={'full'}><Text color={'red'}>Access Denied</Text></Box>;
  }

  return children;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppProviders>
          <Suspense fallback={<Box width="full" height="100vh" display="flex" justifyContent="center" alignItems="center">
            <Spinner size="xl" thickness="4px" speed="0.65s" color="blue.500" />
          </Box>}>
            <Box >
              <Routes>
                <Route path="/" />
                <Route path="/login" element = {<Login/>} />
                <Route
                  path="/production"
                  element={
                    <ProtectedRoute allowedRoles={['admin', 'manager']}>
                    </ProtectedRoute>
                  }
                />
                <Route path="/maintenance"  />
              </Routes>
            </Box>
          </Suspense>
        </AppProviders>
      </AuthProvider>
    </Router>
  );
}

export default App;
