import { Transition, Dialog } from '@headlessui/react';
import axios, { AxiosResponse } from 'axios';
import { FormEvent, Fragment, useState } from 'react';
import { IAddress } from '../../../../common/interfaces/interfaces';
import { classNames } from '../../../../common/utils/classnames';

const EditAddressModal = ({
  address,
  isOpen,
  closeModal,
  liftEditAddressSuccess,
}: {
  address: IAddress;
  isOpen: boolean;
  closeModal: () => void;
  liftEditAddressSuccess: (value: boolean) => void;
}) => {
  const [name, setName] = useState<string>(address.name);
  const [available, setAvailable] = useState<number>(address.available);

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response: AxiosResponse = await axios.post(
        `${process.env.REACT_APP_SERVER_HOSTNAME}/admin/edit/address/${address.id}`,
        { name, available },
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        liftEditAddressSuccess(true);
        closeModal();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as='div'
          id='EditInspectorModal'
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
              <div className='my-16 inline-block w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                <Dialog.Title
                  as='h3'
                  className='text-lg font-medium leading-6 text-gray-900'
                >
                  Τροποποίηση σημείου στάθμευσης
                </Dialog.Title>
                <div className='mt-2 flex flex-col'>
                  <div className='text-sm font-light'>
                    Συμπληρώστε τα πεδία της παρακάτω φόρμας.
                  </div>
                  <form onSubmit={submitHandler} className='mt-2 flex flex-col'>
                    <div className='relative mb-2 text-gray-700'>
                      <label className='mr-2 text-sm font-semibold'>
                        Διεύθυνση
                      </label>
                      <input
                        className={classNames('form-input')}
                        type='text'
                        name='address-name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder='Διεύθυνση'
                      />
                    </div>
                    <div className='relative mb-2 text-gray-700'>
                      <label className='mr-2 text-sm font-semibold'>
                        Διαθέσιμες θέσεις
                      </label>
                      <input
                        min={1}
                        className={classNames('form-input')}
                        type='number'
                        name='address-name'
                        value={available}
                        onChange={(e) => setAvailable(parseInt(e.target.value))}
                        placeholder='Διαθέσιμες θέσεις'
                      />
                    </div>

                    <div className='mt-4 flex justify-end space-x-2'>
                      <button
                        type='button'
                        className='justify-center rounded-md border border-transparent bg-gray-200 px-4 py-0.5 text-sm font-medium shadow hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2'
                        onClick={closeModal}
                      >
                        Κλείσιμο
                      </button>
                      <button
                        type='submit'
                        className='justify-center rounded-md border border-transparent bg-yellow-300 px-4 py-0.5 text-sm font-medium shadow hover:bg-yellow-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2'
                      >
                        Αποθήκευση
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default EditAddressModal;
