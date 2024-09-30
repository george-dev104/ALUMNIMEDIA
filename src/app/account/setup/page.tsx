"use client";

import Footer from "@/organisms/Footer";
import Image from "next/image";
import background_img from "@public/hero-background.jpg";
import Logo from "@/atoms/Logo";
import Heading from "@/atoms/Heading";
import Button from "@/atoms/Button";
import RadioInput from "@/atoms/RadioInput";
import { MouseEventHandler, useState } from "react";
import Input from "@/atoms/Input";
import { Animate } from "react-simple-animate";
import { Fetch } from "@/app/lib/Fetch";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Channel } from "@/types/Channel";
import { categories } from "@/app/lib/categories";
import Select from "react-select";
import { useSession, signOut } from "next-auth/react";

export default function AccountSetupPage() {
  // const session = null;
  const { data: session, status, update } = useSession();

  const router = useRouter();

  const [joiningAs, setJoiningAs] = useState<"member" | "channel" | null>(null);

  const [stage, setStage] = useState<"joining-as" | "info">("joining-as");

  const [memberSetupData, setMemberSetupData] = useState<{
    first_name: string;
    last_name: string;
  }>({ first_name: "", last_name: "" });
  const [channelSetupData, setChannelSetupData] = useState<
    Omit<Channel, "sub" | "id" | "date_joined" | "email">
  >({
    name: "",
    description: "",
    profile_image_src: "",
    banner_image_src: "",
    username: "",
    youtube_id: "",
    categories: [],
  });

  // TODO: Rewrite the following to update the current user as oppose to creating a new one.

  const handleFinishMemberSetup = async () => {
    if (status === "loading") return;

    if (
      !memberSetupData.first_name.trim().length ||
      !memberSetupData.last_name.trim().length
    )
      return toast.error("Please fill out all fields.");

    const loadingToast = toast.loading("Creating your account");

    if (session?.user) {
      const res = await Fetch("/api/members/update", "post", {
        // sub: session.user.userId,
        id: session.user.id,
        email: session.user.email,
        newEmail: null,
        first_name: memberSetupData.first_name,
        last_name: memberSetupData.last_name,
        accountType: "member",
      });

      toast.dismiss(loadingToast);

      if (res.error)
        return toast.error(
          "We couldn't create your account. Please try again."
        );

      update();

      router.push("/");
    }
  };

  const handleFinishChannelSetup = async () => {
    if (status === "loading") return;

    if (
      !channelSetupData.name.trim() ||
      !channelSetupData.username.trim() ||
      !channelSetupData.youtube_id.trim()
    )
      return toast.error("Please fill out all fields.");

    const loadingToast = toast.loading("Creating your channel");

    if (session?.user) {
      if (session?.user?.accountType === "member") {
        toast.error("Members cannot create channels.");
        return;
      }

      try {
        const response = await fetch("/api/channels/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: session.user.id,
            sub: channelSetupData.youtube_id,
            name: channelSetupData.name,
            username: channelSetupData.username,
            youtube_id: channelSetupData.youtube_id,
            categories: channelSetupData.categories,
          }),
        });

        if (response.ok) {
          const data = await response.json();

          toast.success("Channel created successfully");
        } else {
          const errorData = await response.json();
          toast.error(errorData.error || "Failed to create channel");
        }
      } catch (error) {
        console.error("Error:", error);
        toast.error("Please try again.");
      }

      // const res = await Fetch("/api/channels/create", "post", {
      //   id: session.user.id,
      //   sub: channelSetupData.youtube_id,
      //   name: channelSetupData.name,
      //   username: channelSetupData.username,
      //   youtube_id: channelSetupData.youtube_id,
      //   categories: channelSetupData.categories,
      // });

      toast.dismiss(loadingToast);

      // if (res.error)
      //   return toast.error(
      //     "We couldn't create your account. Please try again."
      //   );

      update();
      router.push("/");
    }
  };

  const handleLogout = async () => {
    const logoutToast = toast.loading("Logging out");
    await signOut();
    toast.dismiss(logoutToast);
    router.push("/auth");
  };

  return (
    <>
      <main>
        <section className="pt-28 pb-8 lg:py-0 lg:min-h-screen grid place-items-center h-full">
          {stage === "joining-as" && (
            <div className="flex flex-col items-end gap-6 px-4 lg:px-0 select-none">
              {/* joining as member */}
              <Container onClickHandler={() => setJoiningAs("member")}>
                <div>
                  <Heading
                    text="I'm joining as a member"
                    className="text-3xl uppercase"
                  />
                  <p className="mb-4">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Aliquid dicta tempore veniam maiores hic, dolores ratione
                    facilis consequatur, natus temporibus aperiam, velit
                    quibusdam et alias.
                  </p>
                </div>
                <div>
                  <RadioInput checked={joiningAs === "member"} />
                </div>
              </Container>
              {/* joining as channel */}
              <Container onClickHandler={() => setJoiningAs("channel")}>
                <div>
                  <Heading
                    text="I'm joining as a channel"
                    className="text-3xl uppercase"
                  />
                  <p className="mb-4">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Aliquid dicta tempore veniam maiores hic, dolores ratione
                    facilis consequatur, natus temporibus aperiam, velit
                    quibusdam et alias.
                  </p>
                </div>
                <div>
                  <RadioInput checked={joiningAs === "channel"} />
                </div>
              </Container>
              <Button
                label="Continue"
                onClickHandler={() => setStage("info")}
              />
            </div>
          )}
          {stage === "info" && joiningAs === "member" && (
            <Animate
              play
              start={{ transform: "translateX(-100px)", opacity: 0.5 }}
              end={{ transform: "translateX(0px)", opacity: 1 }}
            >
              <div className="flex flex-col items-end px-4">
                <div className="w-full">
                  <Heading
                    text="Welcome to Alumni Media Network"
                    className="text-3xl uppercase text-left"
                  />
                  <p>
                    Let&apos;s grab some quick information before you head in.
                  </p>
                </div>
                <div className="grid gap-6 grid-cols-1 lg:grid-cols-2 mb-4 w-full">
                  <div className="w-full">
                    <Heading
                      text="First Name"
                      className="text-xl uppercase text-left"
                    />
                    <Input
                      placeholder="John"
                      value={memberSetupData.first_name}
                      onChangeHandler={(e) =>
                        setMemberSetupData((prev) => ({
                          ...prev,
                          first_name: e.target.value,
                        }))
                      }
                      className="w-full"
                    />
                  </div>
                  <div className="w-full">
                    <Heading
                      text="Last Name"
                      className="text-xl uppercase text-left"
                    />
                    <Input
                      placeholder="Smith"
                      value={memberSetupData.last_name}
                      onChangeHandler={(e) =>
                        setMemberSetupData((prev) => ({
                          ...prev,
                          last_name: e.target.value,
                        }))
                      }
                      className="w-full"
                    />
                  </div>
                </div>
                <Button
                  label="Continue"
                  onClickHandler={handleFinishMemberSetup}
                />
              </div>
            </Animate>
          )}
          {stage === "info" && joiningAs === "channel" && (
            <Animate
              play
              start={{ transform: "translateX(-100px)", opacity: 0.5 }}
              end={{ transform: "translateX(0px)", opacity: 1 }}
            >
              <div className="flex flex-col items-end px-4">
                <div className="w-full">
                  <Heading
                    text="Welcome to Alumni Media Network"
                    className="text-3xl uppercase text-left"
                  />
                  <p>
                    Let&apos;s grab some quick information before you head in.
                  </p>
                </div>
                <div className="grid gap-y-2 gap-x-4 grid-cols-1 lg:grid-cols-2 mb-4 w-full">
                  <div className="w-full">
                    <Heading
                      text="Channel Name"
                      className="text-xl uppercase text-left"
                    />
                    <Input
                      placeholder="Your channel name"
                      value={channelSetupData.name}
                      onChangeHandler={(e) =>
                        setChannelSetupData((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                      className="w-full"
                    />
                  </div>
                  <div className="w-full">
                    <Heading
                      text="Username"
                      className="text-xl uppercase text-left"
                    />
                    <Input
                      placeholder="Your username"
                      value={channelSetupData.username}
                      onChangeHandler={(e) =>
                        setChannelSetupData((prev) => ({
                          ...prev,
                          username: e.target.value
                            .toLowerCase()
                            .trim()
                            .replace(/[^a-zA-Z0-9]/g, ""),
                        }))
                      }
                      className="w-full"
                    />
                  </div>
                  <div className="lg:col-span-2">
                    <Heading
                      text="Youtube Channel ID"
                      className="text-xl uppercase text-left"
                    />
                    <Input
                      placeholder="e.g. UCjXfkj5iapKHJrhYfAF9ZGg"
                      value={channelSetupData.youtube_id}
                      onChangeHandler={(e) =>
                        setChannelSetupData((prev) => ({
                          ...prev,
                          youtube_id: e.target.value,
                        }))
                      }
                      className="w-full"
                    />
                  </div>
                  <div className="lg:col-span-2">
                    <Heading
                      text="Categories"
                      className="text-xl uppercase text-left"
                    />
                    <Select
                      isMulti
                      name="categories"
                      options={categories}
                      className="basic-multi-select text-black"
                      classNamePrefix="select"
                      onChange={(categories) =>
                        setChannelSetupData((prev) => ({
                          ...prev,
                          categories: categories.map(
                            (category) => category.value
                          ),
                        }))
                      }
                    />
                  </div>
                </div>
                <Button
                  label="Continue"
                  onClickHandler={handleFinishChannelSetup}
                />
              </div>
            </Animate>
          )}
          {/* absolute */}
          <div className="lg:hidden w-full max-w-full absolute top-6 left-0 lg:left-6">
            <div className="w-[150px] mx-auto lg:mx-0">
              <Logo />
            </div>
          </div>
          <div className="hidden lg:block absolute top-6 left-6 w-[150px] mx-auto lg:mx-0">
            <Logo />
          </div>
          <Image
            src={background_img}
            alt=""
            className="absolute object-cover top-0 left-0 w-full h-full blur-sm z-[-1]"
          />
          <Button
            onClickHandler={handleLogout}
            className="absolute right-4 bottom-4"
            theme="outline"
            label="Log out"
          />
        </section>
      </main>
      <Footer />
    </>
  );
}

function Container({
  children,
  onClickHandler,
}: {
  children: React.ReactNode;
  onClickHandler: MouseEventHandler;
}) {
  return (
    <button
      onClick={onClickHandler}
      className="bg-white/30 lg:hover:scale-105 border border-white border-solid px-6 py-3 rounded-md lg:max-w-[500px] backdrop-blur-2xl flex flex-row items-stretch transition-all transition-300"
    >
      {children}
    </button>
  );
}
