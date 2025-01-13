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
            path="/"
            element={<DashboardLayout content="login" />}
          />
          <Route
            path="/Register"
            element={<DashboardLayout content="Register" />}
          />
          <Route
            path="/Dashboard"
            element={<DashboardLayout content="Dashboard" />}
          />
          <Route
            path="/Home"
            element={<DashboardLayout content="Home" />}
          />
          <Route
            path="/GroupDetails/:id/:title"
            element={<DashboardLayout content="GroupDetails" />}
          />
  
        </Routes>
      </Router>
    </div>
  );
}

export default App;
