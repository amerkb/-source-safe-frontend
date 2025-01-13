import React from "react";
import PanelHead from "../UI/Panel/PanelHead";
import PanelBody from "../UI/Panel/PanelBody";
import GroupTable from "../UI/Groups/GroupTable";

const Home = () => {
  return (
    <div>
     <PanelHead title='My Groups'/>
     <PanelBody content={<GroupTable/>} />
    </div>
  );
};

export default Home;
