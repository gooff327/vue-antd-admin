import baseRequest from "../utils/request";
export default class Dashboard extends baseRequest{
    constructor() {
        super();
        this.baseURL = 'https://api.github.com';
        this.urls = {
            repository: '/repos/vueComponent/ant-design-vue'
        };
    }
    repositoryInfos () {
        return this.get(this.urls.repository)
    }

}
