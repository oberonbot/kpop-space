import React, { useState } from 'react';
import LSDragAndSnap from '../../../components/le-sserafim-drag-snap';
import Image from 'next/image';
import Draggable from '../../../components/draggable';

interface DraggableElementProps {
  initialPosition: { left: number; top: number };
}

const page = () => {
  return (
    <main className='flex min-h-screen w-full flex-col items-center gap-32'>
      <div className='w-full h-screen flex flex-col items-center justify-center'>
        {/* <div className='w-[20rem] sm:w-[28rem] md:w-[42rem] lg:w-[55rem]  aspect-[55/9.8] relative flex flex-col items-center'> */}
        <LSDragAndSnap />
        {/* </div> */}
      </div>
    </main>
  );
};

export default page;
