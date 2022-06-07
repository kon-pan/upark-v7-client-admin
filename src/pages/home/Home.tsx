import { useContext } from 'react';
import BasicLayout from '../../common/components/layout/basic/BasicLayout';
import { ScreenSizeContext } from '../../common/contexts/ScreenSizeContext';
import DesktopHome from './desktop/DesktopHome';
import MobileHome from './mobile/MobileHome';

const Home = () => {
  const screen = useContext(ScreenSizeContext);

  return (
    <BasicLayout>
      {(screen.isMobile || screen.isTablet) && <MobileHome />}
      {(screen.isDesktop || screen.isLargeDesktop) && <DesktopHome />}
    </BasicLayout>
  );
};

export default Home;
