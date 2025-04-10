
import { Inter } from 'next/font/google'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import { Providers } from './providers';


export const metadata = {
  title: 'DSI CLUB - Инвестиционная платформа',
  description: 'Платформа для инвестиций в недвижимость и бизнес',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body >
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