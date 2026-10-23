import React from 'react'
import HomeSlider from '../components/HomeSlider'
import HomeFeatures from '../components/HomeFeatures'
import HomeCategories from '../components/HomeCategories';
import FeturedProducts from '../components/FeturedProducts';

export default function HomeScreen() {
  return (
    <main>
      {/* slider */}
      <HomeSlider />
      {/* features */}
      <HomeFeatures />
      {/* categories */}
      <HomeCategories />
      {/* products */}
      <FeturedProducts />
    </main>
  );
}
