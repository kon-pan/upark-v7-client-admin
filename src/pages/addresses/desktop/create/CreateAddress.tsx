import './CreateAddress.css';
import 'leaflet/dist/leaflet.css';
import { LatLngTuple } from 'leaflet';
import { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import BasicLayout from '../../../../common/components/layout/basic/BasicLayout';
import { useSidebar } from '../../../../common/stores/SidebarStore';
import { classNames } from '../../../../common/utils/classnames';
import CaretRight from '../../../users/desktop/common/icons/CaretRight';
import Map from './Map';
import axios, { AxiosResponse } from 'axios';

const CreateAddress = () => {
  const { setSidebarOpen, sidebarOpen } = useSidebar();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<boolean | undefined>(undefined);

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    console.log({ name, coords, available });
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const response: AxiosResponse = await axios.post(
        `${process.env.REACT_APP_SERVER_HOSTNAME}/admin/address/create`,
        { name, coords, available },
        { withCredentials: true }
      );

      if (response.data.success) {
        setSuccess(true);
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [name, setName] = useState<string>('');
  const [coords, setCoords] = useState<LatLngTuple | undefined>(undefined);
  const [available, setAvailable] = useState<number>(0);
  const [coordsValid, setCoordsValid] = useState<boolean>(false);

  const coordsFormater = (value: string) => {
    let [lat, lon] = value.split(',');
    console.log(
      isLongitude(parseFloat(lon.trim())),
      isLatitude(parseFloat(lat.trim()))
    );

    if (
      isLongitude(parseFloat(lon.trim())) &&
      isLatitude(parseFloat(lat.trim()))
    ) {
      setCoords([parseFloat(lat.trim()), parseFloat(lon.trim())]);
      setCoordsValid(true);
    } else {
      setCoordsValid(false);
    }
  };

  function isLatitude(lat: number) {
    return isFinite(lat) && Math.abs(lat) <= 90;
  }

  function isLongitude(lng: number) {
    return isFinite(lng) && Math.abs(lng) <= 180;
  }

  return (
    <BasicLayout>
      <div
        className='z-0 flex w-full flex-1 flex-col items-center'
        onClick={() => {
          sidebarOpen && setSidebarOpen(false);
        }}
      >
        <div className='flex w-11/12 flex-col'>
          {/* Header */}
          <div className='mb-4 flex w-full items-center space-x-2 border-b py-3'>
            <Link
              to='/addresses'
              className='cursor-pointer text-2xl font-medium hover:underline hover:underline-offset-2'
            >
              Σημεία στάθμευσης
            </Link>
            <CaretRight />
            <div className='pr-4 text-2xl font-medium'>
              Δημιουργία σημείου στάθμευσης
            </div>
          </div>

          {success && (
            <div className='mt-2 mb-4 rounded bg-green-100 p-2 text-center font-medium text-green-800 shadow-md'>
              Το νέο σημείο στάθμευσης αποθηκεύτηκε με επιτυχία.
            </div>
          )}
          {success === false && (
            <div className='mt-2 mb-4 rounded bg-red-100 p-2 text-center font-medium text-red-800 shadow-md'>
              Υπήρξε πρόβλημα κατά την υποβολή της φόρμας. Προσπαθήστε ξανα.
            </div>
          )}

          <div className='flex w-full flex-col justify-center border-b pb-4'>
            {/* Form */}
            <form onSubmit={submitHandler} className='flex w-full flex-col'>
              <div className='flex w-full items-center space-x-12'>
                <div className='flex items-center'>
                  <label
                    htmlFor='vehicle-name'
                    className='mr-2 text-sm font-semibold'
                  >
                    Διεύθυνση
                  </label>
                  <input
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    className={classNames(
                      'h-8 w-full rounded border pl-3 pr-3 text-sm font-semibold focus:border-neutral-500 focus:bg-white  focus:text-gray-800 focus:outline-none focus:ring-0',
                      'border-gray-300 bg-white placeholder-gray-500 shadow'
                    )}
                    type='text'
                    placeholder=''
                    autoComplete='off'
                  />
                </div>

                <div className=''>
                  <label className='mr-2 text-sm font-semibold'>
                    Διαθέσιμες θέσεις
                  </label>
                  <input
                    min={1}
                    onChange={(e) => {
                      setAvailable(parseInt(e.target.value));
                    }}
                    className={classNames(
                      'h-8 w-20 rounded border pl-3 pr-3 text-sm font-semibold focus:border-neutral-500 focus:bg-white  focus:text-gray-800 focus:outline-none focus:ring-0',
                      'border-gray-300 bg-white placeholder-gray-500 shadow'
                    )}
                    type='number'
                    placeholder=''
                    autoComplete='off'
                  />
                </div>
              </div>

              <div className='mt-2 flex w-full space-x-4'>
                <div className='flex w-1/3'>
                  <label className='mr-2 flex items-center text-sm font-semibold'>
                    Συντεταγμένες
                  </label>
                  <input
                    onChange={(e) => {
                      coordsFormater(e.target.value);
                    }}
                    className={classNames(
                      'h-8 w-full rounded border pl-3 pr-3 text-sm font-semibold focus:border-neutral-500 focus:bg-white  focus:text-gray-800 focus:outline-none focus:ring-0',
                      'border-gray-300 bg-white placeholder-gray-500 shadow'
                    )}
                    type='text'
                    placeholder='π.χ. 38.8990547,22.436231155'
                    autoComplete='off'
                  />
                </div>

                <button
                  disabled={!coordsValid && !coords}
                  className={classNames(
                    'flex h-8 items-center space-x-1 rounded px-2 text-sm font-medium shadow',
                    coordsValid && coords
                      ? 'bg-blue-600 text-white'
                      : 'bg-neutral-200 text-black'
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
              </div>
            </form>
          </div>
        </div>

        <div id='create-address' className='flex w-11/12 flex-1'>
          {/* Map section */}
          {coordsValid && coords ? (
            <div className='my-4 w-full rounded border bg-white p-4 shadow-md'>
              <Map position={coords} />
            </div>
          ) : (
            <div className='my-4 flex w-full items-center justify-center border-gray-400'>
              Δεν υπάρχει διαθέσιμη προεπισκόπηση χάρτη
            </div>
          )}
        </div>
      </div>
    </BasicLayout>
  );
};

export default CreateAddress;
