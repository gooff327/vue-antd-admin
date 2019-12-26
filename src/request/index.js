import Vue from "vue";
import Dashboard from "./dashboard";

Vue.prototype.api = {
    dashboard: new Dashboard()
};
