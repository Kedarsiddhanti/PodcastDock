import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Discover from './pages/Discover';
import CreatePodcast from './pages/CreatePodcast';
import MyProfile from './pages/MyProfile';
import PodcastDetails from './pages/PodcastDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import About from './pages/About'; 
import Support from './pages/Support'; 
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <Home />
              </Layout>
            }
          />
          <Route
            path="/discover"
            element={
              <Layout>
                <Discover />
              </Layout>
            }
          />
          <Route
            path="/createpodcast"
            element={
              <PrivateRoute>
                <Layout>
                  <CreatePodcast />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/myprofile"
            element={
              <PrivateRoute>
                <Layout>
                  <MyProfile />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/podcast/:id"
            element={
              <Layout>
                <PodcastDetails />
              </Layout>
            }
          />
          <Route
            path="/about"
            element={
              <Layout>
                <About />
              </Layout>
            }
          />
          <Route
            path="/support"
            element={
              <Layout>
                <Support />
              </Layout>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;