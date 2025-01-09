import DisplayRandomProducts from '../../components/DisplayRandomProducts';
import PageContainer from '../../components/PageContainer';
import CurrentOffers from './CurrentOffers';
import Features from './Features';
import HomeContactUs from './HomeContactUs';
import HomeHeader from './HomeHeader';
import RecommendedCategories from './RecommendedCategories';

const HomePage = () => {
  return (
    <PageContainer>
      <HomeHeader />
      <Features />
      <DisplayRandomProducts quantity={3} />
      <CurrentOffers />
      <RecommendedCategories />
      <HomeContactUs />
    </PageContainer>
  );
};

export default HomePage;
