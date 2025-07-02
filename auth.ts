import NextAuth from 'next-auth';
import Github from 'next-auth/providers/github';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from './lib/prisma';

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [Github],
  adapter: PrismaAdapter(prisma), //it's only necessary only if you are using an orm like Prisma which is going to adapt and store authenticated user info into the database
});
