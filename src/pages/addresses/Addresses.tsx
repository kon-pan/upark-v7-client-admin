import axios, { AxiosResponse } from 'axios';
import { useContext, useEffect, useState } from 'react';
import BasicLayout from '../../common/components/layout/basic/BasicLayout';
import { ScreenSizeContext } from '../../common/contexts/ScreenSizeContext';
import AddressesTable from './desktop/components/AddressesTable';
import DesktopAddresses from './desktop/DesktopAddresses';

const Addresses = () => {
  const screen = useContext(ScreenSizeContext);

  const [ready, setReady] = useState(false);
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
      console.log('Costly fetch...');
      try {
        const response: AxiosResponse = await axios.get(
          `${process.env.REACT_APP_SERVER_HOSTNAME}/admin/get/addresses/all`,
          { cancelToken: source.token, withCredentials: true }
        );
        console.log(response);

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
  }, []);

  return ready ? (
    <BasicLayout>
      {(screen.isMobile || screen.isTablet) && <></>}
      {(screen.isDesktop || screen.isLargeDesktop) && (
        <DesktopAddresses
          addressTable={<AddressesTable addresses={addresses} />}
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
