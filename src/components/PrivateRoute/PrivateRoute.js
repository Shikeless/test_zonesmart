import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { load } from "../../localStorage";

class PrivateRoute extends Component {
    renderRoute = routeProps => {
        const { isAuthorized, component: RouteComponent } = this.props;
        return isAuthorized ? (
            <RouteComponent {...routeProps} />
        ) : (
            <Redirect to="/" />
        );
    };

    render() {
        const { component, ...rest } = this.props;
        return <Route {...rest} render={this.renderRoute} />;
    }
}

export default PrivateRoute;
