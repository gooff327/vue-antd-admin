<template>
    <a-layout id="components-layout-demo-custom-trigger" style="width: 100vw; height: 100vh">
        <a-layout-sider :trigger="null" collapsible v-model="collapsed">
            <transition mode="out-in" name="component-fade">
                <div class="logo">
                    <a-icon class="logo-icon" type="ant-design"/>
                    <span v-if="!collapsed">
          Vue Antd Admin
        </span>
                </div>
            </transition>
            <menu-utils :menus="$store.getters.menus"/>
        </a-layout-sider>
        <a-layout>
            <a-layout-header style="background: #fff; padding: 0">
                <a-icon
                        :type="collapsed ? 'menu-unfold' : 'menu-fold'"
                        @click="()=> collapsed = !collapsed"
                        class="trigger"
                />
                <a-breadcrumb>
                    <a-breadcrumb-item :key="index" v-for="(item, index) of this.$route.matched">
                        <a-icon :type="item.meta.icon"/>
                        <span>{{item.name}}</span>
                    </a-breadcrumb-item>
                </a-breadcrumb>
                <a-avatar class="avatar" icon="user" style="backgroundColor:#87d068"/>


            </a-layout-header>
            <a-layout-content class="content"
                    :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px'}"
            >
                <transition mode="out-in" name="component-fade">
                    <router-view/>
                </transition>
            </a-layout-content>
        </a-layout>
    </a-layout>
</template>

<script>
    // @ is an alias to /src
    import MenuUtils from "../components/MenuUtils";

    export default {
        name: 'home',
        components: {
            MenuUtils
        },
        data() {
            return {
                collapsed: false,
            }
        },
        mounted() {
            this.initUsers();

        },
        methods: {
            async initUsers () {
                const temp = JSON.parse(localStorage.getItem('users'));
                if (temp !== null) {
                    await this.$store.dispatch('initUsers', temp)
                } else {
                    const [res,err] = await this.api.permission.fetchUserList({results: 50}).then(result => [result, null]).catch(e => [null, e]);
                    err ? new Error('fetch user list error, check your network connection') : this.$store.dispatch('initUsers', res.data.results);
                }
            }
        }
    }
</script>

<style lang="stylus">
    #components-layout-demo-custom-trigger .trigger {
        font-size: 18px;
        line-height: 64px;
        padding: 3px 24px;
        cursor: pointer;
        transition: color 0.3s;
        float: left;
    }

    #components-layout-demo-custom-trigger .trigger:hover {
        color: #1890ff;
    }

    #components-layout-demo-custom-trigger .logo
        height: 32px;
        background: rgba(255, 255, 255, 0.2);
        margin: 16px;
        color: rgb(26, 182, 126);
        line-height 32px
        font-weight bold

        .logo-icon
            color #e96f81

    .ant-breadcrumb
        text-align left
        line-height 64px !important
        width 80%

    .avatar
        position absolute !important
        right 0
        top 0
        transform translate(-16px,16px)

    .component-fade-enter-active, .component-fade-leave-active
        transition: opacity .3s ease;

    .component-fade-enter, .component-fade-leave-to
        opacity: 0

    .content
        margin 24px 16px
        padding 24px
        background rgb(255, 255, 255)
        min-height 280px
        overflow scroll
    .progress
        position fixed
        top 64px
</style>
