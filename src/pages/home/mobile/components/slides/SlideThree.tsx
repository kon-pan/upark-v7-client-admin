import axios, { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { sleep } from '../../../../../common/utils/sleep';

const SlideThree = () => {
  const [addressesCount, setAddressesCount] = useState<number | undefined>(
    undefined
  );

  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchAddressesCount = async () => {
      // Emulate slower response
      await sleep(1000);

      try {
        const response: AxiosResponse = await axios.get(
          `${process.env.REACT_APP_SERVER_HOSTNAME}/admin/get/addresses/count`,
          { cancelToken: source.token, withCredentials: true }
        );

        const data: { addressesCount: number } = response.data;

        setAddressesCount(data.addressesCount);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAddressesCount();

    return () => {
      source.cancel();
    };
  }, []);

  return addressesCount ? (
    <div className='flex h-full w-full flex-col justify-between bg-sky-600'>
      <div className='flex h-full flex-col items-center justify-center'>
        <div className='flex flex-col text-white'>
          <div className='text-4xl font-semibold'>{addressesCount}</div>
          <div className='text-xl font-medium'>Κάρτες στάθμευσης</div>
        </div>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-44 w-44 text-sky-800'
          viewBox='0 0 20 20'
          fill='currentColor'
        >
          <path d='M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z' />
          <path
            fillRule='evenodd'
            d='M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z'
            clipRule='evenodd'
          />
        </svg>
      </div>
      <Link
        to='/'
        className='flex items-center justify-center space-x-1 bg-sky-700 py-3 text-lg font-medium text-white'
      >
        <div>Περισσότερα</div>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-6 w-6 text-white'
          viewBox='0 0 20 20'
          fill='currentColor'
        >
          <path
            fillRule='evenodd'
            d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z'
            clipRule='evenodd'
          />
        </svg>
      </Link>
    </div>
  ) : (
    <div className='flex h-full w-full flex-col items-center justify-between bg-sky-600'>
      <div className='flex h-full flex-col items-center justify-center'>
        <div
          style={{ borderTopColor: 'transparent' }}
          className='h-24 w-24 animate-spin rounded-full border-4 border-solid border-sky-800'
        ></div>
      </div>
    </div>
  );
};

export default SlideThree;
