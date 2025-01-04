import React from 'react'
import Breadcrumb from '../UI/Breadcrumb'
import ComparisonRestaurant from '../UI/Dashboard/ComparisonRestaurant'

const Dashboard = () => {
  return (
    <div>
      <Breadcrumb title="Dashboard"/>
      <ComparisonRestaurant />
    </div>
  )
}

export default Dashboard
