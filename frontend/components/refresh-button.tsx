import React, { useState } from "react";
import { Button } from "./ui/button";
import { RefreshCwIcon } from "lucide-react";
import { DesktopHistoryTableColumn } from "@/types";
import { useSession } from "next-auth/react";
import { Api } from "@/lib/utils";

const RefreshButton = ({
  refreshUrls,
}: {
  refreshUrls: (urls: DesktopHistoryTableColumn[]) => void;
}) => {
  const [spin, setSpin] = useState(false);
  const { data } = useSession();
  return (
    <Button
      variant="outline"
      className="flex gap-x-1"
      onClick={async () => {
        setSpin(true);
        try {
          if (!data) return;
          //@ts-ignore
          const _id = data?.user?.id;

          const response = await Api.get(`/url/${_id}`);
          if (!(response.data.data.length > 0)) {
            refreshUrls([]);
            return setSpin(false);
          }
          refreshUrls(response.data.data);
          return setSpin(false);
        } catch (error) {
          refreshUrls([]);
          return setSpin(false);
        }
      }}
    >
      <RefreshCwIcon size={20} className={`${spin && "animate-spin"}`} />
      <span className="font-light text-sm">Refresh</span>
    </Button>
  );
};

export default RefreshButton;
