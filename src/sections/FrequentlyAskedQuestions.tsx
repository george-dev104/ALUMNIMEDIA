import Heading from "@/atoms/Heading";
import FrequentlyAskedQuestion from "@/molecules/FrequentlyAskedQuestion";
import Link from "next/link";

export default function FrequentlyAskedQuestions() {
  return (
    <section className="bg-transparent">
      <div className="max-w-[1600px] mx-auto p-4 py-12 lg:p-16 flex flex-col gap-4">
        <Heading
          text="FAQs"
          className="text-4xl lg:text-[55px] uppercase font-bold mb-4"
        />
        <FrequentlyAskedQuestion
          question="How do I sign up?"
          answer="Click the “Login” button on the top navigation bar and enter your email address to start interacting!"
        />
        <FrequentlyAskedQuestion
          question="How do I become a sponsor?"
          answer={
            <p className="text-white">
              Contact{" "}
              <Link
                href={"mailto:amn@alumnimedia.com"}
                className="underline decoration-light-blue"
              >
                amn@alumnimedia.com
              </Link>{" "}
              for more information.
            </p>
          }
        />
        <FrequentlyAskedQuestion
          question="I am a former professional player interested in starting a channel"
          answer={
            <p className="text-white">
              Click{" "}
              <Link
                href={
                  "https://docs.google.com/forms/d/1FrpBi6HeAdBDoB9e6LJH1lz6tLSCqwBLakMLzBBm2nA/viewform?edit_requested=true"
                }
                className="underline decoration-light-blue"
              >
                THIS LINK
              </Link>{" "}
              to learn more about how you can partner with Alumni Media hosts
              and shows in local, regional and national markets to increase
              awareness and value for your brand.
            </p>
          }
        />
        <FrequentlyAskedQuestion
          question="How can I book Alumni Media influencers to support, engage with, and create awareness for my brand or event?"
          answer={
            <p className="text-white">
              Click{" "}
              <Link
                href={
                  "https://docs.google.com/forms/d/1FrpBi6HeAdBDoB9e6LJH1lz6tLSCqwBLakMLzBBm2nA/viewform?edit_requested=true"
                }
                className="underline decoration-light-blue"
              >
                THIS LINK
              </Link>{" "}
              to learn more about how you can partner with Alumni Media hosts
              and shows in local, regional and national markets to increase
              awareness and value for your brand.
            </p>
          }
        />
      </div>
    </section>
  );
}
