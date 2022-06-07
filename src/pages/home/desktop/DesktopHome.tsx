import { useState } from 'react';
import { useSidebar } from '../../../common/stores/SidebarStore';
import { classNames } from '../../../common/utils/classnames';
import Cards from './components/cards/Cards';
import EarningsLastFourWeeksChart from './components/charts/earnings/EarningsLastFourWeeksChart';
import EarningsLastSevenDaysChart from './components/charts/earnings/EarningsLastSevenDaysChart';
import EarningsLastSixMonthsChart from './components/charts/earnings/EarningsLastSixMonthsChart';
import PieChart from './components/charts/PieChart';
import DriversLastSevenDaysChart from './components/charts/drivers/DriversLastSevenDaysChart';
import DriversLastFourWeeksChart from './components/charts/drivers/DriversLastFourWeeks';

const DesktopHome = () => {
  const { setSidebarOpen, sidebarOpen } = useSidebar();

  const [earningsChart, setEarningsChart] = useState(1);
  const [usersChart, setUsersChart] = useState(1);

  return (
    <div
      className='z-0 flex max-h-full w-full flex-1 flex-col items-center'
      onClick={() => {
        sidebarOpen && setSidebarOpen(false);
      }}
    >
      {/* Row */}
      <Cards />
      {/* Row */}
      <div className='mb-4 flex w-10/12 justify-between space-x-3'>
        <PieChart />
        <div className='flex h-full w-8/12 flex-col rounded border bg-white shadow-md'>
          <div className='flex justify-between border-b px-4 py-2.5 font-medium'>
            <div>
              Κέρδη τελευταίων{' '}
              {earningsChart === 1
                ? '7 ημερών'
                : earningsChart === 2
                ? '4 εβδομάδων'
                : earningsChart === 3
                ? '6 μηνών'
                : null}
            </div>
            <div className='space-x-1'>
              <button
                onClick={() => setEarningsChart(1)}
                className={classNames(
                  'rounded px-2 text-sm font-medium',
                  earningsChart === 1
                    ? 'border border-blue-600 bg-white text-blue-600'
                    : 'bg-blue-600 text-white'
                )}
              >
                7 ημερών
              </button>
              <button
                onClick={() => setEarningsChart(2)}
                className={classNames(
                  'rounded px-2 text-sm font-medium',
                  earningsChart === 2
                    ? 'border border-blue-600 bg-white text-blue-600'
                    : 'bg-blue-600 text-white'
                )}
              >
                4 εβδομάδων
              </button>
              <button
                onClick={() => setEarningsChart(3)}
                className={classNames(
                  'rounded px-2 text-sm font-medium',
                  earningsChart === 3
                    ? 'border border-blue-600 bg-white text-blue-600'
                    : 'bg-blue-600 text-white'
                )}
              >
                6 μηνών
              </button>
            </div>
          </div>
          {earningsChart === 1 && <EarningsLastSevenDaysChart />}
          {earningsChart === 2 && <EarningsLastFourWeeksChart />}
          {earningsChart === 3 && <EarningsLastSixMonthsChart />}
        </div>
      </div>

      {/* Row */}
      <div className='mb-4 flex w-10/12'>
        <div className='flex h-full w-full flex-col rounded border bg-white shadow-md'>
          <div className='flex justify-between border-b px-4 py-2.5 font-medium'>
            <div>
              Εγγραφές οδηγών τελευταίων{' '}
              {usersChart === 1
                ? '7 ημερών'
                : earningsChart === 2
                ? '4 εβδομάδων'
                : earningsChart === 3
                ? '6 μηνών'
                : null}
            </div>
            <div className='space-x-1'>
              <button
                onClick={() => setUsersChart(1)}
                className={classNames(
                  'rounded px-2 text-sm font-medium',
                  usersChart === 1
                    ? 'border border-blue-600 bg-white text-blue-600'
                    : 'bg-blue-600 text-white'
                )}
              >
                7 ημερών
              </button>
              <button
                onClick={() => setUsersChart(2)}
                className={classNames(
                  'rounded px-2 text-sm font-medium',
                  usersChart === 2
                    ? 'border border-blue-600 bg-white text-blue-600'
                    : 'bg-blue-600 text-white'
                )}
              >
                4 εβδομάδων
              </button>
              <button
                onClick={() => setUsersChart(3)}
                className={classNames(
                  'rounded px-2 text-sm font-medium',
                  usersChart === 3
                    ? 'border border-blue-600 bg-white text-blue-600'
                    : 'bg-blue-600 text-white'
                )}
              >
                6 μηνών
              </button>
            </div>
          </div>
          {usersChart === 1 && <DriversLastSevenDaysChart />}
          {usersChart === 2 && <DriversLastFourWeeksChart />}
          {usersChart === 3 && <></>}
        </div>
      </div>
    </div>
  );
};

export default DesktopHome;
