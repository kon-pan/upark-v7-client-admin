import axios, { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { sleep } from '../../../../../common/utils/sleep';

const SlideOne = () => {
  const [driversCount, setDriversCount] = useState<number | undefined>(
    undefined
  );

  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchDriversCount = async () => {
      // Emulate slower response
      await sleep(1000);

      try {
        const response: AxiosResponse = await axios.get(
          `${process.env.REACT_APP_SERVER_HOSTNAME}/admin/get/drivers/count`,
          { cancelToken: source.token, withCredentials: true }
        );

        const data: { driversCount: number } = response.data;

        setDriversCount(data.driversCount);
      } catch (error) {
        console.log(error);
      }
    };

    fetchDriversCount();

    return () => {
      source.cancel();
    };
  }, []);

  return driversCount ? (
    <div className='flex h-full w-full flex-col justify-between bg-yellow-600'>
      <div className='flex h-full flex-col items-center justify-center'>
        <div className='flex flex-col text-white'>
          <div className='text-4xl font-semibold'>{driversCount}</div>
          <div className='text-xl font-medium'>Εγγεγραμμένοι Οδηγοί</div>
        </div>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='w-h-44 h-44 text-yellow-800'
          viewBox='0 0 20 20'
          fill='currentColor'
        >
          <path d='M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z' />
        </svg>
      </div>
      <Link
        to='/users/drivers'
        className='flex items-center justify-center space-x-1 bg-yellow-700 py-3 text-lg font-medium text-white'
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
    <div className='flex h-full w-full flex-col items-center justify-between bg-yellow-600'>
      <div className='flex h-full flex-col items-center justify-center'>
        <div
          style={{ borderTopColor: 'transparent' }}
          className='h-24 w-24 animate-spin rounded-full border-4 border-solid border-yellow-800'
        ></div>
      </div>
    </div>
  );
};

export default SlideOne;
