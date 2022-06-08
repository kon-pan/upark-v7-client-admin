import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { DateTime } from 'luxon';
import axios, { AxiosResponse } from 'axios';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  const [cardsDistributionToday, setCardsDistributionToday] = useState<
    { active: number; expired: number; cancelled: number } | undefined
  >(undefined);

  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchCardsDistributionToday = async () => {
      try {
        const response: AxiosResponse = await axios.get(
          `${process.env.REACT_APP_SERVER_HOSTNAME}/admin/get/cards-distribution/today`,
          { withCredentials: true }
        );

        setCardsDistributionToday({
          active: parseInt(response.data.distribution.active),
          expired: parseInt(response.data.distribution.expired),
          cancelled: parseInt(response.data.distribution.cancelled),
        });
        // setCardsDistributionToday({
        //   active: 32,
        //   expired: 48,
        //   cancelled: 19,
        // });
      } catch (error) {
        console.log(error);
      }
    };

    fetchCardsDistributionToday();

    return () => {
      source.cancel();
    };
  }, []);


  return (
    <div
      className='flex flex-col rounded border bg-white shadow-md'
      style={{ width: '350px' }}
    >
      <div className='border-b px-4 py-2.5 font-medium'>
        Προεπισκόπη καρτών για {DateTime.now().toLocaleString()}
      </div>
      {cardsDistributionToday?.active === 0 &&
      cardsDistributionToday?.expired === 0 &&
      cardsDistributionToday?.cancelled === 0 ? (
        <div className='p-4 text-center font-medium text-neutral-600'>
          Δεν έχει πραγματοποιηθεί ακόμη αγόρα κάρτας στάθμευσης
        </div>
      ) : (
        <Pie
          className='p-4'
          data={{
            labels: ['Ενεργές', 'Έληξαν', 'Ακυρώθηκαν'],
            datasets: [
              {
                label: '# of Votes',
                data: [
                  cardsDistributionToday?.active,
                  cardsDistributionToday?.expired,
                  cardsDistributionToday?.cancelled,
                ],
                backgroundColor: [
                  'rgba(70,191,189,0.2)',
                  'rgba(148,159,177,0.2)',
                  'rgba(247,70,74,0.2)',
                ],
                borderColor: [
                  'rgba(70,191,189,1)',
                  'rgba(148,159,177,1)',
                  'rgba(247,70,74,1)',
                ],
                borderWidth: 1,
              },
            ],
          }}
        />
      )}
    </div>
  );
};

export default PieChart;
