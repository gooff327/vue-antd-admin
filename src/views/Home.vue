<template>
  <a-layout style="width: 100vw; height: 100vh" id="components-layout-demo-custom-trigger">
    <a-layout-sider :trigger="null" collapsible v-model="collapsed">
      <transition name="component-fade" mode="out-in">
      <div class="logo">
        <a-icon class="logo-icon" type="ant-design" />
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
          class="trigger"
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="()=> collapsed = !collapsed"
        />
        <a-breadcrumb>
          <a-breadcrumb-item v-for="(item, index) of this.$route.matched" :key="index">
            <a-icon :type="item.meta.icon" />
            <span>{{item.name}}</span>
          </a-breadcrumb-item>
        </a-breadcrumb>

      </a-layout-header>
        <a-layout-content
          :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }"
        >
          <transition name="component-fade" mode="out-in">
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
  data () {
    return {
      collapsed: false,
    }
  },
  mounted() {
    console.log(this.$route.matched)
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
    color: rgb(26,182,126);
    line-height 32px
    font-weight bold
    .logo-icon
      color #e96f81

  .ant-breadcrumb
    text-align left
    line-height 64px !important

  .component-fade-enter-active, .component-fade-leave-active
    transition: opacity .3s ease;

  .component-fade-enter, .component-fade-leave-to
    opacity: 0

  .progress {
    position: fixed;
    top: 64px;
  }
</style>
