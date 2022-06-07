import { Link } from 'react-router-dom';
import BasicLayout from '../../../../common/components/layout/basic/BasicLayout';
import { useSidebar } from '../../../../common/stores/SidebarStore';
import CaretRight from '../common/icons/CaretRight';
import InspectorsTable from './components/InspectorsTable';

const Inspectors = () => {
  const { setSidebarOpen, sidebarOpen } = useSidebar();

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
          <div className='mb-4 flex w-full items-center space-x-2 border-b py-3'>
            <Link
              to='/users'
              className='cursor-pointer text-2xl font-medium hover:underline hover:underline-offset-2'
            >
              Χρήστες
            </Link>
            <CaretRight />
            <div className='pr-4 text-2xl font-medium'>Ελεγκτές</div>
            <Link
              to='/users/inspectors/create'
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

          <InspectorsTable />
        </div>
      </div>
    </BasicLayout>
  );
};

export default Inspectors;
