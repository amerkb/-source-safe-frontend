import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardLayout from "./Layout/DashboardLayout";
import Login from "./Page/login";
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";
import AlertReducer from "./Redux/AlertReducer";

const store = createStore(AlertReducer);
function App() {


  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/Dashboard"
            element={<DashboardLayout content="Dashboard" />}
          />
          <Route
            path="/Home"
            element={<DashboardLayout content="Home" />}
          />
          <Route
            path="/GroupDetails"
            element={<DashboardLayout content="GroupDetails" />}
          />
          <Route
            path=""
            element={
              <Login />
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
