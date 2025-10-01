'use client';
import Globe, { GlobeMethods } from 'react-globe.gl';

export default function GoldePage() {
  return (
    <div className='min-h-screen bg-gradient-to-b from-[#fff] to to-gray-400'>
      <div className='container mx-auto px-4 py-12'>
        <div className='max-w-7xl mx-auto'>
          <h1 className='text-center text-4xl font-bold mb-12'>
            Your Travel Journey
          </h1>

          <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 items-start'>
            <div className='lg:col-span-2 bg-white rounded-xl shadow-lg overflow-hidden'>
              <div className='p-6'>
                <h2 className='text-2xl font-semibold mb-4'>
                  See where you've been...
                </h2>
                <div className='h-[600px] w-full relative'></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
