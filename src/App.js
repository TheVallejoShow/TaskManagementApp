import { UserThemeProvider } from './context/UserThemeContext';

import Navbar from './components/organisms/Navbar';
import Home from './components/pages/Home';

import './App.css';

function App() {
  return (
    <UserThemeProvider>
      <Navbar />
      <Home />
    </UserThemeProvider>
  );
}

export default App;