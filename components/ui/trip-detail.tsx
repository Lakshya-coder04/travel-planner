'use client';

import { Trip } from '@/app/generated/prisma';
import Image from 'next/image';
import Link from 'next/link';
import { SlCalender } from 'react-icons/sl';
import { FaPlus } from 'react-icons/fa6';
import { Button } from './button';
import { Tabs, TabsTrigger } from './tabs';
import { TabsContent, TabsList } from '@radix-ui/react-tabs';
import { useState } from 'react';
import { LuMapPin } from 'react-icons/lu';
import Map from '@/components/Map';

export type TripWithLocation = Trip & {
  locations: Location[];
};

interface TripDetailClientProps {
  trip: TripWithLocation;
}

export default function TripDetailClient({ trip }: TripDetailClientProps) {
  const [activeTab, setActiveTab] = useState('overview');

  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0]; // YYYY-MM-DD
  };

  return (
    <div className='container mx-auto px-4 py-8 space-y-8'>
      {trip.imageUrl && (
        <div className='w-full h-72 md:h-96 overflow-hidden rounded-xl shadow-lg relative'>
          <Image
            src={trip.imageUrl}
            alt={trip.title}
            className='object-cover'
            fill
            priority
          />
        </div>
      )}

      <div className='bg-white p-6 shadow rounded-lg flex flex-col md:flex-row justify-between items-start md:items-center'>
        <div>
          <h1 className='text-4xl font-extrabold text-gray-900'>
            {trip.title}
          </h1>

          <div className='flex justify-start items-center text-gray-500 mt-2'>
            <SlCalender />
            <span className='ml-3 text-md'>
              {formatDate(trip.startDate)} - {formatDate(trip.endDate)}
            </span>
          </div>
        </div>
        <div className='mt-4 md:mt-0'>
          <Link href={`/trips/${trip.id}/itinerary/new`}>
            <Button className='cursor-pointer'>
              <FaPlus className='mr-2 h-5 w-5' />
              Add Location
            </Button>
          </Link>
        </div>
      </div>

      <div className=' bg-white p-6 shadow rounded-lg'>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className='mb-6 '>
            <TabsTrigger value='overview' className='text-lg'>
              Overview
            </TabsTrigger>
            <TabsTrigger value='itinerary' className='text-lg'>
              Itinerary
            </TabsTrigger>
            <TabsTrigger value='map' className='text-lg'>
              Map
            </TabsTrigger>
          </TabsList>
          <TabsContent className='space-y-6' value='overview'>
            <div className='grid md:grid-cols-2 gap-6'>
              <div>
                <h2 className='text-2xl font-semibold'>Trip Summary</h2>
                <div className='space-y-4'>
                  <div className='flex justify-start items-start'>
                    <SlCalender className='h-5 w-5 mr-3 text-gray-500' />
                    <div>
                      <p className='font-medium text-gray-700'>Dates</p>
                      <p className='text-sm text-gray-500'>
                        {formatDate(trip.startDate)} -{' '}
                        {formatDate(trip.endDate)}
                        <br />
                        {`${Math.round(
                          (trip.endDate.getTime() - trip.startDate.getTime()) /
                            (1000 * 60 * 60 * 24)
                        )} day(s)`}
                      </p>
                    </div>
                  </div>

                  <div className='flex items-start'>
                    <LuMapPin className='h-6 w-6 mr-3 text-gray-500 ' />
                    <div>
                      <p>Destinations</p>
                      <p> {trip.locations.length}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className='h-72 rounded-lg overflow-hidden shadow'>
                <Map itineraries={trip.locations} />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
