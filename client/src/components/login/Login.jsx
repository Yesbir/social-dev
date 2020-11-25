import React, { Component } from "react";
import { classNames } from "../../helpers/classNames";
import devConnector from "../../apis/devConnector";

class Login extends Component {
  state = {
    email: "",
    password: "",
    errors: {},
  };

  onSubmit = (evt) => {
    evt.preventDefault();
  };
  onLoginInputChange = (evt) => {
    this.setState({ [evt.target.name]: evt.target.value });
    console.log({ [evt.target.name]: evt.target.value });
  };

  render() {
    const { errors } = this.state;
    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">
                Sign in to your DevConnector account
              </p>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="email"
                    className={classNames("form-control form-control-lg", {
                      "is-invalid": errors.name,
                    })}
                    placeholder="Email Address"
                    value={this.state.email}
                    name="email"
                    onChange={this.onLoginInputChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    placeholder="Password"
                    name="password"
                    value={this.state.password}
                    onChange={this.onLoginInputChange}
                  />
                </div>
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
