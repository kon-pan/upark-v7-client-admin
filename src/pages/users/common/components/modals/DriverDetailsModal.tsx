import { Transition, Dialog } from '@headlessui/react';
import { DateTime } from 'luxon';
import { Fragment } from 'react';
import { IDriver } from '../../../../../common/interfaces/interfaces';

const DriverDetailsModal = ({
  driver,
  isOpen,
  closeModal,
}: // liftRemoveVehicleSuccess,
{
  driver: IDriver;
  isOpen: boolean;
  closeModal: () => void;
  // liftRemoveVehicleSuccess: (value: boolean) => void;
}) => {
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as='div'
          className='fixed inset-0 z-10 overflow-y-auto'
          onClose={closeModal}
        >
          <div className='min-h-screen px-4 text-center'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <Dialog.Overlay className='fixed inset-0 bg-black opacity-75' />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className='inline-block h-screen align-top'
              aria-hidden='true'
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <div className='my-16 inline-block w-full max-w-md transform overflow-hidden rounded bg-white p-6 text-left align-middle shadow-xl transition-all'>
                <Dialog.Title
                  as='h3'
                  className='text-lg font-medium leading-6 text-gray-900'
                >
                  Λεπτομέρειες χρήστη
                </Dialog.Title>
                <div className='mt-2 flex flex-col'>
                  <div className='flex flex-col font-light'>
                    <div className='flex justify-between border-b pb-1'>
                      <div className='w-1/4 font-semibold'>ID</div>
                      <div className='w-3/4 text-right'>{driver.id}</div>
                    </div>
                    <div className='flex justify-between border-b py-1'>
                      <div className='w-1/4 font-semibold'>Όνομα</div>
                      <div className='w-3/4 text-right'>{driver.firstName}</div>
                    </div>
                    <div className='flex justify-between border-b py-1'>
                      <div className='w-1/4 font-semibold'>Επώνυμο</div>
                      <div className='w-3/4 text-right'>{driver.lastName}</div>
                    </div>
                    <div className='flex justify-between border-b py-1'>
                      <div className='w-1/4 font-semibold'>E-mail</div>
                      <div className='w-3/4 text-right'>{driver.email}</div>
                    </div>
                    <div className='flex justify-between pt-1'>
                      <div className='w-1/4 font-semibold'>Ημ/νία εγγραφής</div>
                      <div className='w-3/4 justify-end flex items-end'>
                        {DateTime.fromISO(driver.registeredOn).toLocaleString(
                          DateTime.DATETIME_MED
                        )}
                      </div>
                    </div>
                  </div>
                  <div className='mt-4 flex justify-end space-x-2'>
                    <button
                      type='button'
                      className='justify-center rounded-md border border-transparent bg-gray-200 px-4 py-0.5 text-sm font-medium shadow hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2'
                      onClick={closeModal}
                    >
                      Κλείσιμο
                    </button>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default DriverDetailsModal;
