import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import Categories from "../components/Categories";
import TopSellingProducts from "../components/TopSellingProducts";
import NewArrivalProducts from '../components/NewArrivalProducts';
import OnSaleProducts from '../components/OnSaleProducts';

const HomePage = () => {
  return (
    <>
      <Header />
      <HeroSection/>
      <NewArrivalProducts />
      <OnSaleProducts />
      <TopSellingProducts />
      <Categories/>
      <Footer />
    </>
  );
};

export default HomePage;
