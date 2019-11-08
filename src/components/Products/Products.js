import React from "react";
import styles from "./Products.module.css";
import { load } from "../../localStorage";
import { connect } from "react-redux";
import { authRequest, verRequest } from "../../modules/Auth/actions";
// import { getAccesToken, getRefreshToken } from "../../modules/Auth/auth";

const MapStateToProps = state => ({
    // access: getAccesToken(state),
    // refresh: getRefreshToken(state)
});

const MapDispatchToProps = { authRequest, verRequest };

class Products extends React.Component {
    state = { inputValue: "" };

    componentDidMount() {
        // if (this.props.isAuthorized === false) {
        //     this.props.verRequest();
        // }
    }

    handleChange = event => {
        const { inputValue } = this.state;
        this.setState({
            inputValue: event.target.value
        });
    };

    handleKeyPress = event => {
        if (event.key === "Enter") {
            this.props.test(this.state.inputValue);
        }
    };

    handleClick = event => {
        this.props.authRequest();
    };

    Verify = event => {
        this.props.verRequest();
    };

    render() {
        const { access, refresh } = this.props;
        return (
            <>
                <div>
                    <button onClick={this.handleClick}>Кнопка</button>
                    <button onClick={this.Verify}>Varify</button>
                </div>
            </>
        );
    }
}

export default connect(
    MapStateToProps,
    MapDispatchToProps
)(Products);
