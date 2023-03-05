import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';

function FrontendPaginatedItems({ items, itemsPerPage }: { items: any[], itemsPerPage: number }) {

    const [itemOffset, setItemOffset] = useState<number>(0);
    const endOffset: number = itemOffset + itemsPerPage;
    const currentItems: any[] | null = items.slice(itemOffset, endOffset).map((item, index) => {
        return (
            <Link to={`/character/${item.id}`} className="mx-auto sm:mx-0 shadow-md rounded-lg p-4 transition-all hover:opacity-70 hover:shadow-xl" key={item.id}>
                <div className="relative w-full">
                    <img src={item.image} alt="" />
                </div>
                <h2 className='mt-3'>{item.name}</h2>
            </Link>
        )
    });
    console.log(currentItems);

    const pageCount: number = Math.ceil(items.length / itemsPerPage);

    const handlePageClick = (event: { selected: number }) => {
        const newOffset: number = (event.selected * itemsPerPage) % items.length;
        setItemOffset(newOffset);
    };

    return (
        <>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 max-w-6xl mx-auto py-4 md:p-4">
                {currentItems.length > 0 ? currentItems : <div className='text-center flex justify-center items-center min-h-[70vh]'>No data</div>}
            </div>

            <ReactPaginate
                className='flex justify-center items-center gap-4 py-8'
                pageClassName='hover:bg-gray-300 rounded-xl hidden sm:block'
                pageLinkClassName='p-4 py-2'
                activeLinkClassName='cursor-not-allowed'
                activeClassName='bg-blue-500 text-white hover:bg-blue-500 rounded-xl'
                disabledLinkClassName='opacity-50 cursor-not-allowed'
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel="< previous"
            />
        </>
    );
}

export default FrontendPaginatedItems;