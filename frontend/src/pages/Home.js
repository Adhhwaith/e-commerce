import React from 'react'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import HorizontalCardProduct from '../components/HorizontalCardProduct'
import VerticalCardProduct from '../components/VerticalCardProduct'

const Home = () => {
  return (
    <div>
      <CategoryList/>
      <BannerProduct/>

      {/* random commit  */}
      <HorizontalCardProduct category={"shirts"} heading={"shirts"}/>
      <HorizontalCardProduct category={"watches"} heading={"Popular's Watches"}/>

      <VerticalCardProduct category={"shoes"} heading={"shoes"}/>
      <VerticalCardProduct category={"formal"} heading={"formal"}/>
      <VerticalCardProduct category={"Perfume"} heading={"Perfume"}/>
      <VerticalCardProduct category={"kids"} heading={"Kids"}/>
      <VerticalCardProduct category={"men"} heading={"Men"}/>
      <VerticalCardProduct category={"women"} heading={"Women"}/>
      <VerticalCardProduct category={"beauty"} heading={"beauty"}/>
      
    </div>
  )
}

export default Home