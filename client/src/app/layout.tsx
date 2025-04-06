
import { Inter } from 'next/font/google'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import { Providers } from './providers';
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'DCI CLUB - Инвестиционная платформа',
  description: 'Платформа для инвестиций в недвижимость и бизнес',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body className={inter.className}>
      <Providers>
        <div className="min-h-screen flex flex-col">
          <Header />
         <main className="flex-grow">{children}</main>
          <Footer />
        </div>
        </Providers>
      </body>
    </html>
  )
}