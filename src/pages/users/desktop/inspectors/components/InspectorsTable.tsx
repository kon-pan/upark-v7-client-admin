import { useEffect, useState } from 'react';
import { IInspector } from '../../../../../common/interfaces/interfaces';
import { classNames } from '../../../../../common/utils/classnames';

const InspectorsTable = ({
  inspectors,
  liftInspector,
  openRemoveInspectorModal,
  openEditInspectorModal,
}: // ,
{
  inspectors: IInspector[];
  liftInspector: (value: IInspector) => void;
  openRemoveInspectorModal: () => void;
  openEditInspectorModal: () => void;
}) => {
  // Pagination
  const itemsPerPage = 15;
  const totalPageCount =
    inspectors.length > 0 && Math.ceil(inspectors.length / itemsPerPage);
  const [page, setPage] = useState('1');
  const [items, setItems] = useState(
    inspectors.length > 0 ? inspectors.slice(0, itemsPerPage) : []
  )!;

  useEffect(() => {
    if (parseInt(page) === 1 && inspectors.length > 0) {
      setItems(inspectors.slice(0, itemsPerPage));
    }

    if (parseInt(page) > 1 && inspectors.length > 0) {
      setItems(
        inspectors.slice(
          (parseInt(page) - 1) * itemsPerPage,
          parseInt(page) * itemsPerPage
        )
      );
    }

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, inspectors]);

  return (
    <>
      {/* Table */}
      <div className='mt-4 flex w-full flex-col rounded bg-white px-4 py-2 shadow-md'>
        <div className='overflow-x-auto sm:-mx-6 lg:-mx-8'>
          <div className='inline-block min-w-full sm:px-6 lg:px-8'>
            <div className='overflow-hidden rounded-t'>
              <table className='min-w-full'>
                <thead className='bg-neutral-700 text-neutral-50'>
                  <tr>
                    <th
                      scope='col'
                      className='px-6 py-4 text-center text-sm font-medium'
                    >
                      ID
                    </th>
                    <th
                      scope='col'
                      className='px-6 py-4 text-center text-sm font-medium'
                    >
                      Όνομα
                    </th>
                    <th
                      scope='col'
                      className='px-6 py-4 text-center text-sm font-medium'
                    >
                      Επώνυμο
                    </th>
                    <th
                      scope='col'
                      className='px-6 py-4 text-center text-sm font-medium'
                    >
                      Ηλ. Διεύθυνση
                    </th>
                    <th
                      scope='col'
                      className='px-6 py-4 text-center text-sm font-medium'
                    ></th>
                  </tr>
                </thead>
                <tbody className='text-center'>
                  {items.map((item) => {
                    return (
                      <tr
                        key={item.id}
                        className='border-t transition duration-300 ease-in-out hover:bg-gray-200 hover:bg-opacity-50'
                      >
                        <td className='whitespace-nowrap px-6 py-2 text-sm font-medium text-gray-900'>
                          {item.id}
                        </td>
                        <td className='whitespace-nowrap px-6 py-2 text-sm font-light text-gray-900'>
                          {item.firstName}
                        </td>
                        <td className='whitespace-nowrap px-6 py-2 text-sm font-light text-gray-900'>
                          {item.lastName}
                        </td>
                        <td className='whitespace-nowrap px-6 py-2 text-sm font-light text-gray-900'>
                          {item.email}
                        </td>
                        <td className='space-x-2 whitespace-nowrap px-6 py-2 text-sm'>
                          <button
                            onClick={() => {
                              liftInspector(item);
                              openEditInspectorModal();
                            }}
                            className='rounded-full bg-yellow-300 p-1.5 text-black hover:bg-yellow-400'
                          >
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              className='h-4 w-4'
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
                              liftInspector(item);
                              openRemoveInspectorModal();
                            }}
                            className='rounded-full bg-red-600 p-1.5 text-white hover:bg-red-700'
                          >
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              className='h-4 w-4'
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
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Pagination */}
      {inspectors.length > 0 && (
        <div className='mt-4 flex w-full items-center justify-between space-x-2'>
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
    </>
  );
};

export default InspectorsTable;
