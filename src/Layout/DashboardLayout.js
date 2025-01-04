import React from "react";
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";
import Sidebar from "./Sidebar";
import SidebarReducer from "../Redux/SidebarReducer";
import AlertReducer from "../Redux/AlertReducer";
import DeleteReducer from "../Redux/DeleteReducer";
import BranchReducer from "../Redux/BranchReducer";
import Head from "./Head";
import Dashboard from "../Page/Dashboard";
import Container from "./Container";
import  Home  from "../Page/Home";
import GroupDetails from "../UI/Groups/GroupDetails";

const rootReducer = combineReducers({
  Sidebar: SidebarReducer,
  Alert: AlertReducer,
  Branch: BranchReducer,
  Delete: DeleteReducer,
});
const store = createStore(rootReducer);
const DashboardLayout = (props) => {
  return (
    <div className="overflow-x-hidden">
      <Provider store={store}>
        <Head />
        {props.content === "Dashboard" && <Container content={<Dashboard />} />}
        {props.content === "Home" && (<Container content={<Home />} />)}
        {props.content === "GroupDetails" && (<Container content={<GroupDetails />} />)}

      </Provider>
    </div>
  );
};

export default DashboardLayout;
