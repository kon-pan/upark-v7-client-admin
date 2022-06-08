import { Transition, Dialog } from '@headlessui/react';
import axios, { AxiosResponse } from 'axios';
import { FormEvent, Fragment, useState } from 'react';
import { IInspector } from '../../../../../common/interfaces/interfaces';
import { classNames } from '../../../../../common/utils/classnames';

const EditInspectorModal = ({
  inspector,
  isOpen,
  closeModal,
  liftEditInspectorSuccess,
}: {
  inspector: IInspector;
  isOpen: boolean;
  closeModal: () => void;
  liftEditInspectorSuccess: (value: boolean) => void;
}) => {
  const [errors, setErrors] = useState<any>(undefined);
  const [firstName, setFirstName] = useState(inspector?.firstName);
  const [lastName, setLastName] = useState(inspector?.lastName);
  const [email, setEmail] = useState(inspector.email);

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response: AxiosResponse = await axios.post(
        `${process.env.REACT_APP_SERVER_HOSTNAME}/admin/inspectors/update/${inspector.id}`,
        { firstName, lastName, email },
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        liftEditInspectorSuccess(true);
        closeModal();
      } else {
        setErrors(response.data.err);
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
                  Τροποποίηση ελεγκτή
                </Dialog.Title>
                <div className='mt-2 flex flex-col'>
                  <div className='text-sm font-light'>
                    Συμπληρώστε τα πεδία της παρακάτω φόρμας.
                  </div>
                  <form onSubmit={submitHandler} className='mt-2 flex flex-col'>
                    <div className='relative mb-2 text-gray-700'>
                      <input
                        className={classNames(
                          errors?.firstName
                            ? 'form-input-error'
                            : 'form-input mb-2'
                        )}
                        type='text'
                        name='first-name'
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder='Όνομα'
                      />
                      {errors?.firstName && (
                        <div className='mt-1 text-sm font-medium text-red-700'>
                          {errors.firstName}
                        </div>
                      )}

                      <input
                        className={classNames(
                          errors?.lastName ? 'form-input-error' : 'form-input mb-2'
                        )}
                        type='text'
                        name='last-name'
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder='Επώνυμο'
                      />
                      {errors?.lastName && (
                        <div className='mt-1 text-sm font-medium text-red-700'>
                          {errors.lastName}
                        </div>
                      )}

                      <input
                        className={classNames(
                          errors?.email ? 'form-input-error' : 'form-input'
                        )}
                        type='text'
                        name='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='Διεύθυνση ηλ. ταχυδρομείου'
                      />
                      {errors?.email && (
                        <div className='mt-1 text-sm font-medium text-red-700'>
                          {errors.email}
                        </div>
                      )}
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

export default EditInspectorModal;
