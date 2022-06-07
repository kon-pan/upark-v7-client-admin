import { useState } from 'react';
import { useSidebar } from '../../../common/stores/SidebarStore';
import SlideFour from './components/slides/SlideFour';
import SlideOne from './components/slides/SlideOne';
import SlideThree from './components/slides/SlideThree';
import SlideTwo from './components/slides/SlideTwo';
import CaretLeft from './icons/CaretLeft';
import CaretRight from './icons/CaretRight';

const MobileHome = () => {
  const { setSidebarOpen, sidebarOpen } = useSidebar();

  const [slide, setSlide] = useState(1);

  const nextSlide = () => {
    if (slide === 4) {
      setSlide(1);
      return;
    }

    setSlide(slide + 1);
  };
  const prevSlide = () => {
    if (slide === 1) {
      setSlide(4);
      return;
    }

    setSlide(slide - 1);
  };

  return (
    <div
      className='z-0 flex max-h-full w-full flex-1 flex-col items-center'
      onClick={() => {
        sidebarOpen && setSidebarOpen(false);
      }}
    >
      <button
        onClick={prevSlide}
        className='absolute top-1/2 left-3 z-10 rounded-full bg-neutral-200 p-1'
      >
        <CaretLeft />
      </button>
      <button
        onClick={nextSlide}
        className='absolute top-1/2 right-3 z-10 rounded-full bg-neutral-200 p-1'
      >
        <CaretRight />
      </button>

      {slide === 1 && <SlideOne />}
      {slide === 2 && <SlideTwo />}
      {slide === 3 && <SlideThree />}
      {slide === 4 && <SlideFour />}
    </div>
  );
};

export default MobileHome;
