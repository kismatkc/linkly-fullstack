"use client";
import Main from "@/components/main";
import Header from "@/components/header";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Api } from "@/lib/utils";
import { DesktopHistoryTableColumn } from "@/types";

export default function Home() {
  const { data } = useSession();
  const [urls, setUrls] = useState<DesktopHistoryTableColumn[]>([ ]);
function refreshUrls(refreshedUrls: DesktopHistoryTableColumn[]){
  setUrls(refreshedUrls);
}
  useEffect(() => {
    async function getUrls() {
      if (!data) return;
      try {
 const user = data.user;
        if (user) {
          const response = await Api.post("/authenticate-user", user);
        }

        //@ts-ignore
        const _id = data?.user?.id;

        const response = await Api.get(`/url/${_id}`);
        //@ts-ignore

        if (!response.data.data.length > 0) return;
        setUrls(response.data.data);
      } catch (error) {}
    }
    getUrls();
  }, [data]);
  return (
    <>
      <Header />
      <Main linkDetails={urls} refreshUrls={refreshUrls}/>
    </>
  );
}
