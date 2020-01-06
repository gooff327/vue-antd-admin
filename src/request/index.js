import Vue from "vue";
import Dashboard from "./dashboard";
import Permission from "./permission";
Vue.prototype.api = {
    dashboard: new Dashboard(),
    permission: new Permission(),
};
