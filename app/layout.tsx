import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Coffee } from 'lucide-react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Strength Index Calculator',
  description: 'Calculate and visualize your lifting progress',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <div className='flex flex-col min-h-screen'>
          <header className='bg-primary text-primary-foreground py-4'>
            <div className='container mx-auto px-4'>
              <h1 className='text-2xl font-bold'>Strength Index Calculator</h1>
            </div>
          </header>
          <main className='flex-grow container mx-auto px-4 py-8'>
            {children}
          </main>
          <footer className='bg-muted py-4'>
            <div className='container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center'>
              <p className='text-sm text-muted-foreground mb-2 sm:mb-0'>
                © {new Date().getFullYear()} Strength Index Calculator
              </p>
              <a
                href='https://www.buymeacoffee.com/yourname'
                target='_blank'
                rel='noopener noreferrer'
                className='flex items-center text-sm text-muted-foreground hover:text-primary transition-colors'
              >
                <Coffee className='w-4 h-4 mr-2' />
                Buy me a coffee
              </a>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
