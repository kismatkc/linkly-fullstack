import { LinkDetailsProps } from "@/types/";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CopyIcon } from "lucide-react";
import Link from "next/link";
import CopyToClipboard from "./copyToClipboard";

const MobileHistoryTable = ({
  linkDetails,
}: {
  linkDetails: LinkDetailsProps[];
}) => {
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
        {linkDetails.map((link, index) => (
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
              <AccordionTrigger></AccordionTrigger>
            </div>

            <AccordionContent className="w-full">
              <span className="pl-[11%] w-full">{link.originalLink}</span>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};

export default MobileHistoryTable;
