import { useNavigate } from 'react-router-dom';
import BasicLayout from '../../../common/components/layout/basic/BasicLayout';
import { useSidebar } from '../../../common/stores/SidebarStore';

const DesktopUsers = () => {
  const { setSidebarOpen, sidebarOpen } = useSidebar();
  const navigate = useNavigate();

  return (
    <BasicLayout>
      <div
        className='z-0 flex w-full flex-1 flex-col items-center'
        onClick={() => {
          sidebarOpen && setSidebarOpen(false);
        }}
      >
        <div className='w-11/12'>
          {/* Header */}
          <div className='mb-4 w-full border-b py-3 text-2xl font-medium'>
            Χρήστες
          </div>

          {/* Row */}
          <div className='flex space-x-4'>
            <div
              onClick={() => {
                navigate('/users/drivers');
              }}
              className='flex h-36 w-40 cursor-pointer flex-col items-center justify-center rounded border bg-white shadow-md hover:shadow-inner'
            >
              <div className='text-center text-2xl font-medium'>Οδηγοί</div>
            </div>
            <div
              onClick={() => {
                navigate('/users/inspectors');
              }}
              className='flex h-36 w-40 cursor-pointer flex-col items-center justify-center rounded border bg-white shadow-md hover:shadow-inner'
            >
              <div className='text-center text-2xl font-medium'>Ελεγκτές</div>
            </div>
            <div
              onClick={() => {
                navigate('/users/admins');
              }}
              className='flex h-36 w-40 cursor-pointer flex-col items-center justify-center rounded border bg-white shadow-md hover:shadow-inner'
            >
              <div className='text-center text-2xl font-medium'>
                Διαχειριστές
              </div>
            </div>
          </div>
        </div>
      </div>
    </BasicLayout>
  );
};

export default DesktopUsers;
