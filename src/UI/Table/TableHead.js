import React from 'react'

const TableHead = ({title}) => {
  return (
    <th className='p-3 w-3 whitespace-nowrap  text-center  border-b-[1px] bg-primary'>
     {title}
    </th>
  )
}

export default TableHead
