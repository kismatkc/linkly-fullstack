"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, CopyIcon, SquarePen, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
import { DesktopHistoryTableColumn } from "@/types/index";
import CopyToClipboard from "@/components/copyToClipboard";
import UrlQrcode from "@/components/url-qrcode";
import { Api } from "@/lib/utils";
import { toast, Toaster } from "sonner";

const columns: ColumnDef<DesktopHistoryTableColumn>[] = [
  {
    accessorKey: "shortLink",
    header: "Short Link",
    cell: ({ row }) => {
      const shortLink: string = row.getValue("shortLink");
      console.log(shortLink);

      return (
        <div className="flex justify-between ">
          <Link
            href={shortLink}
            target="_blank"
            rel="noopener noreferrer"
            className=""
          >
            <span className="text-nowrap hover:underline">
              {shortLink.length > 30
                ? `${shortLink.slice(0, 30)}...`
                : shortLink}
            </span>
          </Link>
          <CopyToClipboard text={shortLink} />
        </div>
      );
    },
  },
  {
    accessorKey: "originalLink",
    header: "Original Link",
  },
  {
    accessorKey: "status",
    header: "Status",
  },

  {
    accessorKey: "qrCode",
    header: "QR Code",
    cell: ({ row }) => {
      const url: string = row.getValue("shortLink");
      return <UrlQrcode url={url} />;
    },
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="font-bold"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const dataObject: Date = new Date(row.getValue("date"));
      const formattedDate = dataObject.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });

      return <span className="text-nowrap">{formattedDate}</span>;
    },
  },
  {
    accessorKey: "action",
    header: "",
    cell: ({ row }) => {
      console.log("row", row.original);

      return (
        <Button
          variant="outline"
          className="cursor-pointer border-none"
          onClick={async () => {
            try {
              //@ts-ignore
              const response = await Api.post("/delete-url", {
                longUrl: row.original.originalLink,
                //@ts-ignore

                userId: row.original.userId,
              });
              return toast.success("Link Deleted");
            } catch (error: unknown) {
              return toast.error("Error Deleting Link");
            }
          }}
        >
          <Trash size={20} />
        </Button>
      );
    },
  },
];

export default columns;
//hi
