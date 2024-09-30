import Icon, { IconType } from "@/atoms/Icon";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full">
      <div className="w-full border-b border-solid border-white/20 p-9 flex justify-center lg:justify-start flex-row items-center gap-5 lg:gap-3">
        <p className="bg-white rounded-full px-4 py-1 text-black w-fit hidden lg:block">
          #alumnimedia
        </p>
        <CircleIcon
          icon="instagram"
          href="https://www.instagram.com/alumnimedianet/"
        />
        <CircleIcon
          icon="youtube"
          href="https://www.youtube.com/@AlumniMediaNetwork"
        />
        <CircleIcon
          icon="facebook"
          href="https://www.facebook.com/AlumniMediaOfficial"
        />
        <CircleIcon icon="twitter" href="https://twitter.com/AlumniMediaNet" />
        <CircleIcon
          icon="tiktok"
          href="https://www.tiktok.com/@alumnimedianet?is_from_webapp=1&sender_device=pc"
        />
      </div>
      <div className="w-full p-9 pt-4 flex flex-col gap-4 items-center lg:items-start lg:flex-row justify-between">
        <Link
          href={
            "mailto:amn@alumnimedia.com?subject=Media Request - NFL Alumni Media"
          }
          className="block text-grey hover:text-white transition-all transition-300"
        >
          Media Request
        </Link>
        <div className="flex flex-row gap-6">
          <Link
            target="_blank"
            href={"https://www.maestro.io/legal/tou/"}
            className="block text-grey hover:text-white transition-all transition-300 mr-auto"
          >
            Terms of Use
          </Link>
          <Link
            target="_blank"
            href={"https://www.maestro.io/legal/privacy/"}
            className="block text-grey hover:text-white transition-all transition-300 mr-auto"
          >
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}

function CircleIcon({ icon, href }: { icon: IconType; href: string }) {
  return (
    <Link
      href={href}
      className="rounded-full bg-white grid place-items-center p-2 aspect-square w-fit"
    >
      <Icon size={20} icon={icon} fill="fill-black" />
    </Link>
  );
}
