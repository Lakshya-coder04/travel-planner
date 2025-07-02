// this page is only accessible only when the user is signed in or not

import { auth } from '@/auth';

// its a server component hence " async "
export default async function TripsPage() {
  const session = await auth();

  if (!session) {
    return (
      <div className='flex justify-center items-center h-screen text-gray-700 text-xl'>
        Please Sign In.
      </div>
    );
  }

  return (
    <div className='space-y-6 container mx-auto px-4 py-8'>
      <div>
        <h1>Dashboard</h1>
      </div>
    </div>
  );
}
