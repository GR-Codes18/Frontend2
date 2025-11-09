import Navigation from './Navigation'
import Footer from './Footer'
import type { FC, ReactNode } from 'react'

export const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navigation />
      <main className="flex-1 container py-12">
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default Layout
