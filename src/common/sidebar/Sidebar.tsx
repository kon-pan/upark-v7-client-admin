import './Sidebar.css';
import { Link } from 'react-router-dom';
import useAuth from '../contexts/AuthContex';
import { useSidebar } from '../stores/SidebarStore';
import { classNames } from '../utils/classnames';
import HomeIcon from './icons/HomeIcon';
import LogoutIcon from './icons/LogoutIcon';
import { Transition } from '@headlessui/react';
import { useState } from 'react';

const Sidebar = () => {
  const { sidebarOpen, setSidebarOpen } = useSidebar();
  const { logout } = useAuth();

  const [isUsersDropdownOpen, setIsUsersDropdownOpen] = useState(false);

  return (
    <div
      id='sidebar'
      className={classNames(
        'w-64 space-y-6 bg-gray-700 py-7 px-2 text-white',
        'absolute inset-y-0 left-0 z-50 transform',
        'shadow-[0_0px_40px_-10px_rgba(0,0,0,0.3)]',
        sidebarOpen
          ? 'lg:border-r'
          : '-translate-x-full shadow-none lg:border-r',
        'xl:relative xl:top-0 xl:-mt-0 xl:translate-x-0',
        'lg:top-16 lg:z-10 lg:-mt-2',
        'transition duration-200 ease-in-out'
      )}
    >
      <nav className=''>
        <div className='flex flex-col justify-between space-y-1'>
          <Link
            onClick={() => {
              setSidebarOpen(false);
            }}
            to='/'
            className='sidebar-navlink'
          >
            <HomeIcon />
            <div>Αρχική σελίδα</div>
          </Link>

          <div
            onClick={() => {
              setIsUsersDropdownOpen(!isUsersDropdownOpen);
            }}
            className='sidebar-navlink flex justify-between'
          >
            <div className='flex items-center space-x-2'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5'
                viewBox='0 0 20 20'
                fill='currentColor'
              >
                <path d='M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z' />
              </svg>
              <div>Χρήστες</div>
            </div>

            {isUsersDropdownOpen ? (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5'
                viewBox='0 0 20 20'
                fill='currentColor'
              >
                <path
                  fillRule='evenodd'
                  d='M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z'
                  clipRule='evenodd'
                />
              </svg>
            ) : (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5'
                viewBox='0 0 20 20'
                fill='currentColor'
              >
                <path
                  fillRule='evenodd'
                  d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                  clipRule='evenodd'
                />
              </svg>
            )}
          </div>
          {/* Users dropdown */}
          <Transition
            show={isUsersDropdownOpen}
            as='div'
            enter='transition-opacity duration-75'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='transition-opacity duration-150'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
            className='flex flex-col space-y-1 rounded bg-gray-800 p-2 text-sm'
          >
            <Link
              to='/users/drivers'
              onClick={() => {
                setSidebarOpen(false);
              }}
              className='px-3 py-1 hover:underline'
            >
              Οδηγοί
            </Link>
            <Link
              to='/users/inspectors'
              onClick={() => {
                setSidebarOpen(false);
              }}
              className='px-3 py-1 hover:underline'
            >
              Ελεγκτές
            </Link>
            {/* <Link
              to='/'
              onClick={() => {
                setSidebarOpen(false);
              }}
              className='px-3 py-1 hover:underline'
            >
              Διαχειριστές
            </Link> */}
          </Transition>

          <Link
            onClick={() => {
              setSidebarOpen(false);
            }}
            to='/addresses'
            className='sidebar-navlink'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5'
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path
                fillRule='evenodd'
                d='M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z'
                clipRule='evenodd'
              />
            </svg>
            <div>Σημεία στάθμευσης</div>
          </Link>

          <div onClick={logout} id='logout-navlink'>
            <LogoutIcon />
            <div>Αποσύνδεση</div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
