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

const EarningsLastSixMonthsChart = () => {
  const [earningsLastSixMonths, setEarningsLastSixMonths] = useState<
    { month: string; sum: number }[] | undefined
  >(undefined);

  useEffect(() => {
    console.log('fetching data...');

    const source = axios.CancelToken.source();

    const fetchEarningsLastSixMonths = async () => {
      try {
        const response: AxiosResponse = await axios.get(
          `${process.env.REACT_APP_SERVER_HOSTNAME}/admin/get/earnings/last-six-months`,
          { cancelToken: source.token, withCredentials: true }
        );

        setEarningsLastSixMonths(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchEarningsLastSixMonths();
    return () => {
      source.cancel();
    };
  }, []);

  console.log(earningsLastSixMonths);

  const labels = earningsLastSixMonths && [
    earningsLastSixMonths[0].month,
    earningsLastSixMonths[1].month,
    earningsLastSixMonths[2].month,
    earningsLastSixMonths[3].month,
    earningsLastSixMonths[4].month,
    earningsLastSixMonths[5].month,
  ];

  const data: number[] | undefined = earningsLastSixMonths && [
    earningsLastSixMonths[0].sum,
    earningsLastSixMonths[1].sum,
    earningsLastSixMonths[2].sum,
    earningsLastSixMonths[3].sum,
    earningsLastSixMonths[4].sum,
    earningsLastSixMonths[5].sum,
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

export default EarningsLastSixMonthsChart;
