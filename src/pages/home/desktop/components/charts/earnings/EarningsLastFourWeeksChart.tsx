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

const EarningsLastFourWeeksChart = () => {
  const [earningsLastFourWeeks, setEarningsLastFourWeeks] = useState<
    { range: string; sum: number }[] | undefined
  >(undefined);

  useEffect(() => {
    console.log('fetching data...');

    const source = axios.CancelToken.source();

    const fetchEarningsLastFourWeeks = async () => {
      try {
        const response: AxiosResponse = await axios.get(
          `${process.env.REACT_APP_SERVER_HOSTNAME}/admin/get/earnings/last-four-weeks`,
          { cancelToken: source.token, withCredentials: true }
        );

        setEarningsLastFourWeeks(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchEarningsLastFourWeeks();
    return () => {
      source.cancel();
    };
  }, []);

  console.log(earningsLastFourWeeks);

  const labels = earningsLastFourWeeks && [
    earningsLastFourWeeks[0].range,
    earningsLastFourWeeks[1].range,
    earningsLastFourWeeks[2].range,
    earningsLastFourWeeks[3].range,
  ];

  const data: number[] | undefined = earningsLastFourWeeks && [
    earningsLastFourWeeks[0].sum,
    earningsLastFourWeeks[1].sum,
    earningsLastFourWeeks[2].sum,
    earningsLastFourWeeks[3].sum,
  ];

  return (
    <Bar
      // width={360}
      // height={150}
      className='py-4 px-12'
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

export default EarningsLastFourWeeksChart;
