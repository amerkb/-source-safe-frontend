import React from "react";
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";
import SidebarReducer from "../Redux/SidebarReducer";
import AlertReducer from "../Redux/AlertReducer";
import DeleteReducer from "../Redux/DeleteReducer";
import BranchReducer from "../Redux/BranchReducer";
import Home from "../Page/Home";
import Login from "../Page/login";
import Register from "../Page/Register"; 
import Container from "../Layout/Container"; 
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
        {props.content === "login" && <Login /> }
        {props.content === "Register" && <Register /> }
        {props.content === "Home" && (<Container content={<Home />} />)}
        {props.content === "GroupDetails" && (<Container content={<GroupDetails />} />)}




      </Provider>
    </div>
  );
};

export default DashboardLayout;
