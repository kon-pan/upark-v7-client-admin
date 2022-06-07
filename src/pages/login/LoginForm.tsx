import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../common/contexts/AuthContex';
import { ScreenSizeContext } from '../../common/contexts/ScreenSizeContext';
import { classNames } from '../../common/utils/classnames';

const LoginForm = () => {
  const screen = useContext(ScreenSizeContext);
  const { register, handleSubmit } = useForm();
  const { login } = useAuth();

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: any) => {
    setLoading(true);
    // await sleep(1000);
    const success = await login(data.email, data.password);
    if (success) {
      window.location.href = '/';
    } else {
      setError(
        'Λάθος συνδυασμός διεύθυνσης ηλ. ταχυδρομείου/κωδικού πρόσβασης. Προσπαθήστε ξανά.'
      );
      setLoading(false);
    }
  };

  return (
    <form
      id='login-form'
      onSubmit={handleSubmit(onSubmit)}
      className={classNames(
        'flex flex-col rounded border border-neutral-600 bg-white text-neutral-800 shadow-md shadow-neutral-500',
        screen.isMobile
          ? 'w-10/12'
          : screen.isTablet
          ? 'w-8/12'
          : screen.isSmall
          ? 'w-6/12'
          : screen.isDesktop
          ? 'w-5/12'
          : screen.isLargeDesktop
          ? 'w-4/12'
          : ''
      )}
    >
      <div className='flex flex-col'>
        <div className='border-b py-2.5 text-center text-lg font-medium'>
          Είσοδος διαχειριστή
        </div>
        <div className='flex flex-col p-4'>
          <div className='relative mb-3'>
            <input
              {...register('email')}
              type='text'
              placeholder='Διεύθυνση ηλ. ταχυδρομείου'
            />
            <div className='pointer-events-none absolute inset-y-1 left-1 flex items-center px-2'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5 text-neutral-800'
                viewBox='0 0 20 20'
                fill='currentColor'
              >
                <path
                  fillRule='evenodd'
                  d='M14.243 5.757a6 6 0 10-.986 9.284 1 1 0 111.087 1.678A8 8 0 1118 10a3 3 0 01-4.8 2.401A4 4 0 1114 10a1 1 0 102 0c0-1.537-.586-3.07-1.757-4.243zM12 10a2 2 0 10-4 0 2 2 0 004 0z'
                  clipRule='evenodd'
                />
              </svg>
            </div>
          </div>

          <div className='relative mb-3'>
            <input
              {...register('password')}
              type='password'
              placeholder='Κωδικός πρόσβασης'
            />
            <div className='pointer-events-none absolute inset-y-1 left-1 flex items-center px-2'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5 text-neutral-800'
                viewBox='0 0 20 20'
                fill='currentColor'
              >
                <path
                  fillRule='evenodd'
                  d='M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z'
                  clipRule='evenodd'
                />
              </svg>
            </div>
          </div>

          <button
            type='submit'
            className='flex justify-center rounded bg-yellow-300 py-1.5 text-base font-semibold text-neutral-900 shadow-md'
          >
            {loading ? (
              <div className='flex items-center justify-center'>
                <div className='mr-2'>Γίνεται είσοδος</div>
                <div
                  style={{ borderTopColor: 'transparent' }}
                  className='my-0.5 h-5 w-5 animate-spin rounded-full border-2 border-solid border-neutral-900'
                ></div>
              </div>
            ) : (
              'Είσοδος'
            )}
          </button>

          {error && (
            <div className='mt-3 rounded border-red-700 bg-red-100 p-2 text-center text-sm font-medium text-red-800 shadow-md'>
              {error}
            </div>
          )}
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
