"use client";

import BoneFractureTabs from "../tabs";
import { useQuery } from "@tanstack/react-query";
import { getData } from "@/services/s3";
import { useAppData } from "@/lib/context";

const Main = () => {
  const { activeTotalCount, currentImagesPerPage } = useAppData();

  const { data, isLoading } = useQuery({
    queryKey: ["album"],
    queryFn: () => getData(),
  });

  return (
    <section className="py-4">
      <div className="mx-auto w-full max-w-screen-xl px-2.5 flex flex-col gap-12">
        <div className="flex justify-between">
          <h1 className="font-bold text-[32px]">Bone-fraction-detection</h1>

          <p className="text-[18px]">
            <span className="font-bold">{currentImagesPerPage}</span> of{" "}
            <span className="font-bold">{activeTotalCount}</span> images
          </p>
        </div>

        <BoneFractureTabs data={data} isLoading={isLoading} />
      </div>
    </section>
  );
};

export default Main;
