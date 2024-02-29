/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import ReactPaginate from "react-paginate";
import React, { useEffect, useState } from "react";

import { Record } from "@/lib/types";
import { useAppData } from "@/lib/context";

type Props = {
  data: Record[];
};

const Paginate = ({ data }: Props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);

  const {
    polygonRange,
    setCurrentImages,
    setActiveTotalCount,
    setCurrentImagesPerPage,
  } = useAppData();

  const perPage = 54;

  useEffect(() => {
    if (data) {
      let temp = data;
      let paginatedData: Record[] = [];

      if (polygonRange > 0) {
        temp = temp.filter((i) => i.numberOfPolygons === polygonRange);
      }

      if (temp.length > 54) {
        paginatedData = temp.slice(
          currentPage * perPage,
          (currentPage + 1) * perPage
        );
      } else {
        paginatedData = temp;
      }

      setActiveTotalCount(temp.length);
      setPageCount(Math.ceil(temp.length / perPage));
      setCurrentImages(paginatedData);
      setCurrentImagesPerPage(paginatedData.length);
    }
  }, [currentPage, data, polygonRange]);

  function handlePageClick(e: any) {
    setCurrentPage(e.selected);
  }
  return (
    <div>
      <ReactPaginate
        breakLabel="..."
        nextLabel={<p> {"> "}</p>}
        containerClassName={"pagination"}
        pageClassName={"page-item"}
        activeClassName={"active"}
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel={"<"}
        renderOnZeroPageCount={null}
      />
    </div>
  );
};

export default Paginate;
