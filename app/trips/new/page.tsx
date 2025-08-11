'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { createTrip } from '@/lib/actions/create-trip';
import { cn } from '@/lib/utils';
import { UploadButton } from '@/lib/uploadthing';
import { useState, useTransition } from 'react';
import Image from 'next/image';

export default function NewTrip() {
  const [isPending, startTransition] = useTransition();
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  return (
    <div className='max-w-lg mx-auto mt-10'>
      <Card className='shadow-2xl'>
        <CardHeader>New Trip</CardHeader>
        <CardContent>
          <form
            className='space-y-6'
            action={(FormData: FormData) => {
              if (imageUrl) {
                FormData.append('imageUrl', imageUrl);
              }
              startTransition(() => {
                createTrip(FormData);
              });
            }}
          >
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Title
              </label>
              <input
                type='text'
                name='title'
                placeholder='Japan Trip...'
                className={cn(
                  'w-full border border-gray-300 px-3 py-2',
                  'rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                )}
                required
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Description
              </label>
              <input
                type='text'
                name='description'
                placeholder='Trip Description'
                className={cn(
                  'w-full border border-gray-300 px-3 py-2',
                  'rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                )}
                required
              />
            </div>
            <div className='grid grid-cols-2 gap-4 '>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Start Date
                </label>
                <input
                  type='date'
                  name='startDate'
                  placeholder='Japan Trip...'
                  className={cn(
                    'w-full border border-gray-300 px-3 py-2',
                    'rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                  )}
                  required
                />
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  End Date
                </label>
                <input
                  type='date'
                  name='endDate'
                  placeholder='Japan Trip...'
                  className={cn(
                    'w-full border border-gray-300 px-3 py-2',
                    'rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                  )}
                  required
                />
              </div>
            </div>

            <div>
              <label>Trip Image</label>
              {imageUrl && (
                <Image
                  src={imageUrl}
                  alt='Trip Preview'
                  className='w-full mb-4 rounded-md max-h-48 object-cover'
                  height={300}
                  width={100}
                />
              )}
              <UploadButton
                endpoint='imageUploader'
                onClientUploadComplete={(res) => {
                  if (res && res[0].ufsUrl) {
                    setImageUrl(res[0].ufsUrl);
                  }
                }}
                onUploadError={(error: Error) => {
                  console.error('Upload error: ', error);
                }}
              />
            </div>

            <Button type='submit' disabled={isPending} className='w-full'>
              {isPending ? 'Creating...' : 'Create Trip'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
