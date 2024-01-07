import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'
import Carousel from '../components/Carousel'

export default function Home() {
  const[foodCat, setFoodCat]=useState([])
  const[foodItem, setFoodItem]=useState([])
  const loadData=async()=>{
    let response=await fetch('http://localhost:4000/api/foodData', {
      method:'POST',
      headers: {
        'Content-Type':'application/json'
      }
    })
    response=await response.json();
    console.log(response)
    setFoodItem(response[0])
    setFoodCat(response[1])
  }
  useEffect(() => {loadData()}, [])
  return (
    <>
        <div>
          <Navbar />
        </div>
        <div >
          <Carousel />
        </div>
        <div className='container'>
           {
            foodItem && foodItem.map((item)=>(<Card title={item.name} url={item.img} description={item.description} options={item.options}/>))
           }
        </div>
        <div>
          <Footer />
        </div>
    </>
  )
}
