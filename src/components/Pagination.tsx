import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';


interface PaginatedItemsProps {
  pageCount: number;
  currentPage: number;
  setPageNumber: React.Dispatch<React.SetStateAction<number>>;
}

const PaginatedItems: React.FC<PaginatedItemsProps> = ({ pageCount, currentPage, setPageNumber }) => {

  const handlePageClick = (data: any) => {
    console.log(data);
    setPageNumber(data.selected + 1)
  };


  return (
    <>
      <ReactPaginate
        className='flex justify-center items-center gap-4 py-8'
        pageClassName='hover:bg-gray-300 rounded-xl hidden sm:block'
        pageLinkClassName='p-4 py-2'
        activeClassName='bg-blue-500 text-white hover:bg-blue-500 rounded-xl'
        disabledLinkClassName='opacity-50 cursor-not-allowed'
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        forcePage={currentPage === 1 ? 0 : currentPage - 1}
        pageCount={pageCount}
        previousLabel="< previous"
      />
    </>
  );
};

export default PaginatedItems;
