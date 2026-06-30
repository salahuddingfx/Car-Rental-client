import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { PremiumHeroSection } from '../sections/PremiumHeroSection';
import { BrandsSection } from '../sections/BrandsSection';
import { FeaturedCarsSection } from '../sections/FeaturedCarsSection';
import { WhyChooseUsSection } from '../sections/WhyChooseUsSection';
import { OfferSection } from '../sections/OfferSection';
import { FaqSection } from '../sections/FaqSection';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const { cars } = useStore();

  const [searchLoc, setSearchLoc] = useState('');
  const [searchPickup, setSearchPickup] = useState('');
  const [searchReturn, setSearchReturn] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const qp: string[] = [];
    if (searchLoc) qp.push(`location=${encodeURIComponent(searchLoc)}`);
    if (searchPickup) qp.push(`pickup=${searchPickup}`);
    if (searchReturn) qp.push(`return=${searchReturn}`);
    navigate(`/cars${qp.length ? `?${qp.join('&')}` : ''}`);
  };

  return (
    <div className="relative overflow-x-hidden min-h-screen">
      <PremiumHeroSection />

      <div className="bg-light-bg">
        <BrandsSection
          searchLoc={searchLoc}
          setSearchLoc={setSearchLoc}
          searchPickup={searchPickup}
          setSearchPickup={setSearchPickup}
          searchReturn={searchReturn}
          setSearchReturn={setSearchReturn}
          onSearch={handleSearch}
        />

        <FeaturedCarsSection cars={cars} />

        <WhyChooseUsSection />

        <OfferSection />

        <FaqSection />
      </div>
    </div>
  );
};
export default Home;
