import React from "react";

import AddRestaurantPanel from "../../UI/Restaurant/RestaurantPanel";
import Breadcrumb from "../../UI/Breadcrumb";

const AddRestaurant = () => {
  return (
    <div>
      <Breadcrumb title="Add Restaurant" />

      <AddRestaurantPanel title="Add Restaurant" />
    </div>
  );
};

export default AddRestaurant;
