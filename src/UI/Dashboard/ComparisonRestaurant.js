import React from 'react'
import Bar from '../Charts/Bar'
import PanelBody from '../Panel/PanelBody'
import PanelHead from '../Panel/PanelHead'

const ComparisonRestaurant = () => {
  return (
    <div className='px-[15px]   bg-white'>
        <PanelHead title="Restaurant List"/>
        <PanelBody content={<Bar />} />
    </div>
  )
}

export default ComparisonRestaurant
