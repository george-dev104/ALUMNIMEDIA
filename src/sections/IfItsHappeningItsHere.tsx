import Heading from "@/atoms/Heading";
import Image, { StaticImageData } from "next/image";
import img_1 from '@public/people/1.png';
import img_2 from '@public/people/2.png';
import img_3 from '@public/people/fitness.png';
import img_4 from '@public/people/business.png';
import img_5 from '@public/people/e-sports.png';
import img_6 from '@public/people/livestreams.png';

export default function IfItsHappeningItsHere() {
    return (
        <section className="bg-secondary">
            <div className="max-w-[1600px] mx-auto p-4 py-12 lg:p-16">
                <Heading text="If it's happening, it's here" className="text-4xl lg:text-[55px] uppercase font-bold mb-4" />
                <div className="grid grid-cols-2 lg:grid-cols-6 gap-6">
                    <Container image={img_1} label="Golf" />
                    <Container image={img_2} label="Food" />
                    <Container image={img_3} label="Fitness" />
                    <Container image={img_4} label="Business" />
                    <Container image={img_5} label="E-sports" />
                    <Container image={img_6} label="Livestreams" />
                </div>
            </div>
        </section>
    )
}

function Container({ image, label }: { image: StaticImageData, label: string }) {
    return (
        <div className="relative rounded-b overflow-hidden">
            <Image className="h-[318.38px] lg:h-full w-full object-cover" src={image} alt="" />
            <Heading text={label} className="text-2xl uppercase font-bold text-center absolute bottom-5 w-full" />
        </div>
    )
}