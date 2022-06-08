import axios, { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import BasicLayout from '../../../../common/components/layout/basic/BasicLayout';
import { useDocTitle } from '../../../../common/hooks/useDocTitle';
import { IInspector } from '../../../../common/interfaces/interfaces';
import { useSidebar } from '../../../../common/stores/SidebarStore';
import { sleep } from '../../../../common/utils/sleep';
import EditInspectorModal from '../../common/components/modals/EditInspectorModal';
import RemoveInspectorModal from '../../common/components/modals/RemoveInspectorModal';
import InspectorsTable from './components/InspectorsTable';

const Inspectors = () => {
  const { setSidebarOpen, sidebarOpen } = useSidebar();
  const [,] = useDocTitle('uPark | Ελεγκτές');


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

  // Fetch all inspectors
  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchAllInspectors = async () => {
      console.log('costly fetch');

      setReady(false);
      await sleep(1000);
      const response: AxiosResponse = await axios.get(
        `${process.env.REACT_APP_SERVER_HOSTNAME}/admin/get/inspectors/all`,
        { cancelToken: source.token, withCredentials: true }
      );

      setInspectors(response.data);

      setReady(true);
    };

    fetchAllInspectors();

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
      {ready ? (
        <div
          onClick={() => {
            sidebarOpen && setSidebarOpen(false);
          }}
          className='flex w-full flex-col items-center'
        >
          {/* Header */}
          <div className='mb-4 w-full border-b bg-white py-3 text-center text-lg font-medium shadow'>
            Ελεγκτές
          </div>
          <InspectorsTable
            inspectors={inspectors}
            liftInspector={liftInspector}
            openRemoveInspectorModal={openRemoveInspectorModal}
            openEditInspectorModal={openEditInspectorModal}
          />
        </div>
      ) : (
        <div className='flex max-h-screen w-full flex-1 flex-col items-center justify-center bg-neutral-50'>
          <div
            style={{ borderTopColor: 'transparent' }}
            className='h-12 w-12 animate-spin rounded-full border-4 border-solid border-neutral-400'
          ></div>
        </div>
      )}

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
