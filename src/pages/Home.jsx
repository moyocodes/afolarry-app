import HomeHero from "../sections/HomeHero";
import HomeAbout from "../sections/HomeAbout";
import HomeServices from "../sections/HomeServices";
import HomeHowItWorks from "../sections/HomeHowItWorks";
import HomeFAQ from "../sections/HomeFAQ";
import HomeReviews from "../sections/HomeReviews";
import HomeContact from "../sections/HomeContact";

export default function Home() {
  return (
    <>
      <HomeHero />
      <HomeAbout />
      <HomeServices />
      <HomeHowItWorks />
      <HomeFAQ />

      <HomeContact />
    </>
  );
}
