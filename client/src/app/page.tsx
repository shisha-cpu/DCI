'use client'
import HomeContent from './HomeContent'
import Navbar from '@/components/Navbar/Navbar'
import './main.css'
import { useState , useEffect } from 'react'
export default function Home() {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    handleResize()
    window.addEventListener('resize', handleResize)
    
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])
  return (
<>
{!isMobile ? <Navbar /> : ''}
<HomeContent />
</>
  )
}