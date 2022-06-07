import { DateTime } from 'luxon';
import { IInspector } from '../../../../../common/interfaces/interfaces';

const InspectorsTable = ({
  inspectors,
  liftInspector,
  openRemoveInspectorModal,
}: // ,
{
  inspectors: IInspector[];
  liftInspector: (value: IInspector) => void;
  openRemoveInspectorModal: () => void;
  // openDriverDetailsModal: () => void;
}) => {
  return (
    <div className='flex w-10/12 flex-col bg-white shadow-md'>
      {inspectors.map((inspector) => {
        return (
          <div key={inspector.id} className='flex w-full border-b p-4'>
            <div className='flex w-2/12 flex-col'>
              <div className='font-bold'>ID</div>
              <div>{inspector.id}</div>
            </div>

            <div className='mr-4 flex w-8/12 flex-col'>
              <div className='flex flex-col border-b pb-1'>
                <div className='font-bold'>E-mail</div>
                <div>{inspector.email}</div>
              </div>
              <div className='flex flex-col pt-1'>
                <div className='font-bold'>Όνομα</div>
                <div>{inspector.displayName}</div>
              </div>
            </div>

            <div className='flex w-2/12 flex-col items-center space-y-3'>
              <button
                onClick={() => {
                  liftInspector(inspector);
                  openRemoveInspectorModal();
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
  );
};

export default InspectorsTable;
