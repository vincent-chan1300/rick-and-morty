import React from 'react'
import BarLoader from "react-spinners/BarLoader";

function Loading() {
  return (
    <div className='min-h-[75vh] w-full flex items-center justify-center'>
        <BarLoader color='#ff5733' />
    </div>
  )
}

export default Loading