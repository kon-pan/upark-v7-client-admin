import axios, { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { sleep } from '../../../../../common/utils/sleep';

const SlideTwo = () => {
  const [inspectorsCount, setInspectorsCount] = useState<number | undefined>(
    undefined
  );

  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchInspectorsCount = async () => {
      // Emulate slower response
      await sleep(1000);

      try {
        const response: AxiosResponse = await axios.get(
          `${process.env.REACT_APP_SERVER_HOSTNAME}/admin/get/inspectors/count`,
          { cancelToken: source.token, withCredentials: true }
        );

        const data: { inspectorsCount: number } = response.data;

        setInspectorsCount(data.inspectorsCount);
      } catch (error) {
        console.log(error);
      }
    };

    fetchInspectorsCount();

    return () => {
      source.cancel();
    };
  }, []);

  return inspectorsCount ? (
    <div className='flex h-full w-full flex-col justify-between bg-red-600'>
      <div className='flex h-full flex-col items-center justify-center'>
        <div className='flex flex-col text-white'>
          <div className='text-4xl font-semibold'>{inspectorsCount}</div>
          <div className='text-xl font-medium'>Εγγεγραμμένοι ελεγκτές</div>
        </div>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-44 w-44 text-red-800'
          viewBox='0 0 20 20'
          fill='currentColor'
        >
          <path
            fillRule='evenodd'
            d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
            clipRule='evenodd'
          />
        </svg>
      </div>
      <Link
        to='/users/inspectors'
        className='flex items-center justify-center space-x-1 bg-red-700 py-3 text-lg font-medium text-white'
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
    <div className='flex h-full w-full flex-col items-center justify-between bg-red-600'>
      <div className='flex h-full flex-col items-center justify-center'>
        <div
          style={{ borderTopColor: 'transparent' }}
          className='h-24 w-24 animate-spin rounded-full border-4 border-solid border-red-800'
        ></div>
      </div>
    </div>
  );
};

export default SlideTwo;
