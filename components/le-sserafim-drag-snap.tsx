'use client';
import React, { useRef, useState } from 'react';
import Draggable from './draggable';

const LSDragAndSnap = () => {
  const [childStates, setChildStates] = useState<Array<boolean>>(
    Array(10).fill(false)
  );
  const [isAllDone, setIsAllDone] = useState<boolean>(false);

  const handleChildStateChange = (index: number, newState: boolean) => {
    const newChildStates = [...childStates];
    newChildStates[index] = newState;
    setChildStates(newChildStates);

    // console.log(newChildStates);

    // Check if all child states are true
    const allChildStatesTrue = newChildStates.every((state) => state === true);
    if (allChildStatesTrue) {
      // Do something when all child states are true
      // console.log('All child states are true!');
      setIsAllDone(true);
    }
  };

  return (
    <div className='w-full h-full flex flex-col items-center gap-10'>
      {isAllDone ? <h1 className='ls-title'>IM FEARLESS</h1> : <></>}
      <div className='bars-container'>
        {childStates.map((isDone, index) => (
          <Draggable
            key={index}
            index={index}
            isDone={isDone}
            onStateChange={handleChildStateChange}
          />
        ))}
      </div>
      {isAllDone ? <h1 className='ls-title'>LE SSERAFIM</h1> : <></>}
    </div>
  );
};

export default LSDragAndSnap;
