import Axios from 'axios'

const headers = {
    'Accept': "*",
    "Content-type": "application/json"
};
export const Request = Axios.create({
    headers: headers,
    timeout: 12000,
});


export default class baseRequest {
    constructor() {
        this.urls = {};
        this.baseURL = process.env.NODE_ENV === 'development' ? '' : '';
    }

    async get (url, params) {
        return Request.get(this.baseURL + url, {
            params
        })
    }

    async post (url, params) {
        return Request.post(this.baseURL + url, params)
    }

    async delete (url, params) {
        return Request.delete(this.baseURL + url, params)
    }

    async put (url, params) {
        return Request.put(this.baseURL + url, params)
    }

    async custom (config) {
        return  Request.request(config)
    }

}
