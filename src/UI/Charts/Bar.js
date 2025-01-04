import * as React from "react";
import Stack from "@mui/material/Stack";

import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts/ChartsAxis";
import axios from "axios";
import Loader from "../Loader/Loader";

function TickParamsSelector({
  tickPlacement,
  tickLabelPlacement,
  setTickPlacement,
  setTickLabelPlacement,
}) {
  return (
    <Stack
      direction="column"
      justifyContent="space-between"
      sx={{ width: "100%" }}
    ></Stack>
  );
}

const valueFormatter = (value) => `${value}`;

const chartSetting = {
  yAxis: [
    {
      label: "",
    },
  ],
  series: [
    {
      dataKey: "branchs_count",
      valueFormatter,
      color: "#f85959",
    },
  ],
  height: 300,
  sx: {
    [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
      transform: "translateX(-10px)",
    },
  },
};

export default function TickPlacementBars() {
  const [tickPlacement, setTickPlacement] = React.useState("middle");
  const [tickLabelPlacement, setTickLabelPlacement] = React.useState("middle");
  const [data, setdata] = React.useState([]);
  const [loading, setloader] = React.useState(true);
  const token = localStorage.getItem("token");
  React.useEffect(() => {
    axios
      .get(`${window.host}/superAdmin/RestaurantWithCountBranch`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setdata(response.data.data);
        setloader(false);
      })
      .catch((error) => {
        console.error(error);
        setloader(false);
      });
  }, []);
  return (
    <div style={{ width: "100%", position: "relative" }}>
      {loading ? <Loader /> : ""}

      <TickParamsSelector
        tickPlacement={tickPlacement}
        tickLabelPlacement={tickLabelPlacement}
        setTickPlacement={setTickPlacement}
        setTickLabelPlacement={setTickLabelPlacement}
      />
      <BarChart
        dataset={data}
        xAxis={[
          {
            scaleType: "band",
            dataKey: "name",
            tickPlacement,
            tickLabelPlacement,
          },
        ]}
        {...chartSetting}
      />
    </div>
  );
}
