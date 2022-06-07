import axios, { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BasicLayout from '../../../../common/components/layout/basic/BasicLayout';
import { IInspector } from '../../../../common/interfaces/interfaces';
import { useSidebar } from '../../../../common/stores/SidebarStore';
import EditInspectorModal from '../../common/components/modals/EditInspectorModal';
import RemoveInspectorModal from '../../common/components/modals/RemoveInspectorModal';
import CaretRight from '../common/icons/CaretRight';
import InspectorsTable from './components/InspectorsTable';

const Inspectors = () => {
  const { setSidebarOpen, sidebarOpen } = useSidebar();

  const [ready, setReady] = useState(false);
  const [update, setUpdate] = useState(true);
  const [inspectors, setInspectors] = useState<IInspector[]>([]);
  const [inspector, setInspector] = useState<IInspector>();
  const [isEditInspectorModalOpen, setIsEditInspectorModalOpen] =
    useState(false);
  const [isRemoveInspectorModalOpen, setIsRemoveInspectorModalOpen] =
    useState(false);

  const liftInspector = (value: IInspector) => {
    setInspector(value);
  };

  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchInspectors = async () => {
      console.log('Costly fetch...');
      try {
        const response: AxiosResponse = await axios.get(
          `${process.env.REACT_APP_SERVER_HOSTNAME}/admin/get/inspectors/all`,
          { cancelToken: source.token, withCredentials: true }
        );

        setInspectors(response.data);
        setReady(true);
      } catch (error) {
        console.log(error);
      }
    };

    fetchInspectors();

    return () => {
      source.cancel();
    };
  }, [update]);

  function openRemoveInspectorModal() {
    setIsRemoveInspectorModalOpen(true);
  }
  function closeRemoveInspectorModal() {
    setIsRemoveInspectorModalOpen(false);
  }

  function openEditInspectorModal() {
    setIsEditInspectorModalOpen(true);
  }
  function closeEditInspectorModal() {
    setIsEditInspectorModalOpen(false);
  }

  function liftEditInspectorSuccess(value: boolean) {
    if (value === true) {
      setUpdate((state) => !state);
    }
  }

  function liftRemoveInspectorSuccess(value: boolean) {
    if (value === true) {
      setUpdate((state) => !state);
    }
  }

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
          {ready ? (
            <InspectorsTable
              inspectors={inspectors}
              liftInspector={liftInspector}
              openEditInspectorModal={openEditInspectorModal}
              openRemoveInspectorModal={openRemoveInspectorModal}
            />
          ) : (
            <div className='mt-48 flex max-h-screen w-full flex-1 flex-col items-center justify-center bg-neutral-50'>
              <div
                style={{ borderTopColor: 'transparent' }}
                className='h-12 w-12 animate-spin rounded-full border-4 border-solid border-neutral-400'
              ></div>
            </div>
          )}
        </div>
      </div>

      <>
        {isRemoveInspectorModalOpen && inspector && (
          <RemoveInspectorModal
            inspector={inspector}
            isOpen={isRemoveInspectorModalOpen}
            closeModal={closeRemoveInspectorModal}
            liftRemoveInspectorSuccess={liftRemoveInspectorSuccess}
          />
        )}

        {isEditInspectorModalOpen && inspector && (
          <EditInspectorModal
            inspector={inspector}
            isOpen={isEditInspectorModalOpen}
            closeModal={closeEditInspectorModal}
            liftEditInspectorSuccess={liftEditInspectorSuccess}
          />
        )}
      </>
    </BasicLayout>
  );
};

export default Inspectors;
