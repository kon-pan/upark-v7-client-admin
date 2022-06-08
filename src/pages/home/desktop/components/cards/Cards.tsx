import axios, { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { classNames } from '../../../../../common/utils/classnames';
import CashIcon from '../../icons/CashIcon';
import LocationIcon from '../../icons/LocationIcon';
import SearchIcon from '../../icons/SearchIcon';
import UsersIcon from '../../icons/UsersIcon';
import CardsSkeleton from './CardsSkeleton';

const Cards = () => {
  const [driversCount, setDriversCount] = useState<number | undefined>(
    undefined
  );
  const [inspectorsCount, setInspectorsCount] = useState<number | undefined>(
    undefined
  );
  const [addressesCount, setAddressesCount] = useState<number | undefined>(
    undefined
  );
  const [earningsToday, setEarningsToday] = useState<number | undefined>(
    undefined
  );

  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchCardsData = async () => {
      // Emulate slower response
      // await sleep(1000);
      // Drivers count
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
      // Inspectors count
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
      // Addresses count
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
      // Current day earnings  count
      try {
        const response: AxiosResponse = await axios.get(
          `${process.env.REACT_APP_SERVER_HOSTNAME}/admin/get/earnings/today`,
          { cancelToken: source.token, withCredentials: true }
        );

        const data: { earnings: number } = response.data;

        setEarningsToday(data.earnings === null ? 0 : data.earnings);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCardsData();

    return () => {
      source.cancel();
    };
  }, []);

  const Card = ({
    color,
    data,
    title,
    icon,
    url,
  }: {
    color: string;
    data: number | string;
    title: string;
    icon: JSX.Element;
    url: string;
  }) => {
    return (
      <div className='flex w-1/4 flex-col rounded-b hover:shadow-md hover:shadow-neutral-400'>
        <div
          className={classNames(
            'flex items-center justify-between space-x-2 rounded-t p-2',
            color === 'yellow'
              ? 'bg-yellow-600'
              : color === 'red'
              ? 'bg-red-600'
              : color === 'sky'
              ? 'bg-sky-600'
              : color === 'green'
              ? 'bg-green-600'
              : ''
          )}
        >
          {/* Info */}
          <div className='flex flex-col text-white'>
            <div className='text-4xl font-semibold'>{data}</div>
            <div className='text-sm font-medium'>{title}</div>
          </div>
          {/* Icon */}
          <div
            className={classNames(
              color === 'yellow'
                ? 'text-yellow-800'
                : color === 'red'
                ? 'text-red-800'
                : color === 'sky'
                ? 'text-sky-800'
                : color === 'green'
                ? 'text-green-800'
                : ''
            )}
          >
            {icon}
          </div>
        </div>
        {/* More info */}
        <Link
          to={url}
          className={classNames(
            'flex cursor-pointer items-center justify-center space-x-1 rounded-b py-1',
            color === 'yellow'
              ? 'bg-yellow-700  hover:bg-yellow-800'
              : color === 'red'
              ? 'bg-red-700  hover:bg-red-800'
              : color === 'sky'
              ? 'bg-sky-700  hover:bg-sky-800'
              : color === 'green'
              ? 'bg-green-700  hover:bg-green-800'
              : ''
          )}
        >
          <div className='text-xs font-normal text-white'>Περισσότερα</div>
          {/* Icon */}
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-4 w-4 text-white'
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
    );
  };

  return driversCount && inspectorsCount && addressesCount && earningsToday ? (
    <div className='flex w-10/12 space-x-4 py-4'>
      {/* Users card */}
      <Card
        color='yellow'
        data={driversCount}
        title={'Εγγεγραμμένοι οδηγοί'}
        icon={<UsersIcon />}
        url={'/users/drivers'}
      />
      {/* Inspectors card */}
      <Card
        color='red'
        data={inspectorsCount}
        title={'Εγγεγραμμένοι ελεγκτές'}
        icon={<SearchIcon />}
        url={'/users/inspectors'}
      />
      {/* Addresses card */}
      <Card
        color='sky'
        data={addressesCount}
        title={'Σημεία στάθμευσης'}
        icon={<LocationIcon />}
        url={'/addresses'}
      />
      {/* Current day earnings card */}
      <Card
        color='green'
        data={`${earningsToday} €`}
        title={'Κέρδη ημέρας'}
        icon={<CashIcon />}
        url={'/'}
      />
    </div>
  ) : (
    <CardsSkeleton />
  );
};

export default Cards;
