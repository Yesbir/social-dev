import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "./App.css";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Navbar from "./components/layout/Navbar";
import Login from "./components/login/Login";
import Register from "./components/register/Register";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Navbar />
          <Route path="/" exact component={Landing} />
          <div className="container">
            <Route path="/login" exact component={Login} />
            <Route path="/register" exact component={Register} />
          </div>

          <Footer />
        </Router>
      </div>
    );
  }
}

export default App;
