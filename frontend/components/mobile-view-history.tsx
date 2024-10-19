import { DesktopHistoryTableColumn, LinkDetailsProps } from "@/types/";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CopyIcon, Trash } from "lucide-react";
import Link from "next/link";
import CopyToClipboard from "./copyToClipboard";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { Api } from "@/lib/utils";

const MobileHistoryTable = ({
  linkDetails,
  refreshUrls,
}: {
  linkDetails: LinkDetailsProps[];
  refreshUrls: (urls: DesktopHistoryTableColumn[]) => void;
}) => {
  console.log(linkDetails);

  return (
    <section className="flex-column-center w-full">
      <h1 className="dark:bg-brand-grey-lite w-full text-left py-4 pl-2 font-semibold text-lg md:text-2xl">
        Shorten Links
      </h1>
      <Accordion
        type="single"
        collapsible
        className="w-full dark:bg-[#181E29] text-lg md:text-xl"
      >
        {linkDetails.length > 0 ? (
          linkDetails.map((link, index) => (
            <AccordionItem
              value={link.shortLink}
              key={index}
              className="flex flex-col border-none "
            >
              <div className="flex-row-center justify-evenly grow">
                <Link
                  href={link.shortLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className=""
                >
                  <span className="text-left hover:underline">
                    {link.shortLink.length > 20
                      ? `${link.shortLink.slice(0, 20) + "..."} `
                      : link.shortLink}
                  </span>
                </Link>
                <CopyToClipboard text={link.shortLink} />
                <Button
                  variant="outline"
                  className="cursor-pointer border-none absolute -right-2"
                  onClick={async () => {
                    try {
                      //@ts-ignore
                      const response = await Api.post("/delete-url", {
                        longUrl: link.originalLink,
                        //@ts-ignore

                        userId: link.userId,
                      });

                      toast.success("Link Deleted");
                    } catch (error: unknown) {
                      toast.error("Link Deletetion fialed");
                    }

                    try {
                      //@ts-ignore

                      const _id = link.userId;

                      const urls = await Api.get(`/url/${_id}`);
                      if (!(urls.data.data.length > 0)) {
                        refreshUrls([]);
                      }
                      refreshUrls(urls.data.data);
                    } catch (error) {
                      refreshUrls([]);
                    }
                  }}
                >
                  <Trash size={20} />
                </Button>
                <AccordionTrigger></AccordionTrigger>
              </div>

              <AccordionContent className="w-full">
                <span className="pl-[11%] w-full">{link.originalLink}</span>
              </AccordionContent>
            </AccordionItem>
          ))
        ) : (
          <div className="text-center">No urls to show</div>
        )}
      </Accordion>
    </section>
  );
};

export default MobileHistoryTable;
