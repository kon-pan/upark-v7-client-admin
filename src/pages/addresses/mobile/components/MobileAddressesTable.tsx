import React, { useEffect, useState } from 'react';
import { IAddress } from '../../../../common/interfaces/interfaces';
import { classNames } from '../../../../common/utils/classnames';
import EditAddressModal from '../../common/modals/EditAddressModal';
import LocationModal from '../../common/modals/LocationModal';
import RemoveAddressModal from '../../common/modals/RemoveAddressModal';

const MobileAddressesTable = ({
  addresses,
  liftRemoveAddressSucces,
  liftEditAddressSuccess,
}: {
  addresses: IAddress[];
  liftRemoveAddressSucces: (value: boolean) => void;
  liftEditAddressSuccess: (value: boolean) => void;
}) => {
  const [address, setAddress] = useState<IAddress>();
  const [position, setPosition] = useState<[number, number]>([0, 0]);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);

  // Pagination
  const itemsPerPage = 3;
  const totalPageCount =
    addresses.length > 0 && Math.ceil(addresses.length / itemsPerPage);
  const [page, setPage] = useState('1');
  const [items, setItems] = useState(
    addresses.length > 0 ? addresses.slice(0, itemsPerPage) : []
  )!;

  useEffect(() => {
    if (parseInt(page) === 1 && addresses.length > 0) {
      setItems(addresses.slice(0, itemsPerPage));
    }

    if (parseInt(page) > 1 && addresses.length > 0) {
      console.log(parseInt(page));
      setItems(
        addresses.slice(
          (parseInt(page) - 1) * itemsPerPage,
          parseInt(page) * itemsPerPage
        )
      );
    }

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, addresses]);

  // Modals

  // Modals
  const [isRemoveAddressModaOpen, setIsRemoveAddressModaOpen] = useState(false);
  const [isEditAddressModaOpen, setIsEditAddressModaOpen] = useState(false);

  function openLocationModal() {
    setIsLocationModalOpen(true);
  }
  function closeLocationModal() {
    setIsLocationModalOpen(false);
  }

  function openRemoveAddressModal() {
    setIsRemoveAddressModaOpen(true);
  }
  function closeRemoveAddressModal() {
    setIsRemoveAddressModaOpen(false);
  }

  function openEditAddressModal() {
    setIsEditAddressModaOpen(true);
  }
  function closeEditAddressModal() {
    setIsEditAddressModaOpen(false);
  }
  return (
    <>
      <div className='flex w-10/12 flex-col bg-white shadow-md'>
        {items.map((address) => {
          return (
            <div key={address.id} className='flex w-full border-b p-4'>
              <div className='flex w-2/12 flex-col'>
                <div className='font-bold'>ID</div>
                <div>{address.id}</div>
              </div>

              <div className='flex w-8/12 flex-col'>
                <div className='flex flex-col border-b pb-1'>
                  <div className='font-bold'>Διεύθυνση</div>
                  <div>{address.name}</div>
                </div>
                <div className='flex flex-col items-center'>
                  <div className='font-bold'>Θέσεις</div>
                  <div className='flex pt-1'>
                    <div className='mr-2 flex flex-col items-center'>
                      <div className='text-sm font-bold'>Διαθέσιμες</div>
                      <div>{address.available}</div>
                    </div>
                    <div className='flex flex-col items-center'>
                      <div className='text-sm font-bold'>Κατειλλημένες</div>
                      <div>{address.occupied}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className='flex w-2/12 flex-col items-center space-y-3'>
                <button
                  onClick={() => {
                    setPosition([address.position[0], address.position[1]]);
                    openLocationModal();
                  }}
                  className='rounded-full border bg-blue-600 p-2 text-white hover:bg-blue-700'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-5 w-5'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                  >
                    <path
                      fillRule='evenodd'
                      d='M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z'
                      clipRule='evenodd'
                    />
                  </svg>
                </button>
                <button
                  onClick={() => {
                    setAddress(address);
                    openEditAddressModal();
                  }}
                  className='w-fit rounded-full bg-yellow-300 p-2 shadow-md'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-5 w-5'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                  >
                    <path d='M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z' />
                    <path
                      fillRule='evenodd'
                      d='M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z'
                      clipRule='evenodd'
                    />
                  </svg>
                </button>
                <button
                  onClick={() => {
                    setAddress(address);
                    openRemoveAddressModal();
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
              </div>
            </div>
          );
        })}
      </div>
      {/* Pagination */}
      {addresses.length > 0 && (
        <div className='mt-4 flex w-10/12 items-center justify-between space-x-2'>
          {/* Left caret */}
          <button
            onClick={() => setPage(`${parseInt(page) - 1}`)}
            className={classNames(
              'rounded-full bg-white p-1.5 shadow-md',
              parseInt(page) === 1 ? 'invisible' : ''
            )}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6'
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path
                fillRule='evenodd'
                d='M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z'
                clipRule='evenodd'
              />
            </svg>
          </button>
          {/* Page numbers */}
          <div>
            {' '}
            <input
              type='number'
              min={1}
              value={page}
              onChange={(e) => {
                setPage(e.target.value);
              }}
              className='w-16 rounded border-gray-300 p-1 text-center text-sm focus:border-gray-400 focus:ring-0'
            />{' '}
            / {totalPageCount}
          </div>
          {/* Right caret */}
          <button
            onClick={() => setPage(`${parseInt(page) + 1}`)}
            className={classNames(
              'rounded-full bg-yellow-200 p-1.5 shadow-md',
              parseInt(page) === totalPageCount ? 'invisible' : ''
            )}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6'
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path
                fillRule='evenodd'
                d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
                clipRule='evenodd'
              />
            </svg>
          </button>
        </div>
      )}

      {/* Modals */}
      <>
        <LocationModal
          position={position}
          isOpen={isLocationModalOpen}
          closeModal={closeLocationModal}
        />

        {address && (
          <RemoveAddressModal
            address={address}
            isOpen={isRemoveAddressModaOpen}
            closeModal={closeRemoveAddressModal}
            liftRemoveAddressSuccess={liftRemoveAddressSucces}
          />
        )}

        {address && (
          <EditAddressModal
            address={address}
            isOpen={isEditAddressModaOpen}
            closeModal={closeEditAddressModal}
            liftEditAddressSuccess={liftEditAddressSuccess}
          />
        )}
      </>
    </>
  );
};

export default MobileAddressesTable;
