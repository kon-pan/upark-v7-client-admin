import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';

// Chart
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { DateTime } from 'luxon';
import axios, { AxiosResponse } from 'axios';

ChartJS.register(
  CategoryScale,
  LinearScale,
  ArcElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const EarningsLastSevenDaysChart = () => {
  const [earningsLastSevenDays, setEarningsLastSevenDays] = useState<
    { dt: string; sum: number }[] | undefined
  >(undefined);

  useEffect(() => {

    const source = axios.CancelToken.source();

    const fetchEarningsLastSevenDays = async () => {
      try {
        const response: AxiosResponse = await axios.get(
          `${process.env.REACT_APP_SERVER_HOSTNAME}/admin/get/earnings/last-seven-days`,
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
  //   2476, 2584, 3134, 2993, 1176, 1170, 1241,
  // ];
  const data: number[] | undefined = earningsLastSevenDays && [
    earningsLastSevenDays[0].sum,
    earningsLastSevenDays[1].sum,
    earningsLastSevenDays[2].sum,
    earningsLastSevenDays[3].sum,
    earningsLastSevenDays[4].sum,
    earningsLastSevenDays[5].sum,
    earningsLastSevenDays[6].sum,
  ];

  return (
    <Bar
      className='px-12 py-4'
      // width={360}
      // height={150}
      options={{
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
            label: 'ευρώ',
            data: data,
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
        ],
      }}
    />
  );
};

export default EarningsLastSevenDaysChart;
