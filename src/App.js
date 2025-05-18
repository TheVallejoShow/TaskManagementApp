import { UserThemeProvider } from './context/UserThemeContext';

import ProjectDetail from './components/pages/ProjectDetail';
import Navbar from './components/organisms/Navbar';
import Home from './components/pages/Home';

import { Route, Routes } from 'react-router-dom';

import './App.css';

function App() {
  return (
    <UserThemeProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={
          <Home />
        } />
        <Route path="/project/:projectId" element={<ProjectDetail />} />
      </Routes>
    </UserThemeProvider>
  );
}

export default App;