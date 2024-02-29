"use client";

import React, { createContext, useContext, useState } from "react";
import { Record } from "../types";

interface IAppContext {
  polygonRange: number;
  selectedClassFilter: string[];
  setPolygonRange: (value: number) => void;
  activeTotalCount: number;
  setActiveTotalCount: (count: number) => void;
  currentImagesPerPage: number;
  setCurrentImagesPerPage: (value: number) => void;
  setSelectedClassFilter: (value: string[]) => void;
  currentImages: Record[] | null;
  setCurrentImages: (value: Record[]) => void;
}

export const AppContext = createContext<IAppContext | null>(null);

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentImages, setCurrentImages] = useState<Record[] | null>(null);
  const [polygonRange, setPolygonRange] = useState(0);
  const [activeTotalCount, setActiveTotalCount] = useState(0);
  const [currentImagesPerPage, setCurrentImagesPerPage] = useState(0);
  const [selectedClassFilter, setSelectedClassFilter] = useState<string[]>([]);

  return (
    <AppContext.Provider
      value={{
        selectedClassFilter,
        setSelectedClassFilter,
        polygonRange,
        setPolygonRange,
        activeTotalCount,
        setActiveTotalCount,
        currentImagesPerPage,
        setCurrentImagesPerPage,
        currentImages,
        setCurrentImages,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;

export const useAppData = () => {
  const context = useContext(AppContext);
  if (context === null) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
