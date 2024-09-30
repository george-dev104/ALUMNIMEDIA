"use client";

import Footer from "@/organisms/Footer";
import Header from "@/organisms/Header";
import Image from "next/image";
import background_img from "@public/hero-background.jpg";
import Heading from "@/atoms/Heading";
import Input from "@/atoms/Input";
import Button from "@/atoms/Button";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useEffect, useRef, useState } from "react";
import Select from "react-select";
import { ChannelCategory, categories } from "@/app/lib/categories";
import TextArea from "@/atoms/TextArea";
import Icon from "@/atoms/Icon";
import Upload from "@/atoms/Upload";
import { useSession, signOut } from "next-auth/react";

export default function AccountPage() {
  const { data: session, status, update } = useSession();

  const router = useRouter();

  // const [originalEmail, setOriginalEmail] = useState<string>("");
  const profileImageRef = useRef<HTMLInputElement | null>(null);
  const bannerImageRef = useRef<HTMLInputElement | null>(null);

  const [initialData, setInitialData] = useState(null);

  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState("");
  const [newEmail, setNewEmail] = useState("");
  // const [isDirty, setIsDirty] = useState<boolean>(false);

  const [channelId, setChannelId] = useState<any>(null);
  const [channelName, setChannelName] = useState<string>("");
  const [channelUsername, setChannelUsername] = useState<string>("");
  const [channelYoutubeId, setChannelYoutubeId] = useState<string>("");
  const [channelDescription, setChannelDescription] = useState<string>("");
  const [channelCategories, setChannelCategories] = useState<
    { value: ChannelCategory; label: ChannelCategory }[]
  >([]);

  const [channelProfileImageSrc, setChannelProfileImageSrc] =
    useState<string>("");
  const [channelBannerImageSrc, setChannelBannerImageSrc] =
    useState<string>("");

  useEffect(() => {
    if (session?.user) {
      setFirstName(session.user.first_name || "");
      setLastName(session.user.last_name || "");
      setEmail(session.user.email || "");
    }
  }, [session]);

  useEffect(() => {
    const fetchChannel = async () => {
      if (session?.user.accountType === "channel") {
        try {
          const response = await fetch("/api/channels/getFromUser", {
            method: "GET",
          });

          const data = await response.json();

          if (response.ok) {
            const {
              id,
              name,
              username,
              youtube_id,
              description,
              profile_image_src,
              banner_image_src,
              categories,
              // cover_image_src,
            } = data.channel;

            setChannelId(id);
            setChannelName(name);
            setChannelUsername(username);
            setChannelYoutubeId(youtube_id);
            setChannelDescription(description);
            setChannelCategories(
              categories.map((cat: string[]) => ({ value: cat, label: cat }))
            );
            setChannelProfileImageSrc(profile_image_src);
            setChannelBannerImageSrc(banner_image_src);
          } else {
            toast.error(data.error || "Failed to fetch channel information");
          }
        } catch (error) {
          console.error("Error", error);
          toast.error("Please try again");
        }
      }
    };

    fetchChannel();
  }, [session]);

  const handleLogout = async () => {
    const logoutToast = toast.loading("Logging out");
    await signOut();
    toast.dismiss(logoutToast);
    router.push("/auth");
  };

  const handleCategoryChange = (selectedOptions: any) => {
    setChannelCategories(selectedOptions);
  };

  const handleUpdateMember = async () => {
    if (status === "loading") return;

    if (firstName.trim().length === 0 || lastName.trim().length === 0)
      return toast.error("Please fill out all fields.");

    const loadingToast = toast.loading("Updating account information");

    // We will now hit the update member api to update the names / email
    if (session?.user) {
      try {
        const response = await fetch("/api/members/update", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: session.user.id,
            email: session.user.email,
            newEmail,
            first_name: firstName,
            last_name: lastName,
          }),
        });

        if (response.ok) {
          const data = await response.json();

          toast.dismiss(loadingToast);
          toast.success("Updated account information");
          update();
        } else {
          throw new Error("Failed to update");
        }
      } catch (error) {
        console.error("Error:", error);
        toast.dismiss(loadingToast);
        toast.error("Please try again");
      }
    }
  };

  const handleUpdateChannel = async () => {
    if (status === "loading") return;

    if (channelName.trim().length === 0 || channelUsername.trim().length === 0)
      return toast.error("Please fill out all fields");

    const loadingToast = toast.loading("Updating channel information");

    // We will now hit the update channel api to update the details
    if (session?.user) {
      try {
        const response = await fetch("/api/channels/update", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: session.user.id,
            email: session.user.email,
            newEmail,
            id: channelId,
            name: channelName,
            username: channelUsername,
            youtube_id: channelYoutubeId,
            categories: channelCategories.map((c: any) => c.value),
            description: channelDescription,
            // email: session.user.email,
            // newEmail,
            // first_name: firstName,
            // last_name: lastName,
          }),
        });
        const data = await response.json();

        if (response.ok) {
          toast.dismiss(loadingToast);
          toast.success("Updated account information");
          update(); // Update session
        } else {
          // If the response is not ok, display the error message
          throw new Error(data.error || "Failed to update");
        }
      } catch (error: any) {
        toast.dismiss(loadingToast);
        toast.error(error.message || "Please try again");
      }
    }
  };

  const handleUpdateProfileImage = async () => {
    if (
      !session ||
      !profileImageRef.current ||
      !profileImageRef.current.files ||
      !profileImageRef.current.files[0]
    )
      return;

    const file = profileImageRef.current.files[0];

    // 4mb limit
    if (file.size > 4000000) {
      return toast.error("Please upload an image under 4mb");
    }

    // file type
    if (
      !["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(
        file.type
      )
    ) {
      return toast.error("Please upload an image (jpeg, png, webp)");
    }

    const formData = new FormData();
    formData.append("file", file);

    const loadingToast = toast.loading("Saving profile image");

    try {
      const response = await fetch("/api/channels/updateProfileImage", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      const data = await response.json();

      setChannelProfileImageSrc(data.updatedProfileImageSrc);
      toast.success("Profile image updated successfully");
    } catch (error) {
      toast.error("Please try again");
    } finally {
      toast.dismiss(loadingToast);
    }
  };

  const handleUpdateBannerImage = async () => {
    if (
      !session ||
      !bannerImageRef.current ||
      !bannerImageRef.current.files ||
      !bannerImageRef.current.files[0]
    )
      return;

    const file = bannerImageRef.current.files[0];

    // 4mb limit
    if (file.size > 4000000)
      return toast.error("Please upload an image under 4mb");

    // file type
    if (
      !["image/jpeg", "image/jpg", "image/png", "image/webp"].some(
        (filetype) => filetype === file.type
      )
    ) {
      return toast.error("Please upload an image (jpeg, png, webp)");
    }

    const formData = new FormData();

    formData.append("file", file);

    const loadingToast = toast.loading("Saving banner image");

    try {
      const response = await fetch("/api/channels/updateBannerImage", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      const data = await response.json();

      setChannelBannerImageSrc(data.updatedBannerImageSrc);
      toast.success("Profile image updated successfully");
    } catch (error) {
      toast.error("Please try again");
    } finally {
      toast.dismiss(loadingToast);
    }
  };

  return (
    <>
      <Header />
      <main className={"lg:pt-20"}>
        <section
          className={`relative pb-8 px-4 lg:px-0 lg:h-[calc(100vh-80px)] pt-28 grid place-items-center gap-8`}
        >
          {session && session.user.accountType === "member" && (
            <div className="flex flex-col items-end">
              <div className="w-full">
                <Heading
                  text="Manage your account"
                  className="text-3xl uppercase text-left"
                />
                <p>Update your Alumni Media account information here.</p>
              </div>
              <div className="grid gap-3 lg:gap-4 grid-cols-1 lg:grid-cols-2 mb-4 w-full">
                <div className="w-full">
                  <Heading
                    text="First Name"
                    className="text-xl uppercase text-left"
                  />
                  <Input
                    placeholder="John"
                    value={firstName}
                    onChangeHandler={(e) => setFirstName(e.target.value)}
                    className="w-full lg:w-auto"
                  />
                </div>
                <div className="w-full">
                  <Heading
                    text="Last Name"
                    className="text-xl uppercase text-left"
                  />
                  <Input
                    placeholder="John"
                    value={lastName}
                    onChangeHandler={(e) => setLastName(e.target.value)}
                    className="w-full lg:w-auto"
                  />
                </div>
                <div className="w-full lg:col-span-2">
                  <Heading
                    text="Email Address"
                    className="text-xl uppercase text-left"
                  />
                  <Input
                    placeholder="John"
                    value={newEmail || email}
                    onChangeHandler={(e) => setNewEmail(e.target.value)}
                    className="w-full"
                  />
                </div>
              </div>
              <Button label="Save" onClickHandler={handleUpdateMember} />
            </div>
          )}

          {session && session.user.accountType === "channel" && (
            <div className="flex flex-col justify-between items-end">
              <div className="w-full">
                <Heading
                  text="Manage your channel"
                  className="text-3xl uppercase text-left"
                />
                <p>Update your Alumni Media Channel information here.</p>
              </div>
              <div className="grid lg:grid-cols-2 gap-2 lg:gap-12 max-w-[1000px]">
                <div className="grid gap-y-2 gap-x-4 grid-cols-1 lg:grid-cols-2 mb-4 w-full">
                  <div className="w-full">
                    <Heading
                      text="Channel Name"
                      className="text-xl uppercase text-left"
                    />
                    <Input
                      placeholder="Your channel name"
                      value={channelName}
                      onChangeHandler={(e) => setChannelName(e.target.value)}
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
                      value={channelUsername}
                      onChangeHandler={(e) =>
                        setChannelUsername(e.target.value)
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
                      value={channelYoutubeId}
                      onChangeHandler={(e) =>
                        setChannelYoutubeId(e.target.value)
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
                      value={channelCategories}
                      onChange={handleCategoryChange}
                      options={categories}
                      className="basic-multi-select text-black"
                      classNamePrefix="select"
                    />
                  </div>
                  <div className="w-full lg:col-span-2">
                    <Heading
                      text="Email Address"
                      className="text-xl uppercase text-left"
                    />
                    <Input
                      placeholder="John"
                      value={newEmail || email}
                      onChangeHandler={(e) => setNewEmail(e.target.value)}
                      className="w-full"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="w-full">
                    <Heading
                      text="Description"
                      className="text-xl uppercase text-left"
                    />
                    <TextArea
                      placeholder="Channel description"
                      value={channelDescription}
                      onChangeHandler={(e) =>
                        setChannelDescription(e.target.value)
                      }
                      className="w-full h-[145px] resize-none"
                    />
                  </div>
                  <div className="flex flex-row items-center gap-6 mb-6">
                    <div>
                      <Heading
                        text="Profile Image (1:1 aspect ratio)"
                        className="text-xl uppercase text-left whitespace-nowrap"
                      />
                      <Upload
                        onChangeHandler={handleUpdateProfileImage}
                        id="profile-image"
                        inputRef={profileImageRef}
                      >
                        <div className="group relative cursor-pointer border-white border-solid border shadow-2xl w-16 h-16 grid place-items-center overflow-hidden rounded-full">
                          <Icon
                            icon="upload"
                            fill="fill-white z-[2]"
                            size={20}
                          />
                          <div
                            className={`absolute top-0 left-0 w-full h-full bg-black bg-opacity-30 group-hover:opacity-80 opacity-70 transition-opacity transition-300 backdrop-blur-3xl z-[1]`}
                          />
                          {channelProfileImageSrc && (
                            <Image
                              src={channelProfileImageSrc}
                              fill={true}
                              alt=""
                              className="top-0 left-0 w-full h-full z-0 object-cover"
                            />
                          )}
                        </div>
                      </Upload>
                    </div>
                    <div className="w-full">
                      <Heading
                        text="Banner Image"
                        className="text-xl uppercase text-left"
                      />
                      <Upload
                        onChangeHandler={handleUpdateBannerImage}
                        id="banner-image"
                        inputRef={bannerImageRef}
                      >
                        <div className="group relative cursor-pointer rounded border-white border-solid border shadow-2xl w-full h-16 grid place-items-center overflow-hidden">
                          <div className="w-12 h-12 aspect-square rounded-full bg-white/30 backdrop-blur-3xl relative z-[2] grid place-items-center border border-solid border-white group-hover:opacity-80 transition-all transition-300">
                            <Icon icon="upload" fill="fill-white" size={20} />
                          </div>
                          {!channelBannerImageSrc && (
                            <div
                              className={`absolute top-0 left-0 w-full h-full bg-white bg-opacity-30 z-[1] backdrop-blur-2xl`}
                            />
                          )}
                          {channelBannerImageSrc && (
                            <Image
                              src={channelBannerImageSrc}
                              fill={true}
                              alt=""
                              className="top-0 left-0 w-full h-full z-0 object-cover"
                            />
                          )}
                        </div>
                      </Upload>
                    </div>
                  </div>
                  <div className="flex flex-row items-center justify-end flex-wrap gap-3 ml-auto">
                    <Button
                      label="Post Video"
                      theme="outline"
                      href="https://www.youtube.com/"
                    />
                    <Button
                      label="Livestream"
                      theme="outline"
                      href="https://www.youtube.com/"
                    />
                    <Button
                      href={`/channels/${channelUsername}`}
                      theme="outline"
                      label="View Channel Page"
                    />
                    <Button label="Save" onClickHandler={handleUpdateChannel} />
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* absolute */}
          <Button
            label="Log out"
            onClickHandler={handleLogout}
            className="ml-auto lg:absolute lg:bottom-6 lg:right-6"
          />
          <Image
            src={background_img}
            alt=""
            className="absolute object-cover top-0 left-0 w-full h-full blur-sm z-[-1]"
          />
        </section>
      </main>
      <Footer />
    </>
  );
}
