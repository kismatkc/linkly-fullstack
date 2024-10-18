"use client";
import MobileHistoryTable from "./mobile-view-history";
import { useMediaQuery } from "react-responsive";

import { DesktopHistoryTableColumn, LinkDetailsProps } from "@/types/";
import { useEffect, useState } from "react";
import columns from "@/app/(root)/columns";
import { DataTable } from "@/app/(root)/data-table";

const LinkHistory = ({
  linkDetails,
  refreshUrls,
}: {
  linkDetails: LinkDetailsProps[];
  refreshUrls: (urls: DesktopHistoryTableColumn[]) => void;
}) => {
  const [onClient, setOnClient] = useState<boolean>(false);
  useEffect(() => {
    setOnClient(true);
  }, []);
  const useAccordian = useMediaQuery({
    maxWidth: 767,
  });

  if (!onClient) return null;

  if (useAccordian) {
    return <MobileHistoryTable linkDetails={linkDetails} />;
  }

  return (
    <DataTable columns={columns} data={linkDetails} refreshUrls={refreshUrls} />
  );
};
export default LinkHistory;
