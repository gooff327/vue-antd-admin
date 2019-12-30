import Axios from 'axios'

const baseURL = process.env.NODE_ENV === 'development' ? 'https://api.github.com' : 'https://api.github.com';
const headers = {
    'Accept': "*",
    "Content-type": "application/json"
};
export const Request = Axios.create({
    headers: headers,
    timeout: 12000,
    baseURL: baseURL
});

Request.defaults.withCredentials = true;

export default class baseRequest {
    constructor() {
        this.urls = {};
    }

    async get (url, params) {
        return Request.get(url, {
            params
        })
    }

    async post (url, params) {
        return Request.post(url, params)
    }

    async delete (url) {
        return Request.delete(url)
    }

    async put (url, params) {
        return Request.put(url, params)
    }

    async custom (config) {
        return  Request.request(config)
    }

}
