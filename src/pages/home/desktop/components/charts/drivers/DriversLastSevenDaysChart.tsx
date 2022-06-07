import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { DateTime } from 'luxon';
import axios, { AxiosResponse } from 'axios';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const UsersLastSevenDaysChart = () => {
  const [earningsLastSevenDays, setEarningsLastSevenDays] = useState<
    { dt: string; count: number }[] | undefined
  >(undefined);

  useEffect(() => {
    console.log('fetching data...');

    const source = axios.CancelToken.source();

    const fetchEarningsLastSevenDays = async () => {
      try {
        const response: AxiosResponse = await axios.get(
          `${process.env.REACT_APP_SERVER_HOSTNAME}/admin/get/drivers/last-seven-days`,
          { cancelToken: source.token, withCredentials: true }
        );

        setEarningsLastSevenDays(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchEarningsLastSevenDays();
    return () => {
      source.cancel();
    };
  }, []);

  const labels = earningsLastSevenDays && [
    `${DateTime.fromISO(earningsLastSevenDays[0].dt).day}/${
      DateTime.fromISO(earningsLastSevenDays[0].dt).month
    }/${DateTime.fromISO(earningsLastSevenDays[0].dt).year}`,
    `${DateTime.fromISO(earningsLastSevenDays[1].dt).day}/${
      DateTime.fromISO(earningsLastSevenDays[1].dt).month
    }/${DateTime.fromISO(earningsLastSevenDays[1].dt).year}`,
    `${DateTime.fromISO(earningsLastSevenDays[2].dt).day}/${
      DateTime.fromISO(earningsLastSevenDays[2].dt).month
    }/${DateTime.fromISO(earningsLastSevenDays[2].dt).year}`,
    `${DateTime.fromISO(earningsLastSevenDays[3].dt).day}/${
      DateTime.fromISO(earningsLastSevenDays[3].dt).month
    }/${DateTime.fromISO(earningsLastSevenDays[3].dt).year}`,
    `${DateTime.fromISO(earningsLastSevenDays[4].dt).day}/${
      DateTime.fromISO(earningsLastSevenDays[4].dt).month
    }/${DateTime.fromISO(earningsLastSevenDays[4].dt).year}`,
    `${DateTime.fromISO(earningsLastSevenDays[5].dt).day}/${
      DateTime.fromISO(earningsLastSevenDays[5].dt).month
    }/${DateTime.fromISO(earningsLastSevenDays[5].dt).year}`,
    `${DateTime.fromISO(earningsLastSevenDays[6].dt).day}/${
      DateTime.fromISO(earningsLastSevenDays[6].dt).month
    }/${DateTime.fromISO(earningsLastSevenDays[6].dt).year}`,
  ];

  // const data: number[] | undefined = earningsLastSevenDays && [
  //   98, 68, 117, 105, 77, 80, 88,
  // ];
  const data: number[] | undefined = earningsLastSevenDays && [
    earningsLastSevenDays[0].count,
    earningsLastSevenDays[1].count,
    earningsLastSevenDays[2].count,
    earningsLastSevenDays[3].count,
    earningsLastSevenDays[4].count,
    earningsLastSevenDays[5].count,
    earningsLastSevenDays[6].count,
  ];

  return (
    <Line
      className='px-12 py-4'
      // width={360}
      // height={150}
      options={{
        scales: {
          y: {
            min: 0,
          },
        },
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom' as const,
          },
          title: {
            display: false,
            text: 'Κέρδη σε ευρώ',
          },
        },
      }}
      data={{
        labels,
        datasets: [
          {
            label: 'drivers',
            data: data,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
        ],
      }}
    />
  );
};

export default UsersLastSevenDaysChart;
