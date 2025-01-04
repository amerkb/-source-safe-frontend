import React from 'react'

import GroupTable from './GroupTable'
import PanelHead from '../Panel/PanelHead'
import PanelBody from '../Panel/PanelBody'

const GroupList = () => {
  return (
    <div>
      <PanelHead title='My Groups'/>
      <PanelBody content={<GroupTable/>} />


      </div>
  )
}

export default GroupList

