const CardsSkeleton = () => {
  const CardSkeleton = () => {
    return (
      <div
        className='flex w-1/4 flex-col justify-center rounded border border-neutral-200 bg-white shadow-md'
        style={{ height: '120px' }}
      >
        <div className='flex animate-pulse items-center justify-between space-x-2 p-2'>
          {/* Info */}
          <div className='space-y-2'>
            <div className='h-9 w-8 rounded bg-gray-300'></div>
            <div className='h-4 w-40 rounded bg-gray-300'></div>
          </div>
          {/* Icon */}
          <div className='h-20 w-20 rounded-full bg-gray-300'></div>
        </div>
      </div>
    );
  };
  return (
    <div className='flex w-10/12 space-x-4 py-4'>
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
    </div>
  );
};

export default CardsSkeleton;
