import React from "react";
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";
import Sidebar from "./Sidebar";
import SidebarReducer from "../Redux/SidebarReducer";
import AlertReducer from "../Redux/AlertReducer";
import DeleteReducer from "../Redux/DeleteReducer";
import BranchReducer from "../Redux/BranchReducer";
import Login from "../Page/login";
import Register from "../Page/Register";

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
        {/* <Head /> */}
        {props.content === "login" && <Login /> }
        {props.content === "Register" && <Register /> }

      </Provider>
    </div>
  );
};

export default DashboardLayout;
