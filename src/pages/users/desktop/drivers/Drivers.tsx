import axios, { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BasicLayout from '../../../../common/components/layout/basic/BasicLayout';
import { IDriver } from '../../../../common/interfaces/interfaces';
import { useSidebar } from '../../../../common/stores/SidebarStore';
import { sleep } from '../../../../common/utils/sleep';
import RemoveDriverModal from '../../common/components/modals/RemoveDriverModal';
import CaretRight from '../common/icons/CaretRight';
import DriversTable from './components/DriversTable';

const Drivers = () => {
  const { setSidebarOpen, sidebarOpen } = useSidebar();

  const [ready, setReady] = useState(false);
  const [update, setUpdate] = useState(true);
  const [driver, setDriver] = useState<IDriver>();
  const [drivers, setDrivers] = useState<IDriver[]>([]);
  const [isRemoveDriverModalOpen, setIsRemoveDriverModalOpen] = useState(false);

  const liftDriver = (value: IDriver) => {
    setDriver(value);
  };

  // Fetch all drivers
  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchAllDrivers = async () => {
      console.log('costly fetch');

      setReady(false);
      await sleep(1000);
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

  function liftRemoveDriverSuccess(value: boolean) {
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
            <div className='pr-4 text-2xl font-medium'>Οδηγοί</div>
          </div>
          {ready ? (
            <DriversTable
              drivers={drivers}
              liftDriver={liftDriver}
              openRemoveDriverModal={openRemoveDriverModal}
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

      {driver && (
        <RemoveDriverModal
          driver={driver}
          isOpen={isRemoveDriverModalOpen}
          closeModal={closeRemoveDriverModal}
          liftRemoveDriverSuccess={liftRemoveDriverSuccess}
        />
      )}
    </BasicLayout>
  );
};

export default Drivers;
