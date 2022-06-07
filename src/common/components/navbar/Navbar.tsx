import './Navbar.css';
import { useContext } from 'react';
import { ScreenSizeContext } from '../../contexts/ScreenSizeContext';
import { useSidebar } from '../../stores/SidebarStore';
import { classNames } from '../../utils/classnames';
import BurgerIcon from './common/BurgerIcon';

const Navbar = () => {
  const { isDesktop } = useContext(ScreenSizeContext);
  const { toggleSidebarOpen } = useSidebar();

  return (
    <div
      className={classNames(
        'z-50 justify-between bg-gray-800 text-gray-50',
        'flex items-center',
        'sticky top-0'
      )}
    >
      <div className='flex items-center'>
        {isDesktop && (
          <button
            onClick={toggleSidebarOpen}
            className='p-2 focus:bg-gray-700 focus:outline-none'
          >
            <BurgerIcon />
          </button>
        )}
        {/* Logo */}
        <div
          id='navbar-logo'
          className='cursor-pointer'
          onClick={() => {
            window.location.href = '/';
          }}
        >
          u<span className='font-bold text-yellow-300'>Park</span>{' '}
          <span className='italic text-lg font-normal'>Διαχειριστής</span>
        </div>
      </div>
      {/* <DropdownMenu /> */}
      {/* Navbar mobile toggle button for sidebar */}
      <button
        onClick={toggleSidebarOpen}
        className='p-2 focus:bg-gray-700 focus:outline-none lg:hidden'
      >
        <BurgerIcon />
      </button>
    </div>
  );
};

export default Navbar;
