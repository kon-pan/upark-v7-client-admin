import { useContext } from 'react';
import useAuth from '../../../contexts/AuthContex';
import { ScreenSizeContext } from '../../../contexts/ScreenSizeContext';
import Sidebar from '../../../sidebar/Sidebar';
import { classNames } from '../../../utils/classnames';
import Navbar from '../../navbar/Navbar';

const BasicLayout = ({ children }: any) => {
  const { admin } = useAuth();
  const screen = useContext(ScreenSizeContext);

  return (
    <div
      className={classNames(
        'relative min-h-screen',
        'flex flex-col',
        'bg-neutral-50'
      )}
    >
      <Navbar />
      <div className='flex w-full flex-1'>
        {!admin?.id && (screen.isDesktop || screen.isLargeDesktop) ? null : (
          <Sidebar />
        )}
        {children}
      </div>
    </div>
  );
};

export default BasicLayout;
