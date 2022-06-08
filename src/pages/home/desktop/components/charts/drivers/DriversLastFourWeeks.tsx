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

const DriversLastFourWeeksChart = () => {
  const [driversLastFourWeeks, setDriversLastFourWeeks] = useState<
    { range: string; count: number }[] | undefined
  >(undefined);

  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchDriversLastFourWeeks = async () => {
      try {
        const response: AxiosResponse = await axios.get(
          `${process.env.REACT_APP_SERVER_HOSTNAME}/admin/get/drivers/last-four-weeks`,
          { cancelToken: source.token, withCredentials: true }
        );

        setDriversLastFourWeeks(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchDriversLastFourWeeks();
    return () => {
      source.cancel();
    };
  }, []);

  const labels = driversLastFourWeeks && [
    driversLastFourWeeks[0].range,
    driversLastFourWeeks[1].range,
    driversLastFourWeeks[2].range,
    driversLastFourWeeks[3].range,
  ];

  const data: number[] | undefined = driversLastFourWeeks && [
    driversLastFourWeeks[0].count,
    driversLastFourWeeks[1].count,
    driversLastFourWeeks[2].count,
    driversLastFourWeeks[3].count,
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

export default DriversLastFourWeeksChart;
