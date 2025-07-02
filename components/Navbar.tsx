'use client';

import { login, logout } from '@/lib/auth-actions';
import { Session } from 'next-auth';
import Image from 'next/image';
import Link from 'next/link';
import { FaGithub } from 'react-icons/fa';

export default function Navbar({ session }: { session: Session | null }) {
  return (
    <nav className='bg-white shadow-md py-4 border-b border-gray-200'>
      <div className='container mx-auto flex justify-between items-center px-6 lg:px-8'>
        <Link href={'/'} className='flex items-center'>
          <Image src={'/logo.png'} alt='logo' width={50} height={50} />
          <span className='text-2xl font-bold text-gray-800'>la vacación</span>
        </Link>

        <div className='flex items-center space-x-4'>
          {session ? (
            <>
              <Link
                href={'/trips'}
                className='text-slate-900 hover:text-sky-500'
              >
                My Trips
              </Link>
              <Link
                className='text-slate-900 hover:text-sky-500'
                href={'/globe'}
              >
                Globe
              </Link>
              <button
                onClick={logout}
                className=' flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-900 text-white p-2 rounded-2xl cursor-pointer'
              >
                Sign Out
              </button>
            </>
          ) : (
            <button
              onClick={login}
              className=' flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-900 text-white p-2 rounded-2xl cursor-pointer'
            >
              Sign In <FaGithub className='text-xl' />{' '}
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
