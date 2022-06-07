import { DateTime } from 'luxon';
import { IDriver } from '../../../../../common/interfaces/interfaces';

const DriversTable = ({
  drivers,
  liftDriver,
  openRemoveDriverModal,
  openDriverDetailsModal,
}: {
  drivers: IDriver[];
  liftDriver: (value: IDriver) => void;
  openRemoveDriverModal: () => void;
  openDriverDetailsModal: () => void;
}) => {
  return (
    <div className='flex w-10/12 flex-col bg-white shadow-md'>
      {drivers.map((driver) => {
        return (
          <div key={driver.id} className='flex w-full border-b p-4'>
            <div className='flex w-2/12 flex-col'>
              <div className='font-bold'>ID</div>
              <div>{driver.id}</div>
            </div>

            <div className='flex w-8/12 flex-col'>
              <div className='flex flex-col border-b pb-1'>
                <div className='font-bold'>E-mail</div>
                <div>{driver.email}</div>
              </div>
              <div className='flex flex-col pt-1'>
                <div className='font-bold'>Ημ/νία εγγραφής</div>
                <div>
                  {DateTime.fromISO(driver.registeredOn).toLocaleString(
                    DateTime.DATETIME_MED
                  )}
                </div>
              </div>
            </div>

            <div className='flex w-2/12 flex-col items-center space-y-3'>
              <button
                onClick={() => {
                  liftDriver(driver);
                  openRemoveDriverModal();
                }}
                className='w-fit rounded-full bg-red-500 p-2 shadow-md'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-5 w-5 text-white'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                >
                  <path
                    fillRule='evenodd'
                    d='M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z'
                    clipRule='evenodd'
                  />
                </svg>
              </button>
              <button
                onClick={() => {
                  liftDriver(driver);
                  openDriverDetailsModal();
                }}
                className='w-fit rounded-full bg-neutral-200 p-2 shadow-md'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-5 w-5'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                >
                  <path d='M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z' />
                </svg>
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DriversTable;
