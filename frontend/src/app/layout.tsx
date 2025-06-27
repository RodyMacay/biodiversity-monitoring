'use client';

import { ClerkProvider } from '@clerk/nextjs';
import { ApolloProvider } from '@apollo/client';
import apolloClient from '@/lib/apollo-client';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!}
      appearance={{
        baseTheme: undefined,
        variables: {
          colorPrimary: '#16a34a', 
          colorText: '#111827',
        },
        elements: {
          formButtonPrimary: 'bg-green-600 hover:bg-green-700 text-white',
          card: 'shadow-lg',
        },
      }}
    >
      <html lang="es">
        <body className={inter.className}>
          <ApolloProvider client={apolloClient}>
            {children}
          </ApolloProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}

