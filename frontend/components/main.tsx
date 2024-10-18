"use client";
import { ArrowRightCircleIcon, Link } from "lucide-react";
import React, { useEffect, useState } from "react";
import AutoPasteClipboardToggle from "./auto-paste-clipboard";
import LinkHistory from "./link-history";
import { DesktopHistoryTableColumn, LinkDetailsProps } from "@/types/";
import { toast, Toaster } from "sonner";
import { Api } from "@/lib/utils";
import { useSession } from "next-auth/react";

const Main = ({
  linkDetails,
  refreshUrls,
}: {
  linkDetails: LinkDetailsProps[];
  refreshUrls: (urls: DesktopHistoryTableColumn[]) => void;
}) => {
  const [checkedState, setCheckedState] = useState<boolean>(false);
  const [textFromClipboard, setTextFromClipboard] = useState<string>("");
  const { data: session } = useSession();
  useEffect(() => {
    if (!checkedState) return;
    const getTextFromClipboard = async () => {
      const text = await navigator.clipboard.readText();
      if (checkedState && text) {
        setTextFromClipboard(text);
      }
    };

    getTextFromClipboard();
  }, [checkedState]);
  return (
    <section className="flex-column-center">
      <section className="flex flex-col gap-y-8 ">
        <div className="flex-column-center md:text-5xl">
          <h1 className="gradient-styling text-nowrap">Shorten Your</h1>
          <h1 className="gradient-styling text-nowrap"> Loooong Links :)</h1>
        </div>

        <p className="p-4 text-center md:p-16 md:text-xl">
          Linkly is an efficient and easy-to-use URL shortening service that
          streamlines your online experience.
        </p>
        <div className="p-8 flex items-stretch md:p-20 justify-center">
          <input
            value={textFromClipboard}
            onChange={(e) => {
              setTextFromClipboard(e.target.value);
            }}
            className="border rounded-full grow text-center md:text-xl z-10 max-w-md"
            placeholder="Enter the link here"
          ></input>

          <ArrowRightCircleIcon
            size={55}
            className="stroke-brand-blue cursor-pointer -ml-[52px] z-20  [&>circle]:fill-brand-blue  [&>path]:stroke-white -mt-[1px]"
            strokeWidth={1}
            onClick={async () => {
              try {
                const urlRegex =
                  /^https:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;
                if (!urlRegex.test(textFromClipboard)) {
                  setTextFromClipboard("");
                  return toast.error("Invlaid link");
                }
                //@ts-ignore
                const response = await Api.post("/create-url", {
                  longUrl: textFromClipboard,
                  //@ts-ignore
                  userId: session?.user.id,
                });
                setTextFromClipboard("");
                if (response.status === 200)
                  return toast.success("Short Link already exist");

                //@ts-ignore
                const refresh = await Api.get(`/url/${session?.user.id}`);
                //@ts-ignore

                if (!refresh.data.data.length > 0) return;
                refreshUrls(refresh.data.data);
                return toast.success("Link shortening succesful");
              } catch (error) {
                setTextFromClipboard("");
                toast.error("Invalid link");
              }
            }}
          />
        </div>

        <p
          className={`text-center -mt-20 text-red-500 visible ${
            textFromClipboard && "invisible"
          }`}
        >
          Please input a url to shorten it.
        </p>

        <AutoPasteClipboardToggle setCheckedState={setCheckedState} />
      </section>

      <LinkHistory linkDetails={linkDetails} refreshUrls={refreshUrls} />
    </section>
  );
};

export default Main;
