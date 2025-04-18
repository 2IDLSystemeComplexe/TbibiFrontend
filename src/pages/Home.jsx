import React from 'react'
import Header from '../components/Header'
import TopDoctors from '../components/TopDoctors'
import Services from '../components/Services'
import Banner from '../components/Banner'
const Home = () => {
  return (
    <div>
      <Header/>
      <Services/>
      <TopDoctors/>
      <Banner/>
    </div>
  )
}

export default Home