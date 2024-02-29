"use client";

import { useState } from "react";
import { Tab } from "@headlessui/react";

import Paginate from "../pagination";
import ImagePopUp from "../image-popup";
import TabPanelContent from "./tab-panel-content";

// lib
import { useAppData } from "@/lib/context";
import { FracturedImages } from "@/lib/types";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

type Props = {
  isLoading: boolean;
  data: FracturedImages | undefined;
};

const BoneFractureTabs = ({ data, isLoading }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<React.ReactNode | null>(
    null
  );
  const [fileName, setFileName] = useState("");

  const { currentImages } = useAppData();

  return (
    <div className="w-full">
      {!isLoading && data ? (
        <Tab.Group>
          <Tab.List className="flex space-x-1 border-b">
            {data &&
              Object.keys(data).map((type) => (
                <Tab
                  key={type}
                  className={({ selected }) =>
                    classNames(
                      "w-full py-2.5 text-sm font-medium leading-5",
                      selected
                        ? "bg-[#FFD75C1A] text-[#FFD75C] border-b border-[#FFD75C]"
                        : ""
                    )
                  }
                >
                  {type}
                </Tab>
              ))}
          </Tab.List>
          <Tab.Panels className="mt-2">
            {Object.values(data).map((type, idx) => (
              <Tab.Panel
                key={idx}
                className={classNames("flex flex-col gap-4")}
              >
                <div className="grid grid-cols-6 overflow-auto h-[660px] gap-4 gap-y-8 overflow-y-scroll scrollable-div">
                  {currentImages &&
                    currentImages?.length > 0 &&
                    currentImages.map((i, index) => (
                      <TabPanelContent
                        key={index}
                        i={i}
                        setIsOpen={setIsOpen}
                        setSelectedImage={setSelectedImage}
                        setFileName={setFileName}
                      />
                    ))}
                </div>
                <div className="flex justify-center items-center">
                  <Paginate data={type} />
                </div>
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      ) : (
        <div>
          <p className="font-bold">Loading...</p>
        </div>
      )}

      <ImagePopUp
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        image={selectedImage}
        fileName={fileName}
      />
    </div>
  );
};

export default BoneFractureTabs;
