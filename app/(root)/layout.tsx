import Footer from '../_components/Footer'
import Navbar from '../_components/Navbar'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='min-h-screen flex flex-col'>
      <Navbar />
      <div className='flex-1 flex flex-col flex-center relative h-screen'>
        {children}
      </div>
      <Footer />
    </div>
  )
}
