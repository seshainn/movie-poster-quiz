import Footer from '../_components/Footer'
import Navbar from '../_components/Navbar'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='h-screen flex flex-col'>
      <Navbar />
      <div className='flex-1 dark:bg-dark-100 relative'>{children}</div>
      <Footer />
    </div>
  )
}
