import axios, { AxiosResponse } from 'axios';
import { useContext, useEffect, useState } from 'react';
import BasicLayout from '../../common/components/layout/basic/BasicLayout';
import { ScreenSizeContext } from '../../common/contexts/ScreenSizeContext';
import { useDocTitle } from '../../common/hooks/useDocTitle';
import DesktopAddressesTable from './desktop/components/DesktopAddressesTable';
import DesktopAddresses from './desktop/DesktopAddresses';
import MobileAddressesTable from './mobile/components/MobileAddressesTable';
import MobileAddresses from './mobile/MobileAddresses';

const Addresses = () => {
  const screen = useContext(ScreenSizeContext);
  const [,] = useDocTitle('uPark | Σημεία στάθμευσης');

  const [ready, setReady] = useState(false);
  const [update, setUpdate] = useState(true);
  const [addresses, setAddresses] = useState<
    | {
        id: number;
        name: string;
        available: number;
        occupied: number;
        position: [number, number];
      }[]
    | []
  >([]);

  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchAddresses = async () => {
      // await sleep(2000);
      try {
        const response: AxiosResponse = await axios.get(
          `${process.env.REACT_APP_SERVER_HOSTNAME}/admin/get/addresses/all`,
          { cancelToken: source.token, withCredentials: true }
        );

        setAddresses(response.data);
        setReady(true);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAddresses();

    return () => {
      source.cancel();
    };
  }, [update]);

  function liftRemoveAddressSuccess(value: boolean) {
    if (value === true) {
      setUpdate((state) => !state);
    }
  }
  function liftEditAddressSuccess(value: boolean) {
    if (value === true) {
      setUpdate((state) => !state);
    }
  }

  return ready ? (
    <BasicLayout>
      {(screen.isMobile || screen.isTablet) && (
        <MobileAddresses
          addressTable={
            <MobileAddressesTable
              addresses={addresses}
              liftRemoveAddressSucces={liftRemoveAddressSuccess}
              liftEditAddressSuccess={liftEditAddressSuccess}
            />
          }
        />
      )}
      {(screen.isDesktop || screen.isLargeDesktop) && (
        <DesktopAddresses
          addressTable={
            <DesktopAddressesTable
              addresses={addresses}
              liftRemoveAddressSucces={liftRemoveAddressSuccess}
              liftEditAddressSuccess={liftEditAddressSuccess}
            />
          }
        />
      )}
    </BasicLayout>
  ) : (
    <BasicLayout>
      <div className='flex max-h-screen w-full flex-1 flex-col items-center justify-center bg-neutral-50'>
        <div
          style={{ borderTopColor: 'transparent' }}
          className='h-12 w-12 animate-spin rounded-full border-4 border-solid border-neutral-400'
        ></div>
      </div>
    </BasicLayout>
  );
};

export default Addresses;
