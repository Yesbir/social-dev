import React, { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { register } from "../../actions/authAction";
import TextField from "../TextField/TextField";

class Register extends Component {
  state = {
    email: "",
    password: "",
    password2: "",
    name: "",
    errors: {},
  };

  onRegisterInputChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  };

  onSubmit = (evt) => {
    evt.preventDefault();

    const userData = _.omit(this.state, ["errors"]);
    this.props.registerAction(userData);

    // console.log(this.state);
  };

  render() {
    const { user } = this.props;
    const { errors } = this.props;
    return (
      <div className="register">
        <h1>{user.token ? user.token : user.name}</h1>
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">
                Create your DevConnector account
              </p>
              <form noValidate onSubmit={this.onSubmit}>
                <TextField
                  type="text"
                  error={errors.name}
                  placeholder="Name"
                  value={this.state.name}
                  onChange={this.onRegisterInputChange}
                />

                <TextField
                  type="email"
                  placeholder="Email Address"
                  name="email"
                  value={this.state.email}
                  onChange={this.onRegisterInputChange}
                  info="This site uses Gravatar so if you want a profile image, use a
                  Gravatar email"
                  error={errors.email}
                />

                <TextField
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={this.state.password}
                  onChange={this.onRegisterInputChange}
                  error={errors.password}
                />

                <TextField
                  type="password"
                  placeholder="Confirm Password"
                  name="password2"
                  value={this.state.password2}
                  onChange={this.onRegisterInputChange}
                  error={errors.password2}
                />
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    errors: state.errors,
    user: state.auth.user,
  };
};

export default connect(mapStateToProps, { registerAction: register })(
  withRouter(Register)
);
