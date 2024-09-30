import Button from "@/atoms/Button";
import Heading from "@/atoms/Heading";
import Footer from "@/organisms/Footer";
import Header from "@/organisms/Header";
import FrequentlyAskedQuestions from "@/sections/FrequentlyAskedQuestions";
import IfItsHappeningItsHere from "@/sections/IfItsHappeningItsHere";
import YourNewFavoriteContentExperience from "@/sections/YourNewFavoriteContentExperience";
import hero_background_img from "@public/hero-background.jpg";
import hero_background_mobile_img from "@public/hero-background-mobile.jpg";
import Image from "next/image";
import FeaturedChannels from "@/sections/FeaturedChannels";
import AllShows from "@/sections/AllShows";
import GridIronLegends from "@/sections/GridIronLegends";
import ElfsightWidget from "./components/SiteBanner/SiteBanner";
import TopBannerWidget from "./components/SiteBanner/TopBanner";
import Calendar from "./components/Calendar/Calendar";

export default function Home() {
  return (
    <>
      <Header />
      <main className="lg:pt-20">
        {/* <TopBannerWidget /> */}
        <section className="relative p-4 lg:p-16">
          <div className="flex flex-col gap-6 w-fit pt-64 lg:pt-0">
            <div>
              <Heading
                className="text-4xl lg:text-5xl uppercase text-white font-bold"
                text="Streaming in a"
              />
              <Heading
                className="text-4xl lg:text-5xl uppercase text-white font-bold"
                text="League of its own"
              />
            </div>
            <div>
              <p className="text-grey">Always playing by our own rules.</p>
              <p className="text-grey">Welcome to your new favorite</p>
              <p className="text-grey">entertainment experience</p>
            </div>
            <Button
              href="/channels/alumnitv"
              label="Watch Now"
              theme="outline"
            />
          </div>
          <Image
            className="block lg:hidden absolute object-cover top-0 left-0 w-full h-full z-[-1]"
            src={hero_background_mobile_img}
            alt=""
          />
          <Image
            className="hidden lg:block absolute object-cover top-0 left-0 w-full h-full z-[-1]"
            src={hero_background_img}
            alt=""
          />
        </section>

        {/* <div className="max-w-[1600px] mx-auto p-4 py-12 lg:p-16">
          <Calendar />
        </div> */}

        <FeaturedChannels />
        <AllShows />
        <YourNewFavoriteContentExperience />
        <IfItsHappeningItsHere />
        <GridIronLegends />
        <FrequentlyAskedQuestions />
      </main>
      <Footer />
    </>
  );
}
