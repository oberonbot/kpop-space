import Link from 'next/link';

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center p-24 gap-32'>
      <h1 className=' text-8xl'>Welcome!</h1>
      <div className='flex flex-row gap-10'>
        <Link
          href={'/tw'}
          className=' border-2 border-black px-10 py-5 rounded-2xl hover:bg-gradient-to-r hover:from-pink-500 hover:to-yellow-500 hover:text-white transition-all'
        >
          <h1 className='text-6xl'>Twice</h1>
        </Link>
        <Link
          href={'/nj'}
          className=' border-2 border-black px-10 py-5 rounded-2xl hover:bg-gradient-to-r hover:from-slate-500 hover:to-pink-600 hover:text-white transition-all'
        >
          <h1 className='text-6xl'>New Jeans</h1>
        </Link>
        <Link
          href={'/ls'}
          className=' border-2 border-black px-10 py-5 rounded-2xl hover:bg-gradient-to-r hover:from-black hover:to-red-600 hover:text-white transition-all'
        >
          <h1 className='text-6xl'>Le Sserafim</h1>
        </Link>
      </div>
    </main>
  );
}
