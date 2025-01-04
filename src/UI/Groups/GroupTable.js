import React, { useEffect, useState } from "react";
import DeletePops from "../Pops/DeletePops";
import Card from "./Card";
import { LinearProgress } from "@mui/material";
import { Helper } from "../../tools/Helper";
import { api_Routes } from "../../tools/api_Routes";

const GroupTable = () => {
  const [myGroups, setMyGroups] = useState([]);
  const [loading, setLoader] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    setLoader(true);
    getMyGroups();
  }, []);

  const getMyGroups = async () => {
    const { response, message } = await Helper.Get({
      url: api_Routes.Groups.myGroups,
      hasToken: true,
    });

    if (response) {

    } else {
      console.error(message);
    }
    setLoader(false);
  };



  return (
    <div>
      <div
        className="hover:bg-[#142b48] bg-primary text-center text-lg
            duration-200 mb-4 text-white font-bold float-right
            w-fit px-6 py-2 h-[calc(1.5em + .75rem + 2px)]
            text-[14px] rounded-[0.25rem] border-[1px] border-transparent"
      >
        Add Group
      </div>

      <DeletePops />

      {loading ? (
        <LinearProgress />
      ) : (
        <div className="grid gap-6 grid-cols-[repeat(auto-fill,_minmax(350px,_1fr))]">
          {myGroups.map((group) => (
            <Card key={group.id} title={group.groupName} />
          ))}
        </div>
      )}
    </div>
  );
};

export default GroupTable;
