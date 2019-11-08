import React from "react";
import { connect } from "react-redux";
import { load } from "../../localStorage";
import { verRequest, logout } from "../../modules/Auth/actions";
import { getIsAuthorized } from "../../modules/Auth/auth";
import {
    channelsRequest,
    categoriesRequest,
    aspectsRequest
} from "../../modules/Marketplace/actions";
import {
    getMarketplaceChannels,
    getMarketplaceError,
    getMarketplaceResults,
    getAspects
} from "../../modules/Marketplace/marketplace";
import styles from "./Products.module.css";
import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Table,
    Input,
    Label,
    Button
} from "reactstrap";
import "bootstrap/dist/css/bootstrap.css";

const MapStateToProps = state => ({
    aspects: getAspects(state),
    searchResults: getMarketplaceResults(state),
    channels: getMarketplaceChannels(state),
    isAuthorized: getIsAuthorized(state),
    error: getMarketplaceError(state)
});

const MapDispatchToProps = {
    verRequest,
    channelsRequest,
    categoriesRequest,
    aspectsRequest,
    logout
};

class Products extends React.Component {
    state = { dropdownIsOpen: false };

    componentDidMount() {
        if (load("access" !== null)) this.props.verRequest();
        this.props.channelsRequest();
    }

    toggle = () => {
        const { dropdownIsOpen } = this.state;
        this.setState({
            dropdownIsOpen: !this.state.dropdownIsOpen
        });
    };

    logout = () => {
        localStorage.removeItem("access");
        this.props.logout();
    };

    getCategories = event => {
        this.props.categoriesRequest(event.target.id);
    };

    getProductInfo = event => {
        this.props.aspectsRequest(event.target.parentElement.id);
    };

    render() {
        const { channels, searchResults, aspects } = this.props;
        return (
            <>
                <Button className={styles.button} onClick={this.logout}>
                    Logout
                </Button>
                <Dropdown
                    isOpen={this.state.dropdownIsOpen}
                    toggle={this.toggle}
                >
                    <DropdownToggle className={styles.button} caret>
                        Channels
                    </DropdownToggle>
                    <DropdownMenu>
                        {channels &&
                            channels.map((item, index) => (
                                <DropdownItem
                                    key={index}
                                    id={item.channel}
                                    onClick={this.getCategories}
                                >
                                    {item.name}
                                </DropdownItem>
                            ))}
                    </DropdownMenu>
                </Dropdown>
                <>
                    {searchResults.length > 0 && (
                        <div className={styles.searchResultWindow}>
                            <Table striped>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>
                                            {Object.keys(searchResults[0])[4]}
                                        </th>
                                        <th>
                                            {Object.keys(searchResults[0])[1]}
                                        </th>
                                        <th>
                                            {Object.keys(searchResults[0])[2]}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {searchResults &&
                                        searchResults.map((item, index) => (
                                            <tr
                                                onClick={this.getProductInfo}
                                                key={index}
                                                id={item.id}
                                            >
                                                <th scope="row">{index}</th>
                                                <td>{item.name}</td>
                                                <td>{item.category_id}</td>
                                                <td>{item.parent_id}</td>
                                            </tr>
                                        ))}
                                </tbody>
                            </Table>
                        </div>
                    )}
                </>
                <>
                    {aspects.length > 0 && (
                        <div className={styles.aspectsWindow}>
                            {aspects &&
                                aspects.map((item, index) => (
                                    <div key={index} className={styles.input}>
                                        <Label>
                                            <b>{item.localizedAspectName}</b>
                                        </Label>
                                        {item.aspectMode ===
                                        "SELECTION_ONLY" ? (
                                            <Input type="select">
                                                {item.aspectValues &&
                                                    item.aspectValues.map(
                                                        (item, index) => (
                                                            <React.Fragment
                                                                key={index}
                                                            >
                                                                <option>
                                                                    {item}
                                                                </option>
                                                            </React.Fragment>
                                                        )
                                                    )}
                                            </Input>
                                        ) : (
                                            <Input
                                                placeholder={
                                                    item.localizedAspectName
                                                }
                                            />
                                        )}
                                    </div>
                                ))}
                        </div>
                    )}
                </>
            </>
        );
    }
}

export default connect(
    MapStateToProps,
    MapDispatchToProps
)(Products);
