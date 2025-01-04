import React, { useEffect, useState } from "react";
import Field from "../Form/Input/Field";
import TextArea from "../Form/Input/TextArea";
import Submit from "../Form/Submit/Submit";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import AlertReducer, { setSuccessRestaurant } from "../../Redux/AlertReducer";
import { useDispatch, useSelector } from "react-redux";
import { setShow } from "../../Redux/BranchReducer";

const FormBranch = () => {
  const RestaurantId = useSelector((state) => state.Branch.RestaurantID);
  const token = localStorage.getItem("token");
  const update = useSelector((state) => state.Branch.update);
  const BranchID = useSelector((state) => state.Branch.BranchID);
  const BranchName = useSelector((state) => state.Branch.name);
  const BranchDescription = useSelector((state) => state.Branch.description);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = (event) => {
    dispatch(setShow(false));

    console.log(RestaurantId);
    if (update) {
      event.preventDefault();
      const formData = new FormData(event.target);
      const data = {
        name: formData.get("name"),
        description: formData.get("description"),
      };
      console.log(data);
      const token = localStorage.getItem("token");
      axios
        .put(`${window.host}/superAdmin/branch/${BranchID}`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          navigate("/Restaurants");
          dispatch(setSuccessRestaurant(true));
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      event.preventDefault();
      const formData = new FormData(event.target);
      const data = {
        name: formData.get("name"),
        restaurant_id: formData.get("restaurant_id"),
        description: formData.get("description"),
      };
      console.log(data);
      const token = localStorage.getItem("token");
      axios
        .post(`${window.host}/superAdmin/branch`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          event.target.reset();
          console.log(response.data);
          navigate("/Restaurants");
          dispatch(setSuccessRestaurant(true));
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <Field
        label="Name"
        placeholder="Branch Name"
        name="name"
        value={update ? BranchName : ""}
      />
      <Field type="hidden" name="restaurant_id" value={RestaurantId} />
      <TextArea
        label="Description"
        placeholder="Branch Description"
        name="description"
        value={update ? BranchDescription : ""}
      />
      <Submit />
    </form>
  );
};

export default FormBranch;
