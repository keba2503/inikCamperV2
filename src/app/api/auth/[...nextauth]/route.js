import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from '../../../../lib/db';
import bcrypt from 'bcrypt';

const authOptions = {
  debug: true,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'text',
          placeholder: 'jsmith@example.com',
        },
        password: { label: 'Password', type: 'password', placeholder: '*****' },
      },
      async authorize(credentials) {
        try {
          console.log('Authorize credentials:', credentials);
          const userFound = await prisma.user.findUnique({
            where: {
              email: credentials.email,
            },
          });

          if (!userFound) {
            console.error('No user found');
            throw new Error('No user found');
          }

          const matchPassword = await bcrypt.compare(
              credentials.password,
              userFound.password,
          );

          if (!matchPassword) {
            console.error('Wrong password');
            throw new Error('Wrong password');
          }

          return {
            id: userFound.id,
            name: userFound.username,
            email: userFound.email,
          };
        } catch (error) {
          console.error('Authorize error:', error);
          throw error;
        }
      },
    }),
  ],
  pages: {
    signIn: '/auth/login',
  },
  session: {
    jwt: true,
  },
  callbacks: {
    async session({ session, token }) {
      try {
        console.log('Session callback:', { session, token });
        session.userId = token.id;
        return session;
      } catch (error) {
        console.error('Session callback error:', error);
        throw error;
      }
    },
    async jwt({ token, user }) {
      try {
        console.log('JWT callback:', { token, user });
        if (user) {
          token.id = user.id;
        }
        return token;
      } catch (error) {
        console.error('JWT callback error:', error);
        throw error;
      }
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
