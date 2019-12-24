<template>
  <a-layout style="width: 100vw; height: 100vh" id="components-layout-demo-custom-trigger">
    <a-layout-sider :trigger="null" collapsible v-model="collapsed">
      <div class="logo" />
      <menu-utils :menus="$store.getters.menus"/>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <a-icon
          class="trigger"
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="()=> collapsed = !collapsed"
        />
      </a-layout-header>

      <transition name="component-fade" mode="out-in">
          <a-layout-content
            :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }"
          >
            <router-view/>
          </a-layout-content>
      </transition>
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
  }
}
</script>

<style>
  #components-layout-demo-custom-trigger .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;
    float: left;
  }

  #components-layout-demo-custom-trigger .trigger:hover {
    color: #1890ff;
  }

  #components-layout-demo-custom-trigger .logo {
    height: 32px;
    background: rgba(255, 255, 255, 0.2);
    margin: 16px;
  }

  .component-fade-enter-active, .component-fade-leave-active {
    transition: opacity .3s ease;
  }
  .component-fade-enter, .component-fade-leave-to
    /* .component-fade-leave-active for below version 2.1.8 */ {
    opacity: 0;
  }
  .progress {
    position: fixed;
    top: 64px;
  }
</style>
