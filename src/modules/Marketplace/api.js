import axios from "axios";
import { load } from "../../localStorage";

export const fetchChannels = () => {
    return axios({
        method: "get",
        url: "http://utss.su/api/user_channel/",
        headers: { Authorization: `JWT ${load("access")}` }
    }).then(response => {
        return response.data;
    });
};

export const fetchCategories = channel => {
    return axios({
        method: "get",
        url: "http://utss.su/api/ebay/product/category/",
        headers: {},
        params: {
            level: null,
            parent_id: null,
            channel_id: channel,
            is_leaf: true,
            category_id: null,
            limit: 30,
            offset: 30
        }
    }).then(response => {
        return response.data;
    });
};

export const fetchAspects = id => {
    return axios({
        method: "get",
        url: `http://utss.su/api/ebay/product/category/${id}/get_aspects/`,
        header: {}
    }).then(response => {
        return response.data;
    });
};
