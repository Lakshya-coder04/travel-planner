import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from './lib/prisma';
import GitHub from 'next-auth/providers/github';

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [GitHub],
  adapter: PrismaAdapter(prisma), //it's only necessary only if you are using an orm like Prisma which is going to adapt and store authenticated user info into the database
  session: {
    strategy: 'jwt', // or 'database' if you prefer
  },
});
