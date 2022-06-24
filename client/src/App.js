import "./App.css";
import React, { Fragment, useEffect } from "react";
import NavigationBar from "./components/layout/Navbar";
import Login from "./components/layout/Login";
import Edit from "./components/layout/Edit";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./components/layout/Register";
import Alert from "./components/layout/Alert";
import Dashboard from "./components/layout/Dashboard";
// Redux
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";
import PrivateRoute from "./components/layout/PrivateRoute";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <NavigationBar />
          <section className="container" style={{ marginTop: "5px" }}>
            <Alert />
            <Routes>
              <Route exact path="/" element={<PrivateRoute />}>
                <Route exact path="/" element={<Dashboard />} />
              </Route>
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/register" element={<Register />} />
              <Route exact path="/dashboard" element={<PrivateRoute />}>
                <Route exact path="/dashboard" element={<Dashboard />} />
              </Route>
              <Route exact path="/edit" element={<PrivateRoute />}>
                <Route exact path="/edit" element={<Edit />} />
              </Route>
            </Routes>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
