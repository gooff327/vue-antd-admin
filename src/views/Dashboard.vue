<template>
    <section class="dashboard-wrapper">
        <a-row :gutter="20">
            <a-col :lg="6" :md="6" :sm="12" :xl="6" :xs="12">
                <div class="block-wrapper">
                    <a-icon class="star" type="star"/>
                    <span>{{this.stargazers_count}}</span>
                </div>
            </a-col>
            <a-col :lg="6" :md="6" :sm="12" :xl="6" :xs="12">
                <div class="block-wrapper">
                    <a-icon class="eye" type="eye"/>
                    <span>{{this.stargazers_count}}</span>
                </div>
            </a-col>
            <a-col :lg="6" :md="6" :sm="12" :xl="6" :xs="12">
                <div class="block-wrapper">
                    <a-icon class="save" type="save"/>
                    <span>{{this.forks}}</span>
                </div>
            </a-col>
            <a-col :lg="6" :md="6" :sm="12" :xl="6" :xs="12">
                <div class="block-wrapper">
                    <a-icon class="message" type="message"/>
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
    @keyframes scale_animate
        0%
            transform scale(1)
        20%
            transform scale(0.8)
        70%
            transform scale(1.6)
        100%
            transform scale(1)

    .dashboard-wrapper
        width 100%
        height 100%
        .block-wrapper
            height 200px
            line-height 200px
            background-color rgba(0,0,0,0.05)
            padding-left 25%
            padding-right 25%
            border-radius 6px
            display flex
            justify-content center
            align-items center
            &:hover
                box-shadow: 0 0 12px 2px rgba(189,189,189,.5);
            .star
                color #42b983
            .eye
                color #1890ff
            .save
                color lightcoral
            .message
                color deeppink
            .anticon
                flex 1
                font-size 30px
            .anticon:hover
                animation scale_animate .5s
                animation-timing-function: cubic-bezier(0.1, -0.6, 0.2, 0);
            span
                flex 1
                font-weight bold
                font-size larger
                font-family "Comic Sans MS"




</style>
