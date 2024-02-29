"use client";

import React from "react";
import { Record } from "@/lib/types";
import PolygonOverlay from "../polygon-overlay";

type Props = {
  i: Record;
  setIsOpen: (value: boolean) => void;
  setSelectedImage: (value: React.ReactNode) => void;
  setFileName: (value: string) => void;
};

const TabPanelContent = ({
  i,
  setIsOpen,
  setSelectedImage,
  setFileName,
}: Props) => {
  function openModal(image: React.ReactNode, fileName: string) {
    setIsOpen(true);
    setSelectedImage(image);
    setFileName(fileName);
  }

  return (
    <div className="h-[200px] border">
      <div
        className="relative border h-full cursor-pointer"
        onClick={() =>
          openModal(
            <PolygonOverlay polygonData={i.label} imageUrl={i.image} />,
            i.name
          )
        }
      >
        <PolygonOverlay polygonData={i.label} imageUrl={i.image} />
      </div>

      <p className="truncate">{i.name}</p>
    </div>
  );
};

export default TabPanelContent;
