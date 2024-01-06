import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'
import Carousel from '../components/Carousel'

export default function Home() {
  return (
    <>
        <div>
          <Navbar />
        </div>
        <div >
          <Carousel />
        </div>
        <div className='m-3 d-flex justify-content-between'>
           <Card className='m-2'/>
           <Card className='m-2'/>
           <Card className='m-2'/>
           <Card className='m-2'/>
        </div>
        <div>
          <Footer />
        </div>
    </>
  )
}
