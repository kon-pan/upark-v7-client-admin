import React from 'react';
import { useSidebar } from '../../../common/stores/SidebarStore';

const MobileAddresses = ({
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
      {/* Header */}
      <div className='mb-4 w-full border-b bg-white py-3 text-center text-lg font-medium shadow'>
        Σημεία στάθμευσης
      </div>

      {addressTable}
    </div>
  );
};

export default MobileAddresses;
