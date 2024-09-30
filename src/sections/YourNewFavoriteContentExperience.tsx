import Heading from "@/atoms/Heading";
import Image, { StaticImageData } from "next/image";
import img_1 from "@public/phone-overlay.png";
import img_2 from "@public/gaming-screen.png";
import img_3 from "@public/chat-with-legends.png";
import img_4 from "@public/earn-rewards.png";

export default function YourNewFavoriteContentExperience() {
  return (
    <section className="bg-secondary">
      <div className="max-w-[1600px] mx-auto p-4 py-12 lg:p-16">
        <Heading
          text="Your New Favorite Content Experience"
          className="text-4xl lg:text-[55px] uppercase font-bold mb-4"
        />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Container image={img_1} label="Watch content" />
          <Container image={img_2} label="Live watch parties" />
          <Container image={img_3} label="Chat with legends" />
          {/* <Container image={img_4} label="Earn rewards" /> */}
        </div>
      </div>
    </section>
  );
}

function Container({
  image,
  label,
}: {
  image: StaticImageData;
  label: string;
}) {
  return (
    <div className="grid place-items-center gap-6">
      <Image className="w-2/3 lg:w-full" src={image} alt="" />
      <Heading
        text={label}
        className="text-3xl uppercase font-bold text-center"
      />
    </div>
  );
}
