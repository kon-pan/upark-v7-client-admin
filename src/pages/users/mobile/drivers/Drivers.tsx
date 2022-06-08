import axios, { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import BasicLayout from '../../../../common/components/layout/basic/BasicLayout';
import { useDocTitle } from '../../../../common/hooks/useDocTitle';
import { IDriver } from '../../../../common/interfaces/interfaces';
import { useSidebar } from '../../../../common/stores/SidebarStore';
import DriverDetailsModal from '../../common/components/modals/DriverDetailsModal';
import RemoveDriverModal from '../../common/components/modals/RemoveDriverModal';
import DriversTable from './components/DriversTable';

const Drivers = () => {
  const { setSidebarOpen, sidebarOpen } = useSidebar();
  const [,] = useDocTitle('uPark | Οδηγοί');

  const [ready, setReady] = useState(false);
  const [update, setUpdate] = useState(true);
  const [driver, setDriver] = useState<IDriver>();
  const [drivers, setDrivers] = useState<IDriver[]>([]);
  const [isRemoveDriverModalOpen, setIsRemoveDriverModalOpen] = useState(false);
  const [isDriverDetailsModalOpen, setIsDriverDetailsModalOpen] =
    useState(false);

  const liftDriver = (value: IDriver) => {
    setDriver(value);
  };

  // Fetch all drivers
  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchAllDrivers = async () => {
      console.log('costly fetch');

      setReady(false);
      // await sleep(1000);
      const response: AxiosResponse = await axios.get(
        `${process.env.REACT_APP_SERVER_HOSTNAME}/admin/get/drivers/all`,
        { cancelToken: source.token, withCredentials: true }
      );

      setDrivers(response.data);

      setReady(true);
    };

    fetchAllDrivers();
    return () => {
      source.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [update]);

  function openRemoveDriverModal() {
    setIsRemoveDriverModalOpen(true);
  }
  function closeRemoveDriverModal() {
    setIsRemoveDriverModalOpen(false);
  }

  function openDriverDetailsModal() {
    setIsDriverDetailsModalOpen(true);
  }
  function closeDriverDetailsModal() {
    setIsDriverDetailsModalOpen(false);
  }

  function liftRemoveDriverSuccess(value: boolean) {
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
            Οδηγοί
          </div>
          <DriversTable
            drivers={drivers}
            liftDriver={liftDriver}
            openRemoveDriverModal={openRemoveDriverModal}
            openDriverDetailsModal={openDriverDetailsModal}
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

      {driver && (
        <RemoveDriverModal
          driver={driver}
          isOpen={isRemoveDriverModalOpen}
          closeModal={closeRemoveDriverModal}
          liftRemoveDriverSuccess={liftRemoveDriverSuccess}
        />
      )}

      {driver && (
        <DriverDetailsModal
          driver={driver}
          isOpen={isDriverDetailsModalOpen}
          closeModal={closeDriverDetailsModal}
        />
      )}
    </BasicLayout>
  );
};

export default Drivers;
