'use client';

import { useState } from 'react';
import { login, logout } from '@/lib/auth-actions';
import { Session } from 'next-auth';
import Image from 'next/image';
import Link from 'next/link';
import { FaGithub, FaBars, FaTimes } from 'react-icons/fa';

export default function Navbar({ session }: { session: Session | null }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className='bg-white shadow-md border-b border-gray-200'>
      <div className='container mx-auto flex justify-between items-center px-6 lg:px-8 py-4'>
        {/* Logo */}
        <Link href='/' className='flex items-center space-x-2'>
          <Image src='/logo.png' alt='logo' width={40} height={40} />
          <span className='text-xl sm:text-2xl font-bold text-gray-800'>
            la vacación
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className='hidden md:flex items-center space-x-4'>
          {session ? (
            <>
              <Link href='/trips' className='text-slate-900 hover:text-sky-500'>
                My Trips
              </Link>
              <Link href='/globe' className='text-slate-900 hover:text-sky-500'>
                Globe
              </Link>
              <button
                onClick={logout}
                className='flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-900 text-white px-3 py-2 rounded-2xl'
              >
                Sign Out
              </button>
            </>
          ) : (
            <button
              onClick={login}
              className='flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-900 text-white px-3 py-2 rounded-2xl'
            >
              Sign In <FaGithub className='text-lg' />
            </button>
          )}
        </div>

        {/* Mobile Hamburger Icon */}
        <button
          onClick={toggleMenu}
          className='md:hidden text-gray-800 focus:outline-none text-2xl'
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className='md:hidden bg-white border-t border-gray-200 px-6 py-4 space-y-3'>
          {session ? (
            <>
              <Link
                href='/trips'
                onClick={() => setMenuOpen(false)}
                className='block text-slate-900 hover:text-sky-500'
              >
                My Trips
              </Link>
              <Link
                href='/globe'
                onClick={() => setMenuOpen(false)}
                className='block text-slate-900 hover:text-sky-500'
              >
                Globe
              </Link>
              <button
                onClick={() => {
                  logout();
                  setMenuOpen(false);
                }}
                className='w-full flex justify-center bg-gray-800 hover:bg-gray-900 text-white px-3 py-2 rounded-2xl'
              >
                Sign Out
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                login();
                setMenuOpen(false);
              }}
              className='w-full flex justify-center items-center gap-2 bg-gray-800 hover:bg-gray-900 text-white px-3 py-2 rounded-2xl'
            >
              Sign In <FaGithub className='text-lg' />
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
