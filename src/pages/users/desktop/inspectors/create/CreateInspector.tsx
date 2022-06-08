import '../Inspectors.css';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import BasicLayout from '../../../../../common/components/layout/basic/BasicLayout';
import { useSidebar } from '../../../../../common/stores/SidebarStore';
import { classNames } from '../../../../../common/utils/classnames';
import CaretRight from '../../common/icons/CaretRight';
import axios, { AxiosResponse } from 'axios';

const CreateInspector = () => {
  const { register: registerInput, handleSubmit } = useForm();
  const { setSidebarOpen, sidebarOpen } = useSidebar();

  const [errors, setErrors] = useState<any>(undefined);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<boolean | undefined>(undefined);

  const onSubmit = async (data: any) => {
    setLoading(true);
    console.log(data);
    const { firstName, lastName, email, password } = data;

    try {
      const response: AxiosResponse = await axios.post(
        `${process.env.REACT_APP_SERVER_HOSTNAME}/admin/inspectors/create`,
        { firstName, lastName, email, password },
        { withCredentials: true }
      );

      if (response.data.success) {
        setSuccess(true);
        setLoading(false);
      } else {
        setErrors(response.data.err);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  return (
    <BasicLayout>
      <div
        className='z-0 flex w-full flex-1 flex-col items-center'
        onClick={() => {
          sidebarOpen && setSidebarOpen(false);
        }}
      >
        <div className='w-11/12'>
          {/* Header */}
          <div className='mb-4 flex w-full items-center space-x-2 border-b py-3'>
            <Link
              to='/users'
              className='cursor-pointer text-2xl font-medium hover:underline hover:underline-offset-2'
            >
              Χρήστες
            </Link>
            <CaretRight />
            <Link
              to='/users/inspectors'
              className='cursor-pointer text-2xl font-medium hover:underline hover:underline-offset-2'
            >
              Ελεγκτές
            </Link>
            <CaretRight />
            <div className='pr-4 text-2xl font-medium'>Δημιουργία ελεγκτή</div>
          </div>

          {/* Row */}
          <div className='flex w-full justify-center'>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className='w-7/12 border bg-white p-4 shadow-md'
            >
              <div className='mb-2 flex space-x-3'>
                <div className='flex w-1/2 flex-col'>
                  <input
                    {...registerInput('firstName')}
                    type='text'
                    placeholder='Όνομα'
                    className={classNames(
                      errors?.firstName ? 'form-input-error' : 'form-input'
                    )}
                  />
                  {errors?.firstName && (
                    <div className='mt-1 text-sm font-medium text-red-700'>
                      {errors.firstName}
                    </div>
                  )}
                </div>
                <div className='flex w-1/2 flex-col'>
                  <input
                    {...registerInput('lastName')}
                    type='text'
                    placeholder='Επώνυμο'
                    className={classNames(
                      errors?.firstName ? 'form-input-error' : 'form-input'
                    )}
                  />
                  {errors?.lastName && (
                    <div className='mt-1 text-sm font-medium text-red-700'>
                      {errors.lastName}
                    </div>
                  )}
                </div>
              </div>
              <div className='mb-2 flex flex-col'>
                <input
                  {...registerInput('email')}
                  type='text'
                  placeholder='Διεύθυνση ηλ. ταχυδρομείου'
                  className={classNames(
                    errors?.email ? 'form-input-error' : 'form-input'
                  )}
                />
                {errors?.email && (
                  <div className='mt-1 text-sm font-medium text-red-700'>
                    {errors.email}
                  </div>
                )}
              </div>
              <div className='flex w-full flex-col justify-between'>
                <div className='relative w-full flex-col'>
                  <input
                    {...registerInput('password')}
                    placeholder='Κωδικός πρόσβασης'
                    className={classNames(
                      errors?.password ? 'form-input-error' : 'form-input'
                    )}
                    type={showPassword ? 'text' : 'password'}
                    autoComplete='off'
                  />

                  <div
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                    className='absolute inset-y-0 right-0 top-1 flex cursor-pointer items-center px-2 text-neutral-600 hover:text-neutral-800'
                  >
                    {showPassword ? (
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-5 w-5'
                        viewBox='0 0 20 20'
                        fill='currentColor'
                      >
                        <path
                          fillRule='evenodd'
                          d='M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z'
                          clipRule='evenodd'
                        />
                        <path d='M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z' />
                      </svg>
                    ) : (
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-5 w-5 '
                        viewBox='0 0 20 20'
                        fill='currentColor'
                      >
                        <path d='M10 12a2 2 0 100-4 2 2 0 000 4z' />
                        <path
                          fillRule='evenodd'
                          d='M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z'
                          clipRule='evenodd'
                        />
                      </svg>
                    )}
                  </div>
                </div>
                {errors?.password && (
                  <div className='mt-1 text-sm font-medium text-red-700'>
                    {errors.password}
                  </div>
                )}
              </div>
              <button
                className={classNames(
                  'mx-auto mt-4 flex w-1/3 items-center justify-center space-x-1 rounded bg-blue-600 py-1.5 text-base font-medium text-white shadow-md hover:bg-blue-700'
                )}
                type='submit'
              >
                {loading ? (
                  <div className='flex items-center justify-center'>
                    <div className='mr-2'>Γίνεται αποθήκευση</div>
                    <div
                      style={{ borderTopColor: 'transparent' }}
                      className='my-0.5 h-5 w-5 animate-spin rounded-full border-2 border-solid border-white'
                    ></div>
                  </div>
                ) : (
                  <>
                    <div>Αποθήκευση</div>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-5 w-5'
                      viewBox='0 0 20 20'
                      fill='currentColor'
                    >
                      <path d='M7.707 10.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V6h5a2 2 0 012 2v7a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h5v5.586l-1.293-1.293zM9 4a1 1 0 012 0v2H9V4z' />
                    </svg>
                  </>
                )}
              </button>
              {success && (
                <div className='mt-2 rounded bg-green-100 p-2 text-center font-medium text-green-800 shadow-md'>
                  Ο ελεγκτής αποθηκεύτηκε με επιτυχία.
                </div>
              )}
              {success === false && (
                <div className='mt-2 rounded bg-red-100 p-2 text-center font-medium text-red-800 shadow-md'>
                  Υπήρξε πρόβλημα κατά την υποβολή της φόρμας. Προσπαθήστε ξανα.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </BasicLayout>
  );
};

export default CreateInspector;
