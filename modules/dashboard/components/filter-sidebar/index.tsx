"use client";
import Image from "next/image";
import ReactSlider from "react-slider";

import ClassFilter from "../class-filter/class-filter";
import { useAppData } from "@/lib/context";
import { Filter } from "@/lib/types";

const FilterSidebar = () => {
  const {
    selectedClassFilter,
    setSelectedClassFilter,
    polygonRange,
    setPolygonRange,
  } = useAppData();

  const classFilters: Filter[] = [
    {
      color: "rgba(61, 155, 233)",
      borderColor: "border-blue",
      bgColor: "rgba(61, 155, 233, 0.2)",
      label: "Elbow positive",
    },
    {
      color: "rgba(186, 218, 85, 1)",
      bgColor: "rgba(186, 218, 85, 0.2)",
      borderColor: "border-green",
      label: "Fingers positive",
    },
    {
      color: "rgba(44, 225, 203, 1)",
      bgColor: "rgba(44, 225, 203, 0.2)",
      borderColor: "border-sea",
      label: "Humerus",
    },
    {
      color: "rgba(255, 215, 92, 1)",
      bgColor: "rgba(255, 215, 92, 0.2)",
      borderColor: "border-yellow",

      label: "Forearm fracture",
    },
    {
      color: "rgba(242, 88, 88, 1)",
      bgColor: "rgba(242, 88, 88, 0.2)",
      borderColor: "border-red",

      label: "Humerus fracture",
    },
    {
      color: "rgba(253, 176, 62, 1)",
      bgColor: "rgba(253, 176, 62, 0.2)",
      borderColor: "border-orange",

      label: "Shoulder fracture",
    },
    {
      color: "rgba(215, 131, 255, 1)",
      bgColor: "rgba(215, 131, 255, 0.2)",
      borderColor: "border-purple",

      label: "Wrist positive",
    },
  ];

  function handleDeselect() {
    setSelectedClassFilter([]);
  }

  function handleSelectAll() {
    setSelectedClassFilter(classFilters);
  }

  function handleClearFilters() {
    setPolygonRange(0);
    setSelectedClassFilter([]);
  }

  const classSelected = selectedClassFilter.length > 0;

  return (
    <div className="border rounded-md flex justify-center p-4 h-full">
      <div className="flex flex-col gap-8">
        <div className="relative h-[65px]">
          <Image
            src="/Logo.svg"
            alt="logo"
            className="absolute object-contain"
            fill
          />
        </div>

        <div className="flex flex-col gap-4">
          <p className="font-bold text-[15px]">Classes filter</p>

          <div className="flex items-center gap-4 text-[12px]">
            <button
              style={{
                color: !classSelected ? "#2081D2" : "#D1D1D6",
              }}
              onClick={() => handleSelectAll()}
            >
              Select all
            </button>
            <button
              style={{
                color: classSelected ? "#2081D2" : "#D1D1D6",
              }}
              onClick={() => handleDeselect()}
            >
              Deselect all
            </button>
          </div>
          <ClassFilter
            items={classFilters}
            item={selectedClassFilter}
            setItem={setSelectedClassFilter}
          />

          <div className="flex flex-col gap-4">
            <p className="font-bold text-[15px]">Polygon range</p>

            <div className="flex justify-between">
              <p>
                min <span className="font-bold">0</span>
              </p>
              <p>
                max <span className="font-bold">4</span>
              </p>
            </div>
            <div className="mb-4">
              <ReactSlider
                className="customSlider"
                trackClassName="customSlider-track"
                thumbClassName="customSlider-thumb"
                markClassName="customSlider-mark"
                defaultValue={[0, 4]}
                value={polygonRange}
                onChange={(value: number) => setPolygonRange(value)}
                marks={1}
                min={0}
                max={4}
                // ariaLabel={["Lower thumb", "Upper thumb"]}
              />
            </div>
            <div>
              <div className="flex justify-between text-[12px]">
                <button
                  className="flex items-center gap-1"
                  onClick={() => handleClearFilters()}
                >
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                  </div>
                  <span className="font-bold">Clear Filters</span>
                </button>

                <p className="text-gray-400">Need help?</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
