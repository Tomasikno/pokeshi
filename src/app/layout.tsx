import './globals.scss';
import { Inter } from 'next/font/google';
import BootstrapClient from '@/components/BootstrapClient';
import { Container } from 'react-bootstrap';
import CustomNavBar from './components/Navbar';
import { ReactNode } from 'react';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CustomNavBar/>
        <Container>
          {children}
        </Container>
        <BootstrapClient />
      </body>
    </html>
  )
}