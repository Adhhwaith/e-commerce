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

      <HorizontalCardProduct category={"shirts"} heading={"shirts"}/>
      <HorizontalCardProduct category={"watches"} heading={"Popular's Watches"}/>

      <VerticalCardProduct category={"shoes"} heading={"shoes"}/>
      <VerticalCardProduct category={"Formal footwear"} heading={"formal footwear"}/>
      <VerticalCardProduct category={"Perfume"} heading={"Perfume"}/>
      <VerticalCardProduct category={"Kids"} heading={"Kids"}/>
      <VerticalCardProduct category={"Pants"} heading={"Pants"}/>
      <VerticalCardProduct category={"Women"} heading={"Women"}/>
      <VerticalCardProduct category={"Beauty"} heading={"Beauty"}/>
      <VerticalCardProduct category={"trimmers"} heading={"Trimmers"}/>
    </div>
  )
}

export default Home