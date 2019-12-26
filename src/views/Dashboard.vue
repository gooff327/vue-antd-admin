<template>
    <section class="dashboard-wrapper">
        <a-row :gutter="20">
            <a-col :lg="6" :md="6" :sm="12" :xl="6" :xs="12">
                <div class="block-wrapper">
                    <a-icon type="star"/>
                    <span>{{this.stargazers_count}}</span>
                </div>
            </a-col>
            <a-col :lg="6" :md="6" :sm="12" :xl="6" :xs="12">
                <div class="block-wrapper">
                    <a-icon type="eye"/>
                    <span>{{this.stargazers_count}}</span>
                </div>
            </a-col>
            <a-col :lg="6" :md="6" :sm="12" :xl="6" :xs="12">
                <div class="block-wrapper">
                    <a-icon type="save"/>
                    <span>{{this.forks}}</span>
                </div>
            </a-col>
            <a-col :lg="6" :md="6" :sm="12" :xl="6" :xs="12">
                <div class="block-wrapper">
                    <a-icon type="message"/>
                    <span>{{this.open_issues_count}}</span>
                </div>
            </a-col>
        </a-row>
    </section>
</template>

<script>
    export default {
        name: "Dashboard",
        mounted() {
            this.initData();
        },
        data() {
            return {
                stargazers_count: 0,
                watcher_count: 0,
                forks: 0,
                open_issues_count: 0
            }
        },

        methods: {
            initData() {
                this.api.dashboard.repositoryInfos().then(res => {
                    this.stargazers_count = res.data.stargazers_count;
                    this.watcher_count = res.data.watcher_count;
                    this.forks = res.data.forks;
                    this.open_issues_count = res.data.open_issues_count
                })
            }
        }
    }
</script>

<style lang="stylus" scoped>
    .dashboard-wrapper
        width 100%
        height 100%
        .block-wrapper
            height 200px
            line-height 200px
            background-color rgba(0,0,0,0.05)
</style>
