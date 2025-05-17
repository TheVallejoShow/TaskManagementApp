import { useElementColors } from '../../hooks/useElementColors';
import { Link } from 'react-router-dom';
import Icon from '@mui/material/Icon';

const Navbar = () => {
  const { navigationColor, navigationBgColor } = useElementColors();

  return (
    <nav
      className="w-full px-4 py-3 flex items-center justify-between shadow-md"
      style={{
        backgroundColor: navigationBgColor,
        color: navigationColor,
      }}
    >
      <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
        <Icon fontSize="medium">check_circle</Icon>
        <span className="text-lg font-semibold">Task Manager</span>
      </Link>
    </nav>
  );
};

export default Navbar;