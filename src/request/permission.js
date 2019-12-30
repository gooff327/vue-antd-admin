import baseRequest from "../utils/request";
export default class Permission extends baseRequest{
    constructor() {
        super();
        this.baseURL = 'https://api.randomuser.me/';
        this.urls = {
            userList: '/'
        }
    }
    fetchUserList = params => this.get(this.urls.userList, params)
}
