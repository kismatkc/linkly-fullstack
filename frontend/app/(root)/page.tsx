"use client";
import Main from "@/components/main";
import Header from "@/components/header";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Api } from "@/lib/utils";
import { DesktopHistoryTableColumn } from "@/types";

export default function Home() {
  const { data } = useSession();
  const [urls, setUrls] = useState<DesktopHistoryTableColumn[]>([
    {
      shortLink: "https://short.link/mno345",
      originalLink: "https://www.example.com/events/annual-conference",
      qrCode: "QR_CODE_DATA_5",

      status: "expired",
      date: new Date("2023-06-10T11:00:00Z"),
    },
  ]);

  useEffect(() => {
    async function getUrls() {
      if (!data) return;
      try {
        console.log("cookie", document.cookie);

        //@ts-ignore
        const _id = data?.user?.id;

        const response = await Api.get(`/url/${_id}`);
        console.log(response.data);

        if (!response.data.data.length > 0) return;
        setUrls(response.data.data);
      } catch (error) {}
    }
    getUrls();
  }, [data]);
  return (
    <>
      <Header />
      <Main linkDetails={urls} />;
    </>
  );
}
