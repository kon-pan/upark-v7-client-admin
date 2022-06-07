import React from 'react';
import { Link } from 'react-router-dom';
import { useSidebar } from '../../../common/stores/SidebarStore';

const DesktopAddresses = ({
  addressTable,
}: {
  addressTable: React.ReactNode;
}) => {
  const { setSidebarOpen, sidebarOpen } = useSidebar();

  return (
    <div
      className='z-0 flex w-full flex-1 flex-col items-center'
      onClick={() => {
        sidebarOpen && setSidebarOpen(false);
      }}
    >
      <div className='w-11/12'>
        {/* Header */}
        <div className='mb-4 flex w-full items-center space-x-2 border-b py-3'>
          <div className='pr-4 text-2xl font-medium'>Σημεία στάθμευσης</div>
          <Link
            to='/addresses/create'
            className='flex items-center space-x-1 rounded bg-yellow-300 px-4 py-1 text-base font-semibold shadow-md'
          >
            <div>Προσθήκη</div>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5'
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path
                fillRule='evenodd'
                d='M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z'
                clipRule='evenodd'
              />
            </svg>
          </Link>
        </div>

        {addressTable}
      </div>
    </div>
  );
};

export default DesktopAddresses;
