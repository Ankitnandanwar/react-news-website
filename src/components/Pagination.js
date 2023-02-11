import React from 'react'
import {useGlobalContext} from './Context'

const Pagination = () => {

  const {page, nbPages, prevPage, nextPage} = useGlobalContext()
  
  return (
    <div className='pagn-btn'>
      <button onClick={()=>prevPage()}>PREV</button>
      <p>{page+1} to {nbPages}</p>
      <button onClick={()=>nextPage()}>NEXT</button>
    </div>
  )
}

export default Pagination