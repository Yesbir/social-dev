import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router-dom";
import _ from "lodash";

import { classNames } from "../../helpers/classNames";
import { login } from "../../actions/authAction";

class Login extends Component {
  state = {
    email: "",
    password: "",
    errors: {},
  };

  onSubmit = (evt) => {
    evt.preventDefault();
    const loginData = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props.login(loginData, this.props.history);
  };
  onLoginInputChange = (evt) => {
    this.setState({ [evt.target.name]: evt.target.value });
  };

  alreadyLogedIN = () => {
    const { errors } = this.props;
    return (
      <div className="login">
        {_.isEmpty(this.props.user) ? "" : <h1>{this.props.user.name}</h1>}
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
                      "is-invalid": errors.email,
                    })}
                    placeholder="Email Address"
                    value={this.state.email}
                    name="email"
                    onChange={this.onLoginInputChange}
                  />
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email}</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={classNames("form-control form-control-lg", {
                      "is-invalid": errors.password,
                    })}
                    placeholder="Password"
                    name="password"
                    value={this.state.password}
                    onChange={this.onLoginInputChange}
                  />
                  {errors.password && (
                    <div className="invalid-feedback">{errors.password}</div>
                  )}
                </div>
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  };

  render() {
    if (this.props.isLogedIn) {
      return <Redirect to="/dashboard" />;
    } else {
      return this.alreadyLogedIN();
    }
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    errors: state.errors,
    isLogedIn: state.auth.isLogedIn,
  };
};

export default connect(mapStateToProps, { login })(withRouter(Login));
