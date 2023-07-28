import './globals.css'
import type { Metadata } from 'next'
import Providers from './components/Providers'
import Appbar from './components/Appbar'
import { headers } from "next/headers";
import SideBar from './components/SideBar';
import MobileAppbar from './components/MobileAppBar';


export const metadata: Metadata = {
  title: 'Bibliotheque',
  description: "L'interface idéale pour découvrir et répertorier ses livres dans une bibliothèque virtuelle !",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const headersList = headers();
  const activePath = headersList.get("x-invoke-path");
  return (
    <html lang="en">
      <body className='bg-bb_primary'>
        <Providers>
          <div className='flex'>
            {activePath !== '/' && <SideBar />}
            <div className='flex flex-col w-full'>
              {activePath !== '/' && <Appbar />}
              {activePath !== '/' && <MobileAppbar />}
              {children}
            </div>
          </div>
        </Providers>
      </body>
    </html>
  )
}
