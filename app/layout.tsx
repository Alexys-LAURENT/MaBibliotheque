import './globals.css'
import type { Metadata } from 'next'
import Providers from './providers/Providers'
import { headers } from "next/headers";
import UiProvider from './providers/UiProvider';
import UserBooksProvider from './context/UserBooksContext';
import { ThemeProviders } from './providers/ThemeProvider';
import NextUiNavBar from './components/NextUiNavBar';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/route';
import type { User } from './types/user';

export const metadata: Metadata = {
  title: 'Bibliotheque',
  description: "L'interface idéale pour découvrir et répertorier ses livres dans une bibliothèque virtuelle !",
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const headersList = headers();
  const activePath = headersList.get("x-invoke-path");
  const session = await getServerSession(authOptions)

  return (
    <html lang="en" className='dark'>
      <body className='transition-all bg-bb_bgLight dark:bg-bb_bgDark min-h-screen  !duration-400'>
        <UiProvider>
          <ThemeProviders>
            <Providers>
              <UserBooksProvider>
                <div className=' transition-all flex flex-col w-full bg-bb_bgLight dark:bg-bb_bgDark  !duration-400'>
                  {
                    session?.user && activePath !== '/' &&
                    <NextUiNavBar user={session?.user as User} />
                  }
                  {children}
                </div>
              </UserBooksProvider>
            </Providers>
          </ThemeProviders>
        </UiProvider>
      </body>
    </html>
  )
}
