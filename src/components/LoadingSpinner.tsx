import React from 'react'
import { FaSpinner } from 'react-icons/fa'

const LoadingSpinner = () => {
  return (
    <div className='flex justify-center items-center'>
      <FaSpinner className='animate-spin ' size={"60"} />
    </div>
  )
}

export default LoadingSpinner
