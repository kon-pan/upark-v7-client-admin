import { useNavigate } from 'react-router-dom';
import BasicLayout from '../../../common/components/layout/basic/BasicLayout';
import { useDocTitle } from '../../../common/hooks/useDocTitle';
import { useSidebar } from '../../../common/stores/SidebarStore';

const MobileUsers = () => {
  const { setSidebarOpen, sidebarOpen } = useSidebar();
  const [,] = useDocTitle('uPark | Χρήστες');

  const navigate = useNavigate();

  return (
    <BasicLayout>
      <div
        onClick={() => {
          sidebarOpen && setSidebarOpen(false);
        }}
        className='flex w-full flex-col'
      >
        {/* Header */}
        <div className='mb-4 w-full border-b bg-white py-3 text-center text-lg font-medium shadow'>
          Χρήστες
        </div>

        {/* Row */}
        <div className='mb-4 flex justify-evenly'>
          <div
            onClick={() => {
              navigate('/users/drivers');
            }}
            className='flex h-36 w-36 cursor-pointer flex-col items-center justify-center rounded border bg-white shadow-md'
          >
            <div className='text-center font-medium'>Οδηγοί</div>
          </div>

          <div
            onClick={() => {
              navigate('/users/inspectors');
            }}
            className='flex h-36 w-36 cursor-pointer flex-col items-center justify-center rounded border bg-white shadow-md'
          >
            <div className='text-center font-medium'>Ελεγκτές</div>
          </div>
        </div>

        {/* Row */}
        <div className='flex justify-evenly'>
          <div
            onClick={() => {
              navigate('/users/admins');
            }}
            className='flex h-36 w-36 cursor-pointer flex-col items-center justify-center rounded border bg-white shadow-md'
          >
            <div className='text-center font-medium'>Διεχειριστές</div>
          </div>
          <div className='invisible flex h-36 w-36'></div>
        </div>
      </div>
    </BasicLayout>
  );
};

export default MobileUsers;
