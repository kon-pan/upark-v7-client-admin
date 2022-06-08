import 'leaflet/dist/leaflet.css';
import './LocationModal.css';
import { Dialog, Transition } from '@headlessui/react';
import { Icon } from 'leaflet';
import { Fragment } from 'react';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import markerIconBlue from '../../../../common/images/marker-icon-blue.png';
import markerShadow from '../../../../common/images/marker-shadow.png';

const LocationModal = ({
  position,
  isOpen,
  closeModal,
}: {
  position: [number, number];
  isOpen: boolean;
  closeModal: () => void;
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
              <div className='my-16 inline-block w-full max-w-lg transform overflow-hidden rounded bg-white p-6 text-left align-middle shadow-xl transition-all'>
                <Dialog.Title
                  as='h3'
                  className='text-lg font-medium leading-6 text-gray-900'
                >
                  Προεπισκόπηση σημείου στάθμευσης
                </Dialog.Title>
                <div className='mt-4 flex flex-col'>
                  <div className='mx-auto border-gray-400'>
                    <MapContainer
                      className='z-0'
                      center={position}
                      zoom={15}
                      scrollWheelZoom={true}
                      tap={false}
                    >
                      <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                      />
                      <Marker
                        draggable={false}
                        icon={
                          new Icon({
                            iconUrl: markerIconBlue,
                            iconSize: [25, 41],
                            iconAnchor: [12, 41],
                            shadowUrl: markerShadow,
                          })
                        }
                        position={position}
                        interactive={true}
                      ></Marker>
                    </MapContainer>
                  </div>

                  <div className='mt-4 flex justify-end space-x-2'>
                    <button
                      type='button'
                      className='justify-center rounded-md border border-transparent bg-gray-200 px-4 py-0.5 text-sm font-medium shadow hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2'
                      onClick={closeModal}
                    >
                      Ακύρωση
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

export default LocationModal;
