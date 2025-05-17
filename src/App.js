import { UserThemeProvider } from './context/UserThemeContext';
import Home from './components/pages/Home';

import './App.css';

function App() {
  return (
    <UserThemeProvider>
      <Home />
    </UserThemeProvider>
  );
}

export default App;