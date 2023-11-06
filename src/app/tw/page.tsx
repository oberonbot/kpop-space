import React from 'react';
import { twiceMemebers } from '../../../lib/data';

const page = () => {
  return (
    <main className='flex min-h-screen flex-col items-center p-24 gap-32'>
      <h1 className=' text-8xl'>Twice</h1>
      <h2 className=' text-4xl'>{twiceMemebers.member1}</h2>
    </main>
  );
};

export default page;
